# WebSocket Integration Guide

## Quick Start

The WebSocket implementation is ready to use. Follow these steps to integrate it into your application.

## 1. Basic Integration

The `StockCell` and `StockCompactCard` components now automatically support live updates. No changes needed if you're already using these components!

### Example: Existing Code Works Automatically

```tsx
// Before - Static data
<StockCell
  symbol="AAPL"
  name="Apple Inc."
  price={150.25}
  changePercent={2.5}
  imageUrl="/path/to/logo.png"
/>

// After - Now shows live updates automatically!
// Same code, but prices update in real-time
<StockCell
  symbol="AAPL"
  name="Apple Inc."
  price={150.25}  // Used as initial/fallback value
  changePercent={2.5}  // Used as initial/fallback value
  imageUrl="/path/to/logo.png"
/>
```

### Using instrumentId for Better Accuracy

```tsx
<StockCell
  symbol="AAPL"
  instrumentId="AAPL"  // Preferred over symbol when available
  name="Apple Inc."
  price={150.25}
  changePercent={2.5}
  imageUrl="/path/to/logo.png"
/>
```

### Disabling Live Updates (When Needed)

```tsx
<StockCell
  symbol="AAPL"
  name="Apple Inc."
  price={150.25}
  changePercent={2.5}
  enableLiveTicker={false}  // Shows static data only
  imageUrl="/path/to/logo.png"
/>
```

## 2. Using the Hook Directly

For custom components, use the `useStockLiveTicker` hook:

```tsx
import { useStockLiveTicker } from '@/hooks/useStockLiveTicker';

function MyStockComponent({ instrumentId }) {
  const {
    price,
    changePercent,
    isConnected,
    isLoading
  } = useStockLiveTicker({
    instrumentId,
    initialPrice: 150.00,
    initialChangePercent: 2.5
  });

  return (
    <div>
      <h2>{instrumentId}</h2>
      <p>${price?.toFixed(2)}</p>
      <p>{changePercent?.toFixed(2)}%</p>
      {!isConnected && <span>Offline</span>}
    </div>
  );
}
```

## 3. Adding WebSocket Status Indicator

Show connection status to users:

```tsx
import { WebSocketIndicator } from '@/components/WebSocketIndicator';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      {/* Shows a green dot when connected */}
      <WebSocketIndicator showText={true} />
    </header>
  );
}
```

## 4. Demo Page (Optional)

To test the WebSocket implementation, add the demo page to your router.

### Option A: Add to Existing Router

If you're using `wouter`:

```tsx
// In your main App or router file
import { Route } from 'wouter';
import { LiveTickerDemo } from '@/components/LiveTickerDemo';

function App() {
  return (
    <>
      {/* Your existing routes */}
      <Route path="/" component={HomePage} />
      <Route path="/stock/:symbol" component={StockDetailPage} />

      {/* Add demo route */}
      <Route path="/demo/live-ticker" component={LiveTickerDemo} />
    </>
  );
}
```

Then visit `http://localhost:9000/demo/live-ticker` to see the demo.

### Option B: Development Only

```tsx
function App() {
  const isDev = import.meta.env.DEV;

  return (
    <>
      {/* Your existing routes */}
      <Route path="/" component={HomePage} />

      {/* Demo route only in development */}
      {isDev && <Route path="/demo/live-ticker" component={LiveTickerDemo} />}
    </>
  );
}
```

## 5. Connection Management

### Global Connection Control

```tsx
import { useWebSocketConnection } from '@/hooks/useStockLiveTicker';

function SettingsPage() {
  const {
    isConnected,
    reconnect,
    disconnect
  } = useWebSocketConnection();

  return (
    <div>
      <h2>WebSocket Settings</h2>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

      <button onClick={reconnect}>
        Reconnect
      </button>

      <button onClick={disconnect}>
        Disconnect
      </button>
    </div>
  );
}
```

### Authentication

If you have user authentication:

```tsx
import { useWebSocketConnection } from '@/hooks/useStockLiveTicker';
import { useEffect } from 'react';

function App() {
  const { setAuthToken } = useWebSocketConnection();
  const user = useAuth(); // Your auth hook

  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
    } else {
      setAuthToken(null);
    }
  }, [user?.token, setAuthToken]);

  return <YourApp />;
}
```

## 6. Update Callbacks

Get notified when prices change:

```tsx
function MyComponent() {
  const [priceHistory, setPriceHistory] = useState([]);

  useStockLiveTicker({
    instrumentId: 'AAPL',
    onUpdate: (update) => {
      console.log('Price updated:', update.price);

      // Track price history
      setPriceHistory(prev => [...prev, {
        price: update.price,
        timestamp: update.timestamp
      }]);

      // Show notification
      if (update.price > 200) {
        showNotification('AAPL is over $200!');
      }
    }
  });
}
```

## 7. Multiple Stocks

Subscribe to multiple stocks efficiently:

```tsx
function StockList({ stocks }) {
  return (
    <div>
      {stocks.map(stock => (
        // Each component subscribes independently
        // But shares the same WebSocket connection
        <StockCell
          key={stock.instrumentId}
          symbol={stock.symbol}
          instrumentId={stock.instrumentId}
          name={stock.name}
          price={stock.lastPrice}
          changePercent={stock.changePercent}
        />
      ))}
    </div>
  );
}
```

