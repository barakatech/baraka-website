# WebSocket Implementation for Stock Live Ticker

## Overview

This implementation provides real-time stock price updates using WebSocket connections, following the same architecture as the Baraka Flutter app. The system is designed to be robust, with automatic reconnection, caching, and graceful fallbacks.

## Architecture

### Components

1. **WebSocket Manager** (`client/src/lib/websocket/stockTickerWebSocket.ts`)
   - Singleton service that manages the WebSocket connection
   - Handles connection lifecycle (connect, reconnect, disconnect)
   - Manages subscriptions for multiple instruments
   - Implements message caching and queuing
   - Automatic ping/pong for connection health

2. **React Hook** (`client/src/hooks/useStockLiveTicker.ts`)
   - `useStockLiveTicker`: Subscribe to live updates for a specific instrument
   - `useWebSocketConnection`: Manage connection state globally
   - Provides initial values as fallback until live data arrives

3. **UI Components**
   - `StockCell`: Updated to use live ticker data
   - `StockCompactCard`: Updated to use live ticker data
   - `WebSocketIndicator`: Visual indicator of connection status

## Usage

### Basic Usage

```tsx
import { useStockLiveTicker } from '@/hooks/useStockLiveTicker';

function StockPrice({ instrumentId }) {
  const { price, changePercent, isConnected } = useStockLiveTicker({
    instrumentId,
    initialPrice: 150.00,
    initialChangePercent: 2.5,
  });

  return (
    <div>
      <p>${price?.toFixed(2)}</p>
      <p>{changePercent?.toFixed(2)}%</p>
      {!isConnected && <span>Offline</span>}
    </div>
  );
}
```

### With Update Callback

```tsx
const { price, changePercent } = useStockLiveTicker({
  instrumentId: 'AAPL',
  onUpdate: (update) => {
    console.log('New price:', update.price);
    // Handle update (e.g., show notification, update chart)
  }
});
```

### Disable Live Updates

```tsx
const { price } = useStockLiveTicker({
  instrumentId: 'AAPL',
  initialPrice: 150.00,
  enabled: false  // Only use initial values, no WebSocket
});
```

### Connection Management

```tsx
import { useWebSocketConnection } from '@/hooks/useStockLiveTicker';

function App() {
  const { isConnected, reconnect, disconnect } = useWebSocketConnection();

  return (
    <div>
      <span>Status: {isConnected ? 'Connected' : 'Disconnected'}</span>
      <button onClick={reconnect}>Reconnect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

### WebSocket Indicator

```tsx
import { WebSocketIndicator } from '@/components/WebSocketIndicator';

function Header() {
  return (
    <div>
      <WebSocketIndicator showText={true} />
    </div>
  );
}
```

## WebSocket Protocol

### Connection

The WebSocket connects to:
- **Development**: `ws://b-agent.dev.app.getbaraka.com/api`
- **Production**: `wss://b-agent.production.axasbjeg.com/api`

Authentication is done via query parameter:
```
?access_token=YOUR_TOKEN
```

### Message Format

#### Subscribe to Ticker
```json
{
  "type": "ticker",
  "payload": {
    "ticker": "AAPL",
    "instrumentId": "AAPL",
    "isSubscribe": true
  },
  "hash": "unique-request-id"
}
```

#### Unsubscribe from Ticker
```json
{
  "type": "ticker",
  "payload": {
    "ticker": "AAPL",
    "instrumentId": "AAPL",
    "isSubscribe": false
  },
  "hash": "unique-request-id"
}
```

#### Ticker Update (from server)
```json
{
  "type": "ticker",
  "symbol": "AAPL",
  "instrumentId": "AAPL",
  "price": 150.25,
  "closePrice": 148.50,
  "volume": 1234567,
  "timestamp": 1640000000
}
```

## Features

### Automatic Reconnection
- Reconnects automatically on connection loss
- 5-second delay between reconnection attempts
- Resubscribes to all active instruments on reconnect

### Message Caching
- Caches last message for each instrument
- Provides cached data immediately on subscription
- Survives reconnections

### Message Queuing
- Queues messages when disconnected
- Sends queued messages on reconnection
- Prevents message loss

### Connection Health
- Sends ping every 30 seconds
- Responds to server pings with pong
- Monitors connection state

### Error Handling
- Graceful degradation on errors
- Falls back to initial values
- Shows connection status to user

### Performance Optimizations
- Singleton pattern (single connection for all components)
- Shared subscriptions (multiple components can subscribe to same instrument)
- Message deduplication (ignores duplicate messages with same price)
- Efficient subscription management

## Connection States

| State | Description |
|-------|-------------|
| `CONNECTING` | Initial connection attempt in progress |
| `CONNECTED` | Successfully connected and ready |
| `RECONNECTING` | Lost connection, attempting to reconnect |
| `DISCONNECTED` | Not connected and not attempting to connect |
| `ERROR` | Connection error occurred |

## Component Updates

### StockCell
- Added `instrumentId` prop (optional, defaults to symbol)
- Added `enableLiveTicker` prop (optional, defaults to true)
- Shows subtle loading state while waiting for data
- Gracefully falls back to initial values

### StockCompactCard
- Same enhancements as StockCell
- Optimized for smaller display

## Environment Configuration

The WebSocket URL is automatically selected based on environment:
- **Development** (localhost): Uses dev WebSocket URL with dev token
- **Production**: Uses production WebSocket URL (requires auth token)

## Best Practices

1. **Always provide initial values**: Ensures UI shows something while waiting for live data
   ```tsx
   useStockLiveTicker({
     instrumentId: 'AAPL',
     initialPrice: 150.00,  // ✓ Good
     initialChangePercent: 2.5
   });
   ```

2. **Use instrumentId when available**: Prefer instrumentId over symbol for accuracy
   ```tsx
   <StockCell
     symbol="AAPL"
     instrumentId="instrument_123"  // ✓ More accurate
     price={150}
     changePercent={2.5}
   />
   ```

3. **Disable live updates for static lists**: Reduce load when live updates aren't needed
   ```tsx
   useStockLiveTicker({
     instrumentId: 'AAPL',
     enabled: false  // ✓ For static/archived data
   });
   ```

4. **Use connection indicator**: Show users the connection status
   ```tsx
   <WebSocketIndicator showText={true} />
   ```

## Troubleshooting

### Not receiving updates
1. Check WebSocket connection state
2. Verify instrumentId is correct
3. Check browser console for errors
4. Ensure WebSocket URL is accessible

### Frequent reconnections
1. Check network stability
2. Verify authentication token is valid
3. Check for server-side issues
4. Review connection timeout settings

### High memory usage
1. Ensure components unmount properly
2. Check for subscription leaks
3. Review number of active subscriptions
4. Consider disabling unused tickers

## Future Enhancements

- [ ] Add support for batch subscriptions
- [ ] Implement ticker groups (subscribe to multiple at once)
- [ ] Add historical data buffering
- [ ] Support for indices and other asset types
- [ ] Compression for high-frequency updates
- [ ] Metrics and monitoring dashboard
- [ ] Offline mode with local cache

## References

- Flutter Implementation: `baraka-flutter/source/core/domain/lib/src/presentation/stock_live_ticker/`
- WebSocket Package: Native WebSocket API
- Protocol Documentation: Baraka API docs
