import pool from "../config/db.js";

/**
 * Parse CSV text with headers: Nip,BirthDate
 * Supports optional BOM, CRLF/LF, quoted fields.
 *
 * returns { rows: [{nip, birthdate}], errors: [string] , skipped: count }
 */
export function parseEmployeeCsv(text) {
  if (!text || typeof text !== "string") {
    return { rows: [], errors: ["File kosong."], skipped: 0 };
  }

  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  const errors = [];
  const rows = [];
  let skipped = 0;

  const delim = detectDelimiter(lines);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = splitCsvLine(line, delim);
    if (parts.length < 2) {
      errors.push(`Baris ${i + 1}: format tidak valid (butuh Nip,BirthDate).`);
      skipped++;
      continue;
    }

    let [rawNip, rawBirth] = parts;
    const nip = rawNip.trim();
    let birth = rawBirth.trim();

    // Header row (fleksibel: abaikan kapitalisasi; tak harus baris pertama)
    if (
      nip.toLowerCase().replace(/[."\s]/g, "") === "nip" &&
      birth.toLowerCase().replace(/[."\s]/g, "") === "birthdate"
    ) {
      continue;
    }

    if (!nip) {
      errors.push(`Baris ${i + 1}: Nip kosong.`);
      skipped++;
      continue;
    }

    const { ok, value } = normalizeDate(birth);
    if (!ok) {
      errors.push(`Baris ${i + 1}: BirthDate "${birth}" tidak valid (format YYYY-MM-DD).`);
      skipped++;
      continue;
    }
    birth = value;

    rows.push({ nip, birthdate: birth });
  }

  return { rows, errors, skipped };
}

/**
 * Import rows into `employees`.
 * - Existing NIP -> update birthdate
 * - New NIP     -> insert
 * Records a row in sync_log.
 *
 * returns { totalRows, inserted, updated, failed, skipped, errors }
 */
export async function importEmployees(rows, extraSkipped = 0, parseErrors = []) {
  const conn = await pool.getConnection();
  let inserted = 0;
  let updated = 0;
  let failed = 0;
  const errors = [...parseErrors];

  try {
    await conn.beginTransaction();
    for (const row of rows) {
      try {
        const [existing] = await conn.execute(
          "SELECT id FROM employees WHERE nip = ? LIMIT 1",
          [row.nip]
        );
        if (existing[0]) {
          await conn.execute("UPDATE employees SET birthdate = ? WHERE nip = ?", [
            row.birthdate,
            row.nip,
          ]);
          updated++;
        } else {
          await conn.execute("INSERT INTO employees (nip, birthdate) VALUES (?, ?)", [
            row.nip,
            row.birthdate,
          ]);
          inserted++;
        }
      } catch (err) {
        failed++;
        errors.push(`Nip ${row.nip}: ${err.message}`);
      }
    }
    await conn.commit();

    const totalRows = rows.length + extraSkipped;
    await conn.execute(
      `INSERT INTO sync_log (total_rows, inserted, updated, skipped, failed, errors)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [totalRows, inserted, updated, extraSkipped, failed, errors.join("\n")]
    );

    return { totalRows, inserted, updated, skipped: extraSkipped, failed, errors };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/**
 * GET stats for admin page.
 */
export async function getStats() {
  const [[count]] = await pool.query(
    "SELECT COUNT(*) AS total FROM employees"
  );
  const [lastSyncRows] = await pool.query(
    "SELECT * FROM sync_log ORDER BY id DESC LIMIT 1"
  );

  return {
    totalEmployees: count.total,
    lastSync: lastSyncRows[0] || null,
  };
}

/**
 * Minimal RFC-ish CSV line splitter (handles quotes/commas inside fields).
 */
function splitCsvLine(line, delim = ",") {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delim) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

/**
 * Detect CSV delimiter by counting the most common separator among first 20
 * non-empty lines. Supports comma (",") and semicolon (";").
 */
function detectDelimiter(lines) {
  let comma = 0;
  let semicolon = 0;
  for (let i = 0; i < lines.length && i < 20; i++) {
    const line = lines[i];
    if (!line) continue;
    comma += line.split(",").length - 1;
    semicolon += line.split(";").length - 1;
  }
  return semicolon > comma ? ";" : ",";
}

/**
 * Normalize a date to YYYY-MM-DD.
 * Accepts YYYY-MM-DD (with optional time).
 */
function normalizeDate(value) {
  const s = value.trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s].*)?$/);
  if (!m) return { ok: false, value: s };
  const [, y, mo, d] = m;
  const date = new Date(`${y}-${mo}-${d}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return { ok: false, value: s };
  // Reject impossible dates like 2023-02-30
  if (
    date.getUTCFullYear() !== Number(y) ||
    date.getUTCMonth() + 1 !== Number(mo) ||
    date.getUTCDate() !== Number(d)
  ) {
    return { ok: false, value: s };
  }
  return { ok: true, value: `${y}-${mo}-${d}` };
}
