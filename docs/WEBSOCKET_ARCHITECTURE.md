# WebSocket Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         React Application                        │
│                                                                   │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │   StockCell    │  │ StockCompactCard│  │ Custom Component│   │
│  │                │  │                 │  │                │   │
│  │ Uses: Hook ✓   │  │  Uses: Hook ✓   │  │  Uses: Hook ✓  │   │
│  └───────┬────────┘  └────────┬────────┘  └────────┬───────┘   │
│          │                     │                     │           │
│          └─────────────────────┼─────────────────────┘           │
│                                │                                 │
│                    ┌───────────▼──────────┐                     │
│                    │  useStockLiveTicker  │                     │
│                    │      (React Hook)     │                     │
│                    │                       │                     │
│                    │ - Subscribes          │                     │
│                    │ - Manages state       │                     │
│                    │ - Handles updates     │                     │
│                    └───────────┬───────────┘                     │
│                                │                                 │
│                    ┌───────────▼──────────┐                     │
│                    │   stockTickerWS      │                     │
│                    │  (WebSocket Manager)  │                     │
│                    │                       │                     │
│                    │ - Single connection   │                     │
│                    │ - Manages subs        │                     │
│                    │ - Handles reconnect   │                     │
│                    │ - Caches messages     │                     │
│                    └───────────┬───────────┘                     │
│                                │                                 │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
                                 │ WebSocket (WSS/WS)
                                 │
                    ┌────────────▼──────────┐
                    │  Baraka WebSocket     │
                    │       Service         │
                    │                       │
                    │ b-agent.*.getbaraka   │
                    │                       │
                    │ - Sends ticker updates│
                    │ - Handles subscriptions│
                    │ - Pings clients       │
                    └───────────────────────┘
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Root                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            WebSocket Manager (Singleton)              │  │
│  │                                                        │  │
│  │  State: CONNECTED / DISCONNECTED / RECONNECTING       │  │
│  │  Cache: { AAPL: {...}, GOOGL: {...}, ... }          │  │
│  │  Subscriptions: { AAPL: [handler1, handler2], ... } │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ▲                                  │
│                           │                                  │
│  ┌────────────────────────┼──────────────────────────────┐  │
│  │                        │                               │  │
│  │   Stock List Page      │    Stock Detail Page         │  │
│  │                        │                               │  │
│  │   ┌──────────┐  ┌──────────┐    ┌──────────┐        │  │
│  │   │ StockCell│  │ StockCell│    │ StockCell│        │  │
│  │   │  (AAPL)  │  │ (GOOGL)  │    │ (MSFT)   │        │  │
│  │   └────┬─────┘  └────┬─────┘    └────┬─────┘        │  │
│  │        │             │               │               │  │
│  │        └─────────────┼───────────────┘               │  │
│  │                      │                               │  │
│  │              All use useStockLiveTicker hook         │  │
│  │              (each subscribes independently)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Subscription Flow

```
Component Mount
      │
      ▼
useStockLiveTicker(instrumentId)
      │
      ├─→ Check cache
      │   └─→ If found: Immediately return cached data
      │
      ▼
stockTickerWS.subscribe(instrumentId, handler)
      │
      ├─→ Add to subscriptions map
      │
      ├─→ Send subscription message to server
      │   {
      │     "type": "ticker",
      │     "payload": {
      │       "instrumentId": "AAPL",
      │       "isSubscribe": true
      │     }
      │   }
      │
      └─→ Return unsubscribe function
```

### 2. Update Flow

```
WebSocket receives message
      │
      ▼
Parse JSON
      │
      ▼
Check message type
      │
      ├─→ PING → Send PONG
      │
      └─→ TICKER
            │
            ▼
      Extract instrumentId
            │
            ▼
      Update cache
            │
            ▼
      Find all handlers for instrumentId
            │
            ▼
      Call each handler with new data
            │
            ▼
      React components re-render
            │
            ▼
      UI updates with new price
```

### 3. Reconnection Flow

