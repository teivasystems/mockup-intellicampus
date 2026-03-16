import { useState } from "react";
import T from "../tokens";
import Icon from "../components/Icon";
import { Card, Badge, Btn, PillSelect } from "../components/Card";
import RiskBadge, { RISK } from "../components/RiskBadge";

const CaseDetailScreen = ({ student, onBack, onOpenAssist }) => {
  const [interventionTab, setInterventionTab] = useState("signals");
  const [proPlus, setProPlus] = useState(true);
  if (!student) return null;

  const signals = [
    { type: "GPA Decline", icon: "chart", severity: "Critical", detail: `Cumulative GPA dropped from ${student.prevGpa} to ${student.gpa}`, time: "Detected Mar 12, 2026", source: "SIS" },
    { type: "Attendance Drop", icon: "calendar", severity: student.absences > 5 ? "Critical" : "Warning", detail: `${student.absences} unexcused absences in the last 3 weeks`, time: "Detected Mar 11, 2026", source: "SIS" },
    { type: "LMS Engagement Decline", icon: "trendUp", severity: student.engDrop > 30 ? "Critical" : "Warning", detail: `Engagement score dropped ${student.engDrop}% since midterm`, time: "Detected Mar 10, 2026", source: "LMS" },
    { type: "Missing Assignments", icon: "flag", severity: student.missedAssign > 1 ? "Critical" : "Warning", detail: `${student.missedAssign} course${student.missedAssign !== 1 ? "s" : ""} with overdue submissions`, time: "Detected Mar 9, 2026", source: "LMS" },
    ...(student.signals >= 5 ? [{ type: "Office Hours", icon: "clock", severity: "Info", detail: "No office hour visits this semester", time: "Detected Mar 8, 2026", source: "LMS" }] : []),
  ];

  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {/* Breadcrumb bar */}
      <div style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `${T.s3} ${T.s5}`, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}`, fontSize: 13 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: T.s1, color: T.textLink, fontFamily: T.font, fontSize: 13 }}>
          <Icon n="chevLeft" s={14} c={T.textLink} /> Early Alerts
        </button>
        <span style={{ color: T.textTertiary }}>/</span>
        <span style={{ color: T.textPrimary, fontWeight: 600 }}>{student.id}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: T.s2, alignItems: "center" }}>
          {/* Layer 1/3 toggle */}
          <div onClick={() => setProPlus(!proPlus)} style={{
            display: "flex", alignItems: "center", gap: T.s2, padding: `4px ${T.s3}`,
            background: proPlus ? "linear-gradient(135deg, #e5f7f5, #e5f0fa)" : T.surface2,
            border: `1px solid ${proPlus ? T.brandTeal : T.chromeDivider}`,
            borderRadius: T.rPill, cursor: "pointer", fontSize: 12, fontWeight: 600,
            color: proPlus ? T.brandTealDark : T.textTertiary, transition: "all .2s",
            userSelect: "none",
          }}>
            <Icon n="sparkle" s={12} c={proPlus ? T.brandTealDark : T.textTertiary} />
            <span>Pro+</span>
            <div style={{
              width: 28, height: 16, borderRadius: 8, padding: 2,
              background: proPlus ? T.brandTealDark : T.chromeDivider,
              display: "flex", alignItems: proPlus ? "center" : "center",
              justifyContent: proPlus ? "flex-end" : "flex-start", transition: "all .2s",
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: T.elevLow }} />
            </div>
          </div>
          {proPlus && <Btn variant="teal" small icon="sparkle" onClick={onOpenAssist}>Now Assist</Btn>}
          <Btn variant="secondary" small icon="dotMenu" />
        </div>
      </div>

      <div style={{ display: "flex", gap: T.s5, padding: T.s5, alignItems: "flex-start" }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: T.s5 }}>
          {/* Student Header Card */}
          <Card>
            <div style={{ display: "flex", gap: T.s5 }}>
              {/* Avatar */}
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${T.headerBg}, ${T.workspaceTabBg})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,.85)" }}>{student.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s2 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{student.name}</h2>
                  <RiskBadge tier={student.tier} large />
                </div>
                <div style={{ display: "flex", gap: T.s6, flexWrap: "wrap", fontSize: 13, color: T.textSecondary }}>
                  <span><strong>ID:</strong> {student.sid}</span>
                  <span><strong>Program:</strong> {student.program}</span>
                  <span><strong>Year:</strong> {student.year}</span>
                  <span><strong>Term:</strong> {student.term}</span>
                  <span><strong>Advisor:</strong> {student.advisor}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Summary Banner — Pro+ only */}
          {proPlus ? (
          <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s4} ${T.s5}`, background: student.tier === "red" ? T.negativeBg : T.warningBg, borderRadius: T.rMd, borderLeft: `4px solid ${student.tier === "red" ? T.negative : T.warning}` }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${T.brandTeal}, ${T.brandTealDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <Icon n="sparkle" s={14} c="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, marginBottom: T.s1 }}>AI-Generated Risk Summary</div>
              <div style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.7 }}>
                <strong>{student.name}</strong> is a {student.year.toLowerCase()} {student.program.toLowerCase()} student whose GPA dropped from {student.prevGpa} to {student.gpa} this semester.
                {student.absences > 5
                  ? ` They've missed ${student.absences} classes in the last 3 weeks and haven't submitted assignments in ${student.missedAssign} courses.`
                  : ` They have ${student.absences} absences and ${student.missedAssign} course${student.missedAssign !== 1 ? "s" : ""} with missing work.`
                }
                {" "}Engagement score has declined {student.engDrop}% since midterm. Recommended action: schedule advising meeting and connect with tutoring services.
              </div>
            </div>
          </div>
          ) : (
          <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.surface1, borderRadius: T.rMd, border: `1px dashed ${T.chromeDivider}` }}>
            <Icon n="sparkle" s={16} c={T.textTertiary} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textTertiary, marginBottom: T.s1 }}>AI Case Summary available with Pro+</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>Enable Now Assist to see AI-generated risk summaries, recommended actions, and confidence scoring. Toggle Pro+ above to preview.</div>
            </div>
          </div>
          )}

          {/* Tabs: Risk Signals / Interventions / Activity */}
          <Card noPad>
            <div style={{ display: "flex", gap: T.s6, borderBottom: `2px solid ${T.chromeDivider}`, padding: `0 ${T.s5}` }}>
              {[
                { id: "signals", label: `Risk Signals (${signals.length})` },
                { id: "interventions", label: "Interventions" },
                { id: "activity", label: "Activity" },
              ].map(tab => (
                <button key={tab.id} onClick={() => setInterventionTab(tab.id)} style={{
                  background: "none", border: "none", padding: `${T.s3} 0`, fontSize: 14,
                  fontWeight: interventionTab === tab.id ? 600 : 400,
                  color: interventionTab === tab.id ? T.brandPrimary : T.textSecondary,
                  borderBottom: interventionTab === tab.id ? `2px solid ${T.brandPrimary}` : "2px solid transparent",
                  marginBottom: "-2px", cursor: "pointer", fontFamily: T.font,
                }}>{tab.label}</button>
              ))}
            </div>

            <div style={{ padding: T.s5 }}>
              {interventionTab === "signals" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {signals.map((sig, i) => (
                    <div key={i} style={{ display: "flex", gap: T.s4, padding: `${T.s4} 0`, borderBottom: i < signals.length - 1 ? `1px solid ${T.chromeDividerSubtle}` : "none" }}>
                      {/* Timeline dot + line */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: sig.severity === "Critical" ? T.negative : sig.severity === "Warning" ? T.warning : T.brandPrimary, border: `2px solid ${T.white}`, boxShadow: T.elevLow, flexShrink: 0 }} />
                        {i < signals.length - 1 && <div style={{ width: 2, flex: 1, background: T.chromeDivider, marginTop: 4 }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s1 }}>
                          <Icon n={sig.icon} s={15} c={T.textSecondary} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{sig.type}</span>
                          <Badge variant={sig.severity === "Critical" ? "critical" : sig.severity === "Warning" ? "warning" : "info"} style={{ fontSize: 10 }}>{sig.severity}</Badge>
                          <Badge variant="neutral" style={{ fontSize: 10 }}>{sig.source}</Badge>
                        </div>
                        <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.5 }}>{sig.detail}</div>
                        <div style={{ fontSize: 12, color: T.textTertiary, marginTop: T.s1 }}>{sig.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {interventionTab === "interventions" && (
                <div>
                  {student.status === "New" ? (
                    <div style={{ textAlign: "center", padding: T.s7, color: T.textTertiary }}>
                      <Icon n="check" s={40} c={T.chromeDivider} />
                      <p style={{ marginTop: T.s3, fontSize: 15, fontWeight: 600, color: T.textPrimary }}>No interventions recorded yet</p>
                      <p style={{ fontSize: 13, color: T.textTertiary }}>Use the suggested actions panel to begin the intervention process.</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
                      <div style={{ padding: T.s4, background: T.surface1, borderRadius: T.rMd }}>
                        <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s1 }}>
                          <Icon n="mail" s={14} c={T.brandPrimary} />
                          <span style={{ fontSize: 14, fontWeight: 600 }}>Outreach Email Sent</span>
                          <span style={{ fontSize: 12, color: T.textTertiary, marginLeft: "auto" }}>Mar 11, 2026</span>
                        </div>
                        <div style={{ fontSize: 13, color: T.textSecondary }}>Early alert notification sent to student. Waiting for response.</div>
                        <div style={{ fontSize: 12, color: T.textTertiary, marginTop: T.s1 }}>By {student.advisor}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {interventionTab === "activity" && (
                <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
                  {[
                    ...(student.status === "Resolved" ? [
                      { action: `Case resolved — Outcome: ${student.outcome}`, time: `${student.resolvedDate} at 2:30 PM`, icon: "check", highlight: true },
                      { action: "Case event sent to IntelliCampus AI Agent for re-evaluation", time: `${student.resolvedDate} at 2:30 PM`, icon: "externalLink" },
                    ] : []),
                    ...(student.prevTier && student.reEvalDate ? [
                      { action: `Risk tier upgraded: ${RISK[student.prevTier]?.label || "Watch"} → ${RISK[student.tier].label} (AI re-evaluation)`, time: `${student.reEvalDate} at 11:45 AM`, icon: "arrowUp", highlight: true },
                      { action: "New risk signals detected — 2 additional indicators attached", time: `${student.reEvalDate} at 11:45 AM`, icon: "flag" },
                      { action: "Case event sent to IntelliCampus AI Agent for re-evaluation", time: `${student.reEvalDate} at 11:44 AM`, icon: "externalLink" },
                    ] : []),
                    ...(student.status === "Intervened" || student.status === "Monitoring" ? [
                      { action: "Case event sent to IntelliCampus AI Agent for re-evaluation", time: `${student.created} at 3:20 PM`, icon: "externalLink" },
                      { action: `Intervention logged by ${student.advisor}`, time: `${student.created} at 3:18 PM`, icon: "check" },
                    ] : []),
                    { action: "Early Alert case created by AI Agent", time: `${student.created} at 9:14 AM`, icon: "sparkle" },
                    { action: `Notification sent to ${student.advisor} (Advisor)`, time: `${student.created} at 9:14 AM`, icon: "bell" },
                    { action: `Notification sent to ${student.faculty} (${student.course})`, time: `${student.created} at 9:14 AM`, icon: "academic" },
                    { action: `${student.signals} risk signals attached to case`, time: `${student.created} at 9:14 AM`, icon: "flag" },
                    { action: "Risk tier assigned: " + RISK[student.prevTier && student.reEvalDate ? student.prevTier : student.tier]?.label || RISK[student.tier].label, time: `${student.created} at 9:12 AM`, icon: "shield" },
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s2} 0`, borderBottom: `1px solid ${T.chromeDividerSubtle}` }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.highlight ? T.warningBg : a.icon === "externalLink" ? T.purpleLight : T.surface1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon n={a.icon} s={14} c={a.highlight ? "#a06c00" : a.icon === "externalLink" ? T.purple : T.textTertiary} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: T.textPrimary, fontWeight: a.highlight ? 600 : 400 }}>{a.action}</div>
                        <div style={{ fontSize: 12, color: T.textTertiary }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ width: 320, minWidth: 320, display: "flex", flexDirection: "column", gap: T.s5, flexShrink: 0 }}>
          {/* Case Info */}
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s4 }}>Case Information</div>
            {[
              { label: "Case Number", value: student.id },
              { label: "Status", value: student.status, badge: true },
              ...(student.outcome ? [{ label: "Outcome", value: student.outcome, badge: true, outcomeBadge: true }] : []),
              { label: "Priority", value: student.tier === "red" ? "Critical" : "High" },
              { label: "Created", value: student.created },
              ...(student.resolvedDate ? [{ label: "Resolved", value: student.resolvedDate }] : []),
              { label: "SLA", value: student.status === "New" ? "6h 42m remaining" : student.status === "Resolved" ? "Met" : "Met", color: student.status === "New" ? T.warning : T.positive },
              { label: "Assigned To", value: student.advisor },
              { label: "Faculty", value: student.faculty },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `${T.s2} 0`, borderBottom: `1px solid ${T.chromeDividerSubtle}`, fontSize: 13 }}>
                <span style={{ color: T.textTertiary }}>{f.label}</span>
                {f.badge ? <Badge variant={f.outcomeBadge ? (f.value === "Improved" ? "success" : f.value === "Withdrawn" ? "warning" : "neutral") : f.value === "New" ? "info" : f.value === "Triaged" ? "purple" : f.value === "Resolved" ? "neutral" : "success"}>{f.value}</Badge> :
                  <span style={{ fontWeight: 500, color: f.color || T.textPrimary }}>{f.value}</span>
                }
              </div>
            ))}
          </Card>

          {/* Suggested Actions / Resolution */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s4 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{student.status === "Resolved" ? "Resolution" : "Interventions"}</span>
              {student.status !== "Resolved" && <Icon n="sparkle" s={14} c={T.brandTealDark} />}
            </div>
            {student.status === "Resolved" ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `${T.s3} ${T.s4}`, background: student.outcome === "Improved" ? T.positiveBg : T.warningBg, borderRadius: T.rMd, marginBottom: T.s3 }}>
                  <Icon n={student.outcome === "Improved" ? "check" : "flag"} s={16} c={student.outcome === "Improved" ? T.positive : "#a06c00"} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: student.outcome === "Improved" ? T.positive : "#a06c00" }}>Outcome: {student.outcome}</div>
                    <div style={{ fontSize: 12, color: T.textSecondary }}>Resolved on {student.resolvedDate}</div>
                  </div>
                </div>
                {student.outcome === "Improved" && (
                  <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                    Student returned to stable academic standing after intervention. GPA improved from {student.prevGpa} to {student.gpa}. Case closed after sustained improvement over monitoring period.
                  </div>
                )}
                {student.outcome === "Withdrawn" && (
                  <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                    Student elected to withdraw from the semester. Academic leave of absence filed. Case closed with withdrawal classification. Re-enrollment monitoring will trigger new evaluation.
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
                {[
                  { icon: "calendar", label: "Schedule Advising Meeting", variant: "primary" },
                  { icon: "mail", label: "Send Outreach Message", variant: "outline" },
                  { icon: "academic", label: "Refer to Tutoring Services", variant: "outline" },
                  { icon: "users", label: "Escalate to Department", variant: "danger" },
                ].map(a => (
                  <Btn key={a.label} variant={a.variant} icon={a.icon} style={{ justifyContent: "flex-start", width: "100%" }}>
                    {a.label}
                  </Btn>
                ))}
              </div>
            )}
          </Card>

          {/* Academic Snapshot */}
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s4 }}>Academic Snapshot</div>
            <div style={{ display: "flex", gap: T.s4, marginBottom: T.s4 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: T.negative }}>{student.gpa}</div>
                <div style={{ fontSize: 11, color: T.textTertiary }}>Current GPA</div>
              </div>
              <div style={{ width: 1, background: T.chromeDivider }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: T.textSecondary }}>{student.prevGpa}</div>
                <div style={{ fontSize: 11, color: T.textTertiary }}>Previous GPA</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
              {[
                { label: "Absences (3 weeks)", value: student.absences, warn: student.absences > 4 },
                { label: "Engagement Drop", value: `${student.engDrop}%`, warn: student.engDrop > 25 },
                { label: "Missing Assignments", value: student.missedAssign, warn: student.missedAssign > 0 },
              ].map(m => (
                <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: `${T.s2} 0`, borderBottom: `1px solid ${T.chromeDividerSubtle}`, fontSize: 13 }}>
                  <span style={{ color: T.textSecondary }}>{m.label}</span>
                  <span style={{ fontWeight: 600, color: m.warn ? T.negative : T.textPrimary }}>{m.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Communication */}
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s3 }}>Communication</div>
            <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: T.s2, fontSize: 13 }}>
                <Icon n="mail" s={14} c={T.textTertiary} />
                <span style={{ color: T.textSecondary }}>{student.name.split(" ")[0].toLowerCase()}.{student.name.split(" ")[1]?.toLowerCase()}@university.edu</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: T.s2, fontSize: 13 }}>
                <Icon n="phone" s={14} c={T.textTertiary} />
                <span style={{ color: T.textSecondary }}>(555) 012-3456</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailScreen;
