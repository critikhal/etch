const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Format "2026-02-12" as "12-Feb-2026"
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d, 10)}-${MONTHS[parseInt(m, 10) - 1]}-${y}`;
}
