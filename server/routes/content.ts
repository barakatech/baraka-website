import { Router } from "express";
import { dataCache, cacheMiddleware } from "../cache";
import { proxyBarakaAPI } from "../utils/apiProxy";
import { config } from "../lib/config";

const router = Router();

// Spotlight articles - 5 minute cache
router.get(
  "/spotlight",
  cacheMiddleware(dataCache, config.cache.ttl.data),
  async (req, res) => {
    await proxyBarakaAPI("/v1/content/active-spotlights", dataCache, req, res, {
      errorMessage: "Failed to fetch spotlight content",
    });
  }
);

export default router;
