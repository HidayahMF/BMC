import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Protected route. Verifies authentication against the backend
 * (/api/auth/me). While checking it shows a minimal loading screen so the
 * private content is never flashed to an unauthenticated user.
 */
export default function ProtectedRoute() {
  const { loading, checkAuth } = useAuth();
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // AuthProvider already ran checkAuth on mount; re-verify to cover
      // direct navigation to this route.
      const ok = await checkAuth();
      if (!cancelled) setAuthed(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, [checkAuth]);

  if (loading || authed === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070D",
          color: "#8B93B0",
          fontFamily: "monospace",
          fontSize: 13,
        }}
      >
        Memeriksa akses...
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/pemadaman/login" replace />;
  }

  return <Outlet />;
}
