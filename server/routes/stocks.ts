import { Router } from "express";
import { priceCache, dataCache, staticCache, cacheMiddleware } from "../cache";
import { proxyBarakaAPI, buildUrl } from "../utils/apiProxy";
import { config } from "../lib/config";
import {
  GainersLosersSchema,
  StockArraySchema,
  SearchResponseSchema,
  InstrumentDetailsSchema,
} from "../../shared/validators";
import { safeValidateApiResponse } from "../../shared/validators/api";

const router = Router();

/**
 * Stock discovery endpoints
 */

// Top gainers/losers - price data, 30 second cache
router.get(
  "/top-gainers-losers",
  cacheMiddleware(priceCache, config.cache.ttl.price),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/trackers/top-gainers-losers", {
      allTypes: "true",
      sortBy: "NAME",
      sortType: "ASC",
      stockType: "EQUITY",
    });

    await proxyBarakaAPI(endpoint, priceCache, req, res, {
      errorMessage: "Failed to fetch gainers/losers",
      validator: GainersLosersSchema,
    });
  }
);

// Trending - 5 minute cache
router.get(
  "/trending",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/trending", { allTypes: "true" });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch trending",
    });
  }
);

// Popular - 5 minute cache
router.get(
  "/popular",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/popular", { allTypes: "true" });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch popular",
    });
  }
);

// Search - 2 minute cache per query
router.get(
  "/search",
  cacheMiddleware(dataCache, 120),
  async (req, res) => {
    const query = req.query.query as string;

    if (!query) {
      return res.json({ data: { stocks: [], themes: [], sectors: [] } });
    }

    const endpoint = buildUrl("/v2/finance_market/search", {
      query: query,
      allTypes: "true",
      limit: "20",
    });

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, { headers });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();

      // Optional validation
      const validationResult = safeValidateApiResponse(SearchResponseSchema, data);
      if (!validationResult.success) {
        console.error('Search validation error:', validationResult.error);
        console.warn('Search response validation failed, returning data anyway');
      }

      res.json(data);
    } catch (error) {
      console.error('Failed to search stocks:', error);

      // Try to serve stale cache
      const cachedData = dataCache.get(req.originalUrl);
      if (cachedData) {
        console.log("Serving stale cache due to error");
        res.json(cachedData);
        return;
      }

      res.status(500).json({ error: "Failed to fetch data" });
    }
  }
);

// Baraka top 10 - 15 minute cache
router.get(
  "/baraka-top-10",
  cacheMiddleware(dataCache, 900),
  async (req, res) => {
    await proxyBarakaAPI(
      "/v1/discover/trackers/baraka-top-traded",
      dataCache,
      req,
      res,
      { errorMessage: "Failed to fetch baraka top 10" }
    );
  }
);

// 52-Week High - 5 minute cache
router.get(
  "/52-week-high",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/trackers/52-week-high", {
      allTypes: "true",
      sortBy: "NAME",
      sortType: "ASC",
      stockType: "EQUITY",
    });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch 52-week high",
    });
  }
);

// 52-Week Low - 5 minute cache
router.get(
  "/52-week-low",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/trackers/52-week-low", {
      allTypes: "true",
      sortBy: "NAME",
      sortType: "ASC",
      stockType: "EQUITY",
    });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch 52-week low",
    });
  }
);

// Newly Listed - 15 minute cache
router.get(
  "/newly-listed",
  cacheMiddleware(dataCache, 900),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/newly_added", {
      allTypes: "true",
      sortBy: "NAME",
      sortType: "ASC",
      stockType: "EQUITY",
    });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch newly listed",
    });
  }
);

// Top Auto-Invest - 15 minute cache
router.get(
  "/top-auto-invest",
  cacheMiddleware(dataCache, 900),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/top-auto-invest", {
      allTypes: "true",
      sortBy: "NAME",
      sortType: "ASC",
      stockType: "EQUITY",
    });

    await proxyBarakaAPI(endpoint, dataCache, req, res, {
      errorMessage: "Failed to fetch top auto-invest",
    });
  }
);