```
Connection Lost
      │
      ▼
Clear ping interval
      │
      ▼
Update state: RECONNECTING
      │
      ▼
Wait 5 seconds
      │
      ▼
Attempt reconnection
      │
      ├─→ Success
      │   │
      │   ├─→ Update state: CONNECTED
      │   ├─→ Restart ping interval
      │   ├─→ Resubscribe all instruments
      │   └─→ Flush queued messages
      │
      └─→ Failure
          └─→ Repeat from "Wait 5 seconds"
```

## State Management

### Connection States

```
┌─────────────┐
│ DISCONNECTED│
└──────┬──────┘
       │
       │ connect()
       ▼
┌─────────────┐
│ CONNECTING  │
└──────┬──────┘
       │
       │ onopen
       ▼
┌─────────────┐      onerror      ┌─────────────┐
│  CONNECTED  │──────────────────▶│    ERROR    │
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       │ onclose                          │
       ▼                                  │
┌─────────────┐                          │
│RECONNECTING │◀─────────────────────────┘
└──────┬──────┘
       │
       │ After 5s
       │
       └──────▶ Back to CONNECTING
```

### Subscription Lifecycle

```
Component Mounts
      │
      ▼
┌─────────────────┐
│  NOT SUBSCRIBED │
└────────┬────────┘
         │
         │ useStockLiveTicker()
         ▼
┌─────────────────┐
│   SUBSCRIBING   │  ← Send subscribe message
└────────┬────────┘
         │
         │ Server acknowledges (implicit)
         ▼
┌─────────────────┐
│   SUBSCRIBED    │  ← Receiving updates
└────────┬────────┘
         │
         │ Component unmounts
         ▼
┌─────────────────┐
│ UNSUBSCRIBING   │  ← Send unsubscribe message
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ NOT SUBSCRIBED  │
└─────────────────┘
```

## Memory Management

### Subscription Map Structure

```javascript
subscriptions: Map<string, Set<MessageHandler>>

Example:
{
  "AAPL": Set([handler1, handler2, handler3]),
  "GOOGL": Set([handler4]),
  "MSFT": Set([handler5, handler6])
}

// When component A subscribes to AAPL:
subscriptions.get("AAPL").add(handlerA)

// When component B also subscribes to AAPL:
subscriptions.get("AAPL").add(handlerB)
// Result: Only 1 WebSocket subscription, 2 handlers

// When component A unmounts:
subscriptions.get("AAPL").delete(handlerA)
// Still 1 handler left, keep subscription active

// When component B unmounts:
subscriptions.get("AAPL").delete(handlerB)
// No handlers left, send unsubscribe to server
```

### Message Cache Structure

```javascript
messageCache: Map<string, StockTickerMessage>

Example:
{
  "AAPL": {
    type: "ticker",
    instrumentId: "AAPL",
    price: 150.25,
    closePrice: 148.50,
    timestamp: 1640000000
  },
  "GOOGL": {
    type: "ticker",
    instrumentId: "GOOGL",
    price: 140.80,
    closePrice: 142.10,
    timestamp: 1640000001
  }
}

// Used for:
// 1. Immediate data on subscription
// 2. Fallback when connection lost
// 3. Persistence across reconnections
```

## Performance Characteristics

### Scalability

```
Components subscribed: 1-10    → No performance impact
Components subscribed: 10-50   → Minimal impact (< 1ms per update)
Components subscribed: 50-100  → Moderate impact (1-5ms per update)
Components subscribed: 100+    → Consider optimization

Optimization strategies:
- Virtualize lists (only subscribe to visible items)
- Debounce updates
- Batch re-renders
```

### Network Usage

```
Connection:
- Initial: ~1KB (WebSocket handshake)
- Ping/Pong: ~50 bytes every 30s
- Subscribe: ~100 bytes per instrument
- Update: ~200 bytes per message

Example for 10 stocks with 1 update/second:
- 10 subscribes: ~1KB
- Updates: 200 bytes × 10 stocks × 60s = ~120KB/min
- Pings: ~100 bytes/min
- Total: ~121KB/min (~2KB/s)
```

