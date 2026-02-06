import { Router } from "express";
import { staticCache, cacheMiddleware } from "../cache";
import { proxyBarakaAPI, buildUrl } from "../utils/apiProxy";
import { config } from "../lib/config";

const router = Router();

/**
 * Sector-related endpoints
 */

// Get all sectors - 24 hour cache (sectors rarely change)
router.get(
  "/",
  cacheMiddleware(staticCache, config.cache.ttl.sectors),
  async (req, res) => {
    const endpoint = buildUrl("/v1/themes", { type: "sector" });

    await proxyBarakaAPI(endpoint, staticCache, req, res, {
      errorMessage: "Failed to fetch sectors",
    });
  }
);

export default router;
