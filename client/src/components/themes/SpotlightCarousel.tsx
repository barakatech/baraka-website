import { useState, useEffect, useMemo } from "react";
import { useSpotlight, useQuotesBatch } from "../../lib/stocksQueries";

export function SpotlightCarousel() {
  const { data: spotlightItems = [], isLoading } = useSpotlight();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Collect all unique ticker symbols across all spotlight items
  const allSymbols = useMemo(() => {
    const symbols = new Set<string>();
    spotlightItems.forEach((item) => {
      item.tickers.forEach((t) => symbols.add(t.symbol));
    });
    return Array.from(symbols);
  }, [spotlightItems]);

  // Fetch batch quotes for all ticker symbols
  const { data: quotes = [] } = useQuotesBatch(allSymbols);

  // Build a lookup map: symbol -> { changePercent }
  const quoteMap = useMemo(() => {
    const map = new Map<string, { changePercent: number }>();
    quotes.forEach((q) => {
      map.set(q.symbol, { changePercent: q.changePercent });
    });
    return map;
  }, [quotes]);

  // Reset slide index if items change and current index is out of bounds
  useEffect(() => {
    if (currentSlide >= spotlightItems.length && spotlightItems.length > 0) {
      setCurrentSlide(0);
    }
  }, [spotlightItems.length, currentSlide]);

  useEffect(() => {
    if (spotlightItems.length <= 1) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % spotlightItems.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, [spotlightItems.length]);

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  if (isLoading || spotlightItems.length === 0) {
    return (
      <div className="mb-10">
        <div className="relative h-[314px] rounded-[44px] overflow-hidden bg-[#191919] animate-pulse" />
      </div>
    );
  }

  const news = spotlightItems[currentSlide];

  return (
    <div className="mb-10">
      <a
        href={news.spotlightArticleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-[314px] rounded-[44px] overflow-hidden cursor-pointer group block"
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${news.thumbnailImageUrl})` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className={`absolute bottom-[52px] left-4 flex flex-col gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_14076_18379)">
              <path d="M15.1895 15.1885L0.577591 0.57666" stroke="#0DDD00" strokeWidth="0.727272" strokeMiterlimit="10"/>
              <path d="M15.189 5.44727L15.189 15.1885L5.44772 15.1885" stroke="#0DDD00" strokeWidth="0.727272" strokeMiterlimit="10"/>
            </g>
            <defs>
              <clipPath id="clip0_14076_18379">
                <rect width="16" height="16" fill="white" transform="translate(16) rotate(90)"/>
              </clipPath>
            </defs>
          </svg>
          <h2 className="text-[32px] font-semibold text-white leading-8" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            {news.thumbnailTitle}
          </h2>
          <p className="text-[16px] text-white/70" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            {news.thumbnailDescription}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="backdrop-blur-[12px] bg-white/30 text-white text-[16px] px-3 py-1 rounded-full font-semibold"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              {news.badge}
            </span>
            {news.tickers.map((ticker) => {
              const quote = quoteMap.get(ticker.symbol);
              const change = quote?.changePercent ?? 0;
              return (
                <span
                  key={ticker.symbol}
                  className="backdrop-blur-[12px] bg-white/30 text-white text-[16px] px-2 py-1 rounded-full font-semibold flex items-center gap-1"
                  style={{ fontFamily: '"Proxima Nova", sans-serif' }}
                >
                  <span>{ticker.symbol}</span>
                  <img
                    src={change >= 0 ? "/attached_assets/Icons_Arrows_1769066937907.png" : "/attached_assets/Icons_Arrows_red_1769066937907.png"}
                    alt={change >= 0 ? "up" : "down"}
                    className="w-3 h-3"
                  />
                  <span className={change >= 0 ? 'text-[#0DDD00]' : 'text-[#FF3317]'}>
                    {Math.abs(change).toFixed(2)}%
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 items-center z-20">
          {spotlightItems.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSlideChange(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </a>
    </div>
  );
}
