import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import "./pemadaman.css";

function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PemadamanAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const loadStats = useCallback(async () => {
    try {
      const data = await api.employeeStats();
      setStats(data);
    } catch (err) {
      setError(err.message || "Gagal memuat statistik.");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStats();
  }, [loadStats]);

  const onImport = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Pilih file CSV terlebih dahulu.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const data = await api.importEmployees(fd);
      setResult(data);
      await loadStats();
    } catch (err) {
      setError(err.message || "Gagal import file.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/pemadaman/login", { replace: true });
  };

  return (
    <div className="pmd-body">
      <div className="grid" />
      <div className="container" style={{ maxWidth: 760 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <a className="login-foot-link" href="/pemadaman" style={{ color: "#00E5FF", fontFamily: "monospace", fontSize: 12 }}>
            ← Kembali ke Protocol
          </a>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="header">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge b-violet">ADMIN</span>
            <span className="badge b-green">MANUAL SYNC</span>
          </div>
          <h1>Employee <em>Authentication Data</em></h1>
          <p className="sub">
            Import data NIP + BirthDate yang di-export manual dari SQL Server HRIS
            internal. Password dihitung otomatis dari BirthDate saat login.
          </p>

          <div className="kpi" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div><b>{stats ? stats.totalEmployees : "\u2013"}</b><span>EMPLOYEES</span></div>
            <div><b style={{ fontSize: 14 }}>{formatDate(stats?.lastSync?.created_at)}</b><span>LAST SYNC</span></div>
            <div>
              <b style={{ fontSize: 14 }}>
                {stats?.lastSync ? `${stats.lastSync.total_rows} rows` : "\u2013"}
              </b>
              <span>LAST IMPORT</span>
            </div>
          </div>
        </div>

        <form className="box" style={{ marginTop: 20 }} onSubmit={onImport}>
          <div className="box-title">Upload CSV</div>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
            Format file: <span className="mono">Nip,BirthDate</span> dengan <span className="mono">BirthDate</span> = YYYY-MM-DD
          </p>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={(e) => setFile(e.target.files[0] || null)}
            disabled={loading}
            style={{ marginBottom: 12 }}
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Mengimport..." : "IMPORT"}
          </button>
        </form>

        {error && (
          <div className="login-error" style={{ marginTop: 16 }}>{error}</div>
        )}

        {result && (
          <div className="box" style={{ marginTop: 16 }}>
            <div className="box-title">Hasil Import</div>
            <div className="table-wrap" style={{ margin: 0 }}>
              <table style={{ minWidth: 0 }}>
                <tbody>
                  <tr><td>Total rows</td><td className="mono">{result.totalRows}</td></tr>
                  <tr><td>Inserted</td><td className="mono">{result.inserted}</td></tr>
                  <tr><td>Updated</td><td className="mono">{result.updated}</td></tr>
                  <tr><td>Skipped</td><td className="mono">{result.skipped}</td></tr>
                  <tr><td>Failed</td><td className="mono">{result.failed}</td></tr>
                </tbody>
              </table>
            </div>
            {result.errors && result.errors.length > 0 && (
              <pre className="code" style={{ marginTop: 12 }}>
                {result.errors.join("\n")}
              </pre>
            )}
          </div>
        )}

        <div className="footer">BMC Internal System • Admin Manual Sync</div>
      </div>
      <style>{adminCss}</style>
    </div>
  );
}

const adminCss = `
.login-foot-link{text-decoration:none}
.login-error{color:#ff8fa3;font-size:12px;padding:10px 12px;border:1px solid rgba(255,77,106,0.3);background:rgba(255,77,106,0.08);border-radius:10px}
.b-cyan{background:rgba(0,229,255,0.1);border-color:rgba(0,229,255,0.3);color:#00E5FF}
.b-violet{background:rgba(124,77,255,0.12);border-color:rgba(124,77,255,0.3);color:#B388FF}
.b-green{background:rgba(0,255,168,0.1);border-color:rgba(0,255,168,0.25);color:#00FFA8}
.login-btn{margin-top:8px;width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(90deg,#00E5FF,#00b7ff);color:#041018;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:14px;letter-spacing:0.04em;cursor:pointer;transition:opacity .2s}
.login-btn:hover{opacity:.88}
.login-btn:disabled{opacity:.5;cursor:not-allowed}
`;
