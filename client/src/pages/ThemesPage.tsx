import { Link } from "wouter";
import { useState } from "react";
import { StockCell } from "../components/StockCell";
import { StockCompactCard } from "../components/StockCompactCard";
import { TrendingTodaySection } from "./sections/TrendingTodaySection";
import { SpotlightCarousel } from "../components/themes/SpotlightCarousel";
import { ThemeCard } from "../components/themes/ThemeCard";
import { StockRow } from "../components/themes/StockRow";
import { InfoIcon } from "../components/InfoIcon";
import { InfoPopup } from "../components/InfoPopup";
import { SearchOverlay } from "../components/SearchOverlay";
import { useThemesData } from "../lib/hooks/useThemesData";
import { getTrackerStocks } from "../lib/utils/trackerUtils";
import { infoPopupContent } from "../lib/constants/infoPopupContent";
import { mockPopularStocks } from "../lib/constants/mockData";
import { getStockImageUrl } from "../lib/utils/stockFormatters";

export function ThemesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTrendingFilter, setActiveTrendingFilter] = useState("52-week-high");
  const [visibleThemesCount, setVisibleThemesCount] = useState(8);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Use the custom hook for data management
  const {
    gainers,
    losers,
    popularStocks,
    trendingStocks,
    week52High,
    week52Low,
    barakaTop10,
    newlyListed,
    topAutoInvest,
    topESG,
    sectors,
    themes,
    isLoading,
    updateTrendingStocks,
  } = useThemesData("");

  const filteredThemes = themes;

  const getDisplayStocks = () => {
    if (activeCategory === "gainers") return gainers;
    if (activeCategory === "losers") return losers;
    if (activeCategory === "stocks" || activeCategory === "etfs") return popularStocks;
    return [];
  };

  const handleTrendingFilterChange = (filterKey: string) => {
    setActiveTrendingFilter(filterKey);
    const stocks = getTrackerStocks(
      filterKey,
      { week52High, week52Low, barakaTop10, newlyListed },
      mockPopularStocks
    );
    updateTrendingStocks(stocks);
  };

  const displayStocks = getDisplayStocks();
  const showThemes = (activeCategory === "all" || activeCategory === "themes");
  const showStocks = activeCategory === "stocks" || activeCategory === "etfs" || activeCategory === "gainers" || activeCategory === "losers";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-12">
        
        <SpotlightCarousel />

        <div className="mb-10">
          <div
            className="relative w-full cursor-pointer"
            onClick={() => setIsSearchOverlayOpen(true)}
          >
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div
              className="w-full h-[56px] bg-[#1a1a1a] rounded-full pl-14 pr-6 text-white/40 text-base flex items-center transition-colors hover:bg-[#252525]"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              Search stocks, ETFs, themes, sectors...
            </div>
          </div>
        </div>

        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          onClose={() => setIsSearchOverlayOpen(false)}
        />

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Trending</h2>
              <InfoIcon onClick={() => setActivePopup('trending')} />
            </div>
            </div>

          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {[
              { id: 1, filterKey: "52-week-high", title: "52WK H", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6667 11.3334V6.00004M12.6667 6.00004L14.6667 8.00004M12.6667 6.00004L10.6667 8.00004M1.33333 10L6.66666 4.66671L8.66666 6.66671L12 3.33337" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { id: 2, filterKey: "52-week-low", title: "52WK L", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.99996L7.33333 11.3333L9.33333 9.33329L12.6667 12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.6667 4.00004L12.6667 9.33337M12.6667 9.33337L10.6667 7.33337M12.6667 9.33337L14.6667 7.33337" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { id: 3, filterKey: "baraka-top-traded", title: "baraka top 10", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 5.99996L7.33333 11.3333L9.33333 9.33329L12.6667 12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.6667 4.00004L12.6667 9.33337M12.6667 9.33337L10.6667 7.33337M12.6667 9.33337L14.6667 7.33337" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { id: 4, filterKey: "newly-listed", title: "Newly Listed", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.0957 3.32324C9.55589 4.49924 10.2026 5.49951 11.0244 6.2832H11.0254C11.4286 6.66761 11.8798 7.00197 12.3662 7.27637L13.6484 7.99902L12.3662 8.72266C12.0028 8.92755 11.6582 9.16692 11.3379 9.43652L11.0254 9.7168C10.2032 10.5008 9.55703 11.5005 9.09668 12.6768L8.33203 14.6279L7.56836 12.6768C7.108 11.5009 6.46183 10.5008 5.63965 9.7168C5.3361 9.42732 5.00644 9.16692 4.65625 8.93945L4.2998 8.72363L3.01758 8L4.2998 7.27637L4.29883 7.27539C4.78324 7.00212 5.23489 6.66923 5.63965 6.2832C6.46188 5.49933 7.10806 4.4992 7.56836 3.32324L8.33203 1.37207L9.0957 3.32324Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleTrendingFilterChange(filter.filterKey)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[16px] transition-colors whitespace-nowrap ${
                  activeTrendingFilter === filter.filterKey
                    ? "bg-white text-black font-semibold"
                    : "bg-[#1a1a1a] text-white/50 hover:bg-[#252525]"
                }`}
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              >
                <span>{filter.icon}</span>
                {filter.title}
              </button>
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mt-4">
            {(() => {
              const displayStocks = (trendingStocks.length > 0 ? trendingStocks : popularStocks);
              console.log('Rendering trending stocks:', displayStocks.length, displayStocks.map(s => s.symbol));
              return displayStocks.map((stock) => (
                <StockCompactCard
                  key={stock.instrumentId || stock.symbol}
                  symbol={stock.symbol}
                  price={stock.lastPrice || 0}
                  changePercent={stock.changePercent || 0}
                  imageUrl={getStockImageUrl(stock.styleImageUrl)}
                  instrumentId={stock.instrumentId || stock.symbol}
                />
              ));
            })()}
          </div>
        </div>

        <TrendingTodaySection />

        {showThemes && (
          <>
            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-medium">Investment Themes</h2>
                  <InfoIcon onClick={() => setActivePopup('themes')} />
                </div>
                <span className="text-white/50 text-sm">{themes.length} themes</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredThemes.slice(0, visibleThemesCount).map((theme) => (
                  <ThemeCard key={theme.id} theme={theme} />
                ))}
              </div>
              {visibleThemesCount < filteredThemes.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleThemesCount(prev => Math.min(prev + 8, filteredThemes.length))}
                    className="bg-white text-black h-[50px] px-[24px] rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-[16px] font-semibold leading-[20px]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                      Load More
                    </span>
                  </button>
                </div>
              )}
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl md:text-3xl font-medium">Investor Calendar</h2>
                  <InfoIcon onClick={() => setActivePopup('calendar')} />
                </div>
                
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {popularStocks.slice(0, 6).map((stock, index) => {
                  const eventTypes = ["Dividends", "Earnings", "Dividends", "Earnings", "Dividends", "Earnings"];
                  const dates = ["21 Jan", "21 Jan", "22 Jan", "22 Jan", "23 Jan", "23 Jan"];
                  return {
                    symbol: stock.symbol,
                    instrumentId: stock.instrumentId,
                    name: stock.name || stock.symbol,
                    date: dates[index],
                    type: eventTypes[index],
                    logo: stock.imageUrl
                  };
                }).map((event) => (
                  <Link key={event.symbol} href={`/stocks/${event.instrumentId || event.symbol.toLowerCase()}`}>
                    <div 
                      className="flex-shrink-0 w-[140px] h-[180px] bg-[#191919] rounded-[18px] pt-3 pb-2 px-2 flex flex-col items-center justify-between hover:bg-[#252525] transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center overflow-hidden">
                          <img 
                            src={event.logo} 
                            alt={event.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-white font-bold text-lg">${event.symbol.slice(0,2)}</span>`;
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center gap-[8px] text-center w-full">
                          <p className="text-white font-semibold text-[16px] leading-5 line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                            {event.name}
                          </p>
                          <p className="text-white/30 text-[16px] leading-[20px]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                            {event.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className="flex items-center gap-1 text-[16px] px-3 py-1 rounded-full bg-black"
                        style={{ fontFamily: '"Proxima Nova", sans-serif' }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${event.type === "Dividends" ? "bg-[#0DDD00]" : "bg-[#439577]"}`} />
                        <span className="text-white font-semibold text-[16px]">{event.type}</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl md:text-3xl font-medium">On Repeat</h2>
                      <InfoIcon onClick={() => setActivePopup('onRepeat')} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {(topAutoInvest.length > 0 ? topAutoInvest : popularStocks).slice(0, 5).map((stock) => (
                      <StockCell
                        key={stock.instrumentId || stock.symbol}
                        symbol={stock.symbol}
                        name={stock.name}
                        price={stock.lastPrice || 0}
                        changePercent={stock.changePercent || 0}
                        imageUrl={getStockImageUrl(stock.styleImageUrl)}
                        instrumentId={stock.instrumentId || stock.symbol}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl md:text-3xl font-medium">Top ESG Stocks</h2>
                      <InfoIcon onClick={() => setActivePopup('topEsg')} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {(topESG.length > 0 ? topESG : popularStocks).slice(0, 5).map((stock) => (
                      <StockCell
                        key={stock.instrumentId || stock.symbol}
                        symbol={stock.symbol}
                        name={stock.name}
                        price={stock.lastPrice || 0}
                        changePercent={stock.changePercent || 0}
                        imageUrl={getStockImageUrl(stock.styleImageUrl)}
                        instrumentId={stock.instrumentId || stock.symbol}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showStocks && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl md:text-3xl font-medium">
                {activeCategory === "gainers" && "Top Gainers"}
                {activeCategory === "losers" && "Top Losers"}
                {activeCategory === "stocks" && "Popular Stocks"}
                {activeCategory === "etfs" && "Popular ETFs"}
              </h2>
            </div>
            {isLoading ? (
              <div className="text-center py-8 text-white/50">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayStocks.slice(0, 12).map((stock) => (
                  <StockRow key={stock.instrumentId || stock.symbol} stock={stock} />
                ))}
              </div>
            )}
          </div>
        )}

        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl md:text-3xl font-medium">Sectors</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {(() => {
              const sectorsToRender = sectors.length > 0 ? sectors : [
                { id: "1", title: "Real Estate" },
                { id: "2", title: "Technology" },
                { id: "3", title: "Healthcare" },
                { id: "4", title: "Communication" },
                { id: "5", title: "Consumer Discretionary" },
                { id: "6", title: "Energy" },
                { id: "7", title: "Utilities" },
                { id: "8", title: "Financials" },
                { id: "9", title: "Materials" },
                { id: "10", title: "Industrials" }
              ];
              return sectorsToRender.map((sector) => {
                const sectorName = sector.title || sector.name;
                if (!sectorName) return null;

                const sectorSlug = sector.slug || sectorName.toLowerCase().replace(/\s+/g, '-');

                return (
                  <Link key={sector.id} href={`/sector/${sectorSlug}`}>
                    <button
                      className="bg-[#1a1a1a] text-white px-5 py-3 rounded-[14px] text-[16px] hover:bg-[#252525] transition-colors"
                      style={{ fontFamily: '"Proxima Nova", sans-serif' }}
                    >
                      {sectorName}
                    </button>
                  </Link>
                );
              });
            })()}
          </div>
        </div>

        <div className="mt-12 pb-8">
          <h3 className="text-white font-semibold text-lg mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            Disclaimer
          </h3>
          <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            Information is based on data from one or more third-party data providers. We do not guarantee the accuracy and comprehensiveness of the information. baraka is not a financial advisor and therefore does not provide financial and investment advice, nor recommendations. Past performance is not an indication of future results. Your investment may fluctuate, so you may get back less than what you invested. Our content is informational only. You should not buy or sell anything without first determining its appropriateness for your portfolio or investment strategy. Carefully consider each product's risk(s) before investing.
          </p>
        </div>
      </div>

      {activePopup && infoPopupContent[activePopup] && (
        <InfoPopup
          isOpen={true}
          onClose={() => setActivePopup(null)}
          title={infoPopupContent[activePopup].title}
        >
          <p>{infoPopupContent[activePopup].description}</p>
        </InfoPopup>
      )}
    </div>
  );
}
