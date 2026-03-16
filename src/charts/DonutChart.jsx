import T from "../tokens";

const DonutChart = () => {
  const total = 2847;
  const red = 38, yellow = 124, green = 2685;
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
        <text x={cx} y={cy - 8} textAnchor="middle" fill={T.textPrimary} fontSize="32" fontWeight="300" fontFamily={T.font}>2,847</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={T.textTertiary} fontSize="12" fontFamily={T.font}>Total Monitored</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: T.s3 }}>
        {[
          { label: "High Risk (Red)", value: red, pct: ((red/total)*100).toFixed(1), color: T.negative },
          { label: "Watch (Yellow)", value: yellow, pct: ((yellow/total)*100).toFixed(1), color: T.warning },
          { label: "On Track (Green)", value: green, pct: ((green/total)*100).toFixed(1), color: T.positive },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: T.s3 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{item.label}</div>
              <div style={{ fontSize: 12, color: T.textTertiary }}>{item.value} students ({item.pct}%)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
