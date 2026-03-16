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

export default DecoPattern;
