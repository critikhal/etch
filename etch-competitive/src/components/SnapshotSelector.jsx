import { formatDate } from "../lib/formatDate";

const pill = {
  fontSize: 11,
  fontWeight: 500,
  padding: "5px 12px",
  borderRadius: 20,
  border: "1px solid #E0E0E0",
  background: "#fff",
  color: "#777",
  cursor: "pointer",
  transition: "all .15s",
};

const pillActive = {
  ...pill,
  background: "#111",
  color: "#fff",
  borderColor: "#111",
  fontWeight: 600,
};

export default function SnapshotSelector({ snapshots, selectedDate, compareDate, onSelectDate, onCompareDate }) {
  // Only show non-selected dates as comparison options
  const compareOptions = snapshots.filter((s) => s.date !== selectedDate);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16, flexWrap: "wrap" }}>
      {/* Snapshot pills */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {snapshots.map((s) => (
          <button
            key={s.date}
            onClick={() => onSelectDate(s.date)}
            style={s.date === selectedDate ? pillActive : pill}
            onMouseEnter={(e) => {
              if (s.date !== selectedDate) {
                e.currentTarget.style.borderColor = "#999";
                e.currentTarget.style.color = "#333";
              }
            }}
            onMouseLeave={(e) => {
              if (s.date !== selectedDate) {
                e.currentTarget.style.borderColor = "#E0E0E0";
                e.currentTarget.style.color = "#777";
              }
            }}
          >
            {formatDate(s.date)}
          </button>
        ))}
      </div>

      {/* Comparison selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, color: "#BBB", fontWeight: 500 }}>comparing against</span>
        <select
          value={compareDate}
          onChange={(e) => onCompareDate(e.target.value)}
          style={{
            fontSize: 11,
            padding: "4px 8px",
            borderRadius: 6,
            border: "1px solid #E0E0E0",
            background: "#fff",
            color: "#555",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {compareOptions.map((s) => (
            <option key={s.date} value={s.date}>
              {formatDate(s.date)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
