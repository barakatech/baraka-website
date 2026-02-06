import { useState } from "react";
import { InfoPopup } from "../../components/InfoPopup";
import { InstrumentDetails } from "@/lib/stocksApi";

interface DividendsSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const DividendsSection = ({ instrumentDetails }: DividendsSectionProps): JSX.Element => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Get dividends from API, take last 5, and format them
  const rawDividends = instrumentDetails.dividends || [];
  const dividends = rawDividends.slice(-5).map(div => {
    const date = new Date(div.date);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    return {
      date: formattedDate,
      amount: div.amount || 0
    };
  });

  // If no dividends, show empty state
  if (dividends.length === 0) {
    return (
      <>
        <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Dividends Per Share</h2>
            <button onClick={() => setShowInfoPopup(true)}>
              <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
              </svg>
            </button>
          </div>
          <div className="text-center py-8 text-white/50">
            No dividend data available
          </div>
        </div>
        <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Dividends Per Share">
          <p>The dividends graph provides an overview of the dividends paid out by the company on a per-share basis according to the set distribution schedule.</p>
          <p className="font-semibold text-white">Why it matters?</p>
          <p>Paying dividends allows companies to share their profits with shareholders, thereby rewarding shareholders for their investment via higher returns and incentivising them to continue holding the stocks. For investors, dividends help increase stock investing profits, provide an extra metric for fundamental analysis, reduce overall portfolio risk, and help to preserve the purchasing power of capital.</p>
          <p>A company's ability to pay out regular dividends—or cash distributions—may be an indication of its fundamental strength and an indication that the company's management has positive expectations around future earnings growth.</p>
          <p>In general, mature, slower-growing companies tend to pay regular dividends, while younger, faster-growing companies would rather reinvest the money toward growth. The frequency of dividend payments is often aligned with the announcement of company profits — typically quarterly, semi-annually, or annually.</p>
        </InfoPopup>
      </>
    );
  }

  const maxAmount = Math.max(...dividends.map(d => d.amount));
  const minAmount = Math.min(...dividends.map(d => d.amount));

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Dividends Per Share</h2>
          <button onClick={() => setShowInfoPopup(true)}>
            <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
            </svg>
          </button>
        </div>

        <div className="relative h-[120px]">
          <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {dividends.map((div, i) => {
              const x = 40 + (i * 80);
              const y = 70 - ((div.amount - minAmount) / (maxAmount - minAmount || 1)) * 40;
              return (
                <g key={i}>
                  {i > 0 && (
                    <line 
                      x1={40 + ((i - 1) * 80)} 
                      y1={70 - ((dividends[i - 1].amount - minAmount) / (maxAmount - minAmount || 1)) * 40}
                      x2={x} 
                      y2={y}
                      stroke="#555" 
                      strokeWidth="2"
                    />
                  )}
                  <circle cx={x} cy={y} r="6" fill="#0DDD00" />
                  <text x={x} y={y - 15} fill="white" fontSize="12" textAnchor="middle" fontWeight="600">
                    ${div.amount.toFixed(2)}
                  </text>
                  <text x={x} y="95" fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="middle">
                    {div.date}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Dividends Per Share">
        <p>The dividends graph provides an overview of the dividends paid out by the company on a per-share basis according to the set distribution schedule.</p>
        <p className="font-semibold text-white">Why it matters?</p>
        <p>Paying dividends allows companies to share their profits with shareholders, thereby rewarding shareholders for their investment via higher returns and incentivising them to continue holding the stocks. For investors, dividends help increase stock investing profits, provide an extra metric for fundamental analysis, reduce overall portfolio risk, and help to preserve the purchasing power of capital.</p>
        <p>A company's ability to pay out regular dividends—or cash distributions—may be an indication of its fundamental strength and an indication that the company's management has positive expectations around future earnings growth.</p>
        <p>In general, mature, slower-growing companies tend to pay regular dividends, while younger, faster-growing companies would rather reinvest the money toward growth. The frequency of dividend payments is often aligned with the announcement of company profits — typically quarterly, semi-annually, or annually.</p>
      </InfoPopup>
    </>
  );
};
