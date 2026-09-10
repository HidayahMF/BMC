# PROMPT AI AGENT — Sistem Login & Sinkronisasi hris_Employee (BMC Pemadaman)

> Copy-paste seluruh isi bagian `===== PROMPT =====` di bawah ini ke AI agent Anda.

===== PROMPT =====

Bangun sebuah web application internal perusahaan sesuai spesifikasi berikut. Perhatikan setiap detail, karena sebagian besar adalah requirement keamanan dan perilaku.

## RINGKASAN TUJUAN

Sistem privat "Pemadaman" yang bisa diakses di rute `/pemadaman`. Login memakai NIP + tanggal lahir. **Password TIDAK pernah disimpan** — dihitung otomatis dari kolom tanggal lahir (BirthDate) format `DDMMYY` setiap kali login. Data pegawai bersumber langsung dari tabel Microsoft SQL Server `hris_Employee`, disinkronkan otomatis ke database MySQL. Ada halaman admin untuk mengecek status sinkron dan tombol sync paksa.

## TEKNOLOGI WAJIB

- Backend: Node.js 18+, Express 4, ES Modules (`"type": "module"`).
  - Dependensi: `express`, `mysql2` (promise), `express-session`, `express-mysql-session`, `helmet`, `cors`, `express-rate-limit`, `multer`, `dotenv`, `mssql` (driver SQL Server, default tedious).
- Database: MySQL `utf8mb4`. Pool config: `timezone: "Z"`, `namedPlaceholders: true`, `decimalNumbers: true`, `dateStrings: false`.
- Frontend: React 19 + Vite + `react-router-dom` v7. SPA terpisah, semua request pakai `credentials: "include"`. Tanpa template HTML dari backend.
- Bahasa UI & pesan error: Bahasa Indonesia.

## SKEMA DATABASE MYSQL

