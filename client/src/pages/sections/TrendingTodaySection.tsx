import { useState, useEffect } from "react";
import { fetchTopGainersLosers, Stock } from "../../lib/stocksApi";
import { StockCell } from "../../components/StockCell";
import { getStockImageUrl } from "../../lib/utils/stockFormatters";

export const TrendingTodaySection = (): JSX.Element => {
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
        console.error("Failed to fetch trending stocks:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="mb-10" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-medium text-white">Trending Today</h2>
        <p className="text-white/50 text-sm mt-1">Stocks with the biggest moves</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/attached_assets/Icons_Arrows_1769066937907.png" alt="up" className="w-3 h-3" />
            <h3 className="text-lg font-medium text-white">Top Gainers</h3>
          </div>
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <div className="text-center py-4 text-white/50">Loading...</div>
            ) : (
              gainers.slice(0, 5).map((stock) => (
                <StockCell
                  key={stock.instrumentId || stock.symbol}
                  symbol={stock.symbol || 'N/A'}
                  name={stock.name || stock.symbol || 'Unknown'}
                  price={stock.lastPrice || 0}
                  changePercent={stock.changePercent || 0}
                  imageUrl={getStockImageUrl(stock.styleImageUrl)}
                  instrumentId={stock.instrumentId || stock.symbol}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/attached_assets/Icons_Arrows_red_1769066937907.png" alt="down" className="w-3 h-3" />
            <h3 className="text-lg font-medium text-white">Top Losers</h3>
          </div>
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <div className="text-center py-4 text-white/50">Loading...</div>
            ) : (
              losers.slice(0, 5).map((stock) => (
                <StockCell
                  key={stock.instrumentId || stock.symbol}
                  symbol={stock.symbol || 'N/A'}
                  name={stock.name || stock.symbol || 'Unknown'}
                  price={stock.lastPrice || 0}
                  changePercent={stock.changePercent || 0}
                  imageUrl={getStockImageUrl(stock.styleImageUrl)}
                  instrumentId={stock.instrumentId || stock.symbol}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
