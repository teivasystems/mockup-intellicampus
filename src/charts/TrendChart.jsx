import T from "../tokens";
import { TREND_DATA } from "../data/demo-data";

const TrendChart = () => {
  const w = 500, h = 140, pad = { t: 10, r: 20, b: 30, l: 40 };
  const pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
  const maxVal = 140;
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
      {[0, 35, 70, 105, 140].map(v => (
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
      <circle cx={toX(TREND_DATA.length - 1)} cy={toY(38)} r="4" fill={T.negative} />
      <circle cx={toX(TREND_DATA.length - 1)} cy={toY(124)} r="4" fill={T.warning} />
    </svg>
  );
};

export default TrendChart;
