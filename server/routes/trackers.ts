import { Router } from "express";
import { staticCache, cacheMiddleware } from "../cache";
import { proxyBarakaAPI } from "../utils/apiProxy";
import { config } from "../lib/config";

const router = Router();

/**
 * Tracker-related endpoints
 */

// Get all trackers - 24 hour cache (trackers rarely change)
router.get(
  "/",
  cacheMiddleware(staticCache, config.cache.ttl.trackers),
  async (req, res) => {
    await proxyBarakaAPI("/v1/discover/trackers", staticCache, req, res, {
      errorMessage: "Failed to fetch trackers",
    });
  }
);

export default router;
