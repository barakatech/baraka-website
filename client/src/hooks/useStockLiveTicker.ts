import { useState, useEffect, useCallback } from 'react';
import {
  stockTickerWS,
  ConnectionState,
  type StockTickerMessage
} from '../lib/websocket/stockTickerWebSocket';

export interface TickerUpdate {
  instrumentId: string;
  price: number;
  changePrice: number;
  changePercent: number;
  closePrice: number;
  volume?: number;
  timestamp?: number;
}

export interface UseStockLiveTickerOptions {
  instrumentId: string;
  initialPrice?: number;
  initialChangePrice?: number;
  initialChangePercent?: number;
  onUpdate?: (update: TickerUpdate) => void;
  enabled?: boolean;
}

export interface UseStockLiveTickerReturn {
  price: number | null;
  changePrice: number | null;
  changePercent: number | null;
  closePrice: number | null;
  volume: number | null;
  isLoading: boolean;
  isConnected: boolean;
  connectionState: ConnectionState;
  error: string | null;
}

/**
 * Hook for subscribing to live stock ticker updates via WebSocket
 *
 * @example
 * ```tsx
 * const { price, changePercent, isConnected } = useStockLiveTicker({
 *   instrumentId: 'AAPL',
 *   initialPrice: 150.00,
 *   initialChangePercent: 2.5,
 *   onUpdate: (update) => console.log('New price:', update.price)
 * });
 * ```
 */
export function useStockLiveTicker(options: UseStockLiveTickerOptions): UseStockLiveTickerReturn {
  const {
    instrumentId,
    initialPrice,
    initialChangePrice,
    initialChangePercent,
    onUpdate,
    enabled = true
  } = options;

  const [price, setPrice] = useState<number | null>(initialPrice ?? null);
  const [changePrice, setChangePrice] = useState<number | null>(initialChangePrice ?? null);
  const [changePercent, setChangePercent] = useState<number | null>(initialChangePercent ?? null);
  const [closePrice, setClosePrice] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>(stockTickerWS.getState());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate derived values
  const calculateChangeValues = useCallback((currentPrice: number, previousClose: number) => {
    const change = currentPrice - previousClose;
    const percent = previousClose !== 0 ? (change / previousClose) * 100 : 0;
    return { change, percent };
  }, []);

  // Handle ticker updates
  const handleTickerUpdate = useCallback((message: StockTickerMessage) => {
    try {
      const newPrice = message.price;
      const newClosePrice = message.closePrice;

      if (typeof newPrice === 'number' && typeof newClosePrice === 'number') {
        const { change, percent } = calculateChangeValues(newPrice, newClosePrice);

        setPrice(newPrice);
        setClosePrice(newClosePrice);
        setChangePrice(change);
        setChangePercent(percent);
        setVolume(message.volume ?? null);
        setIsLoading(false);
        setError(null);

        // Call update callback if provided
        if (onUpdate) {
          onUpdate({
            instrumentId: message.instrumentId || message.symbol || instrumentId,
            price: newPrice,
            changePrice: change,
            changePercent: percent,
            closePrice: newClosePrice,
            volume: message.volume,
            timestamp: message.timestamp
          });
        }
      }
    } catch (err) {
      console.error('[useStockLiveTicker] Error processing ticker update:', err);
      setError(err instanceof Error ? err.message : 'Failed to process ticker update');
    }
  }, [instrumentId, calculateChangeValues, onUpdate]);

  // Subscribe to connection state changes
  useEffect(() => {
    const unsubscribe = stockTickerWS.onStateChange((state) => {
      setConnectionState(state);

      if (state === ConnectionState.ERROR) {
        setError('WebSocket connection error');
      } else if (state === ConnectionState.CONNECTED) {
        setError(null);
      }
    });

    return unsubscribe;
  }, []);

  // Subscribe to ticker updates
  useEffect(() => {
    if (!instrumentId || !enabled) {
      return;
    }

    console.log(`[useStockLiveTicker] Subscribing to ${instrumentId}`);

    // Check for cached data
    const cachedData = stockTickerWS.getCachedData(instrumentId);
    if (cachedData) {
      handleTickerUpdate(cachedData);
    }

    // Subscribe to updates
    const unsubscribe = stockTickerWS.subscribe(instrumentId, handleTickerUpdate);

    // Set a timeout to stop loading state even if no data arrives
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        // Use initial values if provided and no update received
        if (initialPrice === undefined && price === null) {
          setError('No data received');
        }
      }
    }, 10000); // 10 seconds timeout

    return () => {
      console.log(`[useStockLiveTicker] Unsubscribing from ${instrumentId}`);
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, [instrumentId, enabled, handleTickerUpdate]);

  // Set initial values if provided
  useEffect(() => {
    if (initialPrice !== undefined) {
      setPrice(initialPrice);
      setIsLoading(false);
    }
    if (initialChangePrice !== undefined) {
      setChangePrice(initialChangePrice);
    }
    if (initialChangePercent !== undefined) {
      setChangePercent(initialChangePercent);
    }
  }, [initialPrice, initialChangePrice, initialChangePercent]);

  const isConnected = connectionState === ConnectionState.CONNECTED;

  return {
    price,
    changePrice,
    changePercent,
    closePrice,
    volume,
    isLoading,
    isConnected,
    connectionState,
    error
  };
}

/**
 * Hook for managing WebSocket connection state
 */
export function useWebSocketConnection() {
  const [connectionState, setConnectionState] = useState<ConnectionState>(stockTickerWS.getState());

  useEffect(() => {
    return stockTickerWS.onStateChange(setConnectionState);
  }, []);

  const reconnect = useCallback(() => {
    stockTickerWS.reconnect();
  }, []);

  const disconnect = useCallback(() => {
    stockTickerWS.disconnect();
  }, []);

  const setAuthToken = useCallback((token: string | null) => {
    stockTickerWS.setAuthToken(token);
  }, []);

  return {
    connectionState,
    isConnected: connectionState === ConnectionState.CONNECTED,
    isConnecting: connectionState === ConnectionState.CONNECTING,
    isReconnecting: connectionState === ConnectionState.RECONNECTING,
    isDisconnected: connectionState === ConnectionState.DISCONNECTED,
    hasError: connectionState === ConnectionState.ERROR,
    reconnect,
    disconnect,
    setAuthToken
  };
}
