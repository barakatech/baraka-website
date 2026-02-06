import { Link, useParams } from "wouter";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { fetchTopGainersLosers, Stock } from "../lib/stocksApi";
import { StockCell } from "../components/StockCell";
import { getStockImageUrl } from "../lib/utils/stockFormatters";

const sectorData: Record<string, { description: string }> = {
  "real-estate": { 
    description: "Real estate investment trusts, property developers, and real estate services companies"
  },
  "technology": { 
    description: "Leading technology companies driving digital innovation and software development"
  },
  "healthcare": { 
    description: "Pharmaceutical, biotech, medical devices, and healthcare service companies"
  },
  "communication": { 
    description: "Telecommunications, media, and entertainment companies"
  },
  "consumer-discretionary": { 
    description: "Retail, automotive, leisure, and consumer goods companies"
  },
  "energy": { 
    description: "Oil, gas, and renewable energy companies"
  },
  "utilities": { 
    description: "Electric, gas, and water utility companies"
  },
  "financials": { 
    description: "Banks, insurance, and financial services companies"
  },
  "materials": { 
    description: "Mining, chemicals, and construction materials companies"
  },
  "industrials": { 
    description: "Aerospace, defense, machinery, and transportation companies"
  },
};

const otherSectors = [
  { id: "technology", name: "Technology" },
  { id: "healthcare", name: "Healthcare" },
  { id: "financials", name: "Financials" },
  { id: "energy", name: "Energy" },
  { id: "consumer-discretionary", name: "Consumer Discretionary" },
  { id: "industrials", name: "Industrials" },
];

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

function SmallSectorCard({ sector }: { sector: { id: string; name: string } }) {
  return (
    <Link href={`/sector/${sector.id}`}>
      <div className="bg-[#1a1a1a] rounded-[32px] overflow-hidden cursor-pointer hover:bg-[#252525] transition-colors h-[160px] flex flex-col justify-end p-6">
        <h3 className="text-xl font-medium text-white">{sector.name}</h3>
      </div>
    </Link>
  );
}

export function SectorDetailPage() {
  const params = useParams<{ sectorId: string }>();
  const sectorId = params.sectorId || "technology";
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const sectorName = sectorId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const sectorInfo = sectorData[sectorId] || { description: "Explore stocks in this sector" };

  const filteredOtherSectors = otherSectors.filter(s => s.id !== sectorId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectorId]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setIsLoading(true);
        const { gainers } = await fetchTopGainersLosers();
        setStocks(gainers.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch sector stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStocks();
  }, [sectorId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-8">
          <div className="flex items-center gap-1 text-sm text-white/50 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/" className="hover:text-white">Sectors</Link>
            <span>›</span>
            <span className="text-white">{sectorName}</span>
          </div>

          <div className="flex items-center justify-between mb-12">
            <div className="max-w-[700px]">
              <h1 className="text-4xl md:text-5xl font-medium mb-2">{sectorName}</h1>
              <p className="text-xl text-white/50">{sectorInfo.description}</p>
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
                  stocks.map((stock) => (
                    <StockListItem key={stock.instrumentId || stock.symbol} stock={stock} />
                  ))
                ) : (
                  <div className="text-center py-8 text-white/50">No stocks found for this sector</div>
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
            <h2 className="text-2xl font-medium mb-6">Other Sectors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOtherSectors.slice(0, 6).map((s) => (
                <SmallSectorCard key={s.id} sector={s} />
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
