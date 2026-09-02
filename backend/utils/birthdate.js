/**
 * Convert a birthdate into the DDMMYY password format used by
 * hris_Employee authentication.
 *
 * Accepts a Date object, a JS date string ("2002-09-13" or
 * "2002-09-13T00:00:00.000Z"), or a Date stored by mysql2.
 *
 * Rules:
 *  - DD = 2 digit day (leading zero preserved: 1 -> 01)
 *  - MM = 2 digit month (leading zero preserved: 3 -> 03)
 *  - YY = 2 digit year (e.g. 1996 -> 96)
 *
 * The db connection is configured with timezone "Z" so the DATE
 * returned from MySQL is already interpreted as UTC and we do NOT
 * apply any local timezone offset (avoids shifting a day back).
 */
export function formatBirthdateToPassword(value) {
  const d = toDate(value);

  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(-2);

  return `${dd}${mm}${yy}`;
}

/**
 * Best-effort, timezone-safe conversion of a MySQL DATE into a
 * Date object without any local timezone shifting.
 */
function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    // Treat MySQL "YYYY-MM-DD" as UTC midnight.
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return new Date(`${value}T00:00:00.000Z`);
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
  }

  return new Date(0);
}
