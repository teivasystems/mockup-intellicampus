import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
 * IntelliCampus — Early Alert for Students at Risk
 * ServiceNow Next Experience / Polaris Workspace Mockup
 * K26 Demo Target
 * ═══════════════════════════════════════════════════════════════ */

/* ── Polaris Design Tokens ─────────────────────────────────── */
const T = {
  white: "#ffffff", surface0: "#ffffff", surface1: "#f4f5f7",
  surface2: "#e9eaed", surface3: "#dfe0e4",
  headerBg: "#1b2a3e", workspaceTabBg: "#2d3a4a",
  chromeDivider: "#dadce0", chromeDividerSubtle: "#ecedf0",
  textPrimary: "#1e1e20", textSecondary: "#53535a",
  textTertiary: "#8b8d97", textOnDark: "#ffffff",
  textLink: "#0b60b0", textLinkHover: "#064a8a",
  brandPrimary: "#0b60b0", brandPrimaryHover: "#064a8a",
  brandTeal: "#4fd1c5", brandTealDark: "#29b6b0",
  positive: "#1a7d36", positiveBg: "#e6f4ea",
  warning: "#f0b323", warningBg: "#fff8e6",
  negative: "#c1272d", negativeBg: "#fde8e8",
  info: "#0b60b0", infoBg: "#e5f0fa",
  orange: "#e8712a", orangeLight: "#fff3ec", orangeBorder: "#f0883e",
  purple: "#6246ea", purpleLight: "#f0edff",
  elevLow: "0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04)",
  elevMed: "0 2px 4px rgba(0,0,0,.07), 0 4px 12px rgba(0,0,0,.05)",
  rSm: "4px", rMd: "8px", rLg: "12px", rPill: "999px",
  s1: "4px", s2: "8px", s3: "12px", s4: "16px", s5: "20px",
  s6: "24px", s7: "32px", s8: "40px", s9: "48px",
  font: "'Source Sans 3', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

/* ── SVG Icons ─────────────────────────────────────────────── */
const I = ({ n, s = 18, c = "currentColor", sw = 2 }) => {
  const d = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z",
    list: "M4 6h16M4 10h16M4 14h16M4 18h16",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    plus: "M12 4v16m8-8H4",
    bell: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
    help: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01",
    user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    globe: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    chevDown: "M19 9l-7 7-7-7",
    chevRight: "M9 5l7 7-7 7",
    chevLeft: "M15 19l-7-7 7-7",
    close: "M6 18L18 6M6 6l12 12",
    sparkle: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
    calendar: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    filter: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z",
    chart: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    pencil: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125",
    flag: "M3 3v18m0-18l9 6-9 6",
    refresh: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    sort: "M3 7h6m-6 4h10m-10 4h14",
    group: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
    externalLink: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
    check: "M4.5 12.75l6 6 9-13.5",
    chatBubble: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
    bookmark: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
    dotMenu: "M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
    clock: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    arrowUp: "M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18",
    arrowDown: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3",
    academic: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
    mail: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
    phone: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
    shield: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    trendUp: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941",
    users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={d[n] || ""} />
    </svg>
  );
};

/* ── Decorative Pattern ────────────────────────────────────── */
const DecoPattern = ({ variant = "dark" }) => {
  const isLight = variant === "light";
  return (
    <svg style={{ position: "absolute", top: 0, right: 0, width: 420, height: "100%", opacity: isLight ? 0.5 : 0.3, pointerEvents: "none" }} viewBox="0 0 420 300" fill="none">
      <circle cx="320" cy="60" r="50" stroke={isLight ? "#b8c9d9" : "rgba(255,255,255,.15)"} strokeWidth="1" />
      <circle cx="380" cy="140" r="30" stroke={isLight ? "#c5dbe8" : "rgba(255,255,255,.1)"} strokeWidth="1" />
      <circle cx="280" cy="180" r="70" stroke={isLight ? "#c0d4e3" : "rgba(255,255,255,.08)"} strokeWidth="1" />
      <circle cx="350" cy="250" r="20" stroke={isLight ? "#b8c9d9" : "rgba(255,255,255,.12)"} strokeWidth="1" />
      <circle cx="250" cy="40" r="8" fill={isLight ? "#b8c9d9" : "rgba(255,255,255,.15)"} />
      <circle cx="400" cy="200" r="5" fill={isLight ? "#c0d4e3" : "rgba(255,255,255,.12)"} />
      <circle cx="300" cy="120" r="4" fill={isLight ? "#9fb8cc" : "rgba(255,255,255,.2)"} />
      <line x1="280" y1="80" x2="350" y2="130" stroke={isLight ? "#c5dbe8" : "rgba(255,255,255,.06)"} strokeWidth="1" />
      <line x1="320" y1="160" x2="380" y2="100" stroke={isLight ? "#c5dbe8" : "rgba(255,255,255,.06)"} strokeWidth="1" />
      <circle cx="260" cy="90" r="3" fill={isLight ? "#e493a0" : "#e87e8f"} opacity="0.5" />
      <circle cx="370" cy="70" r="2.5" fill={isLight ? "#7ec8c8" : "#4fd1c5"} opacity="0.4" />
      <circle cx="310" cy="200" r="3.5" fill={isLight ? "#a0b4d0" : "rgba(255,255,255,.15)"} opacity="0.5" />
    </svg>
  );
};

/* ── SNLogo ──────────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════
   CORE COMPONENTS
   ═══════════════════════════════════════════════════════════ */

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
        <I n="star" s={14} c="rgba(255,255,255,.45)" />
      </div>
    </div>
    <div style={{ textAlign: "right", lineHeight: 1.3, marginRight: T.s3 }}>
      <div style={{ fontWeight: 600, color: "rgba(255,255,255,.78)", fontSize: 11 }}>Scope: x_ic_intellicampus</div>
      <div style={{ color: "#e86060", fontSize: 11, fontWeight: 600 }}>Update set: Early Alert v2.0</div>
    </div>
    <button style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1 }}><I n="search" s={18} c="rgba(255,255,255,.65)" /></button>
    <div style={{ position: "relative" }}>
      <button style={{ background: "none", border: `2px solid ${T.negative}`, borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
        <I n="globe" s={15} c="rgba(255,255,255,.75)" />
      </button>
      <span style={{ position: "absolute", top: -3, right: -5, background: T.negative, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>5</span>
    </div>
    {["plus", "chatBubble", "bookmark", "help", "bell"].map(icon => (
      <button key={icon} style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1, borderRadius: T.rSm, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <I n={icon} s={18} c="rgba(255,255,255,.65)" />
      </button>
    ))}
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.85)", border: "1px solid rgba(255,255,255,.2)", cursor: "pointer", marginLeft: 2 }}>SC</div>
  </header>
);

const WorkspaceTabBar = ({ tabs, active, onChange }) => (
  <nav style={{ display: "flex", alignItems: "stretch", background: T.workspaceTabBg, height: 42, minHeight: 42, paddingLeft: T.s4, gap: 0, flexShrink: 0 }}>
    {tabs.map(t => {
      const isActive = active === t.id;
      return (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          background: isActive ? "rgba(255,255,255,.08)" : "none",
          border: "none", borderBottom: isActive ? `3px solid ${T.brandTeal}` : "3px solid transparent",
          color: isActive ? "#fff" : "rgba(255,255,255,.65)",
          fontSize: 14, fontWeight: isActive ? 600 : 400, padding: `0 ${T.s5}`,
          cursor: "pointer", fontFamily: T.font, transition: "all .15s",
        }}>{t.label}</button>
      );
    })}
  </nav>
);

