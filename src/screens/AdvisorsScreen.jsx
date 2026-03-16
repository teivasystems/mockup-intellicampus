import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";

const AdvisorsStub = () => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s2 }}>Advisor Caseload</h2>
    <p style={{ color: T.textSecondary, marginBottom: T.s5 }}>Monitor advisor workloads and case distribution across the advising team.</p>
    <div style={{ display: "flex", gap: T.s5, flexWrap: "wrap" }}>
      {[
        { name: "Dr. Sarah Chen", dept: "Engineering / Business", active: 14, red: 3, yellow: 6, green: 5, avgResp: "3.1h" },
        { name: "Dr. James Park", dept: "Nursing / Psychology", active: 11, red: 2, yellow: 5, green: 4, avgResp: "5.2h" },
        { name: "Dr. Lisa Wong", dept: "CS / Biology", active: 13, red: 3, yellow: 4, green: 6, avgResp: "2.8h" },
      ].map(adv => (
        <Card key={adv.name} style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s4 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.brandTealDark, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>
              {adv.name.split(" ").slice(1).map(n => n[0]).join("")}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{adv.name}</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>{adv.dept}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: T.s4, marginBottom: T.s4, textAlign: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 300, color: T.textPrimary }}>{adv.active}</div>
              <div style={{ fontSize: 11, color: T.textTertiary }}>Active Cases</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 300, color: T.brandPrimary }}>{adv.avgResp}</div>
              <div style={{ fontSize: 11, color: T.textTertiary }}>Avg Response</div>
            </div>
          </div>
          {/* Mini risk bar */}
          <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", gap: 2 }}>
            <div style={{ flex: adv.red, background: T.negative, borderRadius: 4 }} />
            <div style={{ flex: adv.yellow, background: T.warning, borderRadius: 4 }} />
            <div style={{ flex: adv.green, background: T.positive, borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", gap: T.s3, marginTop: T.s2, fontSize: 11, color: T.textTertiary }}>
            <span>{adv.red} Red</span><span>{adv.yellow} Yellow</span><span>{adv.green} Green</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default AdvisorsStub;
