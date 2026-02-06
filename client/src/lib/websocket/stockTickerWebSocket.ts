/**
 * Stock Ticker WebSocket Manager
 * Manages WebSocket connection to Baraka's ticker service for real-time stock price updates
 */

type MessageHandler = (data: any) => void;
type ConnectionStateHandler = (state: ConnectionState) => void;

export enum ConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}

export enum WebSocketMessageType {
  TICKER = 'ticker',
  INDICES = 'indices',
  PING = 'PING',
  PONG = 'PONG'
}

export interface TickerSubscription {
  instrumentId: string;
  handler: MessageHandler;
}

export interface StockTickerMessage {
  type: string;
  symbol?: string;
  instrumentId?: string;
  price?: number;
  closePrice?: number;
  changePrice?: number;
  changePercent?: number;
  volume?: number;
  timestamp?: number;
}

const DEV_TOKEN = 'getbaraka_token_8jshyj_2jfujJ_28bns3_XXX_website';
const WS_URL_DEV = 'ws://b-agent.dev.app.getbaraka.com/api';
const WS_URL_PROD = 'wss://b-agent.production.axasbjeg.com/api';
const RECONNECT_DELAY = 5000; // 5 seconds
const PING_INTERVAL = 30000; // 30 seconds
const CONNECTION_TIMEOUT = 10000; // 10 seconds
const MOCK_UPDATE_INTERVAL = 2000; // 2 seconds for mock updates

// Enable mock mode via URL parameter: ?mockTicker=true
const MOCK_MODE = new URLSearchParams(window.location.search).get('mockTicker') === 'true';

