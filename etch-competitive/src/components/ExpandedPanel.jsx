const coral = "#FE3058";

export default function ExpandedPanel({ competitor }) {
  const c = competitor;
  return (
    <div style={{
      padding: "12px 14px 12px 44px", background: "#FEFCFD",
      borderBottom: "1px solid #F0F0F0",
      borderLeft: c.hi ? `3px solid ${coral}` : "3px solid transparent",
    }}>
      <div style={{ display: "flex", gap: 28, fontSize: 10.5 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: coral, marginBottom: 5, fontSize: 8.5, letterSpacing: 0.5, textTransform: "uppercase" }}>Gap for etch</div>
          <ul style={{ margin: 0, paddingLeft: 14, listStyle: "none" }}>
            {(c.gap || []).map((g, gi) => (
              <li key={gi} style={{ color: "#555", lineHeight: 1.7, fontSize: 10.5, position: "relative", paddingLeft: 2 }}>
                <span style={{ position: "absolute", left: -10, color: coral, fontSize: 7, top: 2 }}>●</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: "#BBB", marginBottom: 5, fontSize: 8.5, letterSpacing: 0.5, textTransform: "uppercase" }}>Notes</div>
          <ul style={{ margin: 0, paddingLeft: 14, listStyle: "none" }}>
            {(c.extra || []).map((n, ni) => (
              <li key={ni} style={{ color: "#777", lineHeight: 1.7, fontSize: 10.5, position: "relative", paddingLeft: 2 }}>
                <span style={{ position: "absolute", left: -10, color: "#CCC", fontSize: 7, top: 2 }}>●</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
        {c.url && (
          <a href={c.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
            style={{ fontSize: 10.5, color: coral, textDecoration: "none", fontWeight: 600, alignSelf: "flex-start", whiteSpace: "nowrap", marginTop: 16 }}>
            Visit ↗
          </a>
        )}
      </div>
    </div>
  );
}
