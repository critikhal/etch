import { useState, useMemo } from "react";
import snapshotData from "./data/snapshots.json";
import { computeDeltas, summarizeDeltas } from "./lib/deltas";
import DashboardHeader from "./components/DashboardHeader";
import SnapshotSelector from "./components/SnapshotSelector";
import CompetitorTable from "./components/CompetitorTable";
import ChangesDashboard from "./components/ChangesDashboard";

const { snapshots } = snapshotData;

// Only snapshots that have a previous one to compare against (i.e., can show changes)
const snapshotsWithChanges = snapshots.filter((_, i) => i > 0);

const tabStyle = {
  fontSize: 11,
  fontWeight: 600,
  padding: "7px 16px",
  cursor: "pointer",
  background: "none",
  border: "none",
  borderBottom: "2px solid transparent",
  color: "#999",
  transition: "all .15s",
};

const tabActiveStyle = {
  ...tabStyle,
  color: "#111",
  borderBottomColor: "#111",
};

export default function App() {
  const dates = snapshots.map((s) => s.date);
  const [selectedDate, setSelectedDate] = useState(dates[dates.length - 1]);
  const [compareDate, setCompareDate] = useState(dates.length > 1 ? dates[0] : dates[0]);
  const [activeTab, setActiveTab] = useState("competitors");
  const [updatesDate, setUpdatesDate] = useState(
    snapshotsWithChanges.length > 0 ? snapshotsWithChanges[snapshotsWithChanges.length - 1].date : null
  );

  const currentSnapshot = snapshots.find((s) => s.date === selectedDate);
  const compareSnapshot = snapshots.find((s) => s.date === compareDate);

  const deltas = useMemo(() => {
    if (!compareSnapshot || !currentSnapshot || compareSnapshot.date === currentSnapshot.date) return {};
    return computeDeltas(compareSnapshot.data, currentSnapshot.data);
  }, [compareSnapshot, currentSnapshot]);

  const summary = useMemo(() => summarizeDeltas(deltas), [deltas]);

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #FAFBFC 0%, #F5F5F7 100%)",
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: "28px 24px 20px",
      }}>
        <DashboardHeader
          currentDate={selectedDate}
          compareDate={compareDate}
          summary={summary}
        />

        <SnapshotSelector
          snapshots={snapshots}
          selectedDate={selectedDate}
          compareDate={compareDate}
          onSelectDate={setSelectedDate}
          onCompareDate={setCompareDate}
        />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E8E8E8", marginBottom: 14 }}>
          <button
            onClick={() => setActiveTab("competitors")}
            style={activeTab === "competitors" ? tabActiveStyle : tabStyle}
          >
            Competitors
          </button>
          {snapshotsWithChanges.length > 0 && (
            <button
              onClick={() => setActiveTab("updates")}
              style={activeTab === "updates" ? tabActiveStyle : tabStyle}
            >
              Notable Updates
            </button>
          )}
        </div>

        {activeTab === "competitors" && (
          <CompetitorTable
            competitors={currentSnapshot?.data || []}
            deltas={deltas}
          />
        )}

        {activeTab === "updates" && (
          <div>
            {/* Date pills for snapshots that have changes */}
            {snapshotsWithChanges.length > 1 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {snapshotsWithChanges.map((s) => (
                  <button
                    key={s.date}
                    onClick={() => setUpdatesDate(s.date)}
                    style={{
                      fontSize: 10.5,
                      fontWeight: s.date === updatesDate ? 600 : 500,
                      padding: "5px 12px",
                      borderRadius: 20,
                      border: s.date === updatesDate ? "1px solid #111" : "1px solid #E0E0E0",
                      background: s.date === updatesDate ? "#111" : "#fff",
                      color: s.date === updatesDate ? "#fff" : "#777",
                      cursor: "pointer",
                      transition: "all .15s",
                    }}
                  >
                    {new Date(s.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </button>
                ))}
              </div>
            )}

            {updatesDate && (
              <ChangesDashboard
                snapshots={snapshots}
                targetDate={updatesDate}
                onClose={() => setActiveTab("competitors")}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
