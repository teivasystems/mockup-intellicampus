import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";
import {{ STUDENTS }} from "../data/demo-data";

const FacultyView = ({ onSelectCase }) => {
  // Group students by faculty
  const facultyMap = {};
  STUDENTS.filter(s => s.status !== "Resolved").forEach(s => {
    if (!facultyMap[s.faculty]) facultyMap[s.faculty] = { name: s.faculty, courses: {}, students: [] };
    if (!facultyMap[s.faculty].courses[s.course]) facultyMap[s.faculty].courses[s.course] = [];
    facultyMap[s.faculty].courses[s.course].push(s);
    facultyMap[s.faculty].students.push(s);
  });
  const facultyList = Object.values(facultyMap);

  return (
    <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: T.s5 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s2 }}>Faculty Notifications</h2>
          <p style={{ color: T.textSecondary, fontSize: 14, margin: 0 }}>Read-only view of flagged students per faculty member and course. Faculty receive email and dashboard notifications when students in their courses are flagged.</p>
        </div>
        <Btn variant="secondary" icon="mail">Send Faculty Digest</Btn>
      </div>

      {/* Info banner */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.infoBg, borderRadius: T.rMd, fontSize: 13, color: T.textPrimary, lineHeight: 1.5, marginBottom: T.s5 }}>
        <Icon n="academic" s={16} c={T.brandPrimary} />
        <span>Faculty members see a <strong>read-only risk summary</strong> for students in their courses. They can add observation notes but cannot modify case status or interventions. All notifications are configurable per institution.</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: T.s5 }}>
        {facultyList.map(fac => (
          <Card key={fac.name}>
            <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s4 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.headerBg, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.85)", fontSize: 14, fontWeight: 700 }}>
                {fac.name.split(" ").slice(1).map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{fac.name}</div>
                <div style={{ fontSize: 12, color: T.textTertiary }}>{Object.keys(fac.courses).length} course{Object.keys(fac.courses).length !== 1 ? "s" : ""} with flagged students · {fac.students.length} alert{fac.students.length !== 1 ? "s" : ""}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: T.s2 }}>
                <Badge variant="critical">{fac.students.filter(s => s.tier === "red").length} Red</Badge>
                <Badge variant="warning">{fac.students.filter(s => s.tier === "yellow").length} Yellow</Badge>
              </div>
            </div>

            {Object.entries(fac.courses).map(([course, students]) => (
              <div key={course} style={{ marginBottom: T.s4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3, paddingBottom: T.s2, borderBottom: `1px solid ${T.chromeDividerSubtle}` }}>
                  <Icon n="academic" s={14} c={T.textTertiary} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{course}</span>
                  <Badge variant="count">{students.length} flagged</Badge>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: T.s2, paddingLeft: T.s6 }}>
                  {students.map(s => (
                    <div key={s.id} onClick={() => onSelectCase(s)} style={{
                      display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s3} ${T.s4}`,
                      background: T.surface1, borderRadius: T.rMd, cursor: "pointer",
                      borderLeft: `3px solid ${s.tier === "red" ? T.negative : T.warning}`,
                      transition: "background .15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = T.surface2}
                      onMouseLeave={e => e.currentTarget.style.background = T.surface1}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: T.headerBg, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.85)", fontSize: 11, fontWeight: 700 }}>
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: T.textTertiary }}>{s.year} · GPA: {s.prevGpa} → {s.gpa} · {s.absences} absences</div>
                      </div>
                      <RiskBadge tier={s.tier} />
                      <Badge variant={s.status === "New" ? "info" : s.status === "Triaged" ? "purple" : s.status === "Intervened" ? "orange" : "success"} style={{ fontSize: 10 }}>{s.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Faculty action area */}
            <div style={{ display: "flex", gap: T.s2, marginTop: T.s2, paddingTop: T.s3, borderTop: `1px solid ${T.chromeDivider}` }}>
              <Btn variant="outline" small icon="pencil">Add Faculty Observation</Btn>
              <Btn variant="ghost" small icon="mail">Contact Advisor</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FacultyView;
