-- ============================================================
-- IMPORT DATA DARI SQL SERVER (hris_Employee) KE MYSQL
-- ============================================================
--
-- CARA PAKAI (alternatif jika tidak pakai halaman admin):
--   Salin query di bawah, ganti 'C:/path/employees.csv' dengan lokasi
--   file CSV hasil export dari SQL Server, lalu jalankan di
--   phpMyAdmin / MySQL client.
--
-- FORMAT CSV WAJIB:
--   Nip,BirthDate
--   123456,2002-09-13
--   234567,1995-05-09
--   (BirthDate format YYYY-MM-DD; baris pertama = header)
--
-- CATATAN: Karena MySQL 8 punya local_infile default OFF, cara yang
-- paling andal & bug-free adalah lewat HALAMAN ADMIN upload CSV:
--   http://localhost:5173/admin/pemadaman/employees
-- Halaman itu otomatis insert/update + validasi tanggal + ringkasan.
-- ============================================================

-- Opsi A) Import via LOAD DATA (butuh local_infile=ON / file di server)
-- LOAD DATA INFILE 'C:/laragon/tmp/employees.csv'
-- INTO TABLE employees
-- FIELDS TERMINATED BY ',' ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
-- (nip, @bd)
-- SET birthdate = STR_TO_DATE(@bd, '%Y-%m-%d');

-- Opsi B) Upsert satu-per-satu (aman, tanpa local_infile)
-- Buat baris INSERT, lalu jalankan. Contoh (tambahkan semua baris kamu):
INSERT INTO employees (nip, birthdate) VALUES
('123456', '2002-09-13'),
('234567', '1995-05-09')
ON DUPLICATE KEY UPDATE birthdate = VALUES(birthdate);
