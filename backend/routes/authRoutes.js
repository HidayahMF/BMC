import { Router } from "express";
import { login, me, logout } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Terlalu banyak percobaan login. Coba lagi nanti." },
});

router.post("/login", loginLimiter, login);
router.get("/me", me);
router.post("/logout", logout);

export default router;
