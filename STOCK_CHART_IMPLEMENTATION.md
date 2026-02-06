# Stock Chart Implementation

This document describes the implementation of the stock details chart using historical data from the Baraka API.

## Overview

The stock chart displays historical price data with multiple time periods (Today, Week, Month, Year, 5 Years, YTD). The implementation follows the iOS app's logic for selecting intervals based on the chosen time range.

## API Endpoint

### Backend Route
```
GET /api/stocks/:symbol/historical
```

Query parameters:
- `range`: Time range for historical data
- `interval`: (Optional) Data granularity - determined automatically based on range if not provided

### External API
```
GET /finance_market/quotes/{symbol}/historical?range={range}&interval={interval}
```

## Range and Interval Values

### Allowed Range Values
- `day` - Current trading day
- `day_hybrid` - Extended trading day (including pre/post market)
- `week` - Past week
- `month` - Past month
- `year` - Past year
- `five_year` - Past 5 years
- `ytd` - Year to date

### Allowed Interval Values
- `minute` - 1-minute intervals
- `five_minute` - 5-minute intervals
- `thirty_minute` - 30-minute intervals
- `hour` - Hourly intervals
- `day` - Daily intervals
- `week` - Weekly intervals
- `month` - Monthly intervals

### Interval Selection Logic

The backend automatically selects the appropriate interval based on the range, matching iOS app behavior:

```typescript
const INTERVAL_BY_RANGE = {
  "week": "hour",
  "month": "day",
  "year": "week",
  "five_year": "month",
  "ytd": "week",
  // Default for other ranges: "five_minute"
}
```

## Implementation Details

### 1. Validators (`shared/validators/stocks.ts`)

Added schemas for historical chart data:

```typescript
export const HistoricalDataPointSchema = z.object({
  timestamp: z.number(),
  open: z.number().optional(),
  high: z.number().optional(),
  low: z.number().optional(),
  close: z.number(),
  volume: z.number().optional(),
}).passthrough();

export const HistoricalChartDataSchema = z.object({
  symbol: z.string(),
  range: z.string(),
  interval: z.string(),
  data: z.array(HistoricalDataPointSchema),
}).passthrough();
```

### 2. Backend Route (`server/routes/stocks.ts`)

Added endpoint with automatic interval selection and caching:

```typescript
router.get("/:symbol/historical", async (req, res) => {
  const { symbol } = req.params;
  const range = (req.query.range as string) || "day";

  // Auto-determine interval from range if not provided
  let interval = req.query.interval as string;
  if (!interval) {
    interval = INTERVAL_BY_RANGE[range] || DEFAULT_INTERVAL;
  }

  // Dynamic cache duration: 60s for intraday, 5min for historical
  const isIntraday = ["day", "day_hybrid", "week"].includes(range);
  const cacheDuration = isIntraday ? 60 : 300;

  // ... fetch and cache logic
});
```

### 3. API Client (`client/src/lib/stocksApi.ts`)

Added types and fetch function:

```typescript
export type ChartRange = "day" | "day_hybrid" | "week" | "month" | "year" | "five_year" | "ytd";
export type ChartInterval = "minute" | "five_minute" | "thirty_minute" | "hour" | "day" | "week" | "month";

export const INTERVAL_BY_RANGE: Record<ChartRange, ChartInterval> = {
  "day": "five_minute",
  "day_hybrid": "five_minute",
  "week": "hour",
  "month": "day",
  "year": "week",
  "five_year": "month",
  "ytd": "week",
};

export async function fetchHistoricalChartData(
  symbol: string,
  range: ChartRange = "day",
  interval?: ChartInterval
): Promise<HistoricalChartData> {
  const selectedInterval = interval || INTERVAL_BY_RANGE[range];
  const params = new URLSearchParams({ range, interval: selectedInterval });
  const res = await fetch(`${API_BASE}/stocks/${symbol}/historical?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch historical chart data: ${res.statusText}`);
  }
  return res.json();
}
```

### 4. React Query Hook (`client/src/lib/stocksQueries.ts`)

Added query hook with smart caching:

