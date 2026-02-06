import type { Stock } from "../stocksApi";

/**
 * Map tracker type to appropriate stock data
 * @param trackerType - The type of tracker (e.g., '52-week-high', 'baraka-top-traded')
 * @param stocksData - Object containing all stock arrays
 * @param fallback - Fallback stocks if the requested tracker has no data
 * @returns The appropriate stock array for the given tracker type
 */
export function getTrackerStocks(
  trackerType: string,
  stocksData: {
    week52High: Stock[];
    week52Low: Stock[];
    barakaTop10: Stock[];
    newlyListed: Stock[];
  },
  fallback: Stock[] = []
): Stock[] {
  const { week52High, week52Low, barakaTop10, newlyListed } = stocksData;

  switch (trackerType.toLowerCase()) {
    case 'fiftytwoweek_high':
    case 'fiftytwoweek-high':
    case '52-week-high':
      return week52High.length > 0 ? week52High : fallback;

    case 'fiftytwoweek_low':
    case 'fiftytwoweek-low':
    case '52-week-low':
      return week52Low.length > 0 ? week52Low : fallback;

    case 'toptraded':
    case 'top-traded':
    case 'baraka-top-traded':
      return barakaTop10.length > 0 ? barakaTop10 : fallback;

    case 'newlylisted':
    case 'newly-listed':
    case 'newly_added':
      return newlyListed.length > 0 ? newlyListed : fallback;

    default:
      return fallback;
  }
}
