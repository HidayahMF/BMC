import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  importEmployeeFile,
  getEmployeeStats,
} from "../controllers/adminController.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype === "text/csv" ||
      file.originalname.toLowerCase().endsWith(".csv");
    cb(null, ok);
    if (!ok) cb(new Error("Hanya file CSV yang diperbolehkan."));
  },
});

// All admin routes are protected
router.use(requireAuth);

router.post("/employees/import", upload.single("file"), importEmployeeFile);
router.get("/employees/stats", getEmployeeStats);

export default router;
