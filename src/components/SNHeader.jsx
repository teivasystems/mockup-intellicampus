import T from "../tokens";
import Icon from "./Icon";

const SNLogo = () => (
  <svg width="26" height="26" viewBox="0 0 32 32">
    <circle cx="16" cy="6" r="3.5" fill="#81b5a1" />
    <circle cx="6" cy="12" r="3.5" fill="#81b5a1" />
    <circle cx="26" cy="12" r="3.5" fill="#81b5a1" />
    <circle cx="9" cy="23" r="3.5" fill="#81b5a1" />
    <circle cx="23" cy="23" r="3.5" fill="#81b5a1" />
    <circle cx="16" cy="16" r="3.5" fill="#fff" />
  </svg>
);

const SNHeader = () => (
  <header style={{
    height: 48, minHeight: 48, background: T.headerBg, display: "flex",
    alignItems: "center", padding: `0 ${T.s4}`, gap: T.s2, zIndex: 100, flexShrink: 0,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginRight: T.s4 }}>
      <SNLogo />
      <span style={{ color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "-.2px" }}>ServiceNow</span>
    </div>
    {["All", "Favorites", "History", "Admin"].map(l => (
      <button key={l} style={{ background: "none", border: "none", color: "rgba(255,255,255,.78)", fontSize: 13, fontWeight: 500, padding: `${T.s1} ${T.s3}`, cursor: "pointer", borderRadius: T.rSm, fontFamily: T.font }}>{l}</button>
    ))}
    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: T.s2, background: "rgba(255,255,255,.07)", padding: `5px ${T.s5}`, borderRadius: T.rPill, border: "1px solid rgba(255,255,255,.1)" }}>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>IntelliCampus</span>
        <Icon n="star" s={14} c="rgba(255,255,255,.45)" />
      </div>
    </div>
    <div style={{ textAlign: "right", lineHeight: 1.3, marginRight: T.s3 }}>
      <div style={{ fontWeight: 600, color: "rgba(255,255,255,.78)", fontSize: 11 }}>Application scope: IntelliCampus</div>
      <div style={{ color: "#e86060", fontSize: 11, fontWeight: 600 }}>Update set: IntelliCampus Early Alert v1.0</div>
    </div>
    <button style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1 }}><Icon n="search" s={18} c="rgba(255,255,255,.65)" /></button>
    <div style={{ position: "relative" }}>
      <button style={{ background: "none", border: `2px solid ${T.negative}`, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
        <Icon n="globe" s={15} c="rgba(255,255,255,.75)" />
      </button>
      <span style={{ position: "absolute", top: -3, right: -5, background: T.negative, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
    </div>
    {["plus", "chatBubble", "bookmark", "help", "bell"].map(icon => (
      <button key={icon} style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1, borderRadius: T.rSm, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon n={icon} s={18} c="rgba(255,255,255,.65)" />
      </button>
    ))}
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer", marginLeft: 2 }}>SC</div>
  </header>
);

export default SNHeader;
