import { useState } from "react";
import { getStockImageUrl, formatPrice } from "../../lib/utils/stockFormatters";

interface TradeSectionProps {
  symbol: string;
  name: string;
  price?: number;
  styleImageUrl?: { light?: string; dark?: string };
}

export const TradeSection = ({ symbol, name, price = 0, styleImageUrl }: TradeSectionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("300");
  const [shares, setShares] = useState<string>("2");
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  // Use the price from props (which comes from quotes API via instrumentDetails)
  const currentPrice = price || 0;
  const calculatedShares = amount ? (parseFloat(amount) / currentPrice).toFixed(4) : "0";
  const calculatedAmount = shares ? (parseFloat(shares) * currentPrice).toFixed(2) : "0";

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Trade</h2>
          <button 
            onClick={() => setShowDownloadPopup(true)}
            className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-[16px] hover:bg-[#252525] transition-colors"
          >
            Market Order
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-white/10 mb-4">
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 pb-3 text-center font-medium ${activeTab === "buy" ? "text-white border-b-2 border-white" : "text-white/50"}`}
          >
            Buy
          </button>
          <button
            onClick={() => { setActiveTab("sell"); setShowDownloadPopup(true); }}
            className={`flex-1 pb-3 text-center font-medium ${activeTab === "sell" ? "text-white border-b-2 border-white" : "text-white/50"}`}
          >
            Sell
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden p-1">
              {styleImageUrl?.dark ? (
                <img src={getStockImageUrl(styleImageUrl)} alt={symbol} className="w-full h-full object-contain" />
              ) : (
                <span className="text-white font-bold text-sm">{symbol.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <p className="text-white font-semibold">{symbol}</p>
              <p className="text-white/50 text-[16px]">{symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">${formatPrice(currentPrice)}</p>
            <p className="text-white/50 text-[16px]">Latest price est.</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-[16px] p-4 mb-3 border-2 border-transparent focus-within:border-white transition-colors">
          <div className="flex items-center gap-1 text-white text-3xl font-medium">
            <span className="text-white/50">$</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              className="bg-transparent outline-none w-full text-white"
              placeholder="0"
            />
          </div>
          <p className="text-white/50 text-[16px] mt-1">$1450 available to spent</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-[16px] p-4 mb-4 border-2 border-transparent focus-within:border-white transition-colors">
          <input
            type="text"
            value={shares}
            onChange={(e) => setShares(e.target.value.replace(/[^0-9.]/g, ""))}
            className="bg-transparent outline-none w-full text-white text-3xl font-medium"
            placeholder="0"
          />
          <p className="text-white/50 text-[16px] mt-1">$1450 available to spent</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-[16px] px-4 py-3 flex items-center justify-between mb-4">
          <span className="text-white/50">Trading Hours</span>
          <span className="text-white font-semibold">Regular Hours</span>
        </div>

        <button
          onClick={() => setShowDownloadPopup(true)}
          className="w-full bg-white text-black py-4 rounded-full text-lg hover:bg-white/90 transition-colors"
          style={{ fontFamily: '"Proxima Nova Semibold", "Proxima Nova", sans-serif' }}
        >
          Sign Up to Trade
        </button>
      </div>

      {showDownloadPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src="/attached_assets/ZkFIPSrXEnHyZXj9vrhEmbBsjs_1768999469405.png" 
              alt="Download Baraka App"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};
