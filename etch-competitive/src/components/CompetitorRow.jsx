import CLLogo from "./CLLogo";
import CategoryBadge from "./CategoryBadge";
import DeltaIndicator from "./DeltaIndicator";
import ExpandedPanel from "./ExpandedPanel";

const coral = "#FE3058";
const W = { name: 160, cat: 100, dl: 95, val: 118, ig: 55, tt: 55 };

export default function CompetitorRow({ competitor, delta, isExpanded, onToggle }) {
  const c = competitor;
  const open = isExpanded;

  return (
    <div>
      <div
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", padding: "9px 14px", gap: 8,
          borderBottom: "1px solid #F0F0F0", cursor: "pointer",
          background: open ? "#FEFCFD" : "transparent",
          borderLeft: c.hi ? `3px solid ${coral}` : "3px solid transparent",
          transition: "background .12s",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = "#FAFAFA"; }}
        onMouseLeave={e => { e.currentTarget.style.background = open ? "#FEFCFD" : "transparent"; }}
      >
        {/* Name */}
        <div style={{ width: W.name, display: "flex", alignItems: "center", gap: 7 }}>
          <CLLogo c={c} size={24} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 11.5, color: "#111", display: "flex", alignItems: "center", gap: 4 }}>
              {c.name}
              {c.hi && <div style={{ width: 5, height: 5, borderRadius: 3, background: coral }} />}
            </div>
            <div style={{ fontSize: 9, color: "#AAA" }}>{c.pos}</div>
          </div>
        </div>

        {/* Category */}
        <div style={{ width: W.cat }}>
          <CategoryBadge category={c.cat} />
        </div>

        {/* Downloads */}
        <div style={{ width: W.dl }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#333", display: "flex", alignItems: "center" }}>
            {c.downloads}
            <DeltaIndicator delta={delta?.downloads} />
          </div>
          <div style={{ fontSize: 7.5, color: "#C0C0C0", marginTop: 1, lineHeight: 1.2 }}>{c.downloadNote}</div>
        </div>

        {/* Valuation */}
        <div style={{ width: W.val }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: c.hi ? coral : "#555", display: "flex", alignItems: "center" }}>
            {c.valuation}
            <DeltaIndicator delta={delta?.valuation} />
          </div>
          <div style={{ fontSize: 7.5, color: "#C0C0C0", marginTop: 1, lineHeight: 1.2 }}>{c.valNote}</div>
        </div>

        {/* Instagram */}
        <div style={{ width: W.ig, fontSize: 10, display: "flex", alignItems: "center" }}>
          {c.ig && c.igUrl ? (
            <>
              <a href={c.igUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                style={{ color: "#777", textDecoration: "none", borderBottom: "1px dashed #CCC" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#E1306C"; e.currentTarget.style.borderBottomColor = "#E1306C"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#777"; e.currentTarget.style.borderBottomColor = "#CCC"; }}>
                {c.ig}
              </a>
              <DeltaIndicator delta={delta?.ig} />
            </>
          ) : <span style={{ color: "#DDD" }}>—</span>}
        </div>

        {/* TikTok */}
        <div style={{ width: W.tt, fontSize: 10, display: "flex", alignItems: "center" }}>
          {c.tiktok && c.tiktok !== "—" && c.tiktokUrl ? (
            <>
              <a href={c.tiktokUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                style={{ color: "#777", textDecoration: "none", borderBottom: "1px dashed #CCC" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#010101"; e.currentTarget.style.borderBottomColor = "#010101"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#777"; e.currentTarget.style.borderBottomColor = "#CCC"; }}>
                {c.tiktok}
              </a>
              <DeltaIndicator delta={delta?.tiktok} />
            </>
          ) : <span style={{ color: "#DDD" }}>—</span>}
        </div>

        {/* Description */}
        <div style={{ flex: 1, fontSize: 10, color: "#666", lineHeight: 1.4 }}>{c.does}</div>

        {/* Expand arrow */}
        <div style={{ width: 14, textAlign: "center", fontSize: 8, color: "#CCC" }}>{open ? "▲" : "▼"}</div>
      </div>

      {open && <ExpandedPanel competitor={c} />}
    </div>
  );
}
