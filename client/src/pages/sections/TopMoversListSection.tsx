import { Link } from "wouter";
import { useState, useEffect } from "react";
import { fetchTopGainersLosers, Stock } from "../../lib/stocksApi";

export const TopMoversListSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"gainers" | "losers">("gainers");
  const [gainers, setGainers] = useState<Stock[]>([]);
  const [losers, setLosers] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchTopGainersLosers();
        setGainers(data.gainers);
        setLosers(data.losers);
      } catch (error) {
        console.error("Failed to fetch top movers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const displayStocks = activeTab === "gainers" ? gainers : losers;

  return (
    <section className="flex flex-col items-start gap-4 md:gap-6 pt-6 pb-6 px-5 md:pt-8 md:pb-8 md:px-6 bg-[#191919] rounded-[32px] overflow-hidden">
      <div className="flex flex-col items-start gap-5 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <h2 className="text-2xl md:text-3xl font-medium text-white">
            Top Movers
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            This list tracks the stocks with the most upwards (top gainers) and
            downwards (top losers) movement in price from the previous day.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("gainers")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === "gainers"
                ? "bg-white text-black font-semibold"
                : "bg-[#303030] text-white hover:bg-[#404040]"
            }`}
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveTab("losers")}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === "losers"
                ? "bg-white text-black font-semibold"
                : "bg-[#303030] text-white hover:bg-[#404040]"
            }`}
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            Top Losers
          </button>
        </div>

        <div className="flex flex-col items-start gap-[12px] w-full">
          {isLoading ? (
            <div className="text-center py-8 text-white/50 w-full">Loading...</div>
          ) : (
            displayStocks.slice(0, 5).map((stock, index) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <Link href={`/stocks/${stock.instrumentId || stock.symbol?.toLowerCase() || 'aapl'}`} key={stock.instrumentId || index} className="w-full">
                  <div className="w-full bg-[#303030] rounded-[18px] cursor-pointer transition-all duration-300 hover:bg-[#404040] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        {stock.imageUrl ? (
                          <img 
                            src={stock.imageUrl} 
                            alt={stock.symbol}
                            className="w-12 h-12 rounded-full object-cover bg-black"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {stock.symbol?.slice(0, 2) || "??"}
                          </div>
                        )}

                        <div className="flex flex-col items-start gap-1 flex-1">
                          <div className="text-white text-sm font-semibold" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                            {stock.name || stock.symbol}
                          </div>
                          <div className="text-white/30 text-sm" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                            {stock.symbol}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center gap-1">
                        <div className="text-white text-sm font-semibold text-right" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                          ${stock.lastPrice?.toFixed(2) || "0.00"}
                        </div>
                        <div className={`flex items-center gap-0.5 text-sm ${isPositive ? "text-[#0DDD00]" : "text-[#FF3317]"}`}>
                          <span>{isPositive ? "▲" : "▼"}</span>
                          <span style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                            {isPositive ? "+" : ""}{stock.changePercent?.toFixed(2) || "0.00"}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>

      <Link href="/themes" className="w-full">
        <button className="h-[50px] w-full bg-[#303030] border border-[#505050] rounded-full hover:bg-[#404040] transition-colors">
          <span className="text-[16px] font-semibold leading-[20px] text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            Explore All
          </span>
        </button>
      </Link>
    </section>
  );
};
