export function formatDateForInput(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  // If date is already in YYYY-MM-DD format, return as is
  if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    return dateStr.split("T")[0]; // Remove time portion if present
  }
  // Otherwise, try to parse and format
  try {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  } catch {
    return "";
  }
}
