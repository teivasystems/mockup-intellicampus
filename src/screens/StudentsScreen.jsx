import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";
import {{ STUDENTS }} from "../data/demo-data";

const StudentsStub = () => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s2 }}>Student Directory</h2>
    <p style={{ color: T.textSecondary, marginBottom: T.s5 }}>Search and view student 360 profiles with risk history, interventions, and engagement data.</p>
    <div style={{ display: "flex", gap: T.s3, alignItems: "center", marginBottom: T.s5 }}>
      <input style={{ flex: 1, maxWidth: 400, padding: `10px ${T.s4}`, border: `2px solid ${T.brandPrimary}`, borderRadius: T.rMd, fontSize: 14, fontFamily: T.font, outline: "none" }} placeholder="Search students by name, ID, or program..." />
      <Btn variant="secondary" icon="search">Search</Btn>
      <PillSelect value="All Programs" icon="filter" />
    </div>
    <div style={{ display: "flex", gap: T.s4, flexWrap: "wrap" }}>
      {STUDENTS.slice(0, 4).map(s => (
        <Card key={s.sid} style={{ flex: "1 1 280px", minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s3 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.headerBg, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.85)", fontSize: 14, fontWeight: 700 }}>
              {s.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>{s.sid} · {s.program}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: T.s3, marginBottom: T.s3, flexWrap: "wrap" }}>
            <RiskBadge tier={s.tier} />
            <Badge variant="neutral">{s.year}</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textSecondary }}>
            <span>GPA: {s.gpa}</span><span>Advisor: {s.advisor.replace("Dr. ", "")}</span>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export default StudentsStub;
