import { formatDate } from "../lib/formatDate";

export default function ChangelogPanel({ snapshots, selectedDate, onSelect, onShowChanges }) {
  return (
    <div style={{ marginTop: 24, padding: "16px 0", borderTop: "1px solid #E8E8E8" }}>
      <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: "#999", marginBottom: 10 }}>
        Snapshot History
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[...snapshots].reverse().map((s, i) => {
          const isActive = s.date === selectedDate;
          const snapshotIndex = snapshots.findIndex((snap) => snap.date === s.date);
          const hasPrev = snapshotIndex > 0;

          return (
            <button
              key={s.date}
              onClick={() => {
                onSelect(s.date);
                if (hasPrev && onShowChanges) {
                  onShowChanges(s.date);
                }
              }}
              style={{
                padding: "6px 12px", borderRadius: 8, fontSize: 10.5,
                border: isActive ? "1.5px solid #FE3058" : "1px solid #E0E0E0",
                background: isActive ? "#FFF6F4" : "#fff",
                color: isActive ? "#FE3058" : "#666",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer", transition: "all .15s",
              }}
            >
              {formatDate(s.date)}
              <span style={{ marginLeft: 6, fontSize: 9, color: isActive ? "#FE3058" : "#BBB" }}>
                {s.label}
              </span>
              {hasPrev && (
                <span style={{ marginLeft: 4, fontSize: 7.5, color: isActive ? "#FE3058" : "#CCC" }}>
                  ⓘ
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
