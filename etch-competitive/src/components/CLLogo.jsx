import { useState } from "react";

const brandColors = {
  Roamy: "#6366F1", AllTrails: "#2D6A4F", Swarm: "#FA4778", TikTok: "#010101",
  Mapstr: "#FF6B35", Wanderlog: "#0EA5E9", "Google Maps": "#4285F4",
  Instagram: "#E1306C", TripAdvisor: "#00AF87", Wafy: "#8B5CF6",
  Jahez: "#EF4444", "Michelin Guide": "#CC0000", Places: "#1A1A1A",
  Corner: "#FF5733", "Time to Momo": "#F97316",
};

// Local logo overrides for companies where Clearbit/Google don't have the right icon
const localLogo = {
  "jahez.net": "/logos/jahez.jpg",
};

// Override domains for Clearbit lookup when the data domain doesn't match the brand
const logoDomain = {
  "foursquare.com": "swarmapp.com",
};

export default function CLLogo({ c, size = 24 }) {
  // 0 = local or clearbit, 1 = google favicon, 2 = letter fallback
  const [stage, setStage] = useState(0);
  const col = brandColors[c.name] || "#888";
  const s = { width: size, height: size, borderRadius: size * 0.22, flexShrink: 0 };

  if (stage === 2) {
    return (
      <div style={{ ...s, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.38, fontWeight: 700, backgroundColor: col }}>
        {c.name.charAt(0)}
      </div>
    );
  }

  const domain = logoDomain[c.domain] || c.domain;

  let src;
  if (stage === 0 && localLogo[c.domain]) {
    src = localLogo[c.domain];
  } else if (stage === 0) {
    src = `https://logo.clearbit.com/${domain}?size=128`;
  } else {
    src = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setStage((prev) => prev + 1)}
      style={{ ...s, objectFit: "contain", background: "#fff", border: "1px solid #eee" }}
    />
  );
}
