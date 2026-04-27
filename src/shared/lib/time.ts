/**
 * Formats a date into an HH:mm:ss clock string.
 *
 * @param date - Date instance to format.
 * @returns Time in 24h format.
 */
export function formatClockTime(date: Date): string {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${hour}:${minute}:${second}`;
}
