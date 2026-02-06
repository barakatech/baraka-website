import { Link, useParams } from "wouter";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchThemeStocks, fetchThemes, Stock, Theme, THEME_ID_MAP, THEME_NAME_MAP } from "../lib/stocksApi";
import { StockCell } from "../components/StockCell";
import { getStockImageUrl } from "../lib/utils/stockFormatters";


function StockListItem({ stock }: { stock: Stock }) {
  return (
    <StockCell
      symbol={stock.symbol}
      name={stock.name}
      price={stock.lastPrice || 0}
      changePercent={stock.changePercent || 0}
      imageUrl={getStockImageUrl(stock.styleImageUrl)}
      href={`/stocks/${stock.instrumentId || stock.symbol.toLowerCase()}`}
      instrumentId={stock.instrumentId}
    />
  );
}

function SmallThemeCard({ theme }: { theme: Theme }) {
  const themeSlug = theme.slug || theme.title.toLowerCase().replace(/\s+/g, '-');
  const icon = theme.image?.icon || theme.image?.thumbnailUrl || theme.image?.smallImageUrl || theme.image?.imageUrl || "/figmaAssets/theme-icons/metaverse.png";

  return (
    <Link href={`/theme/${themeSlug}`}>
      <div className="bg-[#1a1a1a] rounded-[32px] overflow-hidden cursor-pointer hover:bg-[#252525] transition-colors h-[245px] flex flex-col justify-end p-6">
        <div className="w-[60px] h-[60px] mb-4 flex items-center justify-center">
          <img src={icon} alt={theme.title} className="w-[50px] h-[50px] object-contain" />
        </div>
        <h3 className="text-xl font-medium text-white">{theme.title}</h3>
      </div>
    </Link>
  );
}

export function ThemeDetailPage() {
  const params = useParams<{ themeId: string }>();
  const themeId = params.themeId || "penny-stocks";
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [allThemes, setAllThemes] = useState<Theme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  const themeApiId = THEME_ID_MAP[themeId];
  const themeName = currentTheme?.title || (themeApiId ? THEME_NAME_MAP[themeApiId] : themeId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
  const themeDescription = currentTheme?.description || currentTheme?.shortDescription || "Explore stocks in this theme";
  const themeIcon = currentTheme?.image?.icon || currentTheme?.image?.thumbnailUrl || currentTheme?.image?.smallImageUrl || currentTheme?.image?.imageUrl || "/figmaAssets/theme-icons/metaverse.png";

  const filteredOtherThemes = allThemes.filter(t => {
    const slug = t.slug || t.title.toLowerCase().replace(/\s+/g, '-');
    return slug !== themeId && t.id.toString() !== themeApiId;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [themeId]);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themes = await fetchThemes();
        setAllThemes(themes);

        // Find the current theme by slug or ID
        const theme = themes.find(t => {
          const slug = t.slug || t.title.toLowerCase().replace(/\s+/g, '-');
          return slug === themeId || t.id.toString() === themeApiId;
        });

        setCurrentTheme(theme || null);
      } catch (error) {
        console.error("Failed to fetch themes:", error);
      }
    };
    loadThemes();
  }, [themeId, themeApiId]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchThemeStocks(themeId);
        setStocks(data);
      } catch (error) {
        console.error("Failed to fetch theme stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStocks();
  }, [themeId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-8">
          <div className="flex items-center gap-1 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/" className="hover:text-white">Themes and Trackers</Link>
            <span>›</span>
            <span className="text-white">{themeName}</span>
          </div>

          <div className="flex items-center justify-between mb-12">
            <div className="max-w-[570px]">
              <h1 className="text-4xl md:text-5xl font-medium mb-2">{themeName}</h1>
              <p className="text-xl text-white/50">{themeDescription}</p>
            </div>
            <div className="hidden md:flex items-center justify-center w-[100px] h-[100px]">
              <img src={themeIcon} alt={themeName} className="w-[80px] h-[80px] object-contain" />
            </div>
          </div>

          <div className="mb-16">
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-medium mb-1">Stocks</h2>
                <p className="text-sm text-white/50">{stocks.length} Stocks</p>
              </div>
              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <div className="text-center py-8 text-white/50">Loading...</div>
                ) : stocks.length > 0 ? (
                  stocks.slice(0, 10).map((stock) => (
                    <StockListItem key={stock.instrumentId || stock.symbol} stock={stock} />
                  ))
                ) : (
                  <div className="text-center py-8 text-white/50">No stocks found for this theme</div>
                )}
                <div className="bg-black/10 rounded-[18px] p-6 flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white">Discover more stocks on our app</h3>
                    <p className="text-sm text-white/70">Unlock endless investment opportunities with our app's extensive stock options.</p>
                  </div>
                  <button 
                    onClick={() => setShowDownloadPopup(true)}
                    className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                  >
                    Get the App
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-6">Other Themes & Trackers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOtherThemes.slice(0, 6).map((t) => (
                <SmallThemeCard key={t.id} theme={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {showDownloadPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowDownloadPopup(false)}
        >
          <div 
            className="relative max-w-[900px] w-full rounded-[24px] overflow-hidden mt-6 bg-[#191919]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDownloadPopup(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-20"
            >
              <X size={28} />
            </button>
            <img 
              src="/attached_assets/ZkFIPSrXEnHyZXj9vrhEmbBsjs_1768999469405.png" 
              alt="Download Baraka App"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
