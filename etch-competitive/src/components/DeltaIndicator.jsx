import { useState } from "react";
import { formatDelta } from "../lib/deltas";

export default function DeltaIndicator({ delta }) {
  const [show, setShow] = useState(false);

  if (!delta) return null;

  const { direction, prev, delta: numDelta } = delta;
  if (direction === "unchanged") return null;

  // Determine color and arrow
  let color, arrow;
  if (direction === "up") {
    color = "#16A34A";
    arrow = "▲";
  } else if (direction === "down") {
    color = "#DC2626";
    arrow = "▼";
  } else {
    color = "#3B82F6";
    arrow = null;
  }

  // Small colored dot shown inline (no text, no overlap)
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 4 }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {arrow ? (
        <span style={{ color, fontSize: 7, fontWeight: 700, cursor: "default" }}>{arrow}</span>
      ) : (
        <span style={{ width: 5, height: 5, borderRadius: 3, background: color, display: "inline-block", cursor: "default" }} />
      )}

      {show && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1a1a",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 10,
            whiteSpace: "nowrap",
            zIndex: 100,
            pointerEvents: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
            lineHeight: 1.5,
          }}
        >
          {direction === "changed" ? (
            <span style={{ color: "#93c5fd" }}>Value updated</span>
          ) : (
            <>
              {prev && (
                <span style={{ color: "#999" }}>
                  {prev} →{" "}
                </span>
              )}
              <span style={{ color, fontWeight: 600 }}>
                {arrow} {numDelta !== null ? formatDelta(numDelta) : ""}
              </span>
            </>
          )}
          {/* Tooltip arrow */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #1a1a1a",
            }}
          />
        </div>
      )}
    </span>
  );
}
