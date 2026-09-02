# BMC Pemadaman — Backend (Express + MySQL)

Backend authentication untuk halaman private `/pemadaman` website BMC.

- Authentication menggunakan **Session server-side** (HTTP-only cookie ber-tanda).
- Data employee disimpan di **MySQL** (cPanel) — hasil **manual sync** CSV dari SQL Server HRIS internal.
- **TIDAK ada koneksi** ke SQL Server `10.19.25.27` dari server public.

---

## Struktur

```
backend/
├── server.js                 # entry point Express
├── package.json
├── .env.example              # template variabel environment (tanpa credential asli)
├── .env                      # KAMU isi sendiri (TIDAK ikut ke git)
├── .gitignore
├── config/
│   └── db.js                 # koneksi pool MySQL
├── routes/
│   ├── authRoutes.js         # /api/auth/*
│   └── adminRoutes.js        # /api/admin/pemadaman/*
├── controllers/
│   ├── authController.js     # login / me / logout
│   └── adminController.js    # import / stats
├── middleware/
│   └── authMiddleware.js     # requireAuth
├── services/
│   └── importService.js      # parse CSV + upsert + sync_log
├── utils/
│   └── birthdate.js          # converter BirthDate -> DDMMYY
└── sql/
    └── schema.sql            # MySQL schema (employees + sync_log)
```

---

## Persyaratan

- Node.js >= 18
- MySQL / MariaDB di cPanel (atau lokal untuk pengembangan)
- Akun cPanel DB dengan hak SELECT/INSERT/UPDATE pada database pemadaman

---

## Setup lokal

```bash
cd backend
npm install
cp .env.example .env     # lalu isi .env
```

Isi `.env`:

```env
NODE_ENV=development
PORT=3000

CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_NAME=bmc_pemadaman
DB_USER=your_user
DB_PASSWORD=your_password

SESSION_SECRET=ganti-dengan-string-panjang-acak
SESSION_MAX_AGE_MS=28800000
SESSION_SECURE_COOKIE=false
```

Buat schema:

```bash
mysql -u your_user -p bmc_pemadaman < sql/schema.sql
```

Jalankan:

```bash
npm run dev        # atau: npm start
```

Backend berjalan di `http://localhost:3000`.

---

## Variabel environment

| Variabel | Keterangan |
|---|---|
| `NODE_ENV` | `development` / `production` |
| `PORT` | Port Express (default 3000) |
| `CORS_ORIGIN` | Origin frontend yang diizinkan (contoh `https://bmc.co.id`) |
| `DB_HOST` | Host MySQL (default `localhost`) |
| `DB_PORT` | Port MySQL (default `3306`) |
| `DB_NAME` | Nama database (misal `bmc_pemadaman`) |
| `DB_USER` | User MySQL |
| `DB_PASSWORD` | Password MySQL |
| `DB_CONNECTION_LIMIT` | Ukuran pool koneksi (default 10) |
| `SESSION_SECRET` | Secret penandatangan cookie session (WAJIB di-set di production) |
| `SESSION_MAX_AGE_MS` | Umur session milidetik (default 8 jam) |
| `SESSION_SECURE_COOKIE` | `true` hanya jika sudah HTTPS di production |

> **JANGAN commit `.env`.** Nilai asli hanya di server cPanel.

---

## Endpoint API

| Method | Path | Auth | Keterangan |
|---|---|---|---|
| `POST` | `/api/auth/login` | tidak | Login (rate-limited 20x/15 menit) |
| `GET` | `/api/auth/me` | tidak | Cek session (200 jika login, 401 jika tidak) |
| `POST` | `/api/auth/logout` | tidak | Hapus/invalidate session |
| `GET` | `/api/admin/pemadaman/employees/stats` | ya (`requireAuth`) | Statistik employee + last sync |
| `POST` | `/api/admin/pemadaman/employees/import` | ya (`requireAuth`) | Upload CSV (multipart `file`) |
| `GET` | `/api/health` | tidak | Health check |

---

## Login

```http
POST /api/auth/login
```

Request:

```json
{ "username": "123456", "password": "130902" }
```

`password` = `BirthDate` dalam format **DDMMYY** (dihitung dari kolom `birthdate`, tidak pernah disimpan sebagai plaintext).

Response sukses:

```json
{ "authenticated": true, "user": { "nip": "123456" } }
```

Response gagal (selalu pesan umum):

```json
{ "message": "NIP atau password tidak valid." }
```

Parameterized query (`mysql2` prepared statement) — tidak ada string concatenation SQL.

---

## Query database yang digunakan

```sql
-- Login: cari employee
SELECT nip, birthdate FROM employees WHERE nip = ? LIMIT 1;

-- Import: cek keberadaan
SELECT id FROM employees WHERE nip = ? LIMIT 1;

-- Import: insert baru
INSERT INTO employees (nip, birthdate) VALUES (?, ?);

-- Import: update
UPDATE employees SET birthdate = ? WHERE nip = ?;

-- Log hasil import
INSERT INTO sync_log (total_rows, inserted, updated, skipped, failed, errors)
VALUES (?, ?, ?, ?, ?, ?);

-- Statistik
SELECT COUNT(*) AS total FROM employees;
SELECT * FROM sync_log ORDER BY id DESC LIMIT 1;
```

Semua kueri memakai prepared statement / parameter binding — aman dari SQL injection.

---

## Alur authentication

