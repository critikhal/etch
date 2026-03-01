// Metric fields that can be compared numerically
const METRIC_FIELDS = ["ig", "tiktok", "downloads", "valuation"];

/**
 * Parse a display string like "38K", "4,289", "50M+", "~$1.2B" into a number.
 * Returns null for qualitative strings like "New", "Pre-revenue", "Private", "—".
 */
export function parseMetricValue(str) {
  if (!str || str === "—" || str === "N/A") return null;

  // Remove qualitative prefixes/suffixes
  let s = str.replace(/[~$€£,+]/g, "").trim();

  // Check for qualitative values
  const qualitative = [
    "new", "pre-revenue", "private", "bootstrapped",
    "part of", "bytedance",
  ];
  if (qualitative.some((q) => s.toLowerCase().startsWith(q))) return null;

  // Handle suffixes: K, M, B, T
  const suffixMatch = s.match(/^([\d.]+)\s*([KMBT])?$/i);
  if (!suffixMatch) return null;

  const num = parseFloat(suffixMatch[1]);
  if (isNaN(num)) return null;

  const suffix = (suffixMatch[2] || "").toUpperCase();
  const multipliers = { K: 1_000, M: 1_000_000, B: 1_000_000_000, T: 1_000_000_000_000 };
  return num * (multipliers[suffix] || 1);
}

/**
 * Format a numeric delta as a human-readable string.
 */
export function formatDelta(num) {
  if (num === 0) return "0";
  const abs = Math.abs(num);
  const sign = num > 0 ? "+" : "-";
  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}K`;
  return `${sign}${abs}`;
}

/**
 * Compute deltas between two snapshot data arrays.
 * Returns a Map of competitorId -> { field: { prev, curr, prevNum, currNum, direction, delta } }
 */
export function computeDeltas(olderData, newerData) {
  const oldMap = new Map(olderData.map((c) => [c.id, c]));
  const deltas = {};

  for (const curr of newerData) {
    const prev = oldMap.get(curr.id);
    if (!prev) {
      // New competitor
      deltas[curr.id] = { _new: true };
      continue;
    }

    const fieldDeltas = {};
    let hasChanges = false;

    for (const field of METRIC_FIELDS) {
      const prevVal = prev[field];
      const currVal = curr[field];

      if (prevVal === currVal) continue;

      const prevNum = parseMetricValue(prevVal);
      const currNum = parseMetricValue(currVal);

      let direction = "changed";
      let delta = null;

      if (prevNum !== null && currNum !== null) {
        if (currNum > prevNum) direction = "up";
        else if (currNum < prevNum) direction = "down";
        else direction = "unchanged";
        delta = currNum - prevNum;
      } else if (prevVal !== currVal) {
        direction = "changed";
      }

      if (direction !== "unchanged") {
        fieldDeltas[field] = {
          prev: prevVal,
          curr: currVal,
          prevNum,
          currNum,
          direction,
          delta,
        };
        hasChanges = true;
      }
    }

    // Also check qualitative text changes
    for (const field of ["downloadNote", "valNote", "does"]) {
      if (prev[field] !== curr[field] && curr[field] !== undefined) {
        fieldDeltas[field] = {
          prev: prev[field],
          curr: curr[field],
          direction: "changed",
        };
        hasChanges = true;
      }
    }

    if (hasChanges) {
      deltas[curr.id] = fieldDeltas;
    }
  }

  return deltas;
}

/**
 * Summarize deltas into counts.
 */
export function summarizeDeltas(deltas) {
  let increased = 0;
  let decreased = 0;
  let changed = 0;
  let newEntries = 0;

  for (const [, fieldDeltas] of Object.entries(deltas)) {
    if (fieldDeltas._new) {
      newEntries++;
      continue;
    }
    for (const [, d] of Object.entries(fieldDeltas)) {
      if (d.direction === "up") increased++;
      else if (d.direction === "down") decreased++;
      else if (d.direction === "changed") changed++;
    }
  }

  return { increased, decreased, changed, newEntries };
}
