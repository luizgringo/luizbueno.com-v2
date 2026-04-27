/**
 * Month aliases used to derive sortable numeric scores from period strings.
 */
const MONTH_TO_INDEX: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

/**
 * Converts a human-readable date period into a sortable rank.
 *
 * @param period - Period text such as `"Mar 2025 — Present"`.
 * @returns Numeric rank where higher means more recent.
 */
export function toPeriodRank(period: string): number {
  if (/present|today/i.test(period)) {
    return Number.MAX_SAFE_INTEGER;
  }

  const monthYearEntries = [...period.matchAll(/\b([A-Za-z]{3,9})\s+(\d{4})\b/g)].map((match) => {
    const month = MONTH_TO_INDEX[match[1]?.slice(0, 3).toLowerCase() ?? ""] ?? 1;
    const year = Number(match[2] ?? 0);

    return year * 12 + month;
  });

  if (monthYearEntries.length > 0) {
    return Math.max(...monthYearEntries);
  }

  const years = [...period.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));

  if (years.length > 0) {
    return Math.max(...years) * 12 + 1;
  }

  return 0;
}
