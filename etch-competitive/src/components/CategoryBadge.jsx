const catColors = {
  Travel: { bg: "#EFF6FF", text: "#2563EB" },
  "Health & Fitness": { bg: "#ECFDF5", text: "#059669" },
  "Social Networking": { bg: "#F5F3FF", text: "#7C3AED" },
  Navigation: { bg: "#EFF6FF", text: "#3B82F6" },
  "Food & Drink": { bg: "#FEF2F2", text: "#DC2626" },
};

export default function CategoryBadge({ category }) {
  const cc = catColors[category] || { bg: "#F5F5F5", text: "#888" };
  return (
    <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 8.5, fontWeight: 600, background: cc.bg, color: cc.text }}>
      {category}
    </span>
  );
}
