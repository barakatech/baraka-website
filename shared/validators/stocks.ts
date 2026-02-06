import { z } from "zod";
import { ThemeArraySchema } from "./themes";

/**
 * Stock schema for validation
 */
export const StockSchema = z.object({
  instrumentId: z.string().optional(),
  symbol: z.string().optional(),
  name: z.string().optional(),
  lastPrice: z.number().optional(),
  lastTrade: z.number().optional(),
  changePrice: z.number().optional(),
  changePercent: z.number().optional(),
  imageUrl: z.string().nullable().optional(),
  styleImageUrl: z.object({
    light: z.string().optional(),
    dark: z.string().optional(),
  }).optional(),
  description: z.string().optional(),
  sector: z.string().optional(),
  sectorName: z.string().optional(),
  sectorCode: z.string().optional(),
  drivewealthSector: z.string().nullable().optional(),
  industry: z.string().optional(),
  exchange: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  currency: z.string().optional(),
  stockRegion: z.string().optional(),
  enableExtendedHoursNotionalStatus: z.string().nullable().optional(),
  chart: z.array(z.any()).optional(),
  metadata: z.any().nullable().optional(),
  isOptionsEnabled: z.boolean().optional(),
  assetClass: z.string().optional(),
  watchlistIds: z.array(z.string()).optional(),
  dividendYield: z.number().optional(),
});

export const StockArraySchema = z.array(StockSchema);

/**
 * Top gainers/losers response schema
 */
export const GainersLosersSchema = z.object({
  data: z.object({
    gainers: StockArraySchema,
    losers: StockArraySchema,
  }),
});

/**
 * Search response schema
 */
export const SearchResponseSchema = z.object({
  data: z.object({
    stocks: StockArraySchema.optional(),
    themes: ThemeArraySchema.optional(),
    sectors: ThemeArraySchema.optional(),
  }),
  nextCursor: z.string().nullable().optional(),
});

/**
 * Instrument details schema
 * Note: This is a lenient schema that allows the API to return additional fields
 */
export const InstrumentDetailsSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  description: z.string().optional(),
  sector: z.string().optional(),
  sectorName: z.string().optional(),
  industry: z.string().optional(),
  price: z.number().optional(),
  changePrice: z.number().optional(),
  changePercent: z.number().optional(),
  previousPrice: z.number().optional(), // For delta calculations
  lastPrice: z.number().optional(), // Original lastPrice from quotes
  imageUrl: z.string().optional(),
  styleImageUrl: z.object({
    light: z.string().optional(),
    dark: z.string().optional(),
  }).optional(),
  // Allow any other fields from the API
}).passthrough();

/**
 * Historical chart data point schema
 */
export const HistoricalDataPointSchema = z.object({
  timestamp: z.number(),
  open: z.number().optional(),
  high: z.number().optional(),
  low: z.number().optional(),
  close: z.number(),
  volume: z.number().optional(),
}).passthrough();

/**
 * Historical chart data response schema
 */
export const HistoricalChartDataSchema = z.object({
  symbol: z.string(),
  range: z.string(),
  interval: z.string(),
  data: z.array(HistoricalDataPointSchema),
}).passthrough();

export type Stock = z.infer<typeof StockSchema>;
export type GainersLosers = z.infer<typeof GainersLosersSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type InstrumentDetails = z.infer<typeof InstrumentDetailsSchema>;
export type HistoricalDataPoint = z.infer<typeof HistoricalDataPointSchema>;
export type HistoricalChartData = z.infer<typeof HistoricalChartDataSchema>;

/**
 * Refinitiv report schema for key stats
 */
export const RefinitivReportSchema = z.object({
  reportType: z.string().optional(),
  symbol: z.string().optional(),
  ric: z.string().optional(),
  exchcode: z.string().optional(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  description: z.string().optional(),
  reportDate: z.string().optional(),
  marketCap: z.string().nullable().optional(),
  marketCapCurrency: z.string().optional(),
  closePrice: z.number().nullable().optional(),
  closePriceDate: z.string().optional(),
  closePriceCurrency: z.string().optional(),
  dividendYield: z.number().nullable().optional(),
  trailingPriceToEarnings: z.number().nullable().optional(),
  forwardPriceToEarnings: z.number().nullable().optional(),
  peg: z.number().nullable().optional(),
  ltg: z.number().nullable().optional(),
  revenue: z.string().nullable().optional(),
  roe: z.number().nullable().optional(),
  nm: z.number().nullable().optional(),
  return1week: z.number().nullable().optional(),
  return1month: z.number().nullable().optional(),
  return3month: z.number().nullable().optional(),
  return1year: z.number().nullable().optional(),
  avgDailyVol: z.number().nullable().optional(),
  highPrice52week: z.number().nullable().optional(),
  lowPrice52week: z.number().nullable().optional(),
  annualDiv: z.number().nullable().optional(),
  institutionalOwnership: z.number().nullable().optional(),
  averageScore: z.number().nullable().optional(),
  averageScore1w: z.number().nullable().optional(),
  averageScore1m: z.number().nullable().optional(),
  averageScore3m: z.number().nullable().optional(),
  averageScore6m: z.number().nullable().optional(),
  averageScore1y: z.number().nullable().optional(),
  averageScoreOutlook: z.string().nullable().optional(),
  trend: z.string().nullable().optional(),
  instrumentId: z.string().optional(),
}).passthrough();

export type RefinitivReport = z.infer<typeof RefinitivReportSchema>;
