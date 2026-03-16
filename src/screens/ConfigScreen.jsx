import { useState } from "react";
import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";

const ConfigStub = () => {
  const [configNav, setConfigNav] = useState("thresholds");
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      {/* Tree Nav */}
      <nav style={{ width: 240, minWidth: 240, borderRight: `1px solid ${T.chromeDivider}`, background: T.white, overflowY: "auto", padding: `${T.s4} 0`, flexShrink: 0 }}>
        {[
          { id: "thresholds", label: "Risk Thresholds" },
          { id: "notifications", label: "Notification Templates" },
          { id: "sla", label: "SLA Rules" },
          { id: "interventions", label: "Intervention Types" },
          { id: "assignment", label: "Assignment Rules" },
          { id: "integrations", label: "Data Source Config" },
        ].map(item => (
          <div key={item.id} onClick={() => setConfigNav(item.id)} style={{
            display: "flex", alignItems: "center", padding: `9px ${T.s4}`,
            fontSize: 13, color: configNav === item.id ? T.brandPrimary : T.textSecondary,
            fontWeight: configNav === item.id ? 600 : 400, cursor: "pointer",
            borderLeft: configNav === item.id ? `3px solid ${T.brandTeal}` : "3px solid transparent",
            background: configNav === item.id ? T.infoBg : "none",
          }}>{item.label}</div>
        ))}
      </nav>
      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s1 }}>Risk Configuration</h2>
        <p style={{ color: T.textSecondary, marginBottom: T.s5, fontSize: 14 }}>Configure risk thresholds, notification rules, and SLA policies for your institution.</p>
        <Card>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: T.s5 }}>Risk Tier Thresholds</div>
          <div style={{ display: "flex", gap: T.s5, flexWrap: "wrap" }}>
            {[
              { tier: "Red (High Risk)", gpa: "< 2.0", absences: "> 5", engagement: "> 30% drop", color: T.negative },
              { tier: "Yellow (Watch)", gpa: "2.0 – 2.5", absences: "3 – 5", engagement: "15% – 30% drop", color: T.warning },
              { tier: "Green (On Track)", gpa: "> 2.5", absences: "< 3", engagement: "< 15% drop", color: T.positive },
            ].map(t => (
              <div key={t.tier} style={{ flex: "1 1 200px", border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, borderTop: `4px solid ${t.color}`, padding: T.s4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: T.s3, color: T.textPrimary }}>{t.tier}</div>
                {[
                  { label: "GPA Threshold", value: t.gpa },
                  { label: "Absences (3 wk)", value: t.absences },
                  { label: "Engagement", value: t.engagement },
                ].map(f => (
                  <div key={f.label} style={{ marginBottom: T.s3 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: T.textTertiary, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".4px" }}>{f.label}</label>
                    <input style={{ width: "100%", padding: `${T.s2} ${T.s3}`, border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, fontSize: 14, fontFamily: T.font, background: T.surface0, boxSizing: "border-box" }} defaultValue={f.value} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: T.s5, display: "flex", gap: T.s2 }}>
            <Btn variant="primary">Save Configuration</Btn>
            <Btn variant="secondary">Reset to Defaults</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfigStub;