// Top ESG Stocks - 1 hour cache
router.get(
  "/top-esg",
  cacheMiddleware(staticCache, config.cache.ttl.static),
  async (req, res) => {
    const endpoint = buildUrl("/v1/discover/top-esg", {
      allTypes: "true",
      key: "totalESGScore",
    });

    await proxyBarakaAPI(endpoint, staticCache, req, res, {
      errorMessage: "Failed to fetch top ESG",
    });
  }
);

// Batch quotes for multiple symbols - 5 minute cache
router.get(
  "/quotes/batch",
  async (req, res) => {
    const symbols = req.query.symbols as string;

    if (!symbols) {
      return res.json({ data: [] });
    }

    const symbolList = symbols.split(",").map(s => s.trim()).filter(Boolean);
    if (symbolList.length === 0) {
      return res.json({ data: [] });
    }

    // Check cache first
    const cacheKey = req.originalUrl;
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      // Fetch quotes for each symbol in parallel
      const quotePromises = symbolList.map(async (symbol) => {
        try {
          const response = await fetch(
            `${config.baraka.apiBaseUrl}/v1/finance_market/quotes/${encodeURIComponent(symbol)}`,
            { headers }
          );
          if (!response.ok) return null;
          const data = await response.json();
          return {
            instrumentId: data.instrumentId || data.id || symbol,
            symbol: data.symbol || symbol,
            name: data.name || symbol,
            imageUrl: data.styleImageUrl?.dark || data.imageUrl || "",
            price: data.price ?? data.lastPrice ?? 0,
            changePercent: data.changePercent ?? 0,
            changePrice: data.changePrice ?? 0,
          };
        } catch {
          return null;
        }
      });

      const results = (await Promise.all(quotePromises)).filter(Boolean);
      const responseData = { data: results };

      // Cache the response
      dataCache.set(cacheKey, responseData, config.cache.ttl.data);
      res.json(responseData);
    } catch (error) {
      console.error('Error fetching batch quotes:', error);
      res.status(500).json({ error: "Failed to fetch batch quotes" });
    }
  }
);

