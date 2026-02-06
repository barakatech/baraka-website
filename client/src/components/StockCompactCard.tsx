import { useStockLiveTicker } from "../hooks/useStockLiveTicker";
import { useState, useEffect, useRef } from "react";
import { StockLink } from "./StockLink";

interface StockCompactCardProps {
  symbol: string;
  price: number;
  changePercent: number;
  imageUrl?: string;
  href?: string;
  instrumentId?: string;
  enableLiveTicker?: boolean;
}

export function StockCompactCard({
  symbol,
  price: initialPrice,
  changePercent: initialChangePercent,
  imageUrl,
  href,
  instrumentId,
  enableLiveTicker = true
}: StockCompactCardProps) {
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

  const content = (
    <div
      className="flex-shrink-0 w-[20%] min-w-[140px] h-[88px] bg-[#191919] rounded-[16px] p-2 pb-3 hover:bg-[#252525] transition-colors cursor-pointer flex flex-col justify-between"
      style={{ fontFamily: '"Proxima Nova", sans-serif' }}
    >
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold text-[16px]">
            {symbol}
          </p>
          <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={symbol} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white font-bold text-[6px]">{symbol?.slice(0, 2)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-white/70 text-[16px] transition-all ${isLoading ? 'opacity-70' : ''}`}>
            ${displayPrice.toFixed(2)}
          </p>
          <div className="flex items-center gap-1">
            <img
              src={isPositive ? "/attached_assets/Icons_Arrows_1769066937907.png" : "/attached_assets/Icons_Arrows_red_1769066937907.png"}
              alt={isPositive ? "up" : "down"}
              className="w-3 h-3"
            />
            <span className={`text-[16px] font-medium transition-all ${isPositive ? 'text-[#0DDD00]' : 'text-[#FF3317]'} ${isLoading ? 'opacity-70' : ''}`}>
              {Math.abs(displayChangePercent).toFixed(1)}%
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

  // Fallback: use href if provided
  return <a href={href || '#'}>{content}</a>;
}
