/**
 * requireAuth - protects private endpoints.
 * Returns 401 when there is no authenticated session.
 */
export function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}
