/**
 * Client-side feature flags and configuration
 */

export const config = {
  /** Whether premium features (e.g. Analyst Ratings) are enabled */
  IS_PREMIUM: false,
  /** Whether Sharia Score section is visible on the stock detail page */
  SHOW_SHARIA: false,
} as const;