const Card = ({ children, style: sx, noPad }) => (
  <div style={{ background: T.surface0, borderRadius: T.rMd, border: `1px solid ${T.chromeDivider}`, boxShadow: T.elevLow, padding: noPad ? 0 : T.s5, ...sx }}>{children}</div>
);

const Badge = ({ children, variant = "info", style: sx }) => {
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

const Btn = ({ children, variant = "primary", small, icon, onClick, style: sx }) => {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: T.s2, borderRadius: T.rMd, fontSize: small ? 12 : 14, fontWeight: 600, fontFamily: T.font, cursor: "pointer", height: small ? 28 : 36, padding: small ? `0 ${T.s3}` : `0 ${T.s4}`, border: "1px solid transparent", transition: "all .15s", whiteSpace: "nowrap" };
  const vars = {
    primary: { background: T.headerBg, color: "#fff", borderColor: T.headerBg },
    secondary: { background: T.surface0, color: T.textPrimary, borderColor: T.chromeDivider },
    ghost: { background: "none", color: T.textSecondary, borderColor: "transparent" },
    outline: { background: T.surface0, color: T.brandPrimary, borderColor: T.brandPrimary },
    danger: { background: T.surface0, color: T.negative, borderColor: T.negative },
    teal: { background: T.brandTealDark, color: "#fff", borderColor: T.brandTealDark },
  };
  return <button onClick={onClick} style={{ ...base, ...vars[variant], ...sx }}>{icon && <I n={icon} s={small ? 13 : 15} />}{children}</button>;
};

const PillSelect = ({ value, icon }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: T.s2, padding: `6px ${T.s4}`, border: `1px solid ${T.brandPrimary}`, borderRadius: T.rPill, fontSize: 13, fontWeight: 600, color: T.brandPrimary, background: T.surface0, cursor: "pointer" }}>
    {icon && <I n={icon} s={14} c={T.brandPrimary} />}
    <span>{value}</span>
    <I n="chevDown" s={14} c={T.brandPrimary} />
  </div>
);

/* ── Risk tier helpers ──────────────────────────────────────── */
const RISK = {
  red: { label: "High Risk", color: T.negative, bg: T.negativeBg, badge: "critical", sla: "24h" },
  yellow: { label: "Watch", color: "#a06c00", bg: T.warningBg, badge: "warning", sla: "48h" },
  green: { label: "On Track", color: T.positive, bg: T.positiveBg, badge: "success", sla: "—" },
};

const RiskBadge = ({ tier, large }) => (
  <Badge variant={RISK[tier].badge} style={large ? { fontSize: 13, padding: "4px 14px" } : {}}>
    {large && <I n="flag" s={12} c={RISK[tier].color === "#a06c00" ? "#a06c00" : RISK[tier].color} />}
    {RISK[tier].label}
  </Badge>
);


/* ═══════════════════════════════════════════════════════════
   CRITERIA & SCORING (Design Brief v2 Section 6)
   Green = 0–2 pts, Yellow = 3–5 pts, Red = 6+ pts
   ═══════════════════════════════════════════════════════════ */
const CRITERIA = [
  {id:"EA01",name:"Course grade below floor",signal:"Current grade %",threshold:"< 65%",weight:3,wLabel:"HIGH",source:"Neo4j"},
  {id:"EA02",name:"Midterm grade below passing",signal:"Midterm grade %",threshold:"< 60%",weight:3,wLabel:"HIGH",source:"Neo4j"},
  {id:"EA03",name:"Cumulative GPA decline",signal:"GPA drop vs prior term",threshold:"> 0.5 drop",weight:2,wLabel:"MED",source:"Neo4j"},
  {id:"EA04",name:"LMS login inactivity",signal:"Days since last Canvas login",threshold:"> 7 days",weight:3,wLabel:"HIGH",source:"Neo4j"},
  {id:"EA05",name:"Missing assignments exceeded",signal:"Past-due unsubmitted count",threshold:">= 2",weight:3,wLabel:"HIGH",source:"Neo4j"},
  {id:"EA06",name:"Module completion rate low",signal:"% modules completed",threshold:"< 50%",weight:2,wLabel:"MED",source:"Neo4j"},
  {id:"EA07",name:"Attendance rate below threshold",signal:"Attendance rate %",threshold:"< 70%",weight:2,wLabel:"MED",source:"Neo4j"},
  {id:"EA08",name:"Consecutive absence streak",signal:"Consecutive absences",threshold:">= 3",weight:3,wLabel:"HIGH",source:"Neo4j"},
  {id:"EA09",name:"No recent advisor contact",signal:"Days since last advising",threshold:"> 30 days",weight:1,wLabel:"LOW",source:"ServiceNow"},
  {id:"EA10",name:"Open unresolved advising case",signal:"Open case age (days)",threshold:"> 14 days",weight:2,wLabel:"MED",source:"ServiceNow"},
];

/* ═══════════════════════════════════════════════════════════
   DEMO DATA
   ═══════════════════════════════════════════════════════════ */
