import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ChevronRight } from "lucide-react";
import { InfoPopup } from "../../components/InfoPopup";
import { InstrumentDetails } from "@/lib/stocksApi";

interface ShareholdersSectionProps {
  instrumentDetails: InstrumentDetails;
}

export const ShareholdersSection = ({ instrumentDetails }: ShareholdersSectionProps): JSX.Element => {
  const [showInstitutionsPopup, setShowInstitutionsPopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  // Get data from API
  const { institutions, shareholderDistribution } = instrumentDetails;
  const institutionRate = shareholderDistribution?.institutionRate || 0;
  const othersRate = shareholderDistribution?.othersRate || 0;

  // Format institutions data
  const institutionsData = (institutions || []).map(inst => {
    const formatShares = (shares: number) => {
      if (shares >= 1_000_000_000) return `${(shares / 1_000_000_000).toFixed(2)}B shares`;
      if (shares >= 1_000_000) return `${(shares / 1_000_000).toFixed(2)}M shares`;
      return `${shares.toFixed(2)} shares`;
    };

    return {
      name: inst.name || "N/A",
      percentage: `${(inst.portfolioPercent || 0).toFixed(2)}%`,
      shares: formatShares(inst.share || 0)
    };
  });

  return (
    <>
      <div className="bg-[#111] rounded-[24px] p-5" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowInstitutionsPopup(true)}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-white/50 text-xs font-semibold tracking-wider uppercase">Shareholders</h3>
            <button onClick={(e) => { e.stopPropagation(); setShowInfoPopup(true); }}>
              <svg className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
              </svg>
            </button>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50" />
        </div>

        <div className="flex items-center gap-6 mt-4">
          <PieChart width={80} height={80}>
            <Pie
              data={[
                { name: "Institutions", value: institutionRate },
                { name: "Others", value: othersRate },
              ]}
              cx={35}
              cy={35}
              innerRadius="80%"
              outerRadius="100%"
              cornerRadius="50%"
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill="#0DDD00" />
              <Cell fill="#4ade80" />
            </Pie>
          </PieChart>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0DDD00]" />
              <span className="text-white">Institutions</span>
              <span className="text-white/50 ml-auto">{institutionRate.toFixed(2)}%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              <span className="text-white">Others</span>
              <span className="text-white/50 ml-auto">{othersRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {showInstitutionsPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowInstitutionsPopup(false)}
        >
          <div 
            className="relative bg-[#1a1a1a] w-full max-w-[500px] max-h-[90vh] rounded-[24px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4">
              <div className="w-6" />
              <h2 className="text-white text-lg font-semibold" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Institutions</h2>
              <button 
                onClick={() => setShowInstitutionsPopup(false)}
                className="text-white/70 hover:text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-60px)]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              {institutionsData.map((inst, index) => (
                <div 
                  key={inst.name}
                  className={`flex items-center justify-between py-4 px-6 ${index % 2 === 0 ? 'bg-[#2a2a2a]' : 'bg-transparent'}`}
                >
                  <span className="text-white/70 font-medium">{inst.name}</span>
                  <div className="text-right">
                    <p className="text-white font-semibold">{inst.percentage}</p>
                    <p className="text-white/50 text-sm">{inst.shares}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <InfoPopup isOpen={showInfoPopup} onClose={() => setShowInfoPopup(false)} title="Shareholders">
        <p>This datapoint provides a full list of institutional investors of a company in descending order of the number of shares held. Institutional investors are known to improve price discovery, increase allocative efficiency, and promote management accountability. They aggregate the capital that businesses need to grow, and provide trading markets with liquidity.</p>
      </InfoPopup>
    </>
  );
};
