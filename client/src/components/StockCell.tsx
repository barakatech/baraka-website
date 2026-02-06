import { useStockLiveTicker } from "../hooks/useStockLiveTicker";
import { useState, useEffect, useRef } from "react";
import { StockLink } from "./StockLink";

interface StockCellProps {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  imageUrl?: string;
  href?: string;
  instrumentId?: string;
  enableLiveTicker?: boolean;
}

export function StockCell({
  symbol,
  name,
  price: initialPrice,
  changePercent: initialChangePercent,
  imageUrl,
  href,
  instrumentId,
  enableLiveTicker = true
}: StockCellProps) {
  const tickerInstrumentId = instrumentId || symbol;
  const [isPulsing, setIsPulsing] = useState(false);
  const previousChangeRef = useRef<number>(initialChangePercent);

  // Use live ticker with initial values as fallback
  const {
    price: livePrice,
    changePercent: liveChangePercent,
    isLoading
  } = useStockLiveTicker({
    instrumentId: tickerInstrumentId,
    initialPrice,
    initialChangePercent,
    enabled: enableLiveTicker
  });

  // Use live data if available, otherwise fall back to initial values
  const displayPrice = livePrice ?? initialPrice;
  const displayChangePercent = liveChangePercent ?? initialChangePercent;

  const isPositive = displayChangePercent >= 0;

  // Show dot briefly when changePercent changes
  useEffect(() => {
    if (displayChangePercent !== previousChangeRef.current && previousChangeRef.current !== initialChangePercent) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      previousChangeRef.current = displayChangePercent;
      return () => clearTimeout(timer);
    }
    previousChangeRef.current = displayChangePercent;
  }, [displayChangePercent, initialChangePercent]);

  // If custom href is provided or no instrumentId, use regular link behavior
  const content = (
    <div
      className="flex items-center gap-3 rounded-[18px] bg-[#191919] hover:bg-[#252525] transition-colors cursor-pointer h-[72px] py-3 px-4"
      style={{
        fontFamily: '"Proxima Nova", sans-serif',
      }}
    >
        <div className="w-12 h-12 rounded-full overflow-hidden bg-black flex items-center justify-center flex-shrink-0 p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={symbol}
              className="w-full h-full object-contain"
              style={{ filter: imageUrl.includes('.svg') && (symbol === 'AAPL' || symbol === 'TSLA') ? 'invert(1)' : 'none' }}
            />
          ) : (
            <span className="text-white font-bold text-sm">{symbol.substring(0, 2)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <p className="text-white font-semibold text-[16px] truncate leading-[20px]">{name || symbol}</p>
          <p className="text-white/30 text-[16px] truncate leading-[20px]">{symbol}</p>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <p className={`text-white font-semibold text-[16px] text-right leading-[20px] transition-all ${isLoading ? 'opacity-70' : ''}`}>
            ${displayPrice.toFixed(2)}
          </p>
          <div className="flex items-center gap-1">
            <img
              src={isPositive ? "/attached_assets/Icons_Arrows_1769066937907.png" : "/attached_assets/Icons_Arrows_red_1769066937907.png"}
              alt={isPositive ? "up" : "down"}
              className="w-3 h-3"
            />
            <span className={`text-xs font-semibold leading-[12px] transition-all ${isPositive ? 'text-[#0DDD00]' : 'text-[#FF3317]'} ${isLoading ? 'opacity-70' : ''}`}>
              {Math.abs(displayChangePercent).toFixed(2)}%
            </span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isPulsing ? (isPositive ? 'bg-[#0DDD00]' : 'bg-[#FF3317]') : 'bg-transparent'}`} />
          </div>
        </div>
      </div>
  );

  // Use StockLink if we have instrumentId, otherwise use the custom href
  if (!href && instrumentId) {
    return <StockLink instrumentId={instrumentId}>{content}</StockLink>;
  }

  // Fallback: use href if provided (this shouldn't happen anymore, but keep for safety)
  return <a href={href || '#'}>{content}</a>;
}