const STUDENTS = [
  { id:"EA-1001", name:"Jamal Williams", tier:"red", score:13, program:"Engineering", advisor:"Dr. Sarah Chen", faculty:"Prof. Martinez", status:"New", created:"Mar 18, 2026", term:"Spring 2026", year:"Sophomore", sid:"STU-20240892", course:"ENGR 201",
    matched:[{id:"EA01",value:"42%"},{id:"EA03",value:"1.1 drop (3.2→2.1)"},{id:"EA05",value:"4 past-due"},{id:"EA07",value:"58%"},{id:"EA08",value:"4 consecutive"}],
    unmatched:[{id:"EA02",value:"71%"},{id:"EA04",value:"3 days"},{id:"EA06",value:"62%"},{id:"EA09",value:"12 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1002", name:"Maria Santos", tier:"red", score:12, program:"Nursing", advisor:"Dr. James Park", faculty:"Prof. Nguyen", status:"Triaged", created:"Mar 12, 2026", term:"Spring 2026", year:"Junior", sid:"STU-20230415", course:"NURS 310", prevTier:"yellow", reEvalDate:"Mar 17, 2026",
    matched:[{id:"EA01",value:"38%"},{id:"EA02",value:"45%"},{id:"EA04",value:"11 days"},{id:"EA05",value:"3 past-due"}],
    unmatched:[{id:"EA03",value:"0.3 drop"},{id:"EA06",value:"55%"},{id:"EA07",value:"72%"},{id:"EA08",value:"2"},{id:"EA09",value:"8 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1003", name:"Tyler Brooks", tier:"yellow", score:5, program:"Business", advisor:"Dr. Sarah Chen", faculty:"Prof. Adams", status:"Intervened", created:"Mar 14, 2026", term:"Spring 2026", year:"Freshman", sid:"STU-20250103", course:"BUS 101",
    matched:[{id:"EA01",value:"61%"},{id:"EA07",value:"65%"}],
    unmatched:[{id:"EA02",value:"68%"},{id:"EA03",value:"0.2 drop"},{id:"EA04",value:"2 days"},{id:"EA05",value:"1"},{id:"EA06",value:"58%"},{id:"EA08",value:"1"},{id:"EA09",value:"5 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1004", name:"Aisha Patel", tier:"yellow", score:4, program:"Computer Science", advisor:"Dr. Lisa Wong", faculty:"Prof. Chen", status:"Monitoring", created:"Mar 10, 2026", term:"Spring 2026", year:"Sophomore", sid:"STU-20240556", course:"CS 202",
    matched:[{id:"EA03",value:"0.6 drop (3.0→2.4)"},{id:"EA06",value:"44%"}],
    unmatched:[{id:"EA01",value:"72%"},{id:"EA02",value:"65%"},{id:"EA04",value:"1 day"},{id:"EA05",value:"0"},{id:"EA07",value:"85%"},{id:"EA08",value:"0"},{id:"EA09",value:"10 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1005", name:"Kevin O'Brien", tier:"yellow", score:5, program:"Psychology", advisor:"Dr. James Park", faculty:"Prof. Rivera", status:"New", created:"Mar 18, 2026", term:"Spring 2026", year:"Senior", sid:"STU-20220789", course:"PSY 401",
    matched:[{id:"EA05",value:"2 past-due"},{id:"EA07",value:"62%"}],
    unmatched:[{id:"EA01",value:"67%"},{id:"EA02",value:"63%"},{id:"EA03",value:"0.4 drop"},{id:"EA04",value:"4 days"},{id:"EA06",value:"52%"},{id:"EA08",value:"2"},{id:"EA09",value:"18 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1006", name:"Sofia Rodriguez", tier:"red", score:15, program:"Biology", advisor:"Dr. Lisa Wong", faculty:"Prof. Okafor", status:"New", created:"Mar 18, 2026", term:"Spring 2026", year:"Junior", sid:"STU-20230201", course:"BIO 301",
    matched:[{id:"EA01",value:"31%"},{id:"EA02",value:"28%"},{id:"EA04",value:"14 days"},{id:"EA05",value:"5 past-due"},{id:"EA08",value:"6 consecutive"}],
    unmatched:[{id:"EA03",value:"0.4 drop"},{id:"EA06",value:"22%"},{id:"EA07",value:"52%"},{id:"EA09",value:"22 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1007", name:"David Kim", tier:"yellow", score:3, program:"Engineering", advisor:"Dr. Sarah Chen", faculty:"Prof. Martinez", status:"Triaged", created:"Mar 15, 2026", term:"Spring 2026", year:"Freshman", sid:"STU-20250067", course:"ENGR 101",
    matched:[{id:"EA08",value:"3 consecutive"}],
    unmatched:[{id:"EA01",value:"70%"},{id:"EA02",value:"74%"},{id:"EA03",value:"0.1 drop"},{id:"EA04",value:"2 days"},{id:"EA05",value:"0"},{id:"EA06",value:"68%"},{id:"EA07",value:"75%"},{id:"EA09",value:"6 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-1008", name:"Emma Thompson", tier:"yellow", score:4, program:"English", advisor:"Dr. James Park", faculty:"Prof. Williams", status:"Monitoring", created:"Mar 8, 2026", term:"Spring 2026", year:"Sophomore", sid:"STU-20240330", course:"ENG 220",
    matched:[{id:"EA03",value:"0.6 drop (2.9→2.3)"},{id:"EA06",value:"41%"}],
    unmatched:[{id:"EA01",value:"69%"},{id:"EA02",value:"66%"},{id:"EA04",value:"3 days"},{id:"EA05",value:"1"},{id:"EA07",value:"78%"},{id:"EA08",value:"1"},{id:"EA09",value:"15 days"},{id:"EA10",value:"N/A"}] },
  { id:"EA-0994", name:"Rachel Foster", tier:"green", score:1, program:"Psychology", advisor:"Dr. James Park", faculty:"Prof. Rivera", status:"Resolved", created:"Feb 12, 2026", term:"Spring 2026", year:"Junior", sid:"STU-20230612", course:"PSY 305", outcome:"Improved", resolvedDate:"Mar 10, 2026", prevTier:"yellow",
    matched:[{id:"EA09",value:"35 days"}],
    unmatched:[{id:"EA01",value:"78%"},{id:"EA02",value:"72%"},{id:"EA03",value:"0.1 improvement"},{id:"EA04",value:"1 day"},{id:"EA05",value:"0"},{id:"EA06",value:"71%"},{id:"EA07",value:"88%"},{id:"EA08",value:"0"},{id:"EA10",value:"N/A"}] },
  { id:"EA-0987", name:"Marcus Chen", tier:"red", score:17, program:"Engineering", advisor:"Dr. Sarah Chen", faculty:"Prof. Martinez", status:"Resolved", created:"Feb 5, 2026", term:"Spring 2026", year:"Sophomore", sid:"STU-20240198", course:"ENGR 202", outcome:"Withdrawn", resolvedDate:"Mar 3, 2026",
    matched:[{id:"EA01",value:"18%"},{id:"EA02",value:"22%"},{id:"EA03",value:"1.2 drop"},{id:"EA04",value:"21 days"},{id:"EA05",value:"7 past-due"},{id:"EA08",value:"9 consecutive"}],
    unmatched:[{id:"EA06",value:"15%"},{id:"EA07",value:"38%"},{id:"EA09",value:"45 days"},{id:"EA10",value:"N/A"}] },
];

const TREND_DATA = [
  { week: "Feb 3", red: 8, yellow: 42 },
  { week: "Feb 10", red: 12, yellow: 55 },
  { week: "Feb 17", red: 18, yellow: 68 },
  { week: "Feb 24", red: 28, yellow: 82 },
  { week: "Mar 3", red: 38, yellow: 96 },
  { week: "Mar 10", red: 52, yellow: 112 },
  { week: "Mar 18", red: 68, yellow: 134 },
];

/* ═══════════════════════════════════════════════════════════
   SVG CHARTS
   ═══════════════════════════════════════════════════════════ */

const DonutChart = () => {
  const total = 812;
  const red = 68, yellow = 134, green = 610;
  const cx = 100, cy = 100, r = 80, sw = 28;
  const circ = 2 * Math.PI * r;
  const redArc = (red / total) * circ;
  const yellowArc = (yellow / total) * circ;
  const greenArc = (green / total) * circ;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: T.s7 }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.positiveBg} strokeWidth={sw} />
        {/* Green arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.positive} strokeWidth={sw}
          strokeDasharray={`${greenArc} ${circ}`} strokeDashoffset="0"
          transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round" />
        {/* Yellow arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.warning} strokeWidth={sw}
          strokeDasharray={`${yellowArc} ${circ}`} strokeDashoffset={`${-greenArc}`}
          transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round" />
        {/* Red arc */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.negative} strokeWidth={sw}
          strokeDasharray={`${redArc} ${circ}`} strokeDashoffset={`${-(greenArc + yellowArc)}`}
          transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="round" />
        {/* Center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill={T.textPrimary} fontSize="32" fontWeight="300" fontFamily={T.font}>812</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={T.textTertiary} fontSize="12" fontFamily={T.font}>Students Evaluated</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
        {[
          { label: "Red — Urgent (6+ pts)", value: red, pct: ((red/total)*100).toFixed(1), color: T.negative, sla: "24h SLA" },
          { label: "Yellow — Moderate (3–5 pts)", value: yellow, pct: ((yellow/total)*100).toFixed(1), color: T.warning, sla: "48h SLA" },
          { label: "Green — No Alert (0–2 pts)", value: green, pct: ((green/total)*100).toFixed(1), color: T.positive, sla: "—" },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: T.s3 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{item.label}</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>{item.value} ({item.pct}%) · {item.sla}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendChart = () => {
  const w = 500, h = 140, pad = { t: 10, r: 20, b: 30, l: 40 };
  const pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
  const maxVal = 160;
  const toX = (i) => pad.l + (i / (TREND_DATA.length - 1)) * pw;
  const toY = (v) => pad.t + ph - (v / maxVal) * ph;

  const redPath = TREND_DATA.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.red)}`).join(" ");
  const yellowPath = TREND_DATA.map((d, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(d.yellow)}`).join(" ");
  // Area fills
  const redArea = redPath + ` L${toX(TREND_DATA.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`;
  const yellowArea = yellowPath + ` L${toX(TREND_DATA.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {[0, 40, 80, 120, 160].map(v => (
        <g key={v}>
          <line x1={pad.l} y1={toY(v)} x2={w - pad.r} y2={toY(v)} stroke={T.chromeDividerSubtle} strokeWidth="1" />
          <text x={pad.l - 8} y={toY(v) + 4} textAnchor="end" fill={T.textTertiary} fontSize="10" fontFamily={T.font}>{v}</text>
        </g>
      ))}
      {/* X labels */}
      {TREND_DATA.map((d, i) => (
        <text key={i} x={toX(i)} y={h - 6} textAnchor="middle" fill={T.textTertiary} fontSize="10" fontFamily={T.font}>{d.week}</text>
      ))}
      {/* Area fills */}
      <path d={yellowArea} fill={T.warningBg} opacity="0.5" />
      <path d={redArea} fill={T.negativeBg} opacity="0.5" />
      {/* Lines */}
      <path d={yellowPath} fill="none" stroke={T.warning} strokeWidth="2.5" strokeLinejoin="round" />
      <path d={redPath} fill="none" stroke={T.negative} strokeWidth="2.5" strokeLinejoin="round" />
      {/* End dots */}
      <circle cx={toX(TREND_DATA.length - 1)} cy={toY(68)} r="4" fill={T.negative} />
      <circle cx={toX(TREND_DATA.length - 1)} cy={toY(134)} r="4" fill={T.warning} />
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════
   NOW ASSIST DRAWER
   ═══════════════════════════════════════════════════════════ */
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
          <I n="sparkle" s={16} c="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.textPrimary }}>Now Assist</div>
          <div style={{ fontSize: 11, color: T.textTertiary }}>Explanation engine (testing)</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: T.s1 }}>
          <I n="close" s={18} c={T.textTertiary} />
        </button>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: T.s5 }}>
        {/* Plain-Language Explanation */}
        <div style={{ marginBottom: T.s6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
            <I n="sparkle" s={14} c={T.brandTealDark} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, textTransform: "uppercase", letterSpacing: ".5px" }}>Plain-Language Explanation</span>
          </div>
          <div style={{ background: T.surface1, borderRadius: T.rMd, padding: T.s4, fontSize: 14, color: T.textPrimary, lineHeight: 1.7, borderLeft: `3px solid ${T.brandTeal}` }}>
            {(() => { const mc = (student.matched||[]).map(m => { const c = CRITERIA.find(cr=>cr.id===m.id); return c ? {...c, actualValue: m.value} : null; }).filter(Boolean); return (<><strong>{student.name}</strong> matched <strong>{(student.matched||[]).length} of 10</strong> institutional risk criteria, scoring <strong>{student.score||0} points</strong> ({RISK[student.tier].label} tier). Primary triggers: {mc.slice(0,3).map(c => c.name.toLowerCase()).join(", ")}. Recommended: initiate outreach and connect with academic support.</>); })()}
          </div>
        </div>

        {/* Matched Criteria Breakdown */}
        <div style={{ marginBottom: T.s6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
            <I n="sparkle" s={14} c={T.brandTealDark} />
            <span style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, textTransform: "uppercase", letterSpacing: ".5px" }}>Matched Criteria</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
            {(student.matched||[]).map(m => { const c = CRITERIA.find(cr=>cr.id===m.id); return c ? {...c, actualValue: m.value} : null; }).filter(Boolean).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: T.s3, padding: `${T.s2} ${T.s3}`, background: T.surface1, borderRadius: T.rSm }}>
                <Badge variant={c.weight === 3 ? "critical" : c.weight === 2 ? "warning" : "neutral"} style={{ fontSize: 10, minWidth: 28, justifyContent: "center" }}>{c.weight}</Badge>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{c.id}: {c.name}</div>
                  <div style={{ fontSize: 12, color: T.textTertiary }}>Value: {c.actualValue} · Threshold: {c.threshold}</div>
                </div>
                <Badge variant={c.source === "Neo4j" ? "purple" : "info"} style={{ fontSize: 10 }}>{c.source}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Governance note */}
        <div style={{ background: T.infoBg, borderRadius: T.rMd, padding: T.s4, display: "flex", alignItems: "flex-start", gap: T.s3 }}>
          <I n="shield" s={16} c={T.brandPrimary} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.brandPrimary, marginBottom: T.s1 }}>Deterministic Scoring</div>
            <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.5 }}>
              This alert was triggered by institutional rules in the Decision Table. Now Assist provides the explanation — the criteria determined the risk tier.
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: `${T.s3} ${T.s5}`, borderTop: `1px solid ${T.chromeDivider}`, display: "flex", gap: T.s2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: T.s2, flex: 1, padding: `${T.s2} ${T.s3}`, border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, fontSize: 13, color: T.textTertiary }}>
          <I n="sparkle" s={14} c={T.textTertiary} />
          Ask Now Assist...
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 1: RISK DASHBOARD
   ═══════════════════════════════════════════════════════════ */
const DashboardScreen = ({ onViewAlerts }) => {
  const [timeframe, setTimeframe] = useState("term");
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {/* Hero */}
      <div style={{ position: "relative", background: "linear-gradient(135deg, #1b2a3e 0%, #2d3a4a 40%, #3a4a5a 100%)", padding: `${T.s8} ${T.s7}`, overflow: "hidden", minHeight: 130 }}>
        <DecoPattern variant="dark" />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: T.textOnDark, margin: 0 }}>Daily Intelligence Brief</h1>
            <p style={{ color: "rgba(255,255,255,.7)", margin: `${T.s2} 0 0`, fontSize: 15 }}>
              March 18, 2026 — Overnight scoring run completed at 6:00 AM · 12 new students flagged
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
              { title: "Students Evaluated", value: "812", sub: "Spring 2026 cohort", color: T.textPrimary },
              { title: "Red — Urgent", value: "68", sub: "24h SLA · ↑8 from last run", color: T.negative },
              { title: "Yellow — Moderate", value: "134", sub: "48h SLA · ↑6 from last run", color: T.warning },
              { title: "Green — No Alert", value: "610", sub: "75.1% of cohort", color: T.positive },
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
                    <I n="flag" s={14} c={T.textTertiary} />
                    <span style={{ fontSize: 12, color: T.textTertiary }}>{s.id}</span>
                    <RiskBadge tier={s.tier} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, marginBottom: T.s1 }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.5, marginBottom: T.s3 }}>
                    {s.program} · {(s.matched||[]).length} criteria matched · Score: {s.score} pts · SLA: {RISK[s.tier].sla}
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
                    <I n={m.icon} s={16} c={T.brandPrimary} />
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
              { icon: "shield", label: "Scoring Engine" },
            ].map(link => (
              <a key={link.label} href="#" style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `6px 0`, fontSize: 13, color: T.textLink, textDecoration: "none" }}>
                <I n={link.icon} s={14} c={T.textLink} />
                {link.label}
              </a>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s3 }}>Scoring Engine</div>
            <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s3 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.positive }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: T.positive }}>Completed</span>
            </div>
            <div style={{ fontSize: 12, color: T.textTertiary, lineHeight: 1.6 }}>
              Last run: Today 6:00 AM<br />
              Active criteria: 10 / 10<br />
              Sources: Neo4j + ServiceNow<br />
              Students evaluated: 812
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

