import { useState } from "react";
import { InfoPopup } from "../../components/InfoPopup";
import { useRefinitivReport } from "@/lib/stocksQueries";
import { config } from "@/lib/config";

interface AdvancedStockAnalysisSectionProps {
  instrumentId: string;
}

export const AdvancedStockAnalysisSection = ({ instrumentId }: AdvancedStockAnalysisSectionProps): JSX.Element => {
  const [priceMode, setPriceMode] = useState<"dollars" | "percentage">("dollars");
  const [showAnalystPopup, setShowAnalystPopup] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [showTrendPopup, setShowTrendPopup] = useState(false);

  const { data: refinitivReport, isLoading } = useRefinitivReport(instrumentId);

  // Average Score from refinitiv (1-month score)
  const averageScore = refinitivReport?.averageScore1m ?? 0;

  // Trend label from API
  const trend = refinitivReport?.trend ?? null;

  // Outlook subtitle from API
  const averageScoreOutlook = refinitivReport?.averageScoreOutlook ?? null;

  // Trend scores for the chart
  const trendScores = [
    { period: "1W", score: refinitivReport?.averageScore1w ?? null },
    { period: "1M", score: refinitivReport?.averageScore1m ?? null },
    { period: "3M", score: refinitivReport?.averageScore3m ?? null },
    { period: "6M", score: refinitivReport?.averageScore6m ?? null },
    { period: "1Y", score: refinitivReport?.averageScore1y ?? null },
  ];

  // Determine color based on score value
  const getScoreColor = (score: number | null) => {
    if (score === null) return "#2a2a2a";
    if (score >= 6) return "#0DDD00";
    if (score >= 4) return "#ffffff";
    return "#FF3317";
  };

  // Determine trend display
  const getTrendLabel = () => {
    if (!trend) return averageScore >= 8 ? "Positive Outlook" : averageScore >= 4 ? "Neutral Outlook" : "Negative Outlook";
    switch (trend.toUpperCase()) {
      case "POSITIVE": return "Positive Outlook";
      case "NEGATIVE": return "Negative Outlook";
      case "NEUTRAL": return "Neutral Outlook";
      default: return trend;
    }
  };

  // Placeholder for analyst ratings - this would come from a different API endpoint
  const analystRatings = { total: 0, buy: 0, hold: 0, sell: 0 };

  if (isLoading) {
    return (
      <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <h2 className="text-white text-xl font-semibold">Stock Analysis</h2>
        <div className="bg-[#111] rounded-[24px] p-5 h-40 animate-pulse" />
        <div className="bg-[#111] rounded-[24px] p-5 h-40 animate-pulse" />
        <div className="bg-[#111] rounded-[24px] p-5 h-48 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <h2 className="text-white text-xl font-semibold">Stock Analysis</h2>

        {config.IS_PREMIUM && (
          <div className="bg-[#111] rounded-[24px] p-5">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Analyst Ratings: {analystRatings.total}</h3>
              <button onClick={() => setShowAnalystPopup(true)}>
                <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                  <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1a4a1a] flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Buy</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0DDD00] rounded-full" style={{ width: `${analystRatings.buy}%` }} />
                  </div>
                  <span className="text-white text-sm w-16 text-right">{analystRatings.buy}% Buy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full" style={{ width: `${analystRatings.hold}%` }} />
                  </div>
                  <span className="text-white text-sm w-16 text-right">{analystRatings.hold}% Hold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF3317] rounded-full" style={{ width: `${analystRatings.sell}%` }} />
                  </div>
                  <span className="text-white text-sm w-16 text-right">{analystRatings.sell}% Sell</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#111] rounded-[24px] p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Average Score</h3>
            <button onClick={() => setShowScorePopup(true)}>
              <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#1a1a1a" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="#0DDD00"
                  strokeWidth="3"
                  strokeDasharray={`${(averageScore / 10) * 94} 94`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">{averageScore}</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">{getTrendLabel()}</p>
              <p className="text-white/50 text-sm">
                {averageScoreOutlook || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#111] rounded-[24px] p-5">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Average Score Trend</h3>
            <button onClick={() => setShowTrendPopup(true)}>
              <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              {trendScores.map((item) => (
                <div key={item.period} className="flex flex-col items-center gap-2 z-10">
                  <span className={`text-xl font-semibold ${
                    item.score === null ? "text-white/30" :
                    item.score >= 6 ? "text-[#0DDD00]" :
                    item.score >= 5 ? "text-white" :
                    "text-white/50"
                  }`}>
                    {item.score !== null ? item.score : "-"}
                  </span>
                  <div className="w-2 h-[100px] bg-[#2a2a2a] rounded-full relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full rounded-full transition-all duration-500"
                      style={{
                        height: item.score !== null ? `${(item.score / 10) * 100}%` : "0%",
                        backgroundColor: getScoreColor(item.score)
                      }}
                    />
                  </div>
                  <span className="text-white/50 text-sm uppercase">{item.period}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="bg-[#0DDD00] text-black text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                  Current: {averageScore}
                </div>
                <div className="h-[100px]" />
                <span className="text-white/50 text-sm opacity-0">.</span>
              </div>
            </div>
            <div className="absolute left-0 right-0 top-[55%] border-t border-dashed border-white/30" />
          </div>
        </div>
      </div>

      {config.IS_PREMIUM && (
        <InfoPopup isOpen={showAnalystPopup} onClose={() => setShowAnalystPopup(false)} title="Analyst Ratings">
          <p>A stock rating is a measure of the expected performance of a stock in a given time period. Analysts and brokerage firms often use ratings when issuing stock recommendations to stock traders. The recommendations are presented on a three point standardized scale: buy, hold, sell.</p>
        </InfoPopup>
      )}

      <InfoPopup isOpen={showScorePopup} onClose={() => setShowScorePopup(false)} title="Average Score">
        <p>The Stock Reports Average Score combines a quantitative analysis of six widely-used investment decision making tools - Earnings, Fundamental, Relative Valuation, Risk, Price Momentum, and Insider Trading. First, a simple average of the six underlying component ratings is calculated. Then, a normal distribution is used to rank each stock across the market on a scale of 1 to 10, with 10 being most favorable. A score of 8 to 10 is considered positive, 4 to 7 is neutral, and 1 to 3 is negative.</p>
      </InfoPopup>

      <InfoPopup isOpen={showTrendPopup} onClose={() => setShowTrendPopup(false)} title="Average Score Trend">
        <p>The Stock's Average Score Trend shows the changes of the combined quantitative analysis of six widely-used investment decision-making criteria for a specific company across different time periods.</p>
      </InfoPopup>
    </>
  );
};
