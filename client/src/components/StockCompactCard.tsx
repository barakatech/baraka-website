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
      className="flex-shrink-0 w-[165px] h-[88px] bg-[#191919] rounded-[16px] p-3 hover:bg-[#252525] transition-colors cursor-pointer flex flex-col justify-between"
      style={{ fontFamily: '"Proxima Nova", sans-serif' }}
    >
        <div className="flex items-center justify-between">
          <p className="text-white font-semibold text-[16px]">
            {symbol}
          </p>
          <div className="w-[32px] h-[32px] bg-black rounded-full flex items-center justify-center overflow-hidden">
            {imageUrl ? (
              <img src={imageUrl} alt={symbol} className="w-[32px] h-[32px] object-contain" />
            ) : (
              <span className="text-white font-bold text-[10px]">{symbol?.slice(0, 2)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className={`text-white text-[16px] transition-all ${isLoading ? 'opacity-70' : ''}`}>
            ${displayPrice.toFixed(2)}
          </p>
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isPositive ? (
                <path d="M2.5 7.5L6 4L9.5 7.5" stroke="#0DDD00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#FF3317" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
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
