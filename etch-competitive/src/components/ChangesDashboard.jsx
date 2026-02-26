import { computeDeltas, formatDelta } from "../lib/deltas";
import { formatDate } from "../lib/formatDate";
import CLLogo from "./CLLogo";
import CategoryBadge from "./CategoryBadge";

const coral = "#FE3058";

const FIELD_LABELS = {
  ig: "Instagram",
  tiktok: "TikTok",
  downloads: "Downloads",
  valuation: "Valuation",
  downloadNote: "Download Note",
  valNote: "Val. Note",
  does: "Description",
};

const SIGNAL_ORDER = { high: 0, medium: 1, low: 2 };
const SIGNAL_COLORS = {
  high: { dot: "#DC2626", bg: "#FEF2F2", text: "#991B1B" },
  medium: { dot: "#D97706", bg: "#FFFBEB", text: "#92400E" },
  low: { dot: "#9CA3AF", bg: "#F9FAFB", text: "#6B7280" },
};

export default function ChangesDashboard({ snapshots, targetDate, onClose }) {
  const targetIndex = snapshots.findIndex((s) => s.date === targetDate);
  if (targetIndex <= 0) return null;

  const current = snapshots[targetIndex];
  const previous = snapshots[targetIndex - 1];
  const deltas = computeDeltas(previous.data, current.data);

  const dataMap = {};
  for (const c of current.data) dataMap[c.id] = c;
  const prevMap = {};
  for (const c of previous.data) prevMap[c.id] = c;

  // Build change metadata lookup
  const changeMeta = {};
  if (current.changes) {
    for (const ch of current.changes) changeMeta[ch.id] = ch;
  }

  // Build cards: one per competitor with changes
  const cards = [];
  for (const [id, fields] of Object.entries(deltas)) {
    const competitor = dataMap[id];
    if (!competitor) continue;

    const meta = changeMeta[id] || {};
    const signal = meta.signal || "low";

    // Collect metric rows
    const metrics = [];
    if (fields._new) {
      metrics.push({ label: "Status", prev: "—", curr: "New entry", direction: "new" });
    } else {
      for (const [field, d] of Object.entries(fields)) {
        metrics.push({
          label: FIELD_LABELS[field] || field,
          prev: d.prev || "—",
          curr: d.curr || "—",
          direction: d.direction,
          delta: d.delta,
        });
      }
    }

    cards.push({
      id,
      competitor,
      signal,
      context: meta.context || null,
      sources: meta.sources || [],
      metrics,
    });
  }

  // Sort by signal significance
  cards.sort((a, b) => (SIGNAL_ORDER[a.signal] ?? 3) - (SIGNAL_ORDER[b.signal] ?? 3));

  const totalChanges = cards.reduce((sum, c) => sum + c.metrics.length, 0);

  if (cards.length === 0) return null;

  return (
    <div style={{
      marginTop: 16, background: "#fff", border: "1px solid #E8E8E8",
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px", borderBottom: "1px solid #F0F0F0", background: "#FAFBFC",
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>
            Competitive Intelligence
          </div>
          <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>
            {formatDate(previous.date)} → {formatDate(current.date)} · {cards.length} competitor{cards.length !== 1 ? "s" : ""} · {totalChanges} change{totalChanges !== 1 ? "s" : ""}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "1px solid #E0E0E0", borderRadius: 6,
            padding: "4px 10px", fontSize: 10, color: "#999", cursor: "pointer",
          }}
        >
          Close ✕
        </button>
      </div>

      {/* Cards */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {cards.map((card) => (
          <CompetitorCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

function CompetitorCard({ card }) {
  const { competitor, signal, metrics, context, sources } = card;
  const sc = SIGNAL_COLORS[signal] || SIGNAL_COLORS.low;

  return (
    <div style={{
      border: "1px solid #E8E8E8", borderRadius: 10, overflow: "hidden",
      background: "#fff",
    }}>
      {/* Card header: signal + logo + name + category */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 14px", borderBottom: "1px solid #F0F0F0", background: "#FAFBFC",
      }}>
        <SignalBadge signal={signal} />
        <CLLogo c={competitor} size={22} />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#111", flex: 1 }}>
          {competitor.name}
        </span>
        <CategoryBadge category={competitor.cat} />
      </div>

      {/* Metrics */}
      <div style={{ padding: "8px 14px 4px" }}>
        {metrics.map((m, i) => (
          <MetricRow key={i} metric={m} />
        ))}
      </div>

      {/* Context + Sources */}
      {(context || sources.length > 0) && (
        <div style={{ padding: "4px 14px 10px" }}>
          {context && (
            <p style={{
              fontSize: 10, color: "#555", lineHeight: 1.5,
              margin: "4px 0 6px", padding: 0,
            }}>
              {context}
            </p>
          )}
          {sources.length > 0 && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 9.5, color: coral, textDecoration: "none",
                    borderBottom: `1px dashed ${coral}`,
                  }}
                >
                  {src.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MetricRow({ metric }) {
  const { label, prev, curr, direction, delta } = metric;
  return (
    <div style={{
      display: "flex", alignItems: "baseline", gap: 8,
      padding: "3px 0", fontSize: 10.5,
    }}>
      <span style={{ width: 90, flexShrink: 0, color: "#888", fontSize: 10 }}>
        {label}
      </span>
      <span style={{ color: "#AAA", fontFamily: "monospace", fontSize: 10 }}>
        {truncate(prev, 30)}
      </span>
      <span style={{ color: "#CCC", fontSize: 10 }}>→</span>
      <span style={{ fontWeight: 600, fontFamily: "monospace", fontSize: 10, color: "#333" }}>
        {truncate(curr, 30)}
      </span>
      <span style={{ marginLeft: "auto" }}>
        <DeltaBadge direction={direction} delta={delta} />
      </span>
    </div>
  );
}

function SignalBadge({ signal }) {
  const sc = SIGNAL_COLORS[signal] || SIGNAL_COLORS.low;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 7px", borderRadius: 4,
      fontSize: 8.5, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 0.5,
      background: sc.bg, color: sc.text,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: sc.dot, display: "inline-block",
      }} />
      {signal}
    </span>
  );
}

function DeltaBadge({ direction, delta }) {
  if (direction === "up") {
    return (
      <span style={{ color: "#16A34A", fontWeight: 700, fontSize: 10 }}>
        ▲ {delta != null ? formatDelta(delta) : ""}
      </span>
    );
  }
  if (direction === "down") {
    return (
      <span style={{ color: "#DC2626", fontWeight: 700, fontSize: 10 }}>
        ▼ {delta != null ? formatDelta(Math.abs(delta)) : ""}
      </span>
    );
  }
  if (direction === "new") {
    return <span style={{ color: "#3B82F6", fontWeight: 600, fontSize: 9, background: "#EFF6FF", padding: "2px 6px", borderRadius: 4 }}>NEW</span>;
  }
  return <span style={{ color: "#3B82F6", fontWeight: 600, fontSize: 9, background: "#EFF6FF", padding: "2px 6px", borderRadius: 4 }}>UPDATED</span>;
}

function truncate(str, max) {
  if (!str) return "—";
  return str.length > max ? str.slice(0, max) + "…" : str;
}
