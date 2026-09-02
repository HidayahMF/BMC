import pool from "../config/db.js";
import { formatBirthdateToPassword } from "../utils/birthdate.js";

/**
 * POST /api/auth/login
 * body: { username, password }
 *
 * Looks up an employee by NIP, derives the expected DDMMYY password
 * from BirthDate and compares (constant-time-ish) with the supplied
 * one. Does NOT reveal whether the NIP exists - always returns the
 * same generic error message.
 */
export async function login(req, res) {
  const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const password = typeof req.body?.password === "string" ? req.body.password.trim() : "";

  if (!username || !password) {
    return res.status(400).json({ message: "NIP atau password tidak valid." });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT nip, birthdate FROM employees WHERE nip = ? LIMIT 1",
      [username]
    );

    const employee = rows[0];
    if (!employee) {
      // Fake comparison to keep timing uniform and avoid revealing existence.
      const expected = formatBirthdateToPassword(new Date(0));
      compare(expected, password);
      return res.status(401).json({ message: "NIP atau password tidak valid." });
    }

    const expected = formatBirthdateToPassword(employee.birthdate);
    if (!compare(expected, password)) {
      return res.status(401).json({ message: "NIP atau password tidak valid." });
    }

    req.session.authenticated = true;
    req.session.user = {
      nip: employee.nip,
    };

    await new Promise((resolve, reject) => {
      req.session.save((err) => (err ? reject(err) : resolve()));
    });

    return res.json({
      authenticated: true,
      user: { nip: employee.nip },
    });
  } catch (err) {
    console.error("login error", err);
    const message =
      process.env.NODE_ENV === "development"
        ? err.message
        : "Terjadi kesalahan server.";
    return res.status(500).json({ message });
  }
}

/**
 * GET /api/auth/me
 */
export function me(req, res) {
  if (req.session && req.session.authenticated && req.session.user) {
    return res.json({
      authenticated: true,
      user: { nip: req.session.user.nip },
    });
  }
  return res.status(401).json({ authenticated: false });
}

/**
 * POST /api/auth/logout
 */
export function logout(req, res) {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error("logout error", err);
        return res.status(500).json({ message: "Terjadi kesalahan server." });
      }
      res.clearCookie("bmc.sid");
      return res.json({ authenticated: false });
    });
  } else {
    return res.json({ authenticated: false });
  }
}

/**
 * Constant-time-ish string comparison.
 */
function compare(a, b) {
  const len = Math.max(a.length, b.length);
  let diff = a.length !== b.length;
  for (let i = 0; i < len; i++) {
    diff = diff || a.charCodeAt(i) !== b.charCodeAt(i);
  }
  return !diff;
}
