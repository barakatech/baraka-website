import NodeCache from 'node-cache';

// Create cache instances with different TTLs
export const priceCache = new NodeCache({
  stdTTL: 30,           // 30 seconds for price data
  checkperiod: 10,
  useClones: false,
});

export const dataCache = new NodeCache({
  stdTTL: 300,          // 5 minutes for general data
  checkperiod: 60,
  useClones: false,
});

export const staticCache = new NodeCache({
  stdTTL: 3600,         // 1 hour for static data
  checkperiod: 300,
  useClones: false,
});

// Cache middleware factory
export function cacheMiddleware(cache: NodeCache, ttl?: number) {
  return async (req: any, res: any, next: any) => {
    const key = req.originalUrl || req.url;

    // Try to get from cache
    const cachedResponse = cache.get(key);
    if (cachedResponse) {
      console.log(`[Cache HIT] ${key}`);
      return res.json(cachedResponse);
    }

    console.log(`[Cache MISS] ${key}`);

    // Intercept res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      if (ttl !== undefined) {
        cache.set(key, body, ttl);
      } else {
        cache.set(key, body);
      }
      return originalJson(body);
    };

    next();
  };
}
