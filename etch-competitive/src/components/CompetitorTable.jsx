import { useState } from "react";
import { IGIcon, TikTokIcon } from "./SocialIcon";
import CompetitorRow from "./CompetitorRow";

const coral = "#FE3058";
const W = { name: 160, cat: 100, dl: 95, val: 118, ig: 55, tt: 55 };
const clHdr = { fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#999" };

export default function CompetitorTable({ competitors, deltas }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div>
      {/* Column Headers */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 14px 7px", borderBottom: "2px solid #E0E0E0", gap: 8 }}>
        <div style={{ width: W.name, ...clHdr }}>Competitor</div>
        <div style={{ width: W.cat, ...clHdr }}>Category</div>
        <div style={{ width: W.dl, ...clHdr }}>Downloads</div>
        <div style={{ width: W.val, ...clHdr }}>Valuation</div>
        <div style={{ width: W.ig, ...clHdr, display: "flex", alignItems: "center", gap: 3 }}><IGIcon size={8} />IG</div>
        <div style={{ width: W.tt, ...clHdr, display: "flex", alignItems: "center", gap: 3 }}><TikTokIcon size={8} />TT</div>
        <div style={{ flex: 1, ...clHdr }}>What they do</div>
      </div>

      {/* Rows */}
      {competitors.map((c) => (
        <CompetitorRow
          key={c.id}
          competitor={c}
          delta={deltas[c.id] || null}
          isExpanded={expandedId === c.id}
          onToggle={() => setExpandedId(expandedId === c.id ? null : c.id)}
        />
      ))}

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: 3, background: coral }} />
          <span style={{ fontSize: 9.5, color: "#AAA" }}>Closest direct competitors</span>
        </div>
        <span style={{ color: "#DDD" }}>·</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#16A34A", fontSize: 8, fontWeight: 700 }}>▲</span>
          <span style={{ fontSize: 9.5, color: "#AAA" }}>Metric increased</span>
        </div>
        <span style={{ color: "#DDD" }}>·</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: "#DC2626", fontSize: 8, fontWeight: 700 }}>▼</span>
          <span style={{ fontSize: 9.5, color: "#AAA" }}>Metric decreased</span>
        </div>
        <span style={{ color: "#DDD" }}>·</span>
        <span style={{ fontSize: 9.5, color: "#CCC" }}>Click rows to expand · Hover arrows for deltas · Social links open profiles</span>
        <span style={{ fontSize: 9.5, color: "#CCC", marginLeft: "auto" }}>Sources: Web search, Sensor Tower, Crunchbase, public filings</span>
      </div>
    </div>
  );
}
