/**
 * Format a stock price with appropriate decimal places
 * @param price - The price to format
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return price.toFixed(2);
}

/**
 * Format a percentage change value
 * @param changePercent - The percentage change
 * @returns Formatted percentage string with sign
 */
export function formatChangePercent(changePercent: number): string {
  const sign = changePercent >= 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
}

/**
 * Get the appropriate arrow icon URL based on price change
 * @param changePercent - The percentage change
 * @returns URL to the appropriate arrow icon
 */
export function getArrowIcon(changePercent: number): string {
  return changePercent >= 0
    ? "/attached_assets/Icons_Arrows_1769066937907.png"
    : "/attached_assets/Icons_Arrows_red_1769066937907.png";
}

/**
 * Get the appropriate text color class based on price change
 * @param changePercent - The percentage change
 * @returns Tailwind CSS class for the appropriate color
 */
export function getChangeColor(changePercent: number): string {
  return changePercent >= 0 ? 'text-[#0DDD00]' : 'text-[#FF3317]';
}

/**
 * Get stock dark theme image URL
 * @param styleImageUrl - Object containing light and dark image URLs from quotes API
 * @returns URL to dark stock logo or empty string
 */
export function getStockImageUrl(
  styleImageUrl?: { light?: string; dark?: string }
): string {
  return styleImageUrl?.dark || '';
}
