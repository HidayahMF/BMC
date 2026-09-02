import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.join(__dirname, "..");
const frontendDist = path.join(backendRoot, "..", "frontend", "dist");
const publicDir = path.join(backendRoot, "public");

if (!fs.existsSync(frontendDist)) {
  console.error(
    "frontend/dist tidak ditemukan. Jalankan build frontend dulu:\n  cd frontend && npm run build"
  );
  process.exit(1);
}

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });
fs.cpSync(frontendDist, publicDir, { recursive: true });

console.log(`Frontend dist disalin ke backend/public (${publicDir})`);