/* ═══════════════════════════════════════════════════════════
   SCREEN 2: EARLY ALERT CASE LIST
   ═══════════════════════════════════════════════════════════ */
const AlertListScreen = ({ onSelectCase }) => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s5 }}>
    {/* Header + Toolbar */}
    <div style={{ marginBottom: T.s4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s3, flexWrap: "wrap" }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: T.textPrimary }}>Early Alert Cases</h2>
        <Badge variant="count">{STUDENTS.length}</Badge>
        <span style={{ fontSize: 12, color: T.textTertiary }}>Last refreshed 2m ago</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: T.s2 }}>
          <I n="refresh" s={18} c={T.textTertiary} />
          <Btn variant="primary" icon="plus">Create Alert</Btn>
        </div>
      </div>
      <div style={{ display: "flex", gap: T.s2, flexWrap: "wrap" }}>
        <Btn variant="secondary" small icon="search" />
        <Btn variant="secondary" small icon="filter">Risk Tier</Btn>
        <Btn variant="secondary" small icon="sort">Sort by: Created</Btn>
        <Btn variant="secondary" small icon="group">Group by: Status</Btn>
      </div>
    </div>

    {/* Info Banner */}
    <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.infoBg, borderRadius: T.rMd, fontSize: 13, color: T.textPrimary, lineHeight: 1.5, marginBottom: T.s4 }}>
      <I n="sparkle" s={16} c={T.brandPrimary} />
      <span>The scoring engine flagged <strong>4 new students</strong> against institutional risk criteria overnight. Red-tier cases require action within the <strong>24-hour</strong> SLA window.</span>
    </div>

    {/* Data Table */}
    <div style={{ border: `1px solid ${T.chromeDivider}`, borderRadius: T.rMd, overflow: "hidden", background: T.white }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {["", "Case", "Student", "Score", "Tier", "Program", "Advisor", "Criteria", "Status", "SLA", "Created"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontWeight: 600, fontSize: 12, color: T.textSecondary, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map(s => (
            <tr key={s.id} onClick={() => onSelectCase(s)} style={{ cursor: "pointer", borderBottom: `1px solid ${T.chromeDividerSubtle}`, transition: "background .1s" }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface1}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2 }}>
                  <I n="pencil" s={14} c={T.textTertiary} />
                  <input type="checkbox" onClick={e => e.stopPropagation()} />
                </div>
              </td>
              <td style={{ padding: "10px 12px" }}><a href="#" onClick={e => e.preventDefault()} style={{ color: T.textLink, fontWeight: 500 }}>{s.id}</a></td>
              <td style={{ padding: "10px 12px", fontWeight: 500 }}>{s.name}</td>
              <td style={{ padding: "10px 12px" }}><span style={{ fontWeight: 700, color: (s.score||0) >= 6 ? T.negative : (s.score||0) >= 3 ? "#a06c00" : T.positive }}>{s.score||0} pts</span></td>
              <td style={{ padding: "10px 12px" }}><RiskBadge tier={s.tier} /></td>
              <td style={{ padding: "10px 12px" }}>{s.program}</td>
              <td style={{ padding: "10px 12px" }}>{s.advisor}</td>
              <td style={{ padding: "10px 12px" }}><Badge variant="count">{(s.matched||[]).length} / 10</Badge></td>
              <td style={{ padding: "10px 12px" }}>
                {s.status === "Resolved" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Badge variant={s.outcome === "Improved" ? "success" : "neutral"}>{s.status}</Badge>
                    <span style={{ fontSize: 11, color: T.textTertiary }}>· {s.outcome}</span>
                  </span>
                ) : (
                  <Badge variant={s.status === "New" ? "info" : s.status === "Triaged" ? "purple" : s.status === "Intervened" ? "orange" : s.status === "Monitoring" ? "success" : "neutral"}>
                    {s.status}
                  </Badge>
                )}
              </td>
              <td style={{ padding: "10px 12px", fontSize: 12, color: T.textTertiary }}>{RISK[s.tier].sla}</td>
              <td style={{ padding: "10px 12px", color: T.textTertiary }}>{s.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `${T.s3} ${T.s4}`, borderTop: `1px solid ${T.chromeDivider}`, fontSize: 13, color: T.textSecondary }}>
        <span>Showing 1-{STUDENTS.length} of {STUDENTS.length}</span>
        <div style={{ display: "flex", alignItems: "center", gap: T.s1 }}>
          {["⟨", "1", "⟩"].map((p, i) => (
            <button key={i} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: p === "1" ? `2px solid ${T.brandPrimary}` : "none", background: p === "1" ? T.infoBg : "none", color: p === "1" ? T.brandPrimary : T.textSecondary, borderRadius: T.rSm, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: T.font }}>{p}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: T.s2 }}>
          <span>Records per page</span>
          <PillSelect value="20" />
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SCREEN 3: CASE DETAIL / ADVISOR WORKSPACE
   ═══════════════════════════════════════════════════════════ */
