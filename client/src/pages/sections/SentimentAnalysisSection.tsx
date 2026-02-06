import { useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts";
import { InfoPopup } from "../../components/InfoPopup";
import { InstrumentDetails } from "@/lib/stocksApi";

interface SentimentAnalysisSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const SentimentAnalysisSection = ({ instrumentDetails }: SentimentAnalysisSectionProps): JSX.Element | null => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Get sentiment data from API — rates are already 0-100
  const { sentiments } = instrumentDetails;

  // Hide the entire section if no sentiment data exists
  if (!sentiments?.social) return null;

  const positivePercent = sentiments?.social?.positiveRate
    ? Math.round(sentiments.social.positiveRate)
    : 0;
  const negativePercent = sentiments?.social?.negativeRate
    ? Math.round(sentiments.social.negativeRate)
    : 0;
  const totalMentions = sentiments?.social?.totalMention || 0;

  // Build mirrored chart data: positive goes up, negative goes down (negated)
  const chartData = useMemo(() => {
    const history = sentiments?.social?.historicalData;
    if (!history || history.length === 0) return [];
    return history.map((d) => ({
      date: d.date,
      positive: d.avgOfPositiveMention,
      negative: -d.avgOfNegativeMention,
    }));
  }, [sentiments?.social?.historicalData]);

  // Format total mentions for display
  const formatMentions = (count: number) => {
    if (count >= 1000) return `${Math.floor(count / 1000)}K+`;
    return count.toString();
  };

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-white text-lg font-semibold">Sentiment Analysis</h2>
          <button onClick={() => setShowInfoPopup(true)}>
            <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-white/50 text-sm">Total Mentions</span>
          <span className="text-white font-semibold">{formatMentions(totalMentions)}</span>
        </div>

        {chartData.length > 0 ? (
          <div className="h-[140px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="sentimentGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0DDD00" stopOpacity={0.7} />
                    <stop offset="50%" stopColor="#0DDD00" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0DDD00" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sentimentRedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B2500" stopOpacity={0} />
                    <stop offset="50%" stopColor="#8B2500" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B2500" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide domain={["dataMin", "dataMax"]} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#888" }}
                  labelFormatter={(label: string) => {
                    const d = new Date(label);
                    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                  }}
                  formatter={(value: number, name: string) => [
                    Math.abs(value),
                    name === "positive" ? "Positive" : "Negative",
                  ]}
                />
                <ReferenceLine y={0} stroke="#0DDD00" strokeWidth={2} />
                <Area
                  type="monotone"
                  dataKey="positive"
                  stroke="none"
                  fill="url(#sentimentGreenGrad)"
                  baseValue={0}
                />
                <Area
                  type="monotone"
                  dataKey="negative"
                  stroke="none"
                  fill="url(#sentimentRedGrad)"
                  baseValue={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[140px] mb-4 flex items-center justify-center">
            <span className="text-white/30 text-sm">No historical data available</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0DDD00]" />
            <span className="text-white/50 text-sm">Positive</span>
            <span className="text-white font-semibold">{positivePercent}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF3317]" />
            <span className="text-white/50 text-sm">Negative</span>
            <span className="text-white font-semibold">{negativePercent}%</span>
          </div>
        </div>
      </div>

      <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Sentiment Analysis">
        <p>Sentiment analysis (or opinion mining) is a natural language processing (NLP) technique used to determine whether data is positive or negative. This technique is performed on textual data gathered through social media platforms (in this case Reddit and Twitter) and is used to help investors monitor or gauge the public sentiment pertaining to a company's or stock's activity.</p>
        <p>Social sentiment analysis is an evolving technique that can be used to complement fundamental, quantitative, and technical analysis. It is also one of the more successful methods of including the effects of market psychology in an investment or trading strategy. Positive and negative sentiment drive price action, and also create trading and investment opportunities for active traders and long-term investors.</p>
      </InfoPopup>
    </>
  );
};
