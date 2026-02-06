import { useState, useRef, useEffect } from "react";
import { InstrumentDetails } from "@/lib/stocksApi";

interface StockSplitsSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const StockSplitsSection = ({ instrumentDetails }: StockSplitsSectionProps): JSX.Element | null => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number } | null>(null);

  // Get splits from API and format them
  const rawSplits = instrumentDetails.splits || [];
  const splits = rawSplits.map(split => {
    const date = new Date(split.date);
    const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return {
      date: formattedDate,
      from: split.fromFactor || 1,
      to: split.toFactor || 1
    };
  });

  const displayedSplits = isExpanded ? splits : splits.slice(0, 3);

  useEffect(() => {
    const container = containerRef.current;
    const dots = dotRefs.current;
    if (!container || dots.length < 2) {
      setLineStyle(null);
      return;
    }
    const firstDot = dots[0];
    const lastDot = dots[dots.length - 1];
    if (!firstDot || !lastDot) return;

    const containerRect = container.getBoundingClientRect();
    const firstCenter = firstDot.getBoundingClientRect().top + firstDot.getBoundingClientRect().height / 2 - containerRect.top;
    const lastCenter = lastDot.getBoundingClientRect().top + lastDot.getBoundingClientRect().height / 2 - containerRect.top;

    setLineStyle({ top: firstCenter, height: lastCenter - firstCenter });
  }, [displayedSplits.length]);

  // Hide the entire section if no splits data
  if (splits.length === 0) return null;

  return (
    <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <h2 className="text-white text-lg font-semibold mb-4">Stock Splits</h2>

      <div className="relative" ref={containerRef}>
        {/* Vertical line spanning from first dot center to last dot center */}
        {lineStyle && lineStyle.height > 0 && (
          <div
            className="absolute w-0.5 bg-[#0DDD00] -translate-x-1/2"
            style={{ left: 11, top: lineStyle.top, height: lineStyle.height }}
          />
        )}

        <div className="space-y-3">
          {displayedSplits.map((split, i) => (
            <div key={i} className="relative pl-8">
              <div
                ref={el => { dotRefs.current[i] = el; }}
                className="absolute left-[11px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#0DDD00] bg-black z-10"
              />

              <div className="bg-[#1a1a1a] rounded-[16px] p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Date</p>
                    <p className="text-white font-semibold">{split.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-xs">From <span className="text-white font-semibold">{split.from}</span></p>
                    <p className="text-white/50 text-xs">To <span className="text-white font-semibold">{split.to}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {splits.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center mt-4 text-white/50 hover:text-white transition-colors"
        >
          <svg
            className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};
