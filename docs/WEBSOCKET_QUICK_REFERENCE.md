# WebSocket Quick Reference

## Hook API

### useStockLiveTicker

```tsx
const {
  price,              // number | null - Current price
  changePrice,        // number | null - Price change ($)
  changePercent,      // number | null - Price change (%)
  closePrice,         // number | null - Previous close
  volume,            // number | null - Volume
  isLoading,         // boolean - Loading state
  isConnected,       // boolean - Connection status
  connectionState,   // ConnectionState - Full state
  error              // string | null - Error message
} = useStockLiveTicker({
  instrumentId: 'AAPL',           // Required
  initialPrice: 150.00,           // Optional - fallback value
  initialChangePrice: 1.75,       // Optional - fallback value
  initialChangePercent: 2.5,      // Optional - fallback value
  onUpdate: (update) => {},       // Optional - update callback
  enabled: true                   // Optional - enable/disable (default: true)
});
```

### useWebSocketConnection

```tsx
const {
  connectionState,    // ConnectionState - Current state
  isConnected,       // boolean - Is connected?
  isConnecting,      // boolean - Is connecting?
  isReconnecting,    // boolean - Is reconnecting?
  isDisconnected,    // boolean - Is disconnected?
  hasError,          // boolean - Has error?
  reconnect,         // () => void - Reconnect manually
  disconnect,        // () => void - Disconnect
  setAuthToken       // (token: string | null) => void - Set auth
} = useWebSocketConnection();
```

## Component Props

### StockCell

```tsx
<StockCell
  symbol="AAPL"              // Required
  name="Apple Inc."          // Required
  price={150.25}            // Required - initial/fallback
  changePercent={2.5}       // Required - initial/fallback
  imageUrl="/logo.png"      // Optional
  href="/stock/aapl"        // Optional
  instrumentId="AAPL"       // Optional - defaults to symbol
  enableLiveTicker={true}   // Optional - defaults to true
/>
```

### StockCompactCard

```tsx
<StockCompactCard
  symbol="AAPL"              // Required
  price={150.25}            // Required - initial/fallback
  changePercent={2.5}       // Required - initial/fallback
  imageUrl="/logo.png"      // Optional
  href="/stock/aapl"        // Optional
  instrumentId="AAPL"       // Optional - defaults to symbol
  enableLiveTicker={true}   // Optional - defaults to true
/>
```

### WebSocketIndicator

```tsx
<WebSocketIndicator
  showText={false}          // Optional - show status text
  className=""              // Optional - custom classes
/>
```

## Connection States

```tsx
enum ConnectionState {
  CONNECTING = 'connecting',      // Initial connection
  CONNECTED = 'connected',        // Active connection
  RECONNECTING = 'reconnecting',  // Attempting reconnect
  DISCONNECTED = 'disconnected',  // Not connected
  ERROR = 'error'                 // Connection error
}
```

## WebSocket Manager API

```tsx
import { stockTickerWS } from '@/lib/websocket/stockTickerWebSocket';

// Subscribe to ticker updates
const unsubscribe = stockTickerWS.subscribe(
  'AAPL',
  (message) => console.log(message)
);

// Unsubscribe
unsubscribe();

// Listen to connection state
const removeListener = stockTickerWS.onStateChange(
  (state) => console.log(state)
);

// Get current state
const state = stockTickerWS.getState();

// Get cached data
const cachedData = stockTickerWS.getCachedData('AAPL');

// Set auth token
stockTickerWS.setAuthToken('your-token');

// Manual reconnect
stockTickerWS.reconnect();

// Disconnect
stockTickerWS.disconnect();

// Clear caches
stockTickerWS.clear();
```

## Message Types

### Ticker Update (from server)

```typescript
interface StockTickerMessage {
  type: string;              // "ticker"
  symbol?: string;           // "AAPL"
  instrumentId?: string;     // "AAPL"
  price?: number;           // 150.25
  closePrice?: number;      // 148.50
  changePrice?: number;     // 1.75
  changePercent?: number;   // 1.18
  volume?: number;          // 1234567
  timestamp?: number;       // Unix timestamp
}
```

### Ticker Update (in callback)

```typescript
interface TickerUpdate {
  instrumentId: string;     // "AAPL"
  price: number;           // 150.25
  changePrice: number;     // 1.75
  changePercent: number;   // 1.18
  closePrice: number;      // 148.50
  volume?: number;         // 1234567
  timestamp?: number;      // Unix timestamp
}
```

## Common Patterns

