import { useWebSocketConnection } from "../hooks/useStockLiveTicker";
import { ConnectionState } from "../lib/websocket/stockTickerWebSocket";

interface WebSocketIndicatorProps {
  showText?: boolean;
  className?: string;
}

export function WebSocketIndicator({ showText = false, className = "" }: WebSocketIndicatorProps) {
  const { connectionState, reconnect } = useWebSocketConnection();

  const getStatusInfo = () => {
    switch (connectionState) {
      case ConnectionState.CONNECTED:
        return {
          color: "bg-[#0DDD00]",
          text: "Live",
          showReconnect: false
        };
      case ConnectionState.CONNECTING:
        return {
          color: "bg-yellow-500",
          text: "Connecting...",
          showReconnect: false
        };
      case ConnectionState.RECONNECTING:
        return {
          color: "bg-yellow-500",
          text: "Reconnecting...",
          showReconnect: false
        };
      case ConnectionState.ERROR:
        return {
          color: "bg-[#FF3317]",
          text: "Error",
          showReconnect: true
        };
      case ConnectionState.DISCONNECTED:
        return {
          color: "bg-gray-500",
          text: "Offline",
          showReconnect: true
        };
      default:
        return {
          color: "bg-gray-500",
          text: "Unknown",
          showReconnect: false
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center">
        <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
        {connectionState === ConnectionState.CONNECTED && (
          <div className={`absolute w-2 h-2 rounded-full ${statusInfo.color} animate-ping opacity-75`} />
        )}
      </div>
      {showText && (
        <span className="text-white/70 text-sm font-medium">
          {statusInfo.text}
        </span>
      )}
      {statusInfo.showReconnect && (
        <button
          onClick={reconnect}
          className="text-white/70 hover:text-white text-xs underline transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}
