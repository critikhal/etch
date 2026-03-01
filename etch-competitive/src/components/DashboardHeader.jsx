import { formatDate } from "../lib/formatDate";

export default function DashboardHeader({ currentDate, compareDate, summary }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <img src="/logo-mark.svg" alt="etch" width={28} height={28} style={{ borderRadius: 8 }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0, fontFamily: "'Baloo 2', cursive" }}>
            Competitive Landscape
          </h1>
        </div>
        <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
          Live tracker — forked from etch Phase 1 strategic audit
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 16, background: "#fff", border: "1px solid #E8E8E8" }}>
          <div style={{ width: 5, height: 5, borderRadius: 3, background: "#22C55E" }} />
          <span style={{ fontSize: 10, color: "#888", fontWeight: 500 }}>Updated {formatDate(currentDate)}</span>
        </div>
        {summary && (summary.increased > 0 || summary.decreased > 0 || summary.changed > 0) && (
          <div style={{ fontSize: 9, color: "#888", marginTop: 4 }}>
            {summary.increased > 0 && <span style={{ color: "#16A34A" }}>{summary.increased} up</span>}
            {summary.increased > 0 && (summary.decreased > 0 || summary.changed > 0) && <span> · </span>}
            {summary.decreased > 0 && <span style={{ color: "#DC2626" }}>{summary.decreased} down</span>}
            {summary.decreased > 0 && summary.changed > 0 && <span> · </span>}
            {summary.changed > 0 && <span style={{ color: "#3B82F6" }}>{summary.changed} updated</span>}
            <span style={{ color: "#CCC" }}> since {formatDate(compareDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