```sql
CREATE TABLE IF NOT EXISTS employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nip VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_employees_nip (nip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sync_log (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    total_rows INT UNSIGNED NOT NULL DEFAULT 0,
    inserted INT UNSIGNED NOT NULL DEFAULT 0,
    updated INT UNSIGNED NOT NULL DEFAULT 0,
    skipped INT UNSIGNED NOT NULL DEFAULT 0,
    failed INT UNSIGNED NOT NULL DEFAULT 0,
    errors TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

Tabel `sessions` dibuat otomatis oleh `express-mysql-session` (createDatabaseTable: true).

## SUMBER DATA: SQL SERVER hris_Employee (TABLE BERUBAH DARI CSV JADI KUERY LANGSUNG)

- Simpan konfigurasi koneksi SQL Server di `.env`: host, port, database, user, password, nama tabel (`hris_Employee`), serta nama kolom NIP dan nama kolom BirthDate (bisa diubah lewat env, jangan hardcode nama kolom).
- Kolom yang dibaca hanya 2: NIP dan BirthDate (DATE). Misal header default `Nip`, `BirthDate` — sesuaikan dengan kolom sebenarnya di SQL Server Anda.
- (`mssql`/tedious) — buat helper koneksi yang aman (close connection setelah dipakai). Jangan log password.

## AUTENTIKASI (INTI — JANGAN SIMPAN PASSWORD)

1. `POST /api/auth/login`, body `{ username, password }`.
   - `username` = NIP, `password` = yang diketik user (diharapkan DDMMYY).
   - Cari `SELECT nip, birthdate FROM employees WHERE nip = ? LIMIT 1`.
   - Password yang diharapkan dihitung dari `birthdate` → `DDMMYY` (DD=2 digit hari, MM=2 digit bulan, YY=2 digit tahun). Contoh `2002-09-13` → `130902`. **Selalu gunakan UTC** — perlakuan `'YYYY-MM-DD'` sebagai UTC midnight agar tanggal tidak bergeser hari.
   - Bandingkan dengan constant-time (jangan pakai `==` langsung; loop banding semua karakter, jangan bocorkan panjang string).
   - **WAJIB AMAN TERHADAP ENUMERASI NIP:** jika NIP tidak ditemukan, tetap lakukan perbandingan tiruan (fake compare) lalu balas status 401 dengan pesan generik yang SAMA persis, misal `{ message: "NIP atau password tidak valid." }`. Jangan pernah menyebut NIP ada/tidak ada.
   - Rate limit: 20 percobaan / 15 menit per IP → 429 `{ message: "Terlalu banyak percobaan login. Coba lagi nanti." }`.
   - Jika sukses: simpan session — `req.session.authenticated = true`, `req.session.user = { nip }`, lalu `req.session.save()` (await, jangan fire-and-forget), kembalikan `{ authenticated: true, user: { nip } }`.
2. `GET /api/auth/me` → jika session valid `{ authenticated: true, user: { nip } }`, selain itu `401 { authenticated: false }`.
3. `POST /api/auth/logout` → `req.session.destroy()`, `res.clearCookie("bmc.sid")`, balas `{ authenticated: false }`.

Konfigurasi session:
- Nama cookie: `bmc.sid`, `httpOnly: true`, `sameSite: "lax"`, `secure: true` saat production, `rolling: true`, `maxAge` 8 jam (bisa dari env), `resave: false`, `saveUninitialized: false`.
- Store: `express-mysql-session` memakai konfigurasi MySQL yang sama.
- `app.set("trust proxy", 1)`.
- Middleware `requireAuth`: cek `req.session.authenticated && req.session.user`; jika tidak → `401 { message: "Unauthorized" }`.

Fungsi konversi tanggal (contoh perilaku kritis):
```
formatBirthdateToPassword('2002-09-13') === '130902'
formatBirthdateToPassword('1996-03-01') === '010396'  // day '01' dengan leading zero
formatBirthdateToPassword('1995-05-09') === '090595'
```
Penting: gunakan `getUTCDate/getUTCMonth/getUTCFullYear` (bukan versi lokal) dan jangan tambahkan offset zona waktu apa pun.

## SINKRONISASI DARI SQL SERVER hris_Employee

- `GET /api/admin/pemadaman/employees/stats` (protect) → `{ totalEmployees, lastSync }` dari tabel MySQL. `lastSync` dari baris terakhir `sync_log`.
- `POST /api/admin/pemadaman/employees/sync` (protect) → alur:
  1. Konek ke SQL Server, query NIP + BirthDate dari `hris_Employee`.
  2. Upsert ke tabel `employees` MySQL dalam **satu transaksi**: NIP sudah ada → `UPDATE birthdate`, belum ada → `INSERT`. Row dengan BirthDate kosong/tidak valid dianggap `failed` (catat errornya).
  3. Kalau datanya besar, gunakan batching (jangan SELECT semua lalu insert satu-satu tanpa batas; chunk agar tidak kehabisan memory).
  4. Tulis ringkasan ke `sync_log` (total_rows, inserted, updated, skipped, failed, errors) lalu kembalikan `{ totalRows, inserted, updated, skipped, failed, errors }`.
- Semua route admin di-protect `requireAuth`.
- **Opsional (fallback, pertahankan):** `POST /api/admin/pemadaman/employees/import` tetap tersedia untuk upload CSV manual format `Nip,BirthDate` (BirthDate `YYYY-MM-DD`), memakai multer memoryStorage max 20MB, hanya terima `.csv`/`text/csv`. Validasi tanggal (tolak tanggal mustahil seperti `2023-02-30`), dukung BOM/CRLF/koma di dalam field yang dikutip.

## ROUTE & HALAMAN FRONTEND

- `/pemadaman/login` — halaman login: dua field, label `NIP` dan `PASSWORD` (placeholder/hint "Tanggal lahir (DDMMYY)"). Teks penjelas singkat di bawah judul. Kalau sukses → `navigate('/pemadaman')`. Tampilkan pesan error dari backend.
- `/pemadaman` — halaman internal yang di-protect (konten halaman source pemadaman; isi bebas selama hanya bisa dilihat setelah login).
- `/admin/pemadaman/employees` — halaman admin protected:
  - Statistik: total employees, last sync time, jumlah row terakhir.
  - Tombol **"Sync dari SQL Server"** → panggil `/employees/sync`, tampilkan ringkasan hasil.
  - Fallback form upload CSV (kalau dipakai) dengan hasil insert/update/skip/failed.
  - Tombol Logout.
- Komponen `ProtectedRoute`: verifikasi session lewat `/api/auth/me` SEMBELUM merender konten privat; saat pemeriksaan tampilkan indikator loading (misal "Memeriksa akses..."); jika tidak terautentikasi redirect ke `/pemadaman/login`. Konten privat tidak boleh tampil sekilas (flash) untuk user yang belum login.
- API client frontend: `fetch` dengan `credentials: "include"`; kirim JSON; saat response tidak ok, lempar error berisi `message` dari body.

## KEAMANAN (TIDAK BISA DITAWAR)

- `helmet()` aktif.
- CORS hanya membolehkan satu origin dari env `CORS_ORIGIN`, dengan `credentials: true`. Origin tidak dikenal → tolak.
- `express.json({ limit: "1mb" })`.
- `SESSION_SECRET` dari env, string acak panjang.
- **Jangan pernah** menyimpan, menampilkan, atau mencatat (log) password/NIP.
- Pesan error login generik dan identik di semua skenario gagal (NIP salah / password salah / NIP tidak ada).
- Jangan bocorkan detail internal saat `NODE_ENV=production` (kecuali production, pesan error server = "Terjadi kesalahan server.").

## VARIABEL ENV (`.env.example`)

```
NODE_ENV
PORT
CORS_ORIGIN
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
DB_CONNECTION_LIMIT
SESSION_SECRET
SESSION_MAX_AGE_MS
SESSION_SECURE_COOKIE
MSSQL_HOST
MSSQL_PORT
MSSQL_DATABASE
MSSQL_USER
MSSQL_PASSWORD
MSSQL_TABLE_NAME   # default hris_Employee
MSSQL_COL_NIP      # default Nip
MSSQL_COL_BIRTHDATE# default BirthDate
```

## DELIVERABLE

1. Backend lengkap (server, config db + mssql, routes auth & admin, controller, middleware, helper konversi tanggal + constant-time compare, service sinkron SQL Server→MySQL, parser CSV). ESM.
2. Frontend React/Vite lengkap (login, protected page, admin, ProtectedRoute, api client, AuthContext).
3. `schema.sql` (dua tabel di atas).
4. `.env.example`.
5. README setup singkat: cara isi `.env`, jalankan backend, build & deploy.
6. **Verifikasi:** pastikan login sukses untuk satu pegawai contoh (NIP dari `hris_Employee` + tanggal lahirnya format DDMMYY) dan gagal untuk password salah. Pastikan tombol sync berhasil memasukkan data ke MySQL.
7. Tests/eksperimen: boleh memakai library testing apa pun, yang penting sistem terbukti berfungsi.

Mulai kerjakan dengan menulis kode lengkap, bukan sekadar rencana. Jangan tanya-tanya ulang hal yang sudah ditulis di spesifikasi ini.

===== END PROMPT =====