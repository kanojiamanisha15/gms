/**
 * Format a Date to YYYY-MM-DD in the user's local timezone.
 * Use this for date inputs and any "calendar date" that should respect the current timezone.
 */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Today's date as YYYY-MM-DD in the local timezone (for default values in date inputs). */
export function getTodayLocal(): string {
  return toLocalDateString(new Date());
}