```
React (/pemadaman/login)
      │  POST /api/auth/login
      ▼
Express → SELECT employee by NIP
      │  ↓
      │  birthdate → formatBirthdateToPassword() → DDMMYY
      │  ↓
      │  compare(password, DDMMYY)
      │  └── cocok? simpan session (httpOnly cookie "bmc.sid")
      ▼
React menyimpan status hanya via session server (bukan localStorage)
```

- Cookie: `HttpOnly`, `SameSite=Lax`, `Secure` (aktif otomatis jika `NODE_ENV=production` + `SESSION_SECURE_COOKIE=true`).
- Session disimpan di MySQL (tabel `sessions`) sehingga tetap ada saat Node restart.
- `GET /api/auth/me` dipakai frontend untuk memverifikasi akses setiap masuk route private.
- Password / birthdate TIDAK dikembalikan ke frontend.

---

## Manual sync (import CSV)

1. Di SQL Server internal jalankan:
   ```sql
   SELECT Nip, BirthDate FROM hris_Employee;
   ```
2. Export hasilnya sebagai CSV dengan 2 kolom:
   ```csv
   Nip,BirthDate
   123456,2002-09-13
   234567,1995-05-09
   ```
3. Login admin: `https://bmc.co.id/admin/pemadaman/employees`
4. Upload CSV → system insert/update, tampilkan ringkasan
   (Total rows / Inserted / Updated / Skipped / Failed).
5. Data authentication sekarang memakai data MySQL terbaru.

Tidak ada sinkronisasi otomatis — semuanya manual via upload CSV.

---

## Keamanan

- Parameterized query (anti SQL injection).
- `.env` untuk semua credential DB (tidak hardcode).
- HTTP-only cookie + session server-side + expiry.
- `requireAuth` memproteksi endpoint admin/private (401 jika tidak login).
- `express-rate-limit` pada `POST /api/auth/login` (mencegah brute-force).
- `helmet` untuk security headers.
- `CORS` dibatasi ke `CORS_ORIGIN` saja.
- `birthdate`/`password` tidak pernah di-return ke client.
- SQL error di-log server, tidak pernah ditampilkan ke client (pesan generik).
- Frontend tidak pernah terhubung langsung ke MySQL — semua lewat Express API.

---

## Deployment cPanel (satu folder)

Frontend + backend digabung jadi **satu folder** (`backend/`). Express yang
melayani static file hasil build frontend (`public/`) sekaligus API `/api`.
Domain diarahkan penuh ke aplikasi Node — tidak perlu pisah `public_html` untuk
frontend.

```
backend/                      <- seluruhnya di-copy ke cPanel
├── server.js                 <- serve API + static SPA
├── public/                   <- hasil build frontend (npm run build:frontend)
└── .env                      <- di-isi di server
```

Langkah:

1. **Build frontend → backend/public**
   ```bash
   cd backend
   npm run build:frontend      # = cd ../frontend && npm run build + salin dist -> public/
   ```
   (`dist` di `frontend/` otomatis tersalin ke `backend/public/`.)

2. **Database:** buat database MySQL di cPanel (misal `bmc_pemadaman`), lalu
   import `sql/schema.sql` via phpMyAdmin. PostgreSQL **tidak** dipakai.

3. **Setup Node.js App** di cPanel:
   - Application root: folder `backend`.
   - Startup file: `server.js`.
   - Node.js version: 20 (atau >= 18).
   - `<b>Jalankan aplikasi terus-menerus</b> (Passenger / always running).
   - Set `.env` (lihat `.env.example`) — atau taruh file `.env` di root backend.

4. **Routing domain** (salah satu):
   - **A. Domain langsung ke Node app (disarankan):** di *Setup Node.js App*
     arahkan aplikasi ke domain/subdomain (Passenger). Express melayani
     segalanya — tak perlu `.htaccess`. Pastikan `PORT` di `.env` cocok dengan
     port dari UI cPanel.
   - **B. Apache di depan, proxy semua ke Node port:** taruh `.htaccess` di
     document root (`public_html`):
     ```apache
     <IfModule mod_proxy.c>
         RewriteEngine On
         RewriteRule ^(.*)$ http://127.0.0.1:PORT/$1 [P,L]
     </IfModule>
     ```
     Ganti `PORT` sesuai port Node app kamu. Semua request (frontend + `/api`)
     diteruskan ke Express.

5. **Domain/HTTPS:** aktifkan SSL gratis (AutoSSL) untuk seluruh domain. Dengan
   HTTPS, set `SESSION_SECURE_COOKIE=true` dan `CORS_ORIGIN` = URL https penuh
   (misal `https://bmc.co.id`).

6. **Upload aplikasi:** pakai *Setup Node.js App* → *Deploy* (Zip dari `backend/`,
   tanpa `node_modules/` + `public/`, lalu jalankan `npm install` dan `npm run
   build:frontend` di shell, atau build dulu di lokal lalu upload
   `backend/public/`-nya juga).

---

## Testing

### Manual
- `npm run build` di `frontend` → harus sukses.
- Boot backend → `GET /api/health` → `{"ok":true}`.
- `GET /api/auth/me` tanpa cookie session → `401`.
- Login dengan NIP + password DDMMYY valid → success.
- Login salah → pesan generik, protocol tidak tampil.
- Refresh setelah login → tetap authenticated (session server).
- Logout → session invalid, kembali ke `/pemadaman/login`.
- Akses endpoint private tanpa session → `401`.
- Import CSV valid → baris ter-insert/update sesuai hasil.
