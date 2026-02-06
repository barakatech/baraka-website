import { Link } from "wouter";
import { useState, useEffect } from "react";

interface SpotlightNewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  stocks: Array<{ symbol: string; change: number }>;
}

const spotlightNews: SpotlightNewsItem[] = [
  {
    id: 1,
    title: "Fed Signals Rate Decision",
    description: "Markets react to latest Federal Reserve policy announcement",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&auto=format",
    category: "Breaking News",
    stocks: [
      { symbol: "SPY", change: 1.24 },
      { symbol: "QQQ", change: 0.87 }
    ]
  },
  {
    id: 2,
    title: "Tech Giants Lead Rally",
    description: "NASDAQ reaches new highs as AI momentum continues",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format",
    category: "Market Update",
    stocks: [
      { symbol: "NVDA", change: 3.42 },
      { symbol: "MSFT", change: 1.15 }
    ]
  },
  {
    id: 3,
    title: "All-cash Offer",
    description: "Netflix offers Warner Bros all-cash acquisition deal",
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1200&auto=format",
    category: "Akhbaraka",
    stocks: [
      { symbol: "NFLX", change: -7.52 }
    ]
  }
];

export function SpotlightCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % spotlightNews.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const news = spotlightNews[currentSlide];

  return (
    <div className="mb-10">
      <Link
        to={`/news/${news.id}`}
        className="relative h-[314px] rounded-[44px] overflow-hidden cursor-pointer group block"
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${news.image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className={`absolute bottom-[52px] left-4 flex flex-col gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-[28px] font-semibold text-white leading-7" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            {news.title}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="backdrop-blur-[12px] bg-white/30 text-white text-xs px-3 py-1 rounded-full font-semibold"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              {news.category}
            </span>
            {news.stocks.map((stock) => (
              <span
                key={stock.symbol}
                className="backdrop-blur-[12px] bg-white/30 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              >
                <span>{stock.symbol}</span>
                <img
                  src={stock.change >= 0 ? "/attached_assets/Icons_Arrows_1769066937907.png" : "/attached_assets/Icons_Arrows_red_1769066937907.png"}
                  alt={stock.change >= 0 ? "up" : "down"}
                  className="w-3 h-3"
                />
                <span className={stock.change >= 0 ? 'text-[#0DDD00]' : 'text-[#FF3317]'}>
                  {Math.abs(stock.change).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 items-center z-20">
          {spotlightNews.map((_, index) => (
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
      </Link>
    </div>
  );
}
