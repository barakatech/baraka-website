import { useState } from "react";
import { X } from "lucide-react";
import { InstrumentDetails } from "@/lib/stocksApi";

interface CompanyOverviewSectionProps {
  instrumentDetails: InstrumentDetails;
  stockName?: string;
  description?: string;
  overview?: string;
  content?: string;
}

export const CompanyOverviewSection = ({
  instrumentDetails,
  stockName = "N/A",
  description,
  overview,
  content
}: CompanyOverviewSectionProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showExecutivesPopup, setShowExecutivesPopup] = useState(false);

  const { companyDetails, executives } = instrumentDetails;

  // Build details data from API
  const detailsData = [
    { label: "Country", value: companyDetails?.country || "N/A" },
    { label: "Number of employees", value: companyDetails?.employeeTotal || "N/A" },
    { label: "Website", value: companyDetails?.weburl || "N/A" },
    { label: "Exchange", value: companyDetails?.exchange || "N/A" },
    { label: "IPO date", value: companyDetails?.ipo || "N/A" },
    { label: "Sedol number", value: companyDetails?.sedol || "N/A" },
    { label: "ISIN number", value: companyDetails?.isin || "N/A" },
    { label: "CUSIP number", value: companyDetails?.cusip || "N/A" },
    { label: "NAICS", value: companyDetails?.naics || "N/A" },
    { label: "NAICS Sector", value: companyDetails?.naicsSector || "N/A" },
    { label: "NAICS Subsector", value: companyDetails?.naicsSubsector || "N/A" },
  ];

  // Build executives data from API
  const executivesData = (executives?.executives || []).map(exec => ({
    name: exec.name || "N/A",
    age: exec.age || 0,
    title: exec.title || exec.position || "N/A",
    gender: exec.sex === "male" ? "Male" : exec.sex === "female" ? "Female" : "N/A",
    compensation: exec.compensation != null
      ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: exec.currency || 'USD', maximumFractionDigits: 0 }).format(exec.compensation)}`
      : "N/A"
  }));

  // Prioritize stock-pages content, fallback to description
  const displayText = overview || content || description || "No description available.";
  const isHtml = /<[^>]+>/.test(displayText);

  const femaleCount = executives?.numberOfFemaleExecutives || 0;
  const maleCount = executives?.numberOfMaleExecutives || 0;
  const totalCount = executivesData.length;
  const femalePercentage = executives?.femaleExecutivesPercentage?.toFixed(2) || "0.00";

  return (
    <>
      <section className="flex flex-col w-full items-start gap-3">
        <h2 className="self-stretch font-heading-desktop-h3-medium font-[number:var(--heading-desktop-h3-medium-font-weight)] text-white text-[length:var(--heading-desktop-h3-medium-font-size)] leading-[var(--heading-desktop-h3-medium-line-height)] tracking-[var(--heading-desktop-h3-medium-letter-spacing)] [font-style:var(--heading-desktop-h3-medium-font-style)]">
          About {stockName}
        </h2>

        <div className="self-stretch [font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-base leading-5">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px]' : 'max-h-[80px]'}`}
          >
            {isHtml ? (
              <div
                className="text-white [&_p]:mb-2 [&_a]:text-blue-400 [&_a]:underline [&_strong]:font-bold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
                dangerouslySetInnerHTML={{ __html: displayText }}
              />
            ) : (
              <span className="text-white">{displayText}</span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 font-heading-desktop-h5-medium font-[number:var(--heading-desktop-h5-medium-font-weight)] text-[#ffffff80] leading-[var(--heading-desktop-h5-medium-line-height)] underline [font-style:var(--heading-desktop-h5-medium-font-style)] tracking-[var(--heading-desktop-h5-medium-letter-spacing)] text-[length:var(--heading-desktop-h5-medium-font-size)] hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setShowDetailsPopup(true)}
            className="px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            Details
          </button>
          <button
            onClick={() => setShowExecutivesPopup(true)}
            className="px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            Executives
          </button>
        </div>
      </section>

      {showDetailsPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowDetailsPopup(false)}
        >
          <div 
            className="relative bg-[#191919] w-full max-w-[500px] max-h-[90vh] rounded-[24px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4">
              <div className="w-6" />
              <h2 className="text-white text-lg font-semibold" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Details</h2>
              <button 
                onClick={() => setShowDetailsPopup(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-4 pb-6 overflow-y-auto max-h-[calc(90vh-60px)]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              <div className="space-y-0">
                {detailsData.map((item, index) => (
                  <div 
                    key={item.label}
                    className={`flex items-center justify-between py-4 px-4 rounded-lg ${index % 2 === 0 ? 'bg-[#303030]' : ''}`}
                  >
                    <span className="text-white/50 text-base">{item.label}</span>
                    <span className="text-white text-base text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showExecutivesPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowExecutivesPopup(false)}
        >
          <div 
            className="relative bg-[#191919] w-full max-w-[500px] max-h-[90vh] rounded-[24px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4">
              <div className="w-6" />
              <h2 className="text-white text-lg font-semibold" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Executives</h2>
              <button
                onClick={() => setShowExecutivesPopup(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-60px)]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              <div className="text-center mb-6">
                <p className="text-white/50 text-sm mb-2">Female/Total Ratio</p>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0DDD00]" />
                    <span className="text-white/70 text-sm">Female ({femaleCount})</span>
                  </div>
                  <span className="text-white text-3xl font-bold">{femalePercentage}%</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0DDD00]" />
                    <span className="text-white/70 text-sm">Male ({maleCount})</span>
                  </div>
                </div>
              </div>

              <div className="space-y-0">
                {executivesData.map((exec, index) => (
                  <div 
                    key={exec.name}
                    className={`py-4 px-4 rounded-lg ${index % 2 === 0 ? 'bg-[#252525]' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-white font-semibold text-base">{exec.name}, {exec.age}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#0DDD00]" />
                        <span className="text-white/70 text-sm">{exec.gender}</span>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm mb-1">{exec.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">Compensation</span>
                      <span className="text-white text-sm font-medium">{exec.compensation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
