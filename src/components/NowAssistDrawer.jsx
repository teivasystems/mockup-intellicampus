import T from "../tokens";
import Icon from "./Icon";
import { Badge } from "./Card";

const NowAssistDrawer = ({ student, open, onClose }) => {
  if (!open || !student) return null;
  return (
    <div style={{
      position: "fixed", top: 0, right: 0, width: 420, height: "100%", zIndex: 200,
      background: T.white, boxShadow: "-4px 0 24px rgba(0,0,0,.12)",
      display: "flex", flexDirection: "column", borderLeft: `3px solid ${T.brandTeal}`,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s4} ${T.s5}`, borderBottom: `1px solid ${T.chromeDivider}` }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.brandTeal}, ${T.brandTealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon n="sparkle" s={16} c="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary }}>Now Assist</div>
          <div style={{ fontSize: 11, color: T.textTertiary }}>AI-powered case intelligence</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1 }}>
          <Icon n="close" s={18} c={T.textTertiary} />
        </button>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: T.s5 }}>
        {/* Case Summary */}
        <div style={{ marginBottom: T.s6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
            <Icon n="sparkle" s={14} c={T.brandTealDark} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, textTransform: "uppercase", letterSpacing: ".5px" }}>Case Summary</span>
          </div>
          <div style={{ background: T.surface1, borderRadius: T.rMd, padding: T.s4, fontSize: 14, color: T.textPrimary, lineHeight: 1.7, borderLeft: `3px solid ${T.brandTeal}` }}>
            <strong>{student.name}</strong> is a {student.year.toLowerCase()} {student.program.toLowerCase()} student whose GPA dropped from {student.prevGpa} to {student.gpa} this semester. {student.absences > 5 ? `They have missed ${student.absences} classes in the last 3 weeks and` : `They have ${student.absences} absences and`} haven't submitted assignments in {student.missedAssign} course{student.missedAssign !== 1 ? "s" : ""}. Engagement score has declined {student.engDrop}% since midterm.
          </div>
        </div>

        {/* Risk Analysis */}
        <div style={{ marginBottom: T.s6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
            <Icon n="sparkle" s={14} c={T.brandTealDark} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, textTransform: "uppercase", letterSpacing: ".5px" }}>Risk Analysis</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
            {[
              { signal: "GPA Decline", severity: "Critical", detail: `${student.prevGpa} → ${student.gpa} (−${(student.prevGpa - student.gpa).toFixed(1)})` },
              { signal: "Attendance", severity: student.absences > 5 ? "Critical" : "Warning", detail: `${student.absences} absences in last 3 weeks` },
              { signal: "LMS Engagement", severity: student.engDrop > 30 ? "Critical" : "Warning", detail: `−${student.engDrop}% since midterm` },
              { signal: "Missing Assignments", severity: student.missedAssign > 1 ? "Critical" : "Warning", detail: `${student.missedAssign} course${student.missedAssign !== 1 ? "s" : ""} with unsubmitted work` },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s2} ${T.s3}`, background: T.surface1, borderRadius: T.rSm }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.severity === "Critical" ? T.negative : T.warning, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{s.signal}</div>
                  <div style={{ fontSize: 12, color: T.textTertiary }}>{s.detail}</div>
                </div>
                <Badge variant={s.severity === "Critical" ? "critical" : "warning"} style={{ fontSize: 10 }}>{s.severity}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div style={{ marginBottom: T.s6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
            <Icon n="sparkle" s={14} c={T.brandTealDark} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, textTransform: "uppercase", letterSpacing: ".5px" }}>Recommended Actions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
            {[
              { icon: "calendar", label: "Schedule advising meeting", priority: "High" },
              { icon: "mail", label: "Send early alert outreach message", priority: "High" },
              { icon: "academic", label: "Connect with tutoring services", priority: "Medium" },
              { icon: "users", label: "Notify department chair", priority: student.tier === "red" ? "High" : "Low" },
            ].map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s3} ${T.s4}`,
                border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, cursor: "pointer",
                transition: "background .15s",
              }}>
                <Icon n={a.icon} s={16} c={T.brandPrimary} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: T.textPrimary }}>{a.label}</span>
                <Badge variant={a.priority === "High" ? "critical" : a.priority === "Medium" ? "warning" : "neutral"} style={{ fontSize: 10 }}>{a.priority}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence */}
        <div style={{ background: T.infoBg, borderRadius: T.rMd, padding: T.s4, display: "flex", alignItems: "flex-start", gap: T.s3 }}>
          <Icon n="shield" s={16} c={T.brandPrimary} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.brandPrimary, marginBottom: T.s1 }}>AI Confidence: 92%</div>
            <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>
              Based on analysis of {student.signals} risk signals across SIS and LMS data sources. Risk classification aligned with institutional thresholds.
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: `${T.s3} ${T.s5}`, borderTop: `1px solid ${T.chromeDivider}`, display: "flex", gap: T.s2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: T.s2, flex: 1, padding: `${T.s2} ${T.s3}`, border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, fontSize: 13, color: T.textTertiary }}>
          <Icon n="sparkle" s={14} c={T.textTertiary} />
          Ask Now Assist...
        </div>
      </div>
    </div>
  );
};

export default NowAssistDrawer;
