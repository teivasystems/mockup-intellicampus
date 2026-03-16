import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";
import {{ PillSelect }} from "../components/Card";

const AnalyticsStub = () => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: T.s5 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s1 }}>Early Alert Analytics</h2>
        <p style={{ color: T.textSecondary, fontSize: 14, margin: 0 }}>Institutional reporting — retention impact, intervention effectiveness, and outcome tracking.</p>
      </div>
      <div style={{ display: "flex", gap: T.s2 }}>
        <PillSelect value="Spring 2026" icon="calendar" />
        <Btn variant="secondary" icon="externalLink">Export Report</Btn>
      </div>
    </div>
    <div style={{ display: "flex", gap: T.s4, flexWrap: "wrap", marginBottom: T.s5 }}>
      {[
        { title: "Intervention Success Rate", value: "62%", sub: "Red → improved or stable", color: T.positive },
        { title: "Avg Time to First Action", value: "4.2h", sub: "SLA target: 8h", color: T.brandPrimary },
        { title: "Cases Resolved", value: "47", sub: "This term", color: T.textPrimary },
        { title: "Retention Impact", value: "+8.3%", sub: "vs. pre-IntelliCampus baseline", color: T.positive },
      ].map(m => (
        <Card key={m.title} style={{ flex: "1 1 200px" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: T.s2 }}>{m.title}</div>
          <div style={{ fontSize: 42, fontWeight: 300, color: m.color, lineHeight: 1.1 }}>{m.value}</div>
          <div style={{ fontSize: 12, color: T.textTertiary, marginTop: T.s2 }}>{m.sub}</div>
        </Card>
      ))}
    </div>
    <div style={{ display: "flex", gap: T.s5, flexWrap: "wrap" }}>
      <Card style={{ flex: "1 1 400px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: T.s4 }}>Resolution Outcomes</div>
        {/* Horizontal bar chart */}
        <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
          {[
            { label: "Improved", value: 62, color: T.positive },
            { label: "Stable", value: 18, color: T.brandTealDark },
            { label: "Withdrawn", value: 12, color: T.warning },
            { label: "Transferred", value: 5, color: T.brandPrimary },
            { label: "Other", value: 3, color: T.textTertiary },
          ].map(bar => (
            <div key={bar.label} style={{ display: "flex", alignItems: "center", gap: T.s3 }}>
              <span style={{ fontSize: 13, color: T.textSecondary, width: 80, textAlign: "right" }}>{bar.label}</span>
              <div style={{ flex: 1, height: 20, background: T.surface1, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${bar.value}%`, height: "100%", background: bar.color, borderRadius: 4, transition: "width .5s" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, width: 36 }}>{bar.value}%</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{ flex: "1 1 400px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: T.s4 }}>Risk Tier Transitions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
          {[
            { from: "Red", to: "Yellow", count: 18, icon: "arrowDown" },
            { from: "Red", to: "Green", count: 12, icon: "arrowDown" },
            { from: "Yellow", to: "Green", count: 38, icon: "arrowDown" },
            { from: "Yellow", to: "Red", count: 8, icon: "arrowUp" },
            { from: "Green", to: "Yellow", count: 15, icon: "arrowUp" },
          ].map((tr, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s2} ${T.s3}`, background: T.surface1, borderRadius: T.rSm }}>
              <Badge variant={tr.from === "Red" ? "critical" : tr.from === "Yellow" ? "warning" : "success"} style={{ fontSize: 11, minWidth: 50, justifyContent: "center" }}>{tr.from}</Badge>
              <Icon n={tr.icon} s={14} c={tr.icon === "arrowUp" ? T.negative : T.positive} />
              <Badge variant={tr.to === "Red" ? "critical" : tr.to === "Yellow" ? "warning" : "success"} style={{ fontSize: 11, minWidth: 50, justifyContent: "center" }}>{tr.to}</Badge>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginLeft: "auto" }}>{tr.count} students</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default AnalyticsStub;