// Instrument details - 5 minute cache (using client facade API + quotes)
router.get(
  "/:symbolOrId/details",
  async (req, res) => {
    const { symbolOrId } = req.params;
    const endpoint = `/v2/instrument-details?symbolOrId=${encodeURIComponent(symbolOrId)}`;

    // Check cache first
    const cachedData = dataCache.get(req.originalUrl);
    if (cachedData) {
      console.log('\n========== SERVING FROM CACHE ==========');
      console.log('Symbol/ID:', symbolOrId);
      console.log('\n========== CACHED DATA ==========');
      console.log(JSON.stringify(cachedData, null, 2));
      console.log('===========================================\n');
      return res.json(cachedData);
    }

    console.log('\n========== INSTRUMENT DETAILS API CALL (CACHE MISS) ==========');
    console.log('Symbol/ID:', symbolOrId);
    console.log('Full endpoint:', `${config.baraka.apiBaseUrl}${endpoint}`);

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      // Fetch instrument details
      const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, { headers });
      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      console.log('\n========== INSTRUMENT DETAILS RESPONSE ==========');
      console.log(JSON.stringify(data, null, 2));
      console.log('===========================================\n');

      // Now fetch quotes data to get name, symbol, and price info
      const instrumentId = data.id || symbolOrId;
      const quotesEndpoint = `/v1/finance_market/quotes/${encodeURIComponent(instrumentId)}`;
      console.log('\n========== FETCHING QUOTES DATA ==========');
      console.log('Quotes endpoint:', `${config.baraka.apiBaseUrl}${quotesEndpoint}`);

      const quotesResponse = await fetch(`${config.baraka.apiBaseUrl}${quotesEndpoint}`, { headers });
      console.log('Quotes response status:', quotesResponse.status, quotesResponse.statusText);

      if (quotesResponse.ok) {
        const quotesData = await quotesResponse.json();
        console.log('\n========== QUOTES RESPONSE ==========');
        console.log(JSON.stringify(quotesData, null, 2));
        console.log('===========================================\n');

        // Merge quotes data into instrument details
        // Use price ?? lastPrice ?? 0.0 for the current price
        // Use changePrice and changePercent directly from quotes
        // Keep previousPrice for potential delta calculations
        const mergedData = {
          ...data,
          name: quotesData.name || data.name,
          symbol: quotesData.symbol || data.symbol,
          price: quotesData.price ?? quotesData.lastPrice ?? 0.0,
          changePrice: quotesData.changePrice,
          changePercent: quotesData.changePercent,
          previousPrice: quotesData.previousPrice, // Keep for delta calculations
          lastPrice: quotesData.lastPrice, // Keep original for reference
          imageUrl: quotesData.imageUrl || data.imageUrl,
          styleImageUrl: quotesData.styleImageUrl || data.styleImageUrl,
          sector: quotesData.sector || data.sector,
          sectorName: quotesData.sectorName || data.sectorName,
          openPrice: quotesData.openPrice,
          highPrice: quotesData.highPrice,
          lowPrice: quotesData.lowPrice,
          volume: quotesData.volumeMovingAverage25Day,
          shareOutstanding: quotesData.shareOutstanding,
        };

        console.log('\n========== MERGED DATA ==========');
        console.log(JSON.stringify(mergedData, null, 2));
        console.log('===========================================\n');

        // Cache the merged response
        dataCache.set(req.originalUrl, mergedData, config.cache.ttl.data);

        res.json(mergedData);
      } else {
        console.warn('Failed to fetch quotes data, returning instrument details only');
        // Cache the response even without quotes
        dataCache.set(req.originalUrl, data, config.cache.ttl.data);
        res.json(data);
      }
    } catch (error) {
      console.error('Error fetching instrument details:', error);

      // Try to serve stale cache
      const staleCachedData = dataCache.get(req.originalUrl);
      if (staleCachedData) {
        console.log("Serving stale cache due to error");
        res.json(staleCachedData);
        return;
      }

      res.status(500).json({ error: "Failed to fetch data" });
    }
  }
);

