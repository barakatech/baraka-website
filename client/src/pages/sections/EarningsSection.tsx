import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { InfoPopup } from "../../components/InfoPopup";
import { InstrumentDetails } from "@/lib/stocksApi";

interface EarningsSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const EarningsSection = ({ instrumentDetails }: EarningsSectionProps): JSX.Element => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Get earnings from API and format them
  const rawEarnings = instrumentDetails.earningsPerShare || [];
  const earnings = rawEarnings.slice(0, 4).reverse().map(earn => ({
    quarter: `Q${earn.quarter}`,
    year: `FY${earn.year.toString().slice(-2)}`,
    actual: earn.epsActual || 0,
    forecast: earn.epsEstimate || 0
  }));

  // If no earnings, show empty state
  if (earnings.length === 0) {
    return (
      <>
        <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Earnings Per Share</h2>
            <button onClick={() => setShowInfoPopup(true)}>
              <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
              </svg>
            </button>
          </div>
          <div className="text-center py-8 text-white/50">
            No earnings data available
          </div>
        </div>
        <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Earnings Per Share">
          <p>The company's quarterly estimated earnings per share (EPS) is displayed along with a comparison to its actual earnings per share.</p>
          <p className="font-semibold text-white">Earnings per share = Total Earnings / Total Outstanding Shares</p>
          <p>Earnings per share indicate how much money a company makes for each share of its stock, and is one of the most common metrics employed when determining a firm's profitability. A higher EPS indicates greater value because investors will pay more for a company's shares if they think the company has higher profits relative to its share price.</p>
          <p>An earnings estimate is a projection of the level of earnings a company will report on a quarterly, semiannual, or annual basis. Analysts use financial modeling to predict a company's future earnings.</p>
          <p>Earnings estimates are important for investors to consider as they can influence stock pricing. When there's a wide gap between a company's reporting earnings and the earnings estimate, this is referred to as an earnings surprise. An earnings surprise can be positive, meaning the company beat its earnings estimate by a wide margin. Or a surprise can be negative, meaning the company did not perform as well as expected.</p>
        </InfoPopup>
      </>
    );
  }

  const eps = earnings[earnings.length - 1]?.actual || 0;
  const allValues = earnings.flatMap(e => [e.actual, e.forecast]);
  const maxValue = Math.max(...allValues);

  // Compute 3 equidistant Y-axis ticks: 0, mid, top (rounded up for clean labels)
  const yTicks = useMemo(() => {
    const top = Math.ceil(maxValue * 10) / 10; // round up to 1 decimal
    return [0, +(top / 2).toFixed(2), +top.toFixed(2)];
  }, [maxValue]);

  const chartData = earnings.map(e => ({
    label: `${e.quarter}\n${e.year}`,
    actual: e.actual,
    forecast: e.forecast,
  }));

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Earnings Per Share</h2>
          <button onClick={() => setShowInfoPopup(true)}>
            <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
            </svg>
          </button>
        </div>

        <p className="text-white text-lg font-semibold mb-4">EPS: ${eps.toFixed(2)}</p>

        <div className="h-[180px] mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={2} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload }) => {
                  const [q, fy] = (payload.value as string).split('\n');
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={0} y={4} dy={10} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11}>{q}</text>
                      <text x={0} y={4} dy={24} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11}>{fy}</text>
                    </g>
                  );
                }}
                height={45}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                ticks={yTicks}
                domain={[0, yTicks[2]]}
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                width={35}
              />
              <Bar dataKey="actual" fill="#ffffff" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="forecast" fill="rgba(255,255,255,0.4)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white" />
            <span className="text-white/50 text-sm">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white/40" />
            <span className="text-white/50 text-sm">Forecast</span>
          </div>
        </div>
      </div>

      <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Earnings Per Share">
        <p>The company's quarterly estimated earnings per share (EPS) is displayed along with a comparison to its actual earnings per share.</p>
        <p className="font-semibold text-white">Earnings per share = Total Earnings / Total Outstanding Shares</p>
        <p>Earnings per share indicate how much money a company makes for each share of its stock, and is one of the most common metrics employed when determining a firm's profitability. A higher EPS indicates greater value because investors will pay more for a company's shares if they think the company has higher profits relative to its share price.</p>
        <p>An earnings estimate is a projection of the level of earnings a company will report on a quarterly, semiannual, or annual basis. Analysts use financial modeling to predict a company's future earnings.</p>
        <p>Earnings estimates are important for investors to consider as they can influence stock pricing. When there's a wide gap between a company's reporting earnings and the earnings estimate, this is referred to as an earnings surprise. An earnings surprise can be positive, meaning the company beat its earnings estimate by a wide margin. Or a surprise can be negative, meaning the company did not perform as well as expected.</p>
      </InfoPopup>
    </>
  );
};
