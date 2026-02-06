import { useState } from "react";
import { InstrumentDetails } from "@/lib/stocksApi";

interface ShariaScoreSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const ShariaScoreSection = ({ instrumentDetails }: ShariaScoreSectionProps): JSX.Element => {
  const [showDetails, setShowDetails] = useState(false);

  // Get Shariah screening data from API
  const { shariahScreening } = instrumentDetails;
  const halal = shariahScreening?.revenueBreakdown?.halal || 0;
  const questionable = shariahScreening?.revenueBreakdown?.doubtful || 0;
  const notHalal = shariahScreening?.revenueBreakdown?.notHalal || 0;
  const complianceStatus = shariahScreening?.shariahComplianceStatus || "N/A";
  const revenueStatus = shariahScreening?.revenueBreakdown?.status || "N/A";

  return (
    <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <div className="flex items-center gap-2">
        <h2 className="text-white text-xl font-semibold">Sharia Score</h2>
        <img src="/attached_assets/Icon_Sharia-light_1769001320425.png" alt="Sharia" className="w-5 h-5" />
      </div>

      <div className="bg-[#1a1a1a] rounded-[18px] p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Revenue Breakdown</h3>
          <span className={`text-xs font-semibold ${revenueStatus === 'PASS' ? 'text-[#0DDD00]' : 'text-[#FF3317]'}`}>
            {revenueStatus}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Halal</span>
              <span className="text-white/70">{halal}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-[#0DDD00] rounded-full" style={{ width: `${halal}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Questionable</span>
              <span className="text-white/70">{questionable}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-white/50 rounded-full" style={{ width: `${questionable}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Not Halal</span>
              <span className="text-white/70">{notHalal}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF3317] rounded-full" style={{ width: `${notHalal}%` }} />
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-center text-white/50 text-sm mt-4 hover:text-white transition-colors"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </div>
  );
};
