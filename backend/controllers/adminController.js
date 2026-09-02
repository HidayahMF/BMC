import { parseEmployeeCsv, importEmployees, getStats } from "../services/importService.js";

/**
 * POST /api/admin/pemadaman/employees/import
 * multipart/form-data, field "file" (a CSV)
 */
export async function importEmployeeFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File CSV wajib diunggah." });
    }

    const text = req.file.buffer.toString("utf8");
    const parsed = parseEmployeeCsv(text);

    const errors = [...parsed.errors];
    const result = await importEmployees(parsed.rows, parsed.skipped, errors);

    return res.json({
      message: "Import selesai.",
      ...result,
    });
  } catch (err) {
    console.error("import error", err);
    return res.status(500).json({ message: "Terjadi kesalahan server saat import." });
  }
}

/**
 * GET /api/admin/pemadaman/employees/stats
 */
export async function getEmployeeStats(req, res) {
  try {
    const stats = await getStats();
    return res.json(stats);
  } catch (err) {
    console.error("stats error", err);
    return res.status(500).json({ message: "Terjadi kesalahan server." });
  }
}
