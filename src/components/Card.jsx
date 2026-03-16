import T from "../tokens";
import Icon from "./Icon";

export const Card = ({ children, style: sx, noPad }) => (
  <div style={{ background: T.surface0, borderRadius: T.rMd, border: `1px solid ${T.chromeDivider}`, boxShadow: T.elevLow, padding: noPad ? 0 : T.s5, ...sx }}>{children}</div>
);

export const Badge = ({ children, variant = "info", style: sx }) => {
  const m = {
    info: { bg: T.infoBg, fg: T.brandPrimary }, success: { bg: T.positiveBg, fg: T.positive },
    warning: { bg: T.warningBg, fg: "#a06c00" }, critical: { bg: T.negativeBg, fg: T.negative },
    neutral: { bg: T.surface2, fg: T.textSecondary }, count: { bg: T.surface2, fg: T.textSecondary },
    brand: { bg: T.brandTealDark, fg: "#fff" }, orange: { bg: T.orangeLight, fg: T.orange },
    purple: { bg: T.purpleLight, fg: T.purple },
  };
  const c = m[variant] || m.info;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 10px", borderRadius: T.rPill, fontSize: 12, fontWeight: 600, lineHeight: "20px", background: c.bg, color: c.fg, whiteSpace: "nowrap", ...sx }}>{children}</span>
  );
};

export const Btn = ({ children, variant = "primary", small, icon, onClick, style: sx }) => {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: T.s2, borderRadius: T.rMd, fontSize: small ? 12 : 14, fontWeight: 600, fontFamily: T.font, cursor: "pointer", height: small ? 28 : 36, padding: small ? `0 ${T.s3}` : `0 ${T.s4}`, border: "1px solid transparent", transition: "all .15s", whiteSpace: "nowrap" };
  const vars = {
    primary: { background: T.headerBg, color: "#fff", borderColor: T.headerBg },
    secondary: { background: T.surface0, color: T.textPrimary, borderColor: T.chromeDivider },
    ghost: { background: "none", color: T.textSecondary, borderColor: "transparent" },
    outline: { background: T.surface0, color: T.brandPrimary, borderColor: T.brandPrimary },
    danger: { background: T.surface0, color: T.negative, borderColor: T.negative },
    teal: { background: T.brandTealDark, color: "#fff", borderColor: T.brandTealDark },
  };
  return <button onClick={onClick} style={{ ...base, ...vars[variant], ...sx }}>{icon && <Icon n={icon} s={small ? 13 : 15} />}{children}</button>;
};

export const PillSelect = ({ value, icon }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: T.s2, padding: `6px ${T.s4}`, border: `1px solid ${T.brandPrimary}`, borderRadius: T.rPill, fontSize: 13, fontWeight: 600, color: T.brandPrimary, background: T.surface0, cursor: "pointer" }}>
    {icon && <Icon n={icon} s={14} c={T.brandPrimary} />}
    <span>{value}</span>
    <Icon n="chevDown" s={14} c={T.brandPrimary} />
  </div>
);
