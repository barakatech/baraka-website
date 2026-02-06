import { useState } from "react";
import { getStockImageUrl, formatPrice } from "../../lib/utils/stockFormatters";

interface TradeSectionProps {
  symbol: string;
  name: string;
  price?: number;
  styleImageUrl?: { light?: string; dark?: string };
}

type OrderType = "market" | "limit" | "stop" | "mit" | "auto_invest";

const orderTypes: { id: OrderType; name: string; description: string }[] = [
  { id: "market", name: "Market Order", description: "Exchange assets immediately" },
  { id: "stop", name: "Stop Order", description: "Buy when a stop price is reached" },
  { id: "limit", name: "Limit Order", description: "Buy only at limit price or lower" },
  { id: "mit", name: "Market If Touched", description: "Market order once a target price is reached" },
  { id: "auto_invest", name: "Auto-Invest", description: "Buy periodically on specific dates" },
];

const OrderTypeIcon = ({ type }: { type: OrderType }) => {
  switch (type) {
    case "market":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22.9254 7.50488C22.9254 8.3949 22.6615 9.26493 22.167 10.0049C21.6726 10.745 20.9698 11.3217 20.1475 11.6623C19.3252 12.0029 18.4204 12.092 17.5475 11.9184C16.6746 11.7448 15.8728 11.3162 15.2434 10.6869C14.6141 10.0575 14.1855 9.2557 14.0119 8.38279C13.8383 7.50987 13.9274 6.60507 14.268 5.78281C14.6086 4.96054 15.1853 4.25773 15.9254 3.76327C16.6654 3.2688 17.5354 3.00488 18.4254 3.00488C19.6189 3.00488 20.7635 3.47899 21.6074 4.3229C22.4513 5.16682 22.9254 6.31141 22.9254 7.50488V7.50488Z" stroke="white"/>
          <path d="M18.4253 6.40486C19.0328 6.40486 19.5253 6.89735 19.5253 7.50486C19.5253 8.11237 19.0328 8.60486 18.4253 8.60486C17.8178 8.60486 17.3253 8.11237 17.3253 7.50486C17.3253 6.89735 17.8178 6.40486 18.4253 6.40486Z" fill="white"/>
          <path d="M15 13.5L9.5 21L3.5 15.5L0.5 18.5" stroke="white"/>
        </svg>
      );
    case "stop":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.4134 12.1194C19.4998 12.4978 18.4945 12.5969 17.5246 12.4039C16.5546 12.211 15.6637 11.7348 14.9645 11.0355C14.2652 10.3363 13.789 9.4454 13.5961 8.4755C13.4031 7.5055 13.5022 6.5002 13.8806 5.5866C14.259 4.673 14.8999 3.8921 15.7222 3.3427C16.5444 2.7932 17.5111 2.5 18.5 2.5C19.8261 2.5 21.0979 3.0268 22.0355 3.9645C22.9732 4.9021 23.5 6.1739 23.5 7.5C23.5 8.4889 23.2068 9.4556 22.6574 10.2778C22.1079 11.1001 21.327 11.741 20.4134 12.1194ZM17.7196 11.4231C18.4956 11.5775 19.2998 11.4983 20.0307 11.1955C20.7616 10.8928 21.3864 10.3801 21.8259 9.7223C22.1722 9.204 22.3913 8.6139 22.4686 8H14.5314C14.5432 8.0937 14.5583 8.1873 14.5769 8.2804C14.7312 9.0563 15.1122 9.769 15.6716 10.3284C16.231 10.8878 16.9437 11.2688 17.7196 11.4231ZM14.5314 7C14.5758 6.6477 14.6671 6.3009 14.8045 5.9693C15.1072 5.2384 15.6199 4.6136 16.2777 4.1741C16.9355 3.7346 17.7089 3.5 18.5 3.5C19.5609 3.5 20.5783 3.9214 21.3284 4.6716C21.9597 5.3029 22.3582 6.1235 22.4686 7H14.5314ZM2.2 6.9C2.2 6.2925 1.7075 5.8 1.1 5.8C0.4925 5.8 0 6.2925 0 6.9C0 7.5075 0.4925 8 1.1 8C1.7075 8 2.2 7.5075 2.2 6.9ZM4.3002 5.8C4.9077 5.8 5.4002 6.2925 5.4002 6.9C5.4002 7.5075 4.9077 8 4.3002 8C3.6927 8 3.2002 7.5075 3.2002 6.9C3.2002 6.2925 3.6927 5.8 4.3002 5.8ZM8.6004 6.9C8.6004 6.2925 8.1079 5.8 7.5004 5.8C6.8929 5.8 6.4004 6.2925 6.4004 6.9C6.4004 7.5075 6.8929 8 7.5004 8C8.1079 8 8.6004 7.5075 8.6004 6.9ZM10.7006 5.8C11.3081 5.8 11.8006 6.2925 11.8006 6.9C11.8006 7.5075 11.3081 8 10.7006 8C10.0931 8 9.6006 7.5075 9.6006 6.9C9.6006 6.2925 10.0931 5.8 10.7006 5.8Z" fill="white"/>
          <path d="M15 13.5L9.5 21L3.5 15.5L0.5 18.5" stroke="white"/>
        </svg>
      );
    case "limit":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.4134 11.8806C19.4998 11.5022 18.4945 11.4031 17.5246 11.5961C16.5546 11.789 15.6637 12.2652 14.9645 12.9645C14.2652 13.6637 13.789 14.5546 13.5961 15.5245C13.4031 16.4945 13.5022 17.4998 13.8806 18.4134C14.259 19.327 14.8999 20.1079 15.7222 20.6573C16.5444 21.2068 17.5111 21.5 18.5 21.5C19.8261 21.5 21.0979 20.9732 22.0355 20.0355C22.9732 19.0979 23.5 17.8261 23.5 16.5C23.5 15.5111 23.2068 14.5444 22.6574 13.7222C22.1079 12.8999 21.327 12.259 20.4134 11.8806ZM17.7196 12.5769C18.4956 12.4225 19.2998 12.5017 20.0307 12.8045C20.7616 13.1072 21.3864 13.6199 21.8259 14.2777C22.1722 14.796 22.3913 15.3861 22.4686 16H14.5314C14.5432 15.9063 14.5583 15.8127 14.5769 15.7196C14.7312 14.9437 15.1122 14.231 15.6716 13.6716C16.231 13.1122 16.9437 12.7312 17.7196 12.5769ZM14.5314 17C14.5758 17.3523 14.6671 17.6991 14.8045 18.0307C15.1072 18.7616 15.6199 19.3864 16.2777 19.8259C16.9355 20.2654 17.7089 20.5 18.5 20.5C19.5609 20.5 20.5783 20.0786 21.3284 19.3284C21.9597 18.6971 22.3582 17.8765 22.4686 17H14.5314ZM2.2 17.1C2.2 17.7075 1.7075 18.2 1.1 18.2C0.4925 18.2 0 17.7075 0 17.1C0 16.4925 0.4925 16 1.1 16C1.7075 16 2.2 16.4925 2.2 17.1ZM4.3002 18.2C4.9077 18.2 5.4002 17.7075 5.4002 17.1C5.4002 16.4925 4.9077 16 4.3002 16C3.6927 16 3.2002 16.4925 3.2002 17.1C3.2002 17.7075 3.6927 18.2 4.3002 18.2ZM8.6004 17.1C8.6004 17.7075 8.1079 18.2 7.5004 18.2C6.8929 18.2 6.4004 17.7075 6.4004 17.1C6.4004 16.4925 6.8929 16 7.5004 16C8.1079 16 8.6004 16.4925 8.6004 17.1ZM10.7006 18.2C11.3081 18.2 11.8006 17.7075 11.8006 17.1C11.8006 16.4925 11.3081 16 10.7006 16C10.0931 16 9.6006 16.4925 9.6006 17.1C9.6006 17.7075 10.0931 18.2 10.7006 18.2Z" fill="white"/>
          <path d="M15 11L9.5 3L3.5 8.5L1 5.5" stroke="white"/>
        </svg>
      );
    case "mit":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M23 7C23 7.89002 22.7361 8.76004 22.2416 9.50007C21.7471 10.2401 21.0443 10.8169 20.2221 11.1575C19.3998 11.498 18.495 11.5872 17.6221 11.4135C16.7492 11.2399 15.9474 10.8113 15.318 10.182C14.6887 9.55264 14.2601 8.75082 14.0865 7.8779C13.9128 7.00499 14.0019 6.10019 14.3425 5.27792C14.6831 4.45566 15.2599 3.75285 15.9999 3.25839C16.74 2.76392 17.61 2.5 18.5 2.5C19.6935 2.5 20.8381 2.97411 21.682 3.81802C22.5259 4.66193 23 5.80653 23 7V7Z" stroke="white"/>
          <path d="M18.5 5.89998C19.1075 5.89998 19.6 6.39246 19.6 6.99998C19.6 7.60749 19.1075 8.09998 18.5 8.09998C17.8925 8.09998 17.4 7.60749 17.4 6.99998C17.4 6.39246 17.8925 5.89998 18.5 5.89998Z" fill="white"/>
          <path d="M19.4998 14.0902C19.4998 14.6977 19.0073 15.1902 18.3998 15.1902C17.7923 15.1902 17.2998 14.6977 17.2998 14.0902C17.2998 13.4827 17.7923 12.9902 18.3998 12.9902C19.0073 12.9902 19.4998 13.4827 19.4998 14.0902Z" fill="white"/>
          <path d="M19.4998 17.2452C19.4998 17.8527 19.0073 18.3452 18.3998 18.3452C17.7923 18.3452 17.2998 17.8527 17.2998 17.2452C17.2998 16.6377 17.7923 16.1452 18.3998 16.1452C19.0073 16.1452 19.4998 16.6377 19.4998 17.2452Z" fill="white"/>
          <path d="M19.4998 20.4001C19.4998 21.0076 19.0073 21.5001 18.3998 21.5001C17.7923 21.5001 17.2998 21.0076 17.2998 20.4001C17.2998 19.7926 17.7923 19.3001 18.3998 19.3001C19.0073 19.3001 19.4998 19.7926 19.4998 20.4001Z" fill="white"/>
          <path d="M15 13.5L9.5 21L3.5 15.5L0.5 18.5" stroke="white"/>
        </svg>
      );
    case "auto_invest":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.31985 7.96563C3.83292 4.17678 7.60532 1.5 12.011 1.5C16.2611 1.5 19.9216 3.99079 21.5331 7.56863L22.9416 7.01512C22.9822 6.99925 23.0265 6.99578 23.0689 7.00515C23.1114 7.01452 23.1502 7.03631 23.1803 7.06776C23.2105 7.09922 23.2306 7.13893 23.2383 7.18188C23.2459 7.22484 23.2407 7.26911 23.2233 7.3091L22.068 9.96026C22.0566 9.98702 22.0401 10.0113 22.0193 10.0316C21.9985 10.0519 21.974 10.0679 21.947 10.0786C21.9201 10.0894 21.8913 10.0947 21.8623 10.0942C21.8333 10.0937 21.8047 10.0875 21.7781 10.0759L19.1337 8.91773C19.0933 8.90044 19.059 8.87142 19.0352 8.83442C19.0114 8.79741 18.9991 8.75411 19.0001 8.71007C19.001 8.66603 19.015 8.62327 19.0404 8.58729C19.0657 8.55131 19.1012 8.52376 19.1423 8.50817L20.6012 7.93486C19.1396 4.73673 15.8471 2.5 12.011 2.5C8.01618 2.5 4.61053 4.92595 3.24853 8.3365L2.31985 7.96563ZM2.46364 14.0184L5.10806 15.1765C5.14845 15.1938 5.18275 15.2228 5.20656 15.2598C5.23036 15.2968 5.24259 15.3401 5.24166 15.3842C5.24073 15.4282 5.22669 15.471 5.20135 15.5069C5.176 15.5429 5.14051 15.5705 5.09943 15.5861L3.49191 16.2178C4.98743 19.3339 8.23618 21.5 12.011 21.5C16.0058 21.5 19.411 19.0744 20.773 15.6635L21.7017 16.0344C20.1887 19.8236 16.4167 22.5 12.011 22.5C7.8217 22.5 4.20501 20.0797 2.55895 16.5844L1.3001 17.0791C1.25957 17.095 1.21527 17.0984 1.17278 17.0891C1.1303 17.0797 1.09153 17.0579 1.06139 17.0265C1.03125 16.995 1.01108 16.9553 1.00343 16.9123C0.995779 16.8694 1.00099 16.8251 1.01841 16.7851L2.17374 14.134C2.18511 14.1072 2.20166 14.083 2.22242 14.0626C2.24319 14.0423 2.26775 14.0263 2.2947 14.0156C2.32165 14.0048 2.35045 13.9996 2.37945 14C2.40844 14.0005 2.43706 14.0067 2.46364 14.0184ZM12.5107 7.89996H13.2107C14.481 7.89996 15.5107 8.92971 15.5107 10.2H14.5107C14.5107 9.48199 13.9287 8.89996 13.2107 8.89996H10.8107C10.0928 8.89996 9.51074 9.48199 9.51074 10.2C9.51074 10.9179 10.0928 11.5 10.8107 11.5H13.2107C14.481 11.5 15.5107 12.5297 15.5107 13.8C15.5107 15.0702 14.481 16.1 13.2107 16.1H12.5107V18H11.5107V16.1H10.8107C9.54049 16.1 8.51074 15.0702 8.51074 13.8H9.51074C9.51074 14.5179 10.0928 15.1 10.8107 15.1H13.2107C13.9287 15.1 14.5107 14.5179 14.5107 13.8C14.5107 13.082 13.9287 12.5 13.2107 12.5H10.8107C9.54049 12.5 8.51074 11.4702 8.51074 10.2C8.51074 8.92971 9.54049 7.89996 10.8107 7.89996H11.5107V6H12.5107V7.89996Z" fill="white"/>
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
        </svg>
      );
  }
};

