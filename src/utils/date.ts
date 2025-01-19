/**
 * Format date to string
 *
 * @param date Date to format
 * @return Formatted date string (e.g. "Jan 1, 2025")
 */
export function formatDate(date: Date): string {
  return `${getMonthName(date.getMonth() + 1)} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Get month name from month number
 *
 * @param month month number (1 ~ 12)
 * @return month name (e.g. "Jan")
 */
function getMonthName(month: number): string {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Got invalid month number: ${month}`);
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1];
}
