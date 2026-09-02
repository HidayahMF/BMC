import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, ".env"),
  override: true,
});

import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import { dbConfig } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const port = Number(process.env.PORT || 3000);
const isProd = process.env.NODE_ENV === "production";

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        return callback(null, true);
      }

      return callback(new Error("Origin tidak diizinkan oleh CORS."));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore({
  ...dbConfig,
  createDatabaseTable: true,
  schema: {
    tableName: "sessions",
  },
  expiration: Number(process.env.SESSION_MAX_AGE_MS || 28800000) / 1000,
  clearExpired: true,
});

app.use(
  session({
    name: "bmc.sid",
    secret: process.env.SESSION_SECRET || "dev-insecure-secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: isProd && process.env.SESSION_SECURE_COOKIE === "true",
      sameSite: "lax",
      maxAge: Number(process.env.SESSION_MAX_AGE_MS || 28800000),
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/admin/pemadaman", adminRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Serve built frontend (dist/ -> public/) in production.
const publicDir = path.join(__dirname, "public");
if (isProd && fs.existsSync(publicDir)) {
  app.use(express.static(publicDir, { index: "index.html" }));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error("error:", err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "JSON tidak valid." });
  }

  const message =
    isProd ? "Terjadi kesalahan server." : (err.message || "Terjadi kesalahan server.");
  res.status(err.status || 500).json({ message });
});

app.listen(port, () => {
  console.log(`Pemadaman backend listening on port ${port}`);
});
