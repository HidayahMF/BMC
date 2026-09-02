import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./pemadaman.css";
import {
  protocolMeta,
  offSteps,
  onSteps,
  coordination,
  appTests,
  inventory,
  footer,
} from "./protocolData";

const toneClass = {
  cyan: "b-cyan",
  violet: "b-violet",
  red: "b-red",
  green: "b-green",
  amber: "b-amber",
};

const tagTone = {
  critical: "t-critical",
  vm: "t-vm",
  sql: "t-sql",
  warn: "t-warn",
  ok: "t-ok",
};

function Badge({ text, tone }) {
  return <span className={`badge ${toneClass[tone] || "b-cyan"}`}>{text}</span>;
}

function Tag({ text, tone }) {
  return <span className={`tag ${tagTone[tone] || "t-ok"}`}>{text}</span>;
}

function Step({ step, done, onToggle }) {
  return (
    <div
      className={`step${step.critical ? " critical" : ""}${step.ipGreen ? " ipgreen" : ""}${done ? " done" : ""}`}
      onClick={onToggle}
    >
      <div className="step-head">
        <div className="num">
          <i>{step.num}</i>
          <div>
            <div className="title">{step.title}</div>
            <div className={`ip${step.ipRed ? " red" : step.ipGreen ? " green" : ""}`}>
              {step.ip || ""}
            </div>
          </div>
        </div>
        <label className="check" onClick={(e) => e.stopPropagation()}>
          <input type="checkbox" checked={done} onChange={onToggle} />
          DONE
        </label>
      </div>

      {step.actions && step.actions.length > 0 && (
        <ul className="action">
          {step.actions.map((a, i) => {
            if (Array.isArray(a)) {
              const [, strongPart, rest] = a;
              return (
                <li key={i}>
                  <strong>{strongPart}</strong>
                  {rest || ""}
                </li>
              );
            }
            return <li key={i}>{a}</li>;
          })}
        </ul>
      )}

      {step.code && (
        <pre className={`code ${step.code.tone}`}>{step.code.lines.join("\n")}</pre>
      )}

      {step.details && (
        <details>
          <summary>{step.details.summary}</summary>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {step.details.table[0].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.details.table.slice(1).map((row, r) => (
                  <tr key={r}>
                    <td className="mono">{row[0]}</td>
                    <td className="mono">{row[1]}</td>
                    <td>
                      {row[2] && typeof row[2] === "object" ? (
                        <Tag text={row[2].tag} tone={row[2].tone} />
                      ) : (
                        row[2]
                      )}
                    </td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}

      {step.tags && (
        <div className="meta">
          {step.tags.map((t, i) => (
            <Tag key={i} text={t.text} tone={t.tone} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PemadamanPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [checked, setChecked] = useState(() =>
    new Array(offSteps.length + onSteps.length).fill(false)
  );

  const allSteps = useMemo(() => [...offSteps, ...onSteps], []);
  const doneCount = checked.filter(Boolean).length;
  const total = allSteps.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const toggle = (idx) =>
    setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  const handleLogout = async () => {
    await logout();
    navigate("/pemadaman/login", { replace: true });
  };

  return (
    <div className="pmd-body">
      <div className="grid" />
      <div className="container">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button className="logout-btn" onClick={handleLogout}>
            Logout ({user?.nip})
          </button>
        </div>

        <div className="header">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {protocolMeta.badges.map((b, i) => (
              <Badge key={i} text={b.text} tone={b.tone} />
            ))}
          </div>
          <h1>
            {protocolMeta.titleLine1}
            <br />
            {protocolMeta.titleLine2}
          </h1>
          <p className="sub">
            {protocolMeta.sub.map((part, i) =>
              typeof part === "string" ? (
                part
              ) : part.strong ? (
                <strong key={i} style={{ color: "#E9ECF5" }}>
                  {part.strong}
                </strong>
              ) : (
                <strong key={i} style={{ color: "#00FFA8" }}>
                  {part.strongGreen}
                </strong>
              )
            )}
          </p>
          <div className="kpi">
            {protocolMeta.kpi.map((k, i) => (
              <div key={i}>
                <b>{k.value}</b>
                <span>{k.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="precheck">
          {protocolMeta.precheck.map((p, i) => (
            <div key={i} className={`alert a-${p.tone}`}>
              <span>{p.icon}</span>
              <div>
                <strong>{p.title}</strong>
                <br />
                {p.text}
              </div>
            </div>
          ))}
        </div>

        <div className="progress">
          <span>PROGRESS {doneCount}/{total}</span>
          <div className="bar">
            <i style={{ width: pct + "%" }} />
          </div>
          <span style={{ color: "#8B93B0" }}>Klik card untuk checklist</span>
        </div>

        {/* PHASE 1 OFF */}
        <div className="protocol tl-off">
          <div className="protocol-head">
            <h2>🔴 PHASE 1: POWER OFF — Shutdown</h2>
            <div className="line" />
            <span className="badge b-red">CLIENT → CORE (TERAKHIR)</span>
          </div>
          <div className="timeline">
            {offSteps.map((s, i) => (
              <Step key={s.num} step={s} done={checked[i]} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>

        {/* PHASE 2 ON */}
        <div className="protocol tl-on" style={{ marginTop: 36 }}>
          <div className="protocol-head">
            <h2>🟢 PHASE 2: POWER ON — Power On</h2>
            <div className="line" />
            <span className="badge b-green">CORE → CLIENT (TERAKHIR)</span>
          </div>
          <div className="timeline">
            {onSteps.map((s, i) => (
              <Step
                key={s.num}
                step={s}
                done={checked[offSteps.length + i]}
                onToggle={() => toggle(offSteps.length + i)}
              />
            ))}
          </div>
        </div>

        {/* Koordinasi & Test */}
        <div className="protocol" style={{ marginTop: 36 }}>
          <div className="protocol-head">
            <h2>📋 Setelah UP — Koordinasi & Test</h2>
            <div className="line" />
          </div>
          <div className="precheck">
            <div className="box">
              <div className="box-title">{coordination.title}</div>
              <div className="table-wrap" style={{ margin: 0 }}>
                <table>
                  <thead>
                    <tr>
                      {coordination.table[0].map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coordination.table.slice(1).map((row, r) => (
                      <tr key={r}>
                        <td>{row[0]}</td>
                        <td className="mono">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="box">
              <div className="box-title">{appTests.title}</div>
              <div className="table-wrap" style={{ margin: 0 }}>
                <table>
                  <thead>
                    <tr>
                      {appTests.table[0].map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appTests.table.slice(1).map((row, r) => (
                      <tr key={r}>
                        <td className="mono" style={{ color: "#00E5FF" }}>
                          {row[0].code}
                        </td>
                        <td>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory lampiran */}
        <details style={{ marginTop: 20 }}>
          <summary>{inventory.summary}</summary>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {inventory.table[0].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.table.slice(1).map((row, r) => (
                  <tr key={r} style={row && row[0].includes("SQL") ? undefined : { background: "rgba(255,77,106,0.06)" }}>
                    <td className="mono">{row[0]}</td>
                    <td className="mono">{row[1]}</td>
                    <td>
                      {row[2] && typeof row[2] === "object" ? (
                        <Tag text={row[2].tag} tone={row[2].tone} />
                      ) : (
                        row[2]
                      )}
                    </td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 11, color: "#8B93B0", marginTop: 8 }}>
            {inventory.note}
          </p>
        </details>

        <div className="footer">{footer}</div>
      </div>
    </div>
  );
}