## Error Handling Strategy

```
┌─────────────────────┐
│   WebSocket Error   │
└──────────┬──────────┘
           │
           ▼
     ┌────────────┐
     │ Log Error  │
     └─────┬──────┘
           │
           ▼
    ┌──────────────┐
    │ Update State │
    │   to ERROR   │
    └──────┬───────┘
           │
           ▼
   ┌────────────────┐
   │ Schedule       │
   │ Reconnection   │
   └────────┬───────┘
           │
           ▼
   ┌────────────────┐
   │ Components     │
   │ show fallback  │
   └────────────────┘
```

## Integration Points

### With React Query

```
┌──────────────────┐     ┌──────────────────┐
│   React Query    │     │   WebSocket      │
│                  │     │                  │
│ Initial data     │────▶│ Real-time updates│
│ (HTTP API)       │     │ (Live prices)    │
└──────────────────┘     └──────────────────┘
        │                         │
        │                         │
        ▼                         ▼
    ┌────────────────────────────────┐
    │       Component State          │
    │                                │
    │  Initial: From React Query     │
    │  Live: From WebSocket          │
    └────────────────────────────────┘
```

### With State Management

```
┌──────────────┐
│  WebSocket   │
│   Manager    │
└──────┬───────┘
       │
       │ Updates
       ▼
┌──────────────┐      ┌──────────────┐
│ React Hook   │      │ Redux/Zustand│
│  State       │◀────▶│   Store      │
└──────────────┘      └──────────────┘
       │                     │
       │                     │
       ▼                     ▼
┌──────────────────────────────┐
│        Components            │
└──────────────────────────────┘

Note: Current implementation uses
React state only (no global store)
```

## Security Considerations

```
┌─────────────────────────────────────────┐
│           Browser                       │
│                                         │
│  1. WSS (Encrypted)                     │
│  2. Token in query param                │
│  3. Same-origin policy                  │
│  4. No sensitive data in cache          │
│                                         │
└────────────┬────────────────────────────┘
             │
             │ WSS (TLS/SSL)
             │ ?access_token=***
             │
┌────────────▼────────────────────────────┐
│      Baraka WebSocket Service           │
│                                         │
│  1. Validates token                     │
│  2. Authenticates user                  │
│  3. Authorizes data access              │
│  4. Rate limiting                       │
│                                         │
└─────────────────────────────────────────┘
```

## Testing Strategy

```
┌──────────────────────────────────────────┐
│            Unit Tests                    │
│                                          │
│  - WebSocket Manager methods             │
│  - Hook behavior                         │
│  - State transitions                     │
│  - Cache operations                      │
│                                          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         Integration Tests                │
│                                          │
│  - Component + Hook                      │
│  - Multiple subscriptions                │
│  - Reconnection scenarios                │
│  - Error handling                        │
│                                          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│           E2E Tests                      │
│                                          │
│  - Full user flows                       │
│  - Real WebSocket connection             │
│  - Network conditions                    │
│  - Browser compatibility                 │
│                                          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         Manual Testing                   │
│                                          │
│  - Live Ticker Demo page                 │
│  - Connection controls                   │
│  - Visual verification                   │
│  - Performance monitoring                │
│                                          │
└──────────────────────────────────────────┘
```

## Monitoring & Observability

```
┌─────────────────────────────────────────┐
│          Metrics to Track               │
│                                         │
│  1. Connection uptime                   │
│  2. Reconnection frequency              │
│  3. Message latency                     │
│  4. Subscription count                  │
│  5. Error rates                         │
│  6. Cache hit rate                      │
│                                         │
└─────────────────────────────────────────┘

Implementation:
stockTickerWS.onStateChange((state) => {
  analytics.track('ws_state', { state });
});
```

This architecture provides a robust, scalable, and maintainable WebSocket solution that integrates seamlessly with the existing React application while following best practices from the Flutter implementation.