```typescript
export function useHistoricalChartData(
  symbol: string,
  range: ChartRange = "day",
  interval?: ChartInterval,
  options?: Partial<UseQueryOptions<HistoricalChartData>>
) {
  return useQuery({
    queryKey: stocksKeys.historicalChart(symbol, range, interval),
    queryFn: () => fetchHistoricalChartData(symbol, range, interval),
    staleTime: range === "day" || range === "day_hybrid" ? 60 * 1000 : 5 * 60 * 1000,
    refetchOnWindowFocus: range === "day" || range === "day_hybrid",
    enabled: !!symbol,
    ...options,
  });
}
```

### 5. UI Component (`client/src/pages/sections/StockSummarySection.tsx`)

Updated to use real data:

```typescript
// Map display periods to API ranges
const PERIOD_TO_RANGE: Record<string, ChartRange> = {
  "Today": "day",
  "Week": "week",
  "Month": "month",
  "Year": "year",
  "5 Years": "five_year",
  "YTD": "ytd",
};

// Fetch historical data
const chartRange = PERIOD_TO_RANGE[activePeriod] || "day";
const { data: historicalData, isLoading: isChartLoading } = useHistoricalChartData(
  symbol,
  chartRange,
  undefined, // Auto-determine interval
  { enabled: !!symbol }
);

// Transform data for chart
const chartData = useMemo(() => {
  if (!historicalData?.data?.length) return [];

  return historicalData.data.map((point) => ({
    timestamp: point.timestamp,
    price: point.close,
    time: formatTimestamp(point.timestamp, chartRange),
  }));
}, [historicalData, chartRange]);

// Dynamic color based on performance
const isPositive = chartData.length > 0 &&
  chartData[chartData.length - 1].price >= chartData[0].price;
```

**Note:** Current price display uses `instrumentDetails.price` from the `/finance_market/quotes` endpoint (already implemented). This implementation focuses on historical chart data only.

## Timestamp Formatting

The component formats timestamps based on the selected range:

| Range | Format | Example |
|-------|--------|---------|
| day, day_hybrid | HH:MM (24h) | 09:30, 15:45 |
| week | Weekday | Mon, Tue, Wed |
| month | MMM DD | Jan 15, Feb 3 |
| year, ytd | Month | Jan, Feb, Mar |
| five_year | Year | 2020, 2021 |

## Chart Features

1. **Dynamic Colors**: Chart color changes based on performance
   - Green (#0DDD00) for positive performance
   - Red (#FF3317) for negative performance

2. **Smooth Animations**: 800ms animation when switching periods

3. **Interactive Tooltip**: Shows price and time on hover

4. **Loading States**: Displays loading indicator while fetching data

5. **Error Handling**: Shows message if no data is available

## Caching Strategy

### Backend Cache
- **Intraday data** (day, day_hybrid, week): 60 seconds
- **Historical data** (month, year, five_year, ytd): 5 minutes

### Frontend Cache (React Query)
- **Intraday data**: 1 minute stale time, auto-refetch on window focus
- **Historical data**: 5 minute stale time, no auto-refetch

## Usage Example

```typescript
// Fetch today's data with automatic interval selection
const { data } = useHistoricalChartData("AAPL", "day");

// Fetch monthly data with custom interval
const { data } = useHistoricalChartData("AAPL", "month", "day");

// Fetch 5-year data (uses "month" interval automatically)
const { data } = useHistoricalChartData("AAPL", "five_year");
```

## API Response Format

```typescript
{
  symbol: "AAPL",
  range: "month",
  interval: "day",
  data: [
    {
      timestamp: 1704067200,
      open: 185.50,
      high: 187.20,
      low: 184.30,
      close: 186.75,
      volume: 45678900
    },
    // ... more data points
  ]
}
```

## Notes

- The backend automatically determines the interval if not provided
- The implementation matches iOS app behavior for consistency
- Chart data is cached differently based on time range to balance freshness and performance
- All timestamps are in Unix epoch seconds (not milliseconds)
- The `close` price is the primary value displayed on the chart
