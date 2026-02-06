export function calculateExpirationDate(
  joinDate: string,
  duration?: string
): string {
  const join = new Date(joinDate);

  if (!duration) {
    join.setMonth(join.getMonth() + 1);
    return join.toISOString().split("T")[0];
  }

  if (duration.toLowerCase().includes("year")) {
    join.setFullYear(join.getFullYear() + 1);
  } else if (duration.toLowerCase().includes("month")) {
    const months = parseInt(duration.split(/\s+/)[0] || "1", 10) || 1;
    join.setMonth(join.getMonth() + months);
  } else {
    join.setMonth(join.getMonth() + 1);
  }

  return join.toISOString().split("T")[0];
}