export const TradeSection = ({ symbol, name, price = 0, styleImageUrl }: TradeSectionProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("300");
  const [shares, setShares] = useState<string>("2");
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showTradingHoursPopup, setShowTradingHoursPopup] = useState(false);
  const [selectedTradingHours, setSelectedTradingHours] = useState<"regular" | "extended">("regular");
  const [showOrderTypePopup, setShowOrderTypePopup] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState<OrderType>("market");

  // Use the price from props (which comes from quotes API via instrumentDetails)
  const currentPrice = price || 0;
  const calculatedShares = amount ? (parseFloat(amount) / currentPrice).toFixed(4) : "0";
  const calculatedAmount = shares ? (parseFloat(shares) * currentPrice).toFixed(2) : "0";

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Trade</h2>
          <div className="relative">
            <button
              onClick={() => setShowOrderTypePopup(!showOrderTypePopup)}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-full text-[16px] hover:bg-[#252525] transition-colors"
            >
              {orderTypes.find(o => o.id === selectedOrderType)?.name || "Market Order"}
              <svg className={`w-4 h-4 transition-transform duration-300 ease-in-out ${showOrderTypePopup ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-[338px] bg-[#191919] rounded-[24px] pt-4 overflow-hidden z-50 shadow-xl transition-all duration-300 ease-in-out origin-top ${showOrderTypePopup ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            >
              <div className="flex items-center px-4 py-1 mb-2">
                <h2 className="text-white text-[20px] font-semibold">Order Types</h2>
              </div>

              <div className="flex flex-col">
                {orderTypes.map((orderType) => (
                  <div
                    key={orderType.id}
                    onClick={() => { setSelectedOrderType(orderType.id); setShowOrderTypePopup(false); }}
                    className={`flex items-center gap-1 p-4 cursor-pointer hover:bg-[#333] transition-colors ${selectedOrderType === orderType.id ? "bg-[#2a2a2a]" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center shrink-0">
                      <OrderTypeIcon type={orderType.id} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-white font-semibold text-[16px] leading-normal">{orderType.name}</p>
                      <p className="text-white/50 text-[14px] leading-normal">{orderType.description}</p>
                    </div>
                    {selectedOrderType === orderType.id && (
                      <div className="w-6 h-6 rounded-full bg-[#0DDD00] flex items-center justify-center shrink-0">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden">
              {styleImageUrl?.dark ? (
                <img src={getStockImageUrl(styleImageUrl)} alt={symbol} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-white font-bold text-[16px]">{symbol.slice(0, 2)}</span>
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

        <div
          onClick={() => setShowTradingHoursPopup(true)}
          className="bg-[#1a1a1a] rounded-[16px] px-4 py-3 flex items-center justify-between mb-4 cursor-pointer hover:bg-[#252525] transition-colors"
        >
          <span className="text-white/50">Trading Hours</span>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">{selectedTradingHours === "regular" ? "Regular Hours" : "Extended Hours"}</span>
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
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

      {showTradingHoursPopup && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowTradingHoursPopup(false)}
        >
          <div
            className="w-full max-w-[479px] bg-[#191919] rounded-[24px] px-4 py-6"
            onClick={(e) => e.stopPropagation()}
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-white text-[20px] font-semibold flex-1">Trading Hours</h2>
              <button
                onClick={() => setShowTradingHoursPopup(false)}
                className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div
                onClick={() => { setSelectedTradingHours("regular"); setShowTradingHoursPopup(false); }}
                className={`bg-[#2a2a2a] rounded-[18px] h-[64px] px-4 flex items-center justify-between cursor-pointer hover:bg-[#333] transition-colors ${selectedTradingHours === "regular" ? "border-2 border-white" : ""}`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white font-semibold text-[16px] leading-[18px]">Regular Hours</p>
                </div>
                <div className={`w-6 h-6 rounded-full ${selectedTradingHours === "regular" ? "bg-[#0DDD00]" : "border-2 border-white/50"} flex items-center justify-center`}>
                  {selectedTradingHours === "regular" && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>

              <div
                onClick={() => { setSelectedTradingHours("extended"); setShowTradingHoursPopup(false); }}
                className={`bg-[#2a2a2a] rounded-[18px] h-[64px] px-4 flex items-center justify-between cursor-pointer hover:bg-[#333] transition-colors ${selectedTradingHours === "extended" ? "border-2 border-white" : ""}`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white font-semibold text-[16px] leading-[18px]">Extended Hours</p>
                </div>
                <div className={`w-6 h-6 rounded-full ${selectedTradingHours === "extended" ? "bg-[#0DDD00]" : "border-2 border-white/50"} flex items-center justify-center`}>
                  {selectedTradingHours === "extended" && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
