# Stock Chart API Examples

This document provides example API requests and responses for the historical chart data endpoint.

## Endpoint

```
GET /api/stocks/:symbol/historical?range={range}&interval={interval}
```

## Example Requests

### 1. Today's Intraday Chart (5-minute intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=day
```

**Auto-selected interval**: `five_minute`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "day",
  "interval": "five_minute",
  "data": [
    {
      "timestamp": 1704118200,
      "open": 185.50,
      "high": 186.20,
      "low": 185.30,
      "close": 185.80,
      "volume": 1234567
    },
    {
      "timestamp": 1704118500,
      "open": 185.80,
      "high": 186.50,
      "low": 185.70,
      "close": 186.30,
      "volume": 1345678
    }
    // ... more data points every 5 minutes
  ]
}
```

### 2. Weekly Chart (hourly intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=week
```

**Auto-selected interval**: `hour`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "week",
  "interval": "hour",
  "data": [
    {
      "timestamp": 1704067200,
      "open": 185.50,
      "high": 187.20,
      "low": 184.30,
      "close": 186.75,
      "volume": 45678900
    }
    // ... more data points hourly
  ]
}
```

### 3. Monthly Chart (daily intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=month
```

**Auto-selected interval**: `day`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "month",
  "interval": "day",
  "data": [
    {
      "timestamp": 1701388800,
      "open": 185.50,
      "high": 187.20,
      "low": 184.30,
      "close": 186.75,
      "volume": 45678900
    }
    // ... ~21 trading days
  ]
}
```

### 4. Yearly Chart (weekly intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=year
```

**Auto-selected interval**: `week`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "year",
  "interval": "week",
  "data": [
    {
      "timestamp": 1672531200,
      "open": 130.50,
      "high": 135.20,
      "low": 128.30,
      "close": 132.75,
      "volume": 234567890
    }
    // ... ~52 weeks
  ]
}
```

### 5. Five Year Chart (monthly intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=five_year
```

**Auto-selected interval**: `month`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "five_year",
  "interval": "month",
  "data": [
    {
      "timestamp": 1577836800,
      "open": 75.50,
      "high": 78.20,
      "low": 74.30,
      "close": 77.25,
      "volume": 1234567890
    }
    // ... 60 months
  ]
}
```

### 6. Year-to-Date Chart (weekly intervals)
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=ytd
```

**Auto-selected interval**: `week`

**Response**:
```json
{
  "symbol": "AAPL",
  "range": "ytd",
  "interval": "week",
  "data": [
    {
      "timestamp": 1704067200,
      "open": 185.50,
      "high": 187.20,
      "low": 184.30,
      "close": 186.75,
      "volume": 234567890
    }
    // ... weeks from Jan 1 to now
  ]
}
```

### 7. Custom Interval Override
```bash
curl http://localhost:9000/api/stocks/AAPL/historical?range=week&interval=thirty_minute
```

**Manual interval**: `thirty_minute` (overrides auto-selection)

## React Component Usage

### Basic Usage
```typescript
import { useHistoricalChartData } from '@/lib/stocksQueries';

function StockChart({ symbol }: { symbol: string }) {
  const { data, isLoading, error } = useHistoricalChartData(symbol, "day");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading chart</div>;

  return (
    <div>
      {data?.data.map(point => (
        <div key={point.timestamp}>
          {new Date(point.timestamp * 1000).toLocaleString()}: ${point.close}
        </div>
      ))}
    </div>
  );
}
```

### Advanced Usage with Period Switching
```typescript
import { useState } from 'react';
import { useHistoricalChartData, ChartRange } from '@/lib/stocksQueries';

function InteractiveChart({ symbol }: { symbol: string }) {
  const [range, setRange] = useState<ChartRange>("day");
  const { data, isLoading } = useHistoricalChartData(symbol, range);

  return (
    <div>
      <div>
        {["day", "week", "month", "year", "five_year", "ytd"].map(r => (
          <button
            key={r}
            onClick={() => setRange(r as ChartRange)}
            className={range === r ? "active" : ""}
          >
            {r}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div>Loading chart...</div>
      ) : (
        <AreaChart data={data?.data || []} />
      )}
    </div>
  );
}
```

## Caching Behavior

### Backend Cache
- **Intraday** (`day`, `day_hybrid`, `week`): 60 seconds
- **Historical** (`month`, `year`, `five_year`, `ytd`): 5 minutes

### Frontend Cache (React Query)
- **Intraday**: 1 minute stale time, auto-refetch on window focus
- **Historical**: 5 minute stale time, no auto-refetch

### Cache Keys
```typescript
// React Query automatically caches based on these keys:
['stocks', 'historical-chart', 'AAPL', 'day', undefined]
['stocks', 'historical-chart', 'AAPL', 'month', undefined]
['stocks', 'historical-chart', 'AAPL', 'week', 'thirty_minute']
```

## Error Handling

### Backend Errors
If the external API fails, the backend will:
1. Try to serve stale cached data
2. Return 500 error if no cache available

### Frontend Errors
React Query will:
1. Retry failed requests 3 times
2. Show error state in UI
3. Allow manual retry

## Data Format Notes

1. **Timestamps**: Unix epoch time in **seconds** (not milliseconds)
   - Frontend: Multiply by 1000 for JavaScript Date
   - Example: `1704067200` → `new Date(1704067200 * 1000)`

2. **Prices**: All prices are in USD (or stock's native currency)
   - Use close price for chart display
   - Open, high, low available for candlestick charts (future enhancement)

3. **Volume**: Trading volume (optional field)
   - Can be displayed as bar chart below price chart (future enhancement)

## Testing with curl

```bash
# Set your auth token (if testing external API directly)
export AUTH_TOKEN="your_token_here"

# Test through local proxy
curl http://localhost:9000/api/stocks/AAPL/historical?range=day

# Test with different symbols
curl http://localhost:9000/api/stocks/TSLA/historical?range=week
curl http://localhost:9000/api/stocks/GOOGL/historical?range=month

# Test with manual interval
curl http://localhost:9000/api/stocks/AAPL/historical?range=month&interval=week
```

## Common Issues

### Issue: Empty data array
**Cause**: Stock symbol might not exist or API is down
**Solution**: Check symbol spelling, verify API status

### Issue: Stale data showing
**Cause**: Cache TTL not expired
**Solution**: Wait for cache to expire or clear cache

### Issue: Chart not updating on period change
**Cause**: React Query cache hit
**Solution**: This is expected behavior - cache prevents unnecessary API calls

### Issue: TypeScript errors with range/interval
**Cause**: Using invalid range or interval value
**Solution**: Use only allowed values from `ChartRange` and `ChartInterval` types