### Basic Usage

```tsx
const { price, changePercent } = useStockLiveTicker({
  instrumentId: 'AAPL',
  initialPrice: 150.00
});
```

### With Callback

```tsx
useStockLiveTicker({
  instrumentId: 'AAPL',
  onUpdate: (update) => {
    console.log('Price:', update.price);
  }
});
```

### Conditional Subscription

```tsx
const { price } = useStockLiveTicker({
  instrumentId: 'AAPL',
  enabled: isActive
});
```

### Error Handling

```tsx
const { price, error, isConnected } = useStockLiveTicker({
  instrumentId: 'AAPL'
});

if (error) return <div>Error: {error}</div>;
if (!isConnected) return <div>Offline</div>;
return <div>${price}</div>;
```

### Status Indicator

```tsx
<header>
  <h1>My App</h1>
  <WebSocketIndicator showText={true} />
</header>
```

### Manual Connection Control

```tsx
const { reconnect, disconnect } = useWebSocketConnection();

<button onClick={reconnect}>Reconnect</button>
<button onClick={disconnect}>Disconnect</button>
```

## Configuration

### WebSocket URLs

```
Development:  ws://b-agent.dev.app.getbaraka.com/api
Production:   wss://b-agent.production.axasbjeg.com/api
```

Auto-detected based on:
- `import.meta.env.DEV` or
- `window.location.hostname === 'localhost'`

### Timeouts & Intervals

```
Connection Timeout:    10 seconds
Reconnect Delay:       5 seconds
Ping Interval:         30 seconds
```

## Troubleshooting

### Check Connection

```tsx
import { stockTickerWS } from '@/lib/websocket/stockTickerWebSocket';

console.log('State:', stockTickerWS.getState());
console.log('Cached:', stockTickerWS.getCachedData('AAPL'));
```

### Browser DevTools

1. Open DevTools
2. Network tab → WS filter
3. Look for connection to `b-agent.*.getbaraka.com`
4. Check messages in/out

### Console Logs

Look for logs prefixed with:
- `[WebSocket]` - Manager logs
- `[useStockLiveTicker]` - Hook logs

## Performance Tips

1. **Use instrumentId**: More accurate than symbol
   ```tsx
   instrumentId="AAPL"  // ✓ Good
   ```

2. **Provide initial values**: Reduces perceived latency
   ```tsx
   initialPrice={150.00}  // ✓ Good
   ```

3. **Disable when not needed**: Save resources
   ```tsx
   enabled={isVisible}  // ✓ Good
   ```

4. **Share subscriptions**: Multiple components = 1 subscription
   ```tsx
   // Both components share same WebSocket subscription
   <StockCell instrumentId="AAPL" ... />
   <StockCell instrumentId="AAPL" ... />
   ```

## File Locations

```
client/src/
├── lib/
│   └── websocket/
│       └── stockTickerWebSocket.ts      # WebSocket manager
├── hooks/
│   └── useStockLiveTicker.ts           # React hooks
└── components/
    ├── StockCell.tsx                    # Updated with live ticker
    ├── StockCompactCard.tsx            # Updated with live ticker
    ├── WebSocketIndicator.tsx          # Status indicator
    └── LiveTickerDemo.tsx              # Demo page

docs/
├── WEBSOCKET_IMPLEMENTATION.md         # Full documentation
├── WEBSOCKET_INTEGRATION_GUIDE.md      # Integration guide
├── WEBSOCKET_ARCHITECTURE.md           # Architecture diagrams
├── WEBSOCKET_SUMMARY.md               # Implementation summary
└── WEBSOCKET_QUICK_REFERENCE.md       # This file
```

## Common Issues

### No updates received
- Check instrumentId is correct
- Verify WebSocket connection is active
- Check browser console for errors

### Frequent reconnections
- Check network stability
- Verify WebSocket URL is accessible
- Check authentication token

### High memory usage
- Ensure components unmount properly
- Check for subscription leaks
- Reduce number of simultaneous subscriptions

## Resources

- **Demo**: `/demo/live-ticker`
- **Docs**: `docs/WEBSOCKET_*.md`
- **Support**: Check browser console logs
- **Source**: Flutter implementation in `baraka-flutter`

---

**Need Help?**
1. Check logs: `[WebSocket]` and `[useStockLiveTicker]`
2. Test with demo page: `/demo/live-ticker`
3. Review: `docs/WEBSOCKET_IMPLEMENTATION.md`
4. Verify: Network tab → WS filter