## 8. Error Handling

Handle errors gracefully:

```tsx
function StockPrice({ instrumentId }) {
  const { price, error, isConnected } = useStockLiveTicker({
    instrumentId,
    initialPrice: 150.00
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isConnected) {
    return (
      <div>
        <p>${price?.toFixed(2)} (Offline)</p>
        <span className="text-yellow-500">
          Showing last known price
        </span>
      </div>
    );
  }

  return <p>${price?.toFixed(2)}</p>;
}
```

## 9. Performance Tips

### Conditional Subscription

Only subscribe when needed:

```tsx
function StockDetail({ instrumentId }) {
  const [isLiveView, setIsLiveView] = useState(true);

  const { price } = useStockLiveTicker({
    instrumentId,
    enabled: isLiveView  // Only subscribe when live view is active
  });

  return (
    <div>
      <button onClick={() => setIsLiveView(!isLiveView)}>
        {isLiveView ? 'Disable Live' : 'Enable Live'}
      </button>
      <p>${price?.toFixed(2)}</p>
    </div>
  );
}
```

### Cleanup on Unmount

The hook automatically cleans up subscriptions when components unmount. No manual cleanup needed!

```tsx
function MyComponent() {
  // Subscription is created
  const { price } = useStockLiveTicker({ instrumentId: 'AAPL' });

  // Automatically unsubscribes when component unmounts
  return <p>${price}</p>;
}
```

## 10. Testing

### Check Connection State

Open browser console and check for WebSocket logs:

```
[WebSocket] Connecting to: ws://...
[WebSocket] Connected successfully
[WebSocket] Subscribing to AAPL
[WebSocket] Message received: {...}
```

### Verify Network Activity

1. Open Browser DevTools
2. Go to Network tab
3. Filter by "WS" (WebSocket)
4. You should see a WebSocket connection to `b-agent.*.getbaraka.com`

### Test Reconnection

1. Open demo page: `/demo/live-ticker`
2. Click "Disconnect"
3. Click "Reconnect"
4. Verify connection reestablishes and data flows again

## 11. Troubleshooting

### No Updates Received

```tsx
// Add logging to debug
const { price } = useStockLiveTicker({
  instrumentId: 'AAPL',
  onUpdate: (update) => {
    console.log('Update received:', update);
  }
});
```

### Connection Issues

Check the browser console for error messages:
- `[WebSocket] Connection error` - Network or URL issue
- `[WebSocket] Connection timeout` - Server not responding
- `[WebSocket] Connection closed` - Check reason code

### Verify WebSocket URL

```tsx
import { stockTickerWS } from '@/lib/websocket/stockTickerWebSocket';

// In browser console
console.log('Current state:', stockTickerWS.getState());
```

## 12. Production Checklist

Before deploying:

- [ ] Test on production WebSocket URL
- [ ] Verify authentication works
- [ ] Test automatic reconnection
- [ ] Check error handling
- [ ] Monitor connection quality
- [ ] Add analytics/monitoring
- [ ] Test with multiple instruments
- [ ] Verify memory doesn't leak
- [ ] Test on slow connections
- [ ] Test on mobile devices

## 13. Environment Configuration

The system automatically selects the correct environment:

- **Development** (localhost): Uses `ws://b-agent.dev.app.getbaraka.com/api`
- **Production**: Uses `wss://b-agent.production.axasbjeg.com/api`

No configuration needed!

## 14. Advanced Usage

### Custom WebSocket Manager

If you need more control:

```tsx
import { stockTickerWS } from '@/lib/websocket/stockTickerWebSocket';

// Manual subscription (without React hook)
const unsubscribe = stockTickerWS.subscribe('AAPL', (message) => {
  console.log('AAPL update:', message);
});

// Later...
unsubscribe();
```

### Connection State Monitoring

```tsx
import { stockTickerWS } from '@/lib/websocket/stockTickerWebSocket';

const removeListener = stockTickerWS.onStateChange((state) => {
  console.log('Connection state:', state);

  // Send to analytics
  analytics.track('websocket_state', { state });
});

// Later...
removeListener();
```

## 15. Migration Guide

If you have existing components using static data:

### Before
```tsx
function StockPrice({ symbol, price, changePercent }) {
  return (
    <div>
      <span>{symbol}</span>
      <span>${price}</span>
      <span>{changePercent}%</span>
    </div>
  );
}
```

### After
```tsx
import { useStockLiveTicker } from '@/hooks/useStockLiveTicker';

function StockPrice({ symbol, price: initialPrice, changePercent: initialChangePercent }) {
  const { price, changePercent } = useStockLiveTicker({
    instrumentId: symbol,
    initialPrice,
    initialChangePercent
  });

  return (
    <div>
      <span>{symbol}</span>
      <span>${price?.toFixed(2)}</span>
      <span>{changePercent?.toFixed(2)}%</span>
    </div>
  );
}
```

## Summary

The WebSocket implementation is:
- ✅ **Ready to use** - No additional setup needed
- ✅ **Automatic** - Components auto-connect and subscribe
- ✅ **Robust** - Handles disconnections and errors gracefully
- ✅ **Efficient** - Single connection shared across app
- ✅ **Type-safe** - Full TypeScript support

Just use the components and hooks as shown above, and you'll have real-time stock updates!