const CaseDetailScreen = ({ student, onBack, onOpenAssist }) => {
  const [interventionTab, setInterventionTab] = useState("criteria");
  const [proPlus, setProPlus] = useState(true);
  if (!student) return null;

  // Resolve matched criteria against CRITERIA definitions
  const matchedCriteria = (student.matched || []).map(m => {
    const c = CRITERIA.find(cr => cr.id === m.id);
    return c ? { ...c, actualValue: m.value } : null;
  }).filter(Boolean);
  const unmatchedCriteria = (student.unmatched || []).map(m => {
    const c = CRITERIA.find(cr => cr.id === m.id);
    return c ? { ...c, actualValue: m.value } : null;
  }).filter(Boolean);
  const isResolved = student.status === "Resolved";
  const slaHours = student.tier === "red" ? 24 : student.tier === "yellow" ? 48 : null;

  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      {/* Breadcrumb bar */}
      <div style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `${T.s3} ${T.s5}`, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}`, fontSize: 13 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: T.s1, color: T.textLink, fontFamily: T.font, fontSize: 13 }}>
          <I n="chevLeft" s={14} c={T.textLink} /> Early Alerts
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
            <I n="sparkle" s={12} c={proPlus ? T.brandTealDark : T.textTertiary} />
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
                  <Badge variant="count" style={{ fontSize: 13, fontWeight: 700 }}>{student.score || 0} pts</Badge>
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
              <I n="sparkle" s={14} c="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.brandTealDark, marginBottom: T.s1 }}>Now Assist — Plain-Language Explanation</div>
              <div style={{ fontSize: 14, color: T.textPrimary, lineHeight: 1.7 }}>
                <strong>{student.name}</strong> matched <strong>{matchedCriteria.length} of 10</strong> institutional risk criteria with a composite score of <strong>{student.score || 0} points</strong> ({RISK[student.tier].label} tier, threshold: {student.tier === "red" ? "6+" : "3–5"}). Key triggers: {matchedCriteria.slice(0, 3).map(c => `${c.id} ${c.name.toLowerCase()} (${c.actualValue})`).join(", ")}. Recommended: initiate outreach and connect with academic support.
              </div>
            </div>
          </div>
          ) : (
          <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.surface1, borderRadius: T.rMd, border: `1px dashed ${T.chromeDivider}` }}>
            <I n="sparkle" s={16} c={T.textTertiary} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textTertiary, marginBottom: T.s1 }}>Plain-language explanation available with Pro+</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>Enable Now Assist to see AI-generated explanations of the matched criteria. Toggle Pro+ above to preview.</div>
            </div>
          </div>
          )}

          {/* Tabs: Matched Criteria / All 10 Criteria / Audit Log */}
          <Card noPad>
            <div style={{ display: "flex", gap: T.s6, borderBottom: `2px solid ${T.chromeDivider}`, padding: `0 ${T.s5}` }}>
              {[
                { id: "criteria", label: `Matched Criteria (${matchedCriteria.length})` },
                { id: "all", label: "All 10 Criteria" },
                { id: "activity", label: "Audit Log" },
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
              {/* TAB: Matched Criteria with composite score */}
              {interventionTab === "criteria" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: T.s3, marginBottom: T.s4, padding: `${T.s3} ${T.s4}`, background: T.surface1, borderRadius: T.rMd }}>
                    <span style={{ fontSize: 13, color: T.textSecondary }}>Composite Score:</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: (student.score || 0) >= 6 ? T.negative : "#a06c00" }}>{matchedCriteria.map(c => c.weight).join(" + ")} = {student.score || 0} pts</span>
                    <span style={{ fontSize: 13, color: T.textTertiary }}>→ {RISK[student.tier].label} (threshold: {student.tier === "red" ? "6+" : "3–5"})</span>
                  </div>
                  {matchedCriteria.map((c, i) => (
                    <div key={c.id} style={{ display: "flex", gap: T.s4, padding: `${T.s4} 0`, borderBottom: i < matchedCriteria.length - 1 ? `1px solid ${T.chromeDividerSubtle}` : "none" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                        <div style={{ width: 12, height: 12, borderRadius: "50%", background: c.weight === 3 ? T.negative : c.weight === 2 ? T.warning : T.brandPrimary, border: `2px solid ${T.white}`, boxShadow: T.elevLow, flexShrink: 0 }} />
                        {i < matchedCriteria.length - 1 && <div style={{ width: 2, flex: 1, background: T.chromeDivider, marginTop: 4 }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: T.s2, marginBottom: T.s1 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: T.textPrimary }}>{c.id}: {c.name}</span>
                          <Badge variant={c.weight === 3 ? "critical" : c.weight === 2 ? "warning" : "neutral"} style={{ fontSize: 10 }}>{c.wLabel} ({c.weight})</Badge>
                          <Badge variant={c.source === "Neo4j" ? "purple" : "info"} style={{ fontSize: 10 }}>{c.source}</Badge>
                        </div>
                        <div style={{ fontSize: 13, color: T.textSecondary }}>Value: <strong>{c.actualValue}</strong> · Threshold: {c.threshold}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: All 10 Criteria — full table */}
              {interventionTab === "all" && (
                <div style={{ border: `1px solid ${T.chromeDivider}`, borderRadius: T.rSm, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead><tr>{["ID", "Criterion", "Value", "Threshold", "Weight", "Source", "Match"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}`, color: T.textSecondary }}>{h}</th>
                    ))}</tr></thead>
                    <tbody>
                      {[...matchedCriteria.map(c => ({ ...c, met: true })), ...unmatchedCriteria.map(c => ({ ...c, met: false }))].sort((a, b) => a.id.localeCompare(b.id)).map(c => (
                        <tr key={c.id} style={{ borderBottom: `1px solid ${T.chromeDividerSubtle}`, background: c.met ? T.negativeBg + "33" : "transparent" }}>
                          <td style={{ padding: "8px 10px", fontWeight: 700, color: T.brandPrimary }}>{c.id}</td>
                          <td style={{ padding: "8px 10px" }}>{c.name}</td>
                          <td style={{ padding: "8px 10px", fontWeight: 600, color: c.met ? T.negative : T.positive }}>{c.actualValue}</td>
                          <td style={{ padding: "8px 10px", color: T.textTertiary }}>{c.threshold}</td>
                          <td style={{ padding: "8px 10px" }}><Badge variant={c.weight === 3 ? "critical" : c.weight === 2 ? "warning" : "neutral"} style={{ fontSize: 10 }}>{c.wLabel} ({c.weight})</Badge></td>
                          <td style={{ padding: "8px 10px" }}><Badge variant={c.source === "Neo4j" ? "purple" : "info"} style={{ fontSize: 10 }}>{c.source}</Badge></td>
                          <td style={{ padding: "8px 10px" }}>{c.met ? <span style={{ color: T.negative, fontWeight: 700 }}>✓ Matched</span> : <span style={{ color: T.positive }}>— Clear</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: Audit Log */}
              {interventionTab === "activity" && (
                <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
                  {[
                    ...(isResolved ? [
                      { action: `Case resolved — Outcome: ${student.outcome}`, time: `${student.resolvedDate} at 2:30 PM`, icon: "check", highlight: true },
                      { action: "Scoring engine flagged for closure review", time: `${student.resolvedDate} at 2:30 PM`, icon: "shield" },
                    ] : []),
                    ...(student.prevTier && student.reEvalDate ? [
                      { action: `Risk tier upgraded: ${RISK[student.prevTier]?.label || "Watch"} → ${RISK[student.tier].label} (re-scoring run)`, time: `${student.reEvalDate} at 6:00 AM`, icon: "arrowUp", highlight: true },
                    ] : []),
                    ...(student.status === "Intervened" || student.status === "Monitoring" ? [
                      { action: `Intervention logged by ${student.advisor}`, time: `${student.created} at 3:18 PM`, icon: "check" },
                    ] : []),
                    { action: "Case created by scoring engine", time: `${student.created} at 6:02 AM`, icon: "shield" },
                    { action: `Urgent notification sent to ${student.advisor}`, time: `${student.created} at 6:02 AM`, icon: "bell" },
                    { action: `Notification sent to ${student.faculty} (${student.course})`, time: `${student.created} at 6:02 AM`, icon: "academic" },
                    { action: `${matchedCriteria.length} matched criteria attached (score: ${student.score || 0} pts)`, time: `${student.created} at 6:01 AM`, icon: "flag" },
                    { action: "Scoring engine evaluated against Decision Table", time: `${student.created} at 6:00 AM`, icon: "table" },
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s2} 0`, borderBottom: `1px solid ${T.chromeDividerSubtle}` }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.highlight ? T.warningBg : T.surface1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I n={a.icon} s={14} c={a.highlight ? "#a06c00" : T.textTertiary} />
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
              { label: "Case", value: student.id },
              { label: "Status", value: student.status, badge: true },
              ...(student.outcome ? [{ label: "Outcome", value: student.outcome, badge: true, outcomeBadge: true }] : []),
              { label: "Risk Score", value: `${student.score || 0} points`, color: (student.score || 0) >= 6 ? T.negative : "#a06c00" },
              { label: "Criteria Matched", value: `${matchedCriteria.length} / 10` },
              { label: "Created", value: student.created },
              ...(student.resolvedDate ? [{ label: "Resolved", value: student.resolvedDate }] : []),
              { label: "SLA", value: isResolved ? "Met" : `${slaHours}h window`, color: isResolved ? T.positive : T.warning },
              { label: "Advisor", value: student.advisor },
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
              {student.status !== "Resolved" && <I n="sparkle" s={14} c={T.brandTealDark} />}
            </div>
            {student.status === "Resolved" ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: T.s2, padding: `${T.s3} ${T.s4}`, background: student.outcome === "Improved" ? T.positiveBg : T.warningBg, borderRadius: T.rMd, marginBottom: T.s3 }}>
                  <I n={student.outcome === "Improved" ? "check" : "flag"} s={16} c={student.outcome === "Improved" ? T.positive : "#a06c00"} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: student.outcome === "Improved" ? T.positive : "#a06c00" }}>Outcome: {student.outcome}</div>
                    <div style={{ fontSize: 12, color: T.textSecondary }}>Resolved on {student.resolvedDate}</div>
                  </div>
                </div>
                {student.outcome === "Improved" && (
                  <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: 1.6 }}>
                    Student returned to stable academic standing after intervention. Risk score improved and criteria matches reduced. Case closed after sustained improvement over monitoring period.
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
                <Btn variant="primary" icon="mail" style={{ justifyContent: "flex-start", width: "100%", height: 42, fontSize: 15 }}>Initiate Outreach</Btn>
                <div style={{ fontSize: 11, color: T.textTertiary, marginBottom: T.s2, lineHeight: 1.5 }}>Generates draft message, logs the action, creates follow-up task, and notifies faculty — one click.</div>
                <Btn variant="outline" icon="calendar" style={{ justifyContent: "flex-start", width: "100%" }}>Schedule Meeting</Btn>
                <Btn variant="outline" icon="academic" style={{ justifyContent: "flex-start", width: "100%" }}>Assign Resource</Btn>
                <Btn variant="danger" icon="users" style={{ justifyContent: "flex-start", width: "100%" }}>Escalate</Btn>
              </div>
            )}
          </Card>

          {/* Scoring Summary */}
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s4 }}>Scoring Summary</div>
            <div style={{ display: "flex", gap: T.s4, marginBottom: T.s4 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: (student.score||0) >= 6 ? T.negative : "#a06c00" }}>{student.score || 0}</div>
                <div style={{ fontSize: 11, color: T.textTertiary }}>Risk Score (pts)</div>
              </div>
              <div style={{ width: 1, background: T.chromeDivider }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: T.textPrimary }}>{(student.matched||[]).length}</div>
                <div style={{ fontSize: 11, color: T.textTertiary }}>Criteria Matched</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: T.textTertiary }}>Green: 0–2 pts · Yellow: 3–5 pts · Red: 6+ pts</div>
          </Card>

          {/* Communication */}
          <Card>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: T.s3 }}>Communication</div>
            <div style={{ display: "flex", flexDirection: "column", gap: T.s2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: T.s2, fontSize: 13 }}>
                <I n="mail" s={14} c={T.textTertiary} />
                <span style={{ color: T.textSecondary }}>{student.name.split(" ")[0].toLowerCase()}.{student.name.split(" ")[1]?.toLowerCase()}@university.edu</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: T.s2, fontSize: 13 }}>
                <I n="phone" s={14} c={T.textTertiary} />
                <span style={{ color: T.textSecondary }}>(555) 012-3456</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SCREEN 4: STUDENTS (stub)
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   SCREEN 5: ADVISORS (stub)
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   SCREEN 6: RISK CONFIG (stub)
   ═══════════════════════════════════════════════════════════ */
const DecisionTableScreen = () => (
  <div style={{ flex: 1, overflow: "auto", padding: T.s6 }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: T.s5 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: T.s2 }}>Decision Table — Risk Criteria</h2>
        <p style={{ color: T.textSecondary, fontSize: 14, margin: 0 }}>Institution-owned rules that govern when a student gets flagged. These criteria are deterministic — AI does not decide alerts.</p>
      </div>
      <div style={{ display: "flex", gap: T.s2 }}><Btn variant="primary" icon="plus">Add Criterion</Btn><Btn variant="secondary" icon="externalLink">Export</Btn></div>
    </div>
    {/* Tier legend */}
    <div style={{ display: "flex", gap: T.s4, marginBottom: T.s5 }}>
      {[{tier:"Green",range:"0–2 pts",desc:"No alert",color:T.positive,bg:T.positiveBg},{tier:"Yellow",range:"3–5 pts",desc:"Moderate risk · 48h SLA",color:"#a06c00",bg:T.warningBg},{tier:"Red",range:"6+ pts",desc:"Urgent risk · 24h SLA",color:T.negative,bg:T.negativeBg}].map(t=>(
        <div key={t.tier} style={{ flex: 1, padding: `${T.s3} ${T.s4}`, background: t.bg, borderRadius: T.rMd, borderLeft: `4px solid ${t.color}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.tier} · {t.range}</div>
          <div style={{ fontSize: 12, color: T.textSecondary }}>{t.desc}</div>
        </div>
      ))}
    </div>
    {/* Criteria table */}
    <Card noPad>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead><tr>{["ID","Criterion","Signal","Threshold","Weight","Source","Active"].map(h=>(<th key={h} style={{ textAlign: "left", padding: "12px 14px", fontWeight: 600, fontSize: 12, color: T.textSecondary, background: T.surface1, borderBottom: `1px solid ${T.chromeDivider}` }}>{h}</th>))}</tr></thead>
        <tbody>
          {CRITERIA.map(c=>(
            <tr key={c.id} style={{ borderBottom: `1px solid ${T.chromeDividerSubtle}` }}>
              <td style={{ padding: "12px 14px", fontWeight: 700, color: T.brandPrimary }}>{c.id}</td>
              <td style={{ padding: "12px 14px", fontWeight: 500 }}>{c.name}</td>
              <td style={{ padding: "12px 14px", color: T.textSecondary }}>{c.signal}</td>
              <td style={{ padding: "12px 14px" }}><input style={{ width: 100, padding: `${T.s1} ${T.s2}`, border: `1px solid ${T.chromeDivider}`, borderRadius: T.rSm, fontSize: 13, fontFamily: T.font }} defaultValue={c.threshold}/></td>
              <td style={{ padding: "12px 14px" }}><Badge variant={c.weight===3?"critical":c.weight===2?"warning":"neutral"}>{c.wLabel} ({c.weight})</Badge></td>
              <td style={{ padding: "12px 14px" }}><Badge variant={c.source==="Neo4j"?"purple":"info"} style={{ fontSize: 10 }}>{c.source}</Badge></td>
              <td style={{ padding: "12px 14px" }}><div style={{ width: 36, height: 20, borderRadius: 10, background: T.brandTealDark, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: 2, cursor: "pointer" }}><div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", boxShadow: T.elevLow }}/></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    <div style={{ marginTop: T.s4, display: "flex", gap: T.s2 }}><Btn variant="primary">Save Changes</Btn><Btn variant="secondary">Reset to Defaults</Btn></div>
    <div style={{ display: "flex", alignItems: "flex-start", gap: T.s3, padding: `${T.s3} ${T.s4}`, background: T.infoBg, borderRadius: T.rMd, fontSize: 13, lineHeight: 1.5, marginTop: T.s5 }}>
      <I n="shield" s={16} c={T.brandPrimary}/>
      <span><strong>Governance:</strong> These rules are institution-owned. A college administrator can view and adjust any threshold. The scoring engine applies these deterministically — AI explains results but does not determine when alerts fire.</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SCREEN 7: ANALYTICS (stub)
   ═══════════════════════════════════════════════════════════ */
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
              <I n={tr.icon} s={14} c={tr.icon === "arrowUp" ? T.negative : T.positive} />
              <Badge variant={tr.to === "Red" ? "critical" : tr.to === "Yellow" ? "warning" : "success"} style={{ fontSize: 11, minWidth: 50, justifyContent: "center" }}>{tr.to}</Badge>
              <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, marginLeft: "auto" }}>{tr.count} students</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   SCREEN 8: FACULTY VIEW
   ═══════════════════════════════════════════════════════════ */
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
        <I n="academic" s={16} c={T.brandPrimary} />
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
                  <I n="academic" s={14} c={T.textTertiary} />
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

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function IntelliCampusEarlyAlert() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [assistOpen, setAssistOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "alerts", label: "Early Alerts" },
    { id: "students", label: "Students" },
    { id: "faculty", label: "Faculty" },
    { id: "advisors", label: "Advisors" },
    { id: "criteria", label: "Decision Table" },
    { id: "analytics", label: "Analytics" },
  ];

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSelectedCase(null);
    setAssistOpen(false);
  };

  const handleSelectCase = (student) => {
    setSelectedCase(student);
  };

  const handleBackToList = () => {
    setSelectedCase(null);
    setAssistOpen(false);
  };

  return (
    <div style={{
      fontFamily: T.font, color: T.textPrimary, background: T.surface1,
      width: "100%", height: "100vh", display: "flex", flexDirection: "column",
      overflow: "hidden", fontSize: 14, lineHeight: 1.5,
      WebkitFontSmoothing: "antialiased",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap" rel="stylesheet" />

      <SNHeader />
      <WorkspaceTabBar tabs={tabs} active={activeTab} onChange={handleTabChange} />

      {/* Screens */}
      {activeTab === "dashboard" && (
        <DashboardScreen onViewAlerts={() => handleTabChange("alerts")} />
      )}

      {activeTab === "alerts" && !selectedCase && (
        <AlertListScreen onSelectCase={handleSelectCase} />
      )}

      {activeTab === "alerts" && selectedCase && (
        <CaseDetailScreen
          student={selectedCase}
          onBack={handleBackToList}
          onOpenAssist={() => setAssistOpen(true)}
        />
      )}

      {activeTab === "students" && <StudentsStub />}
      {activeTab === "faculty" && <FacultyView onSelectCase={(s) => { setActiveTab("alerts"); setSelectedCase(s); }} />}
      {activeTab === "advisors" && <AdvisorsStub />}
      {activeTab === "criteria" && <DecisionTableScreen />}
      {activeTab === "analytics" && <AnalyticsStub />}

      {/* Now Assist Drawer (overlays everything) */}
      <NowAssistDrawer student={selectedCase} open={assistOpen} onClose={() => setAssistOpen(false)} />

      {/* Backdrop when drawer is open */}
      {assistOpen && (
        <div onClick={() => setAssistOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 420, bottom: 0,
          background: "rgba(0,0,0,.15)", zIndex: 199,
        }} />
      )}

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        a { color: ${T.textLink}; text-decoration: none; }
        a:hover { color: ${T.textLinkHover}; text-decoration: underline; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.chromeDivider}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${T.textTertiary}; }
        input::placeholder { color: ${T.textTertiary}; }
        button:hover { opacity: .88; }
        tr:hover { background: ${T.surface1}; }
      `}</style>
    </div>
  );
}
