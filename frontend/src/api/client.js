// API client - always sends credentials (httpOnly session cookie).
// In production (cPanel) the frontend and backend share a domain, so we
// call the same origin. For local dev you can override with VITE_API_BASE,
// or rely on the Vite proxy configured in ../vite.config.js.

const BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { "Content-Type": "application/json" }
        : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error((data && data.message) || "Terjadi kesalahan.");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  login: (username, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  me: () => request("/api/auth/me"),
  logout: () =>
    request("/api/auth/logout", { method: "POST" }),
  importEmployees: (formData) =>
    request("/api/admin/pemadaman/employees/import", {
      method: "POST",
      body: formData,
    }),
  employeeStats: () =>
    request("/api/admin/pemadaman/employees/stats"),
};