class StockTickerWebSocketManager {
  private ws: WebSocket | null = null;
  private subscriptions: Map<string, Set<MessageHandler>> = new Map();
  private connectionState: ConnectionState = ConnectionState.DISCONNECTED;
  private stateHandlers: Set<ConnectionStateHandler> = new Set();
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private connectionTimeout: NodeJS.Timeout | null = null;
  private isIntentionalClose = false;
  private messageCache: Map<string, StockTickerMessage> = new Map();
  private messageQueue: Array<any> = [];
  private authToken: string | null = null;
  private mockIntervals: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    // Auto-connect on creation
    this.connect();
  }

  /**
   * Get WebSocket URL based on environment
   */
  private getWebSocketUrl(): string {
    const isDev = import.meta.env.DEV || window.location.hostname === 'localhost';
    const baseUrl = isDev ? WS_URL_DEV : WS_URL_PROD;

    // Use dev token for development, or auth token if available
    const token = this.authToken || (isDev ? DEV_TOKEN : '');

    return token ? `${baseUrl}?access_token=${token}` : baseUrl;
  }

  /**
   * Set authentication token
   */
  public setAuthToken(token: string | null) {
    this.authToken = token;
    // Reconnect with new token if already connected
    if (this.ws && this.connectionState !== ConnectionState.DISCONNECTED) {
      this.reconnect();
    }
  }

  /**
   * Update connection state and notify handlers
   */
  private updateState(newState: ConnectionState) {
    if (this.connectionState !== newState) {
      console.log(`[WebSocket] State changed: ${this.connectionState} -> ${newState}`);
      this.connectionState = newState;
      this.stateHandlers.forEach(handler => handler(newState));
    }
  }

  /**
   * Connect to WebSocket
   */
  public connect() {
    if (this.ws?.readyState === WebSocket.OPEN ||
        this.ws?.readyState === WebSocket.CONNECTING) {
      console.log('[WebSocket] Already connected or connecting');
      return;
    }

    this.isIntentionalClose = false;
    this.updateState(ConnectionState.CONNECTING);

    try {
      const url = this.getWebSocketUrl();
      console.log('[WebSocket] Connecting to:', url.replace(/access_token=[^&]+/, 'access_token=***'));

      this.ws = new WebSocket(url);

      // Set connection timeout
      this.connectionTimeout = setTimeout(() => {
        if (this.connectionState === ConnectionState.CONNECTING) {
          console.error('[WebSocket] Connection timeout');
          this.ws?.close();
          this.updateState(ConnectionState.ERROR);
          this.scheduleReconnect();
        }
      }, CONNECTION_TIMEOUT);

      this.ws.onopen = this.handleOpen.bind(this);
      this.ws.onmessage = this.handleMessage.bind(this);
      this.ws.onerror = this.handleError.bind(this);
      this.ws.onclose = this.handleClose.bind(this);
    } catch (error) {
      console.error('[WebSocket] Connection error:', error);
      this.updateState(ConnectionState.ERROR);
      this.scheduleReconnect();
    }
  }

  /**
   * Handle WebSocket open event
   */
  private handleOpen() {
    console.log('[WebSocket] ✅ Connected successfully at', new Date().toLocaleTimeString());

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    this.updateState(ConnectionState.CONNECTED);
    this.startPingInterval();

    // Send cached subscriptions and queued messages
    this.resubscribeAll();
    this.flushMessageQueue();
  }

  /**
   * Handle incoming WebSocket messages
   */
  private async handleMessage(event: MessageEvent) {
    try {
      let data: string;

      // Handle Blob data
      if (event.data instanceof Blob) {
        data = await event.data.text();
      } else {
        data = event.data;
      }

      const message = JSON.parse(data) as StockTickerMessage;

      // Ignore ping messages
      if (message.type === WebSocketMessageType.PING) {
        this.sendPong();
        return;
      }

      // Log non-ping messages
      if (message.type !== WebSocketMessageType.PONG) {
        console.log('[WebSocket] Message received:', message);
      }

      // Handle ticker messages
      if (message.type === WebSocketMessageType.TICKER) {
        const instrumentId = message.instrumentId || message.symbol;

        if (instrumentId) {
          const previousMessage = this.messageCache.get(instrumentId);

          // Log ticker update with comparison to previous value
          console.log(
            `[WebSocket] 🎯 TICKER UPDATE for ${instrumentId}:`,
            `Price: ${message.price}`,
            previousMessage ? `(Previous: ${previousMessage.price}, ${message.price! > previousMessage.price! ? '📈' : message.price! < previousMessage.price! ? '📉' : '➡️'})` : '(First update)',
            `Change: ${message.changePercent?.toFixed(2)}%`,
            `Time: ${new Date(message.timestamp || Date.now()).toLocaleTimeString()}`
          );

          // Cache the message
          this.messageCache.set(instrumentId, message);

          // Notify subscribers
          const handlers = this.subscriptions.get(instrumentId);
          if (handlers && handlers.size > 0) {
            console.log(`[WebSocket] 📢 Notifying ${handlers.size} subscriber(s) for ${instrumentId}`);
            handlers.forEach(handler => {
              try {
                handler(message);
              } catch (error) {
                console.error('[WebSocket] Handler error:', error);
              }
            });
          } else {
            console.warn(`[WebSocket] ⚠️ No subscribers found for ${instrumentId}`);
          }
        }
      }
    } catch (error) {
      console.error('[WebSocket] Failed to parse message:', error);
    }
  }

  /**
   * Handle WebSocket errors
   */
  private handleError(event: Event) {
    console.error('[WebSocket] Error occurred:', event);
    this.updateState(ConnectionState.ERROR);
  }

  /**
   * Handle WebSocket close event
   */
  private handleClose(event: CloseEvent) {
    console.log(`[WebSocket] Connection closed: ${event.code} - ${event.reason}`);

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    this.updateState(ConnectionState.DISCONNECTED);

    // Reconnect unless it was an intentional close
    if (!this.isIntentionalClose) {
      this.scheduleReconnect();
    }
  }

  /**
   * Schedule reconnection attempt
   */
  private scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.updateState(ConnectionState.RECONNECTING);

    this.reconnectTimeout = setTimeout(() => {
      console.log('[WebSocket] Attempting to reconnect...');
      this.connect();
    }, RECONNECT_DELAY);
  }

  /**
   * Start ping interval to keep connection alive
   */
  private startPingInterval() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }

    this.pingInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({ type: WebSocketMessageType.PING });
      }
    }, PING_INTERVAL);
  }

  /**
   * Send pong response
   */
  private sendPong() {
    this.send({ type: WebSocketMessageType.PONG });
  }

  /**
   * Send message to WebSocket
   */
  private send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error('[WebSocket] Failed to send message:', error);
      }
    } else {
      // Queue message for later
      this.messageQueue.push(data);
    }
  }

  /**
   * Flush queued messages
   */
  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.send(message);
    }
  }

  /**
   * Subscribe to stock ticker updates
   */
  public subscribe(instrumentId: string, handler: MessageHandler): () => void {
    const totalSubscribers = (this.subscriptions.get(instrumentId)?.size || 0) + 1;
    console.log(`[WebSocket] 📥 Subscribing to ${instrumentId} (Subscriber #${totalSubscribers})${MOCK_MODE ? ' [MOCK MODE]' : ''}`);

    // Add handler to subscriptions
    if (!this.subscriptions.has(instrumentId)) {
      this.subscriptions.set(instrumentId, new Set());
    }
    this.subscriptions.get(instrumentId)!.add(handler);

    // Send cached data immediately if available
    const cachedMessage = this.messageCache.get(instrumentId);
    if (cachedMessage) {
      console.log(`[WebSocket] 💾 Sending cached data for ${instrumentId}:`, cachedMessage);
      setTimeout(() => handler(cachedMessage), 0);
    } else {
      console.log(`[WebSocket] ℹ️ No cached data for ${instrumentId}, waiting for live updates...`);
    }

    // Start mock updates if in mock mode
    if (MOCK_MODE) {
      this.startMockUpdates(instrumentId);
    } else {
      // Send subscription message to server
      this.send({
        type: WebSocketMessageType.TICKER,
        payload: {
          ticker: instrumentId,
          instrumentId: instrumentId,
          isSubscribe: true
        },
        hash: this.generateHash()
      });
    }

    // Return unsubscribe function
    return () => this.unsubscribe(instrumentId, handler);
  }

  /**
   * Unsubscribe from stock ticker updates
   */
  public unsubscribe(instrumentId: string, handler: MessageHandler) {
    console.log(`[WebSocket] Unsubscribing from ${instrumentId}`);

    const handlers = this.subscriptions.get(instrumentId);
    if (handlers) {
      handlers.delete(handler);

      // If no more handlers, send unsubscribe message
      if (handlers.size === 0) {
        this.subscriptions.delete(instrumentId);

        // Stop mock updates if in mock mode
        if (MOCK_MODE) {
          this.stopMockUpdates(instrumentId);
        } else {
          this.send({
            type: WebSocketMessageType.TICKER,
            payload: {
              ticker: instrumentId,
              instrumentId: instrumentId,
              isSubscribe: false
            },
            hash: this.generateHash()
          });
        }
      }
    }
  }

  /**
   * Resubscribe all active subscriptions (after reconnect)
   */
  private resubscribeAll() {
    console.log(`[WebSocket] Resubscribing to ${this.subscriptions.size} instruments`);

    this.subscriptions.forEach((handlers, instrumentId) => {
      if (handlers.size > 0) {
        this.send({
          type: WebSocketMessageType.TICKER,
          payload: {
            ticker: instrumentId,
            instrumentId: instrumentId,
            isSubscribe: true
          },
          hash: this.generateHash()
        });
      }
    });
  }

  /**
   * Add connection state handler
   */
  public onStateChange(handler: ConnectionStateHandler): () => void {
    this.stateHandlers.add(handler);
    // Immediately notify of current state
    handler(this.connectionState);

    return () => {
      this.stateHandlers.delete(handler);
    };
  }

  /**
   * Get current connection state
   */
  public getState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * Get cached ticker data
   */
  public getCachedData(instrumentId: string): StockTickerMessage | undefined {
    return this.messageCache.get(instrumentId);
  }

  /**
   * Manually reconnect
   */
  public reconnect() {
    this.disconnect();
    this.connect();
  }

  /**
   * Disconnect WebSocket
   */
  public disconnect() {
    console.log('[WebSocket] Disconnecting...');
    this.isIntentionalClose = true;

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, 'CLOSE_NORMAL');
      this.ws = null;
    }

    this.updateState(ConnectionState.DISCONNECTED);
  }

  /**
   * Generate unique hash for messages
   */
  private generateHash(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Start mock ticker updates for testing (when real WebSocket isn't sending data)
   */
  private startMockUpdates(instrumentId: string) {
    // Don't start if already running
    if (this.mockIntervals.has(instrumentId)) {
      return;
    }

    console.log(`[WebSocket] 🎭 Starting mock updates for ${instrumentId}`);

    // Initial price between $100-$500
    let basePrice = 100 + Math.random() * 400;
    const closePrice = basePrice;

    // Send initial update immediately
    const initialMessage: StockTickerMessage = {
      type: WebSocketMessageType.TICKER,
      instrumentId,
      symbol: instrumentId.substring(0, 8),
      price: basePrice,
      closePrice: closePrice,
      changePrice: 0,
      changePercent: 0,
      volume: Math.floor(1000000 + Math.random() * 5000000),
      timestamp: Date.now()
    };

    this.messageCache.set(instrumentId, initialMessage);
    const handlers = this.subscriptions.get(instrumentId);
    handlers?.forEach(handler => handler(initialMessage));

    // Update every 2 seconds with random price changes
    const interval = setInterval(() => {
      // Random price change between -2% and +2%
      const changePercent = (Math.random() - 0.5) * 4;
      const changePrice = basePrice * (changePercent / 100);
      const newPrice = basePrice + changePrice;
      basePrice = newPrice; // Update base for next iteration

      const message: StockTickerMessage = {
        type: WebSocketMessageType.TICKER,
        instrumentId,
        symbol: instrumentId.substring(0, 8),
        price: newPrice,
        closePrice: closePrice,
        changePrice: newPrice - closePrice,
        changePercent: ((newPrice - closePrice) / closePrice) * 100,
        volume: Math.floor(1000000 + Math.random() * 5000000),
        timestamp: Date.now()
      };

      this.messageCache.set(instrumentId, message);

      const handlers = this.subscriptions.get(instrumentId);
      if (handlers && handlers.size > 0) {
        console.log(
          `[WebSocket] 🎭 MOCK TICKER UPDATE for ${instrumentId}:`,
          `Price: ${message.price?.toFixed(2)}`,
          `Change: ${message.changePercent?.toFixed(2)}%`,
          `${message.changePercent! > 0 ? '📈' : '📉'}`
        );
        handlers.forEach(handler => handler(message));
      }
    }, MOCK_UPDATE_INTERVAL);

    this.mockIntervals.set(instrumentId, interval);
  }

  /**
   * Stop mock ticker updates
   */
  private stopMockUpdates(instrumentId: string) {
    const interval = this.mockIntervals.get(instrumentId);
    if (interval) {
      console.log(`[WebSocket] 🎭 Stopping mock updates for ${instrumentId}`);
      clearInterval(interval);
      this.mockIntervals.delete(instrumentId);
    }
  }

  /**
   * Clear all caches and subscriptions
   */
  public clear() {
    this.messageCache.clear();
    this.subscriptions.clear();
    this.messageQueue = [];
    this.mockIntervals.forEach(interval => clearInterval(interval));
    this.mockIntervals.clear();
  }
}

// Export singleton instance
export const stockTickerWS = new StockTickerWebSocketManager();
