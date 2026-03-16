import T from "../tokens";
import Icon from "./Icon";
import { Badge } from "./Card";

export const RISK = {
  red: { label: "High Risk", color: T.negative, bg: T.negativeBg, badge: "critical" },
  yellow: { label: "Watch", color: "#a06c00", bg: T.warningBg, badge: "warning" },
  green: { label: "On Track", color: T.positive, bg: T.positiveBg, badge: "success" },
};

const RiskBadge = ({ tier, large }) => (
  <Badge variant={RISK[tier].badge} style={large ? { fontSize: 13, padding: "4px 14px" } : {}}>
    {large && <Icon n="flag" s={12} c={RISK[tier].color === "#a06c00" ? "#a06c00" : RISK[tier].color} />}
    {RISK[tier].label}
  </Badge>
);

export default RiskBadge;
