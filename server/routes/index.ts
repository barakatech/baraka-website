import type { Express } from "express";
import { createServer, type Server } from "http";
import stocksRouter from "./stocks";
import themesRouter from "./themes";
import sectorsRouter from "./sectors";
import trackersRouter from "./trackers";

/**
 * Register all API routes
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Mount route modules
  app.use("/api/stocks", stocksRouter);
  app.use("/api/themes", themesRouter);
  app.use("/api/sectors", sectorsRouter);
  app.use("/api/trackers", trackersRouter);

  const httpServer = createServer(app);

  return httpServer;
}
