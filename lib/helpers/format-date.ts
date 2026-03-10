import { toLocalDateString } from "./local-date";

export function formatDateForInput(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  // If date is already in YYYY-MM-DD format, return as is (date-only, no timezone shift)
  if (typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(dateStr)) {
    return dateStr.split("T")[0];
  }
  // Parse and format in local timezone so the calendar day matches the user's timezone
  try {
    const date = new Date(dateStr);
    return toLocalDateString(date);
  } catch {
    return "";
  }
}
