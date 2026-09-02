import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./pemadaman.css";

export default function PemadamanLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(nip.trim(), password);
      navigate("/pemadaman", { replace: true });
    } catch (err) {
      setError(err.message || "NIP atau password tidak valid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pmd-body">
      <div className="grid" />
      <div className="login-wrap">
        <div className="login-card">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span className="badge b-cyan">● BMC INTERNAL</span>
            <span className="badge b-violet">PRIVATE ACCESS</span>
          </div>
          <h1 className="login-title">Pemadaman<br /><em>Internal Access</em></h1>
          <p className="login-sub">
            Login menggunakan NIP dan password (tanggal lahir format DDMMYY).
          </p>

          <form onSubmit={onSubmit} className="login-form">
            <label className="login-label">NIP</label>
            <input
              type="text"
              className="login-input"
              autoComplete="username"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              placeholder="Nomor Induk Pegawai"
              required
              disabled={loading}
            />

            <label className="login-label">PASSWORD</label>
            <input
              type="password"
              className="login-input"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tanggal lahir (DDMMYY)"
              required
              disabled={loading}
            />

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Memproses..." : "LOGIN"}
            </button>
          </form>

          <p className="login-foot">BMC Internal System</p>
        </div>
      </div>
      <style>{loginCss}</style>
    </div>
  );
}

const loginCss = `
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.login-card{width:100%;max-width:400px;border:1px solid var(--border2);background:linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border-radius:24px;padding:32px;position:relative;overflow:hidden}
.login-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg, transparent, var(--cyan), var(--violet), transparent)}
.login-title{font-family:var(--display);font-size:30px;line-height:1.05;letter-spacing:-0.02em;margin-top:16px;color:var(--text)}
.login-title em{font-style:normal;color:var(--cyan);text-shadow:0 0 24px rgba(0,229,255,0.35)}
.login-sub{color:var(--muted);font-size:13px;margin-top:10px;line-height:1.6}
.login-form{margin-top:24px;display:grid;gap:10px}
.login-label{font-family:var(--mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.login-input{width:100%;background:rgba(255,255,255,0.05);border:1px solid var(--border2);border-radius:12px;padding:13px 14px;color:var(--text);font-family:var(--sans);font-size:14px;outline:none;transition:border-color .2s}
.login-input::placeholder{color:#5a6175}
.login-input:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,229,255,0.12)}
.login-error{color:#ff8fa3;font-size:12px;padding:10px 12px;border:1px solid rgba(255,77,106,0.3);background:rgba(255,77,106,0.08);border-radius:10px;margin-top:4px}
.login-btn{margin-top:8px;width:100%;padding:14px;border:none;border-radius:12px;background:linear-gradient(90deg, var(--cyan), #00b7ff);color:#041018;font-family:var(--display);font-weight:700;font-size:14px;letter-spacing:0.04em;cursor:pointer;transition:opacity .2s}
.login-btn:hover{opacity:.88}
.login-btn:disabled{opacity:.5;cursor:not-allowed}
.login-foot{text-align:center;margin-top:24px;color:#4a526e;font-family:var(--mono);font-size:10px;letter-spacing:0.08em}
`;
