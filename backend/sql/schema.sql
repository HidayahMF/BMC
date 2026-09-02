-- ============================================================
-- BMC PEMADAMAN - MySQL Schema (cPanel)
--
-- Run this once in phpMyAdmin (or via mysql CLI) against your
-- cPanel database (e.g. bmc_pemadaman).
--
-- IMPORTANT: only Nip + BirthDate are stored. The login password
-- is DERIVED from BirthDate (DDMMYY) at authentication time and is
-- never stored as plaintext.
-- ============================================================

CREATE TABLE IF NOT EXISTS employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nip VARCHAR(50) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_employees_nip (nip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tracks the last manual sync/import so the admin page can show it.
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
