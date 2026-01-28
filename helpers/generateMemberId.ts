// Helper function to generate 5-character unique ID from join date and sequential number
// Format: YXXYY where Y = last digit of year, XX = 2-letter month code, YY = sequential (00-99)
export function generateMemberId(
  joinDate: string,
  sequentialNumber: number
): string {
  const date = new Date(joinDate);
  const year = date.getFullYear();
  const lastDigitOfYear = year % 10; // Last digit of year (0-9)

  // Map month number to 2-letter alphabetic code
  const monthCodes: Record<number, string> = {
    1: "JA", // January
    2: "FE", // February
    3: "MR", // March
    4: "AP", // April
    5: "MY", // May
    6: "JN", // June
    7: "JL", // July
    8: "AU", // August
    9: "SE", // September
    10: "OC", // October
    11: "NO", // November
    12: "DE", // December
  };

  const month = date.getMonth() + 1; // Month (1-12)
  const monthCode = monthCodes[month] || "XX"; // 2-letter month code
  const sequential = String(sequentialNumber).padStart(2, "0"); // Sequential (00-99)

  return `${lastDigitOfYear}${monthCode}${sequential}`;
}
