import type { Request, Response } from "express";
import type NodeCache from "node-cache";
import type { z } from "zod";
import { config } from "../lib/config";
import { safeValidateApiResponse } from "../../shared/validators/api";

/**
 * Generic proxy function for Baraka API calls with consistent error handling and caching
 */
export async function proxyBarakaAPI(
  endpoint: string,
  cache: NodeCache,
  req: Request,
  res: Response,
  options: {
    requiresAuth?: boolean;
    errorMessage?: string;
    validator?: z.ZodType<any>;
  } = {}
): Promise<void> {
  try {
    const headers: Record<string, string> = {};

    if (options.requiresAuth && config.baraka.authToken) {
      headers['Authorization'] = `Bearer ${config.baraka.authToken}`;
    }

    const response = await fetch(`${config.baraka.apiBaseUrl}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();

    // Optional validation
    if (options.validator) {
      const validationResult = safeValidateApiResponse(options.validator, data);
      if (!validationResult.success) {
        console.error('Validation error:', validationResult.error);
        // Log but continue - don't break for validation errors in production
        console.warn('Response validation failed, returning data anyway');
      }
    }

    res.json(data);
  } catch (error) {
    const errorMsg = options.errorMessage || `Failed to fetch from ${endpoint}`;
    console.error(`${errorMsg}:`, error);

    // Try to serve stale cache on error
    const cachedData = cache.get(req.originalUrl);
    if (cachedData) {
      console.log("Serving stale cache due to error");
      res.json(cachedData);
      return;
    }

    res.status(500).json({ error: "Failed to fetch data" });
  }
}

/**
 * Build URL with query parameters
 */
export function buildUrl(path: string, params?: Record<string, string | boolean>): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');

  return `${path}?${queryString}`;
}
