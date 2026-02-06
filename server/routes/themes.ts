import { Router } from "express";
import { staticCache, cacheMiddleware } from "../cache";
import { proxyBarakaAPI, buildUrl } from "../utils/apiProxy";
import { config } from "../lib/config";

const router = Router();

/**
 * Theme-related endpoints
 */

// Get all themes - 24 hour cache (themes rarely change)
router.get(
  "/",
  cacheMiddleware(staticCache, config.cache.ttl.trackers),
  async (req, res) => {
    const endpoint = buildUrl("/v1/themes", { type: "default" });

    await proxyBarakaAPI(endpoint, staticCache, req, res, {
      errorMessage: "Failed to fetch themes",
    });
  }
);

// Get stocks for a specific theme - 1 hour cache
router.get(
  "/:themeId/stocks",
  cacheMiddleware(staticCache, config.cache.ttl.static),
  async (req, res) => {
    const { themeId } = req.params;
    const endpoint = `/v1/themes/${themeId}/stocks`;

    await proxyBarakaAPI(endpoint, staticCache, req, res, {
      errorMessage: "Failed to fetch theme stocks",
    });
  }
);

export default router;