// Stock page data by instrumentId - 1 hour cache (static content)
router.get(
  "/:instrumentId/page",
  cacheMiddleware(staticCache, config.cache.ttl.static),
  async (req, res) => {
    const { instrumentId } = req.params;
    // Proxy to external b-os API
    const externalUrl = `${config.baraka.osExternalUrl}/v1/stock-pages/${encodeURIComponent(instrumentId)}`;

    try {
      const response = await fetch(externalUrl);

      if (!response.ok) {
        console.error(`Failed to fetch stock page data: ${response.statusText}`);
        return res.status(response.status).json({
          error: "Failed to fetch stock page data",
          message: response.statusText
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching stock page data:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
);

// Stock page data by slug - 1 hour cache (static content)
router.get(
  "/by-slug/:slug/page",
  cacheMiddleware(staticCache, config.cache.ttl.static),
  async (req, res) => {
    const { slug } = req.params;
    // Proxy to external b-os API
    const externalUrl = `${config.baraka.osExternalUrl}/v1/stock-pages/by-slug/${encodeURIComponent(slug)}`;

    try {
      const response = await fetch(externalUrl);

      if (!response.ok) {
        console.error(`Failed to fetch stock page data by slug: ${response.statusText}`);
        return res.status(response.status).json({
          error: "Failed to fetch stock page data",
          message: response.statusText
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching stock page data by slug:", error);
      res.status(500).json({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
);

// Interval selection by range (matching iOS logic)
const INTERVAL_BY_RANGE: Record<string, string> = {
  "week": "hour",
  "month": "day",
  "year": "week",
  "five_year": "month",
  "ytd": "week",
};

// Default interval for other ranges
const DEFAULT_INTERVAL = "five_minute";

// Historical chart data endpoint
router.get(
  "/:instrumentId/historical",
  async (req, res) => {
    const { instrumentId } = req.params;
    const range = (req.query.range as string) || "day";

    // Determine interval: use query param if provided, otherwise use mapping logic
    let interval = req.query.interval as string;
    if (!interval) {
      interval = INTERVAL_BY_RANGE[range] || DEFAULT_INTERVAL;
    }

    const endpoint = buildUrl(`/v1/finance_market/quotes/${encodeURIComponent(instrumentId)}/historical`, {
      range,
      interval,
    });

    // Use a shorter cache for intraday data, longer for historical
    const isIntraday = ["day", "day_hybrid", "week"].includes(range);
    const cacheDuration = isIntraday ? 60 : config.cache.ttl.data; // 60s for intraday, 5min for historical

    // Check cache first
    const cacheKey = req.originalUrl;
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Historical data API Error Response:', errorText);
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();

      // Transform response: convert date strings to timestamps and include metadata
      const rawData = data.data || data;
      const transformedData = Array.isArray(rawData)
        ? rawData.map((point: any) => ({
            timestamp: point.timestamp || (point.date ? Math.floor(new Date(point.date).getTime() / 1000) : 0),
            open: point.open,
            high: point.high,
            low: point.low,
            close: point.close,
            volume: point.volume,
          }))
        : [];

      const responseData = {
        instrumentId,
        range,
        interval,
        data: transformedData,
      };

      // Cache the response
      dataCache.set(cacheKey, responseData, cacheDuration);

      res.json(responseData);
    } catch (error) {
      console.error('Error fetching historical chart data:', error);

      // Try to serve stale cache
      const staleData = dataCache.get(cacheKey);
      if (staleData) {
        console.log("Serving stale cache due to error");
        res.json(staleData);
        return;
      }

      res.status(500).json({ error: "Failed to fetch historical chart data" });
    }
  }
);

// Stock news - 5 minute cache
router.get(
  "/:symbol/news",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    const { symbol } = req.params;
    const endpoint = `/v1/website/stocks/${encodeURIComponent(symbol)}`;

    // Check cache first
    const cacheKey = req.originalUrl;
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, { headers });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const data = await response.json();
      const news = (data.news || []).slice(0, 3);

      const responseData = { data: news };
      dataCache.set(cacheKey, responseData, config.cache.ttl.data);
      res.json(responseData);
    } catch (error) {
      console.error('Error fetching stock news:', error);

      const staleData = dataCache.get(cacheKey);
      if (staleData) {
        console.log("Serving stale cache due to error");
        res.json(staleData);
        return;
      }

      res.status(500).json({ error: "Failed to fetch stock news" });
    }
  }
);

// Refinitiv report for key stats - 5 minute cache
router.get(
  "/:instrumentId/refinitiv-report",
  async (req, res) => {
    const { instrumentId } = req.params;
    const endpoint = `/v1/finance_market/quotes/${encodeURIComponent(instrumentId)}/refinitiv_report`;

    // Check cache first
    const cacheKey = req.originalUrl;
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    console.log('\n========== REFINITIV REPORT API CALL ==========');
    console.log('Instrument ID:', instrumentId);
    console.log('Full URL:', `${config.baraka.apiBaseUrl}${endpoint}`);

    try {
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${config.baraka.authToken}`
      };

      const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, { headers });
      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Refinitiv report API Error Response:', errorText);
        throw new Error(`API responded with ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Refinitiv report data received:', JSON.stringify(data, null, 2).substring(0, 500));

      // Cache the response
      dataCache.set(cacheKey, data, config.cache.ttl.data);

      res.json(data);
    } catch (error) {
      console.error('Error fetching refinitiv report:', error);

      // Try to serve stale cache
      const staleData = dataCache.get(cacheKey);
      if (staleData) {
        console.log("Serving stale cache due to error");
        res.json(staleData);
        return;
      }

      res.status(500).json({ error: "Failed to fetch refinitiv report" });
    }
  }
);

export default router;
