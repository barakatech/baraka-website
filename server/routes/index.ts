import type { Express } from "express";
import { createServer, type Server } from "http";
import stocksRouter from "./stocks";
import themesRouter from "./themes";
import sectorsRouter from "./sectors";
import trackersRouter from "./trackers";
import contentRouter from "./content";

/**
 * Register all API routes
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Health check for k8s liveness/readiness probes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Mount route modules
  app.use("/api/stocks", stocksRouter);
  app.use("/api/themes", themesRouter);
  app.use("/api/sectors", sectorsRouter);
  app.use("/api/trackers", trackersRouter);
  app.use("/api/content", contentRouter);

  const httpServer = createServer(app);

  return httpServer;
}
