/**
 * Centralized configuration for the server
 */

export const config = {
  baraka: {
    // Legacy API for discover endpoints
    apiBaseUrl: process.env.BARAKA_API_BASE_URL || "https://api.production.app.axasbjeg.com",
    // External b-os API for stock page data
    osExternalUrl: process.env.BARAKA_OS_EXTERNAL_URL || "https://services.production.app.getbaraka.com/b-os-external/api",
    authToken: process.env.BARAKA_API_AUTH_TOKEN,
  },
  cache: {
    ttl: {
      price: 30,        // 30 seconds for price data
      data: 300,        // 5 minutes for general data
      static: 3600,     // 1 hour for static data
      sectors: 86400,   // 24 hours for sectors
      trackers: 86400,  // 24 hours for trackers
    },
  },
} as const;
