# BMC Website + Private `/pemadaman`

Repository berisi website public BMC (React) dan fitur private halaman protocol
pemadaman server.

```
web-BMC/
├── frontend/            # React + Vite (Situs public + halaman /pemadaman)
│   └── src/
│       ├── api/client.js
│       ├── context/AuthContext.jsx
│       └── pages/pemadaman/   # login, protocol, admin, guard, data
└── backend/             # Express + MySQL (authentication + manual sync)
```

---

## Arsitektur

```
SQL Server HRIS (internal 10.19.25.27)
        │  MANUAL EXPORT (Nip, BirthDate)
        ▼
     CSV
        │  MANUAL IMPORT (via /admin/pemadaman/employees)
        ▼
MySQL (cPanel)
        ▼
Express Backend
        ▼
React Frontend
        ▼
/pemadaman  ──►  belum login ──► /pemadaman/login
                      │ authenticated
                      ▼
              Protocol Power OFF/ON
```

- **TIDAK** ada koneksi public ke SQL Server internal.
- **TIDAK** ada sinkronisasi otomatis — manual via CSV.
- Password login = `BirthDate` dalam format **DDMMYY**, dihitung saat login,
  **tidak** disimpan plaintext di database.

---

## Halaman yang ditambahkan

| Route | Keterangan |
|---|---|
| `/pemadaman/login` | Halaman login internal (NIP + password DDMMYY) |
| `/pemadaman` | Protocol Power OFF/ON (18 langkah checklist + progress) — WAJIB login |
| `/admin/pemadaman/employees` | Admin manual sync (upload CSV + statistik) — WAJIB login |

Protocol bersumber dari `frontend/src/assets/PEMADAMAN.html` dan di-render hanya
setelah authentication berhasil. Tidak ada metadata/informasi private di halaman
public, tidak ada link di navbar/footer public.

---

## Menjalankan lokal

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env        # isi credential MySQL
mysql -u user -p bmc_pemadaman < sql/schema.sql
npm run dev                 # http://localhost:3000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```
`vite.config.js` sudah mem-proxy `/api` ke `http://localhost:3000`, jadi
`/pemadaman/login` di `localhost:5173` langsung terhubung ke backend.

---

## Detail lengkap

- Backend: lihat [`backend/README.md`](backend/README.md).
- Env yang dibutuhkan: [`backend/.env.example`](backend/.env.example).
- Schema MySQL: [`backend/sql/schema.sql`](backend/sql/schema.sql).

---

## Deliverables

- **Files created (backend)**: `server.js`, `package.json`, `.env.example`,
  `.gitignore`, `config/db.js`, `routes/*`, `controllers/*`, `middleware/*`,
  `utils/birthdate.js`, `services/importService.js`, `sql/schema.sql`,
  `README.md`.
- **Files created (frontend)**: `src/api/client.js`, `src/context/AuthContext.jsx`,
  `src/pages/pemadaman/*` (login, protocol, admin, guard, data, css).
- **Files modified**: `frontend/src/App.jsx` (routes + AuthProvider),
  `frontend/vite.config.js` (proxy `/api`), `.gitignore` (root).
- **Dependencies added (backend)**: `express`, `mysql2`, `express-session`,
  `express-mysql-session`, `express-rate-limit`, `helmet`, `cors`, `multer`,
  `dotenv`.
- **API**: `POST /api/auth/login`, `GET /api/auth/me`,
  `POST /api/auth/logout`, `POST /api/admin/pemadaman/employees/import`,
  `GET /api/admin/pemadaman/employees/stats`, `GET /api/health`.
- **Database**: MySQL `bmc_pemadaman`, tabel `employees`, `sync_log`, `sessions`.
- **Auth flow**: HTTP-only signed cookie + server-side session (expiry),
  `requireAuth` di semua route private.
