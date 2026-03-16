import { useState } from "react";
import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";
import {{ STUDENTS }} from "../data/demo-data";\nimport DecoPattern from "../components/DecoPattern";\nimport DonutChart from "../charts/DonutChart";\nimport TrendChart from "../charts/TrendChart";

const DashboardScreen = ({ onViewAlerts }) => {
  const [timeframe, setTimeframe] = useState("term");
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {/* Hero */}
      <div style={{ position: "relative", background: "linear-gradient(135deg, #1b2a3e 0%, #2d3a4a 40%, #3a4a5a 100%)", padding: `${T.s8} ${T.s7}`, overflow: "hidden", minHeight: 130 }}>
        <DecoPattern variant="dark" />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: T.textOnDark, margin: 0 }}>Early Alert Dashboard</h1>
            <p style={{ color: "rgba(255,255,255,.7)", margin: `${T.s2} 0 0`, fontSize: 15 }}>
              Spring 2026 — Proactive risk monitoring powered by IntelliCampus AI
            </p>
          </div>
          <div style={{ display: "flex", gap: T.s2 }}>
            <Btn variant="secondary" icon="sparkle" style={{ background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>AI Insights</Btn>
            <Btn variant="secondary" icon="refresh" style={{ background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "rgba(255,255,255,.2)" }}>Refresh</Btn>
          </div>
        </div>
      </div>

      <div style={{ padding: T.s6, display: "flex", gap: T.s5 }}>
        {/* Main content */}
        <div style={{ flex: "1 1 600px", display: "flex", flexDirection: "column", gap: T.s5 }}>
          {/* KPI Strip */}
          <div style={{ display: "flex", gap: T.s4, flexWrap: "wrap" }}>
            {[
              { title: "Students Monitored", value: "2,847", sub: "Spring 2026 cohort", color: T.textPrimary },
              { title: "High Risk (Red)", value: "38", sub: "↑ 6 from last week", color: T.negative },
              { title: "Watch (Yellow)", value: "124", sub: "↑ 6 from last week", color: T.warning },
              { title: "On Track (Green)", value: "2,685", sub: "94.3% of cohort", color: T.positive },
            ].map(kpi => (
              <Card key={kpi.title} style={{ flex: "1 1 180px", minWidth: 170 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary, marginBottom: T.s1 }}>{kpi.title}</div>
                <div style={{ fontSize: 42, fontWeight: 300, color: kpi.color, lineHeight: 1.1 }}>{kpi.value}</div>
                <div style={{ fontSize: 12, color: T.textTertiary, marginTop: T.s2 }}>{kpi.sub}</div>
              </Card>
            ))}
          </div>

          {/* Risk Distribution + Trend */}
          <div style={{ display: "flex", gap: T.s5, flexWrap: "wrap" }}>
            <Card style={{ flex: "1 1 340px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: T.s4 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Risk Distribution</span>
                <PillSelect value="This Term" />
              </div>
              <DonutChart />
            </Card>
            <Card style={{ flex: "1 1 400px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: T.s4 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>At-Risk Trend</span>
                <div style={{ display: "flex", gap: T.s3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: T.s1 }}>
                    <div style={{ width: 12, height: 3, borderRadius: 2, background: T.negative }} />
                    <span style={{ fontSize: 11, color: T.textTertiary }}>Red</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: T.s1 }}>
                    <div style={{ width: 12, height: 3, borderRadius: 2, background: T.warning }} />
                    <span style={{ fontSize: 11, color: T.textTertiary }}>Yellow</span>
                  </div>
                </div>
              </div>
              <TrendChart />
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: T.s4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: T.s2 }}>
                <span style={{ fontSize: 16, fontWeight: 700 }}>Recent Early Alerts</span>
                <Badge variant="critical">3 new</Badge>
              </div>
              <Btn variant="outline" small onClick={onViewAlerts}>View All Alerts</Btn>
            </div>
            <div style={{ display: "flex", gap: T.s4, flexWrap: "wrap" }}>
              {STUDENTS.filter(s => s.status === "New").slice(0, 3).map(s => (
                <div key={s.id} style={{
                  flex: "1 1 260px", minWidth: 240, background: T.surface0, borderRadius: T.rMd,
                  border: `1px solid ${T.chromeDivider}`, borderLeft: `4px solid ${RISK[s.tier].color === "#a06c00" ? T.warning : RISK[s.tier].color}`,
                  padding: T.s5,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s2 }}>
                    <Icon n="flag" s={14} c={T.textTertiary} />
                    <span style={{ fontSize: 12, color: T.textTertiary }}>{s.id}</span>
                    <RiskBadge tier={s.tier} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, marginBottom: T.s1 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.5, marginBottom: T.s3 }}>
                    {s.program} — GPA: {s.prevGpa} → {s.gpa} · {s.absences} absences · {s.signals} risk signals
                  </div>
                  <div style={{ fontSize: 12, color: T.textTertiary }}>Created {s.created}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Intervention Metrics */}
          <div style={{ display: "flex", gap: T.s4, flexWrap: "wrap" }}>
            {[
              { title: "Avg. Response Time", value: "4.2h", sub: "SLA target: 8h", icon: "clock" },
              { title: "Intervention Rate", value: "87%", sub: "Cases with advisor action", icon: "check" },
              { title: "Recovery Rate", value: "62%", sub: "Red → Green this term", icon: "trendUp" },
            ].map(m => (
              <Card key={m.title} style={{ flex: "1 1 200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
                  <div style={{ width: 32, height: 32, borderRadius: T.rMd, background: T.infoBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon n={m.icon} s={16} c={T.brandPrimary} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{m.title}</span>
                </div>
                <div style={{ fontSize: 36, fontWeight: 300, color: T.textPrimary, lineHeight: 1.1 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: T.textTertiary, marginTop: T.s2 }}>{m.sub}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ width: 260, minWidth: 260, display: "flex", flexDirection: "column", gap: T.s5, flexShrink: 0 }}>
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s4 }}>Quick Actions</div>
            {[
              { icon: "plus", label: "Create Manual Alert" },
              { icon: "settings", label: "Risk Threshold Config" },
              { icon: "chart", label: "Export Dashboard Report" },
              { icon: "mail", label: "Notification Templates" },
              { icon: "users", label: "Advisor Assignments" },
              { icon: "shield", label: "AI Agent Status" },
            ].map(link => (
              <a key={link.label} href="#" style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `6px 0`, fontSize: 13, color: T.textLink, textDecoration: "none" }}>
                <Icon n={link.icon} s={14} c={T.textLink} />
                {link.label}
              </a>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s3 }}>AI Agent Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.positive }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.positive }}>Active — Monitoring</span>
            </div>
            <div style={{ fontSize: 12, color: T.textTertiary, lineHeight: 1.6 }}>
              Last scan: 12 minutes ago<br />
              Next scheduled: 30 min<br />
              Data sources: SIS, LMS<br />
              Students processed: 2,847
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s3 }}>Top Programs at Risk</div>
            {[
              { name: "Nursing", red: 8, yellow: 22 },
              { name: "Engineering", red: 7, yellow: 18 },
              { name: "Biology", red: 6, yellow: 15 },
              { name: "Business", red: 5, yellow: 20 },
            ].map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `${T.s2} 0`, borderBottom: `1px solid ${T.chromeDividerSubtle}` }}>
                <span style={{ flex: 1, fontSize: 13, color: T.textPrimary }}>{p.name}</span>
                <Badge variant="critical" style={{ fontSize: 10, padding: "1px 6px" }}>{p.red}</Badge>
                <Badge variant="warning" style={{ fontSize: 10, padding: "1px 6px" }}>{p.yellow}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
