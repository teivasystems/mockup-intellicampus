import T from "../tokens";

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

export default WorkspaceTabBar;
