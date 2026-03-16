import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";
import {{ STUDENTS }} from "../data/demo-data";

const AlertListScreen = ({ onSelectCase }) => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s5 }}>
    {/* Header + Toolbar */}
    <div style={{ marginBottom: T.s4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s3, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: T.textPrimary }}>Early Alert Cases</h2>
        <Badge variant="count">{STUDENTS.length}</Badge>
        <span style={{ fontSize: 12, color: T.textTertiary }}>Last refreshed 2m ago</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: T.s2 }}>
          <Icon n="refresh" s={18} c={T.textTertiary} />
          <Btn variant="primary" icon="plus">Create Alert</Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: T.s2, flexWrap: "wrap" }}>
        <Btn variant="secondary" small icon="search" />
        <Btn variant="secondary" small icon="filter">Risk Tier</Btn>
        <Btn variant="secondary" small icon="sort">Sort by: Created</Btn>
        <Btn variant="secondary" small icon="group">Group by: Status</Btn>
      </div>
    </div>

    {/* Info Banner */}
    <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.infoBg, borderRadius: T.rMd, fontSize: 13, color: T.textPrimary, lineHeight: 1.5, marginBottom: T.s4 }}>
      <Icon n="sparkle" s={16} c={T.brandPrimary} />
      <span>IntelliCampus AI has identified <strong>3 new at-risk students</strong> since your last session. Red-tier cases require action within the 8-hour SLA window.</span>
    </div>

    {/* Data Table */}
    <div style={{ border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, overflow: "hidden", background: T.white }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["", "Case", "Student", "Risk Tier", "Program", "Advisor", "Signals", "Status", "Created"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600, fontSize: 13, color: T.textSecondary, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map(s => (
            <tr key={s.id} onClick={() => onSelectCase(s)} style={{ cursor: "pointer", borderBottom: `1px solid ${T.chromeDividerSubtle}`, transition: "background .1s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface1}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2 }}>
                  <Icon n="pencil" s={14} c={T.textTertiary} />
                  <input type="checkbox" onClick={e => e.stopPropagation()} />
                </div>
              </td>
              <td style={{ padding: "10px 12px" }}><a href="#" onClick={e => e.preventDefault()} style={{ color: T.textLink, fontWeight: 500 }}>{s.id}</a></td>
              <td style={{ padding: "10px 12px", fontWeight: 500 }}>{s.name}</td>
              <td style={{ padding: "10px 12px" }}><RiskBadge tier={s.tier} /></td>
              <td style={{ padding: "10px 12px" }}>{s.program}</td>
              <td style={{ padding: "10px 12px" }}>{s.advisor}</td>
              <td style={{ padding: "10px 12px" }}><Badge variant="count">{s.signals} signals</Badge></td>
              <td style={{ padding: "10px 12px" }}>
                {s.status === "Resolved" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Badge variant={s.outcome === "Improved" ? "success" : "neutral"}>{s.status}</Badge>
                    <span style={{ fontSize: 11, color: T.textTertiary }}>· {s.outcome}</span>
                  </span>
                ) : (
                  <Badge variant={s.status === "New" ? "info" : s.status === "Triaged" ? "purple" : s.status === "Intervened" ? "orange" : s.status === "Monitoring" ? "success" : "neutral"}>
                    {s.status}
                  </Badge>
                )}
              </td>
              <td style={{ padding: "10px 12px", color: T.textTertiary }}>{s.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${T.s3} ${T.s4}`, borderTop: `1px solid ${T.chromeDivider}`, fontSize: 13, color: T.textSecondary }}>
        <span>Showing 1-{STUDENTS.length} of {STUDENTS.length}</span>
        <div style={{ display: "flex", alignItems: "center", gap: T.s1 }}>
          {["⟨", "1", "⟩"].map((p, i) => (
            <button key={i} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: p === "1" ? `2px solid ${T.brandPrimary}` : "none", background: p === "1" ? T.infoBg : "none", color: p === "1" ? T.brandPrimary : T.textSecondary, borderRadius: T.rSm, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.font }}>{p}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: T.s2 }}>
          <span>Records per page</span>
          <PillSelect value="20" />
        </div>
      </div>
    </div>
  </div>
);

export default AlertListScreen;
