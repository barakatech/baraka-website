import { useState, useEffect, useRef } from 'react';
import { useStockLiveTicker, useWebSocketConnection } from '../hooks/useStockLiveTicker';
import { WebSocketIndicator } from './WebSocketIndicator';
import { ConnectionState } from '../lib/websocket/stockTickerWebSocket';

interface TickerDisplayProps {
  instrumentId: string;
  initialPrice?: number;
  initialChangePercent?: number;
}

function TickerDisplay({ instrumentId, initialPrice, initialChangePercent }: TickerDisplayProps) {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const previousChangeRef = useRef<number | null>(initialChangePercent ?? null);

  const {
    price,
    changePrice,
    changePercent,
    closePrice,
    volume,
    isLoading,
    isConnected,
    error
  } = useStockLiveTicker({
    instrumentId,
    initialPrice,
    initialChangePercent,
    onUpdate: (update) => {
      setUpdateCount(prev => prev + 1);
      setLastUpdate(new Date());
      console.log(`[${instrumentId}] Update:`, update);
    }
  });

  const isPositive = (changePercent ?? 0) >= 0;

  // Show dot briefly when changePercent changes
  useEffect(() => {
    if (changePercent !== null && changePercent !== previousChangeRef.current && previousChangeRef.current !== null) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      previousChangeRef.current = changePercent;
      return () => clearTimeout(timer);
    }
    if (changePercent !== null) {
      previousChangeRef.current = changePercent;
    }
  }, [changePercent]);

  return (
    <div className="bg-[#191919] rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">{instrumentId}</h3>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <span className="text-[#0DDD00] text-sm">● Live</span>
          ) : (
            <span className="text-gray-500 text-sm">● Offline</span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Current Price:</span>
          <span className={`text-white font-mono font-semibold ${isLoading ? 'opacity-50' : ''}`}>
            ${price?.toFixed(2) ?? '---'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Change:</span>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-semibold ${isPositive ? 'text-[#0DDD00]' : 'text-[#FF3317]'}`}>
              {changePrice !== null ? `$${changePrice.toFixed(2)}` : '---'}
              {changePercent !== null && (
                <span className="ml-2">
                  ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                </span>
              )}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isPulsing ? (isPositive ? 'bg-[#0DDD00]' : 'bg-[#FF3317]') : 'bg-transparent'}`} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Close Price:</span>
          <span className="text-white/80 font-mono text-sm">
            ${closePrice?.toFixed(2) ?? '---'}
          </span>
        </div>

        {volume !== null && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Volume:</span>
            <span className="text-white/80 font-mono text-sm">
              {volume.toLocaleString()}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/40">Updates:</span>
            <span className="text-white/60 font-mono">{updateCount}</span>
          </div>
          {lastUpdate && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40">Last Update:</span>
              <span className="text-white/60 font-mono">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
          )}
          {error && (
            <div className="text-[#FF3317] text-xs mt-1">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LiveTickerDemo() {
  const {
    connectionState,
    isConnected,
    reconnect,
    disconnect
  } = useWebSocketConnection();

  const demoStocks = [
    { symbol: 'AAPL', initialPrice: 150.25, initialChangePercent: 2.5 },
    { symbol: 'GOOGL', initialPrice: 140.80, initialChangePercent: -1.2 },
    { symbol: 'MSFT', initialPrice: 380.50, initialChangePercent: 1.8 },
    { symbol: 'TSLA', initialPrice: 245.30, initialChangePercent: -3.5 }
  ];

  const getStateColor = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTED:
        return 'text-[#0DDD00]';
      case ConnectionState.CONNECTING:
      case ConnectionState.RECONNECTING:
        return 'text-yellow-500';
      case ConnectionState.ERROR:
        return 'text-[#FF3317]';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#191919] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-white text-2xl font-bold">Live Stock Ticker Demo</h1>
            <WebSocketIndicator showText={true} />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/60">Status:</span>
              <span className={`font-semibold ${getStateColor()}`}>
                {connectionState.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={reconnect}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                disabled={isConnected}
              >
                Reconnect
              </button>
              <button
                onClick={disconnect}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                disabled={!isConnected}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <p className="text-blue-400 text-sm">
            <strong>Note:</strong> This demo connects to the Baraka WebSocket service.
            Prices will update in real-time when the market is open and the connection is active.
            The WebSocket automatically reconnects on connection loss.
          </p>
        </div>

        {/* Ticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoStocks.map((stock) => (
            <TickerDisplay
              key={stock.symbol}
              instrumentId={stock.symbol}
              initialPrice={stock.initialPrice}
              initialChangePercent={stock.initialChangePercent}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-[#191919] rounded-lg p-6 space-y-4">
          <h2 className="text-white text-xl font-semibold">How It Works</h2>

          <div className="space-y-3 text-white/70 text-sm">
            <div>
              <h3 className="text-white font-semibold mb-1">1. Connection</h3>
              <p>
                The WebSocket automatically connects on page load. A green dot indicates
                an active connection.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-1">2. Subscriptions</h3>
              <p>
                Each stock card subscribes to its instrument when mounted. Multiple components
                can subscribe to the same instrument efficiently.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-1">3. Updates</h3>
              <p>
                When the server sends a price update, all subscribed components update
                automatically. The "Updates" counter shows how many updates have been received.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-1">4. Resilience</h3>
              <p>
                If the connection is lost, the system automatically attempts to reconnect
                and resubscribes to all active instruments. Initial values are shown until
                live data arrives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
