import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InstrumentDetails } from "@/lib/stocksApi";
import { useRefinitivReport } from "@/lib/stocksQueries";

interface KeyStatsSectionProps {
  instrumentDetails: InstrumentDetails;
}

function formatNumber(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined) return "N/A";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatCurrency(value: number | null | undefined, currency = "USD"): string {
  if (value === null || value === undefined) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "N/A";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function formatVolume(value: number | null | undefined): string {
  if (value === null || value === undefined) return "N/A";
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return value.toLocaleString();
}

export const KeyStatsSection = ({ instrumentDetails }: KeyStatsSectionProps): JSX.Element => {
  const instrumentId = instrumentDetails.id;
  const { data: refinitivReport, isLoading } = useRefinitivReport(instrumentId);

  // Column 1 (1-5): Open, High, Low, Volume, Avg Daily Vol
  // Column 2 (6-10): 52-Week High, 52-Week Low, Market Cap, Trailing PE, Forward PE
  // Column 3 (11-15): LTG Forecast, Shares Outstanding, Dividend Yield, Annual Div, Annual Return
  const statsData = [
    {
      column: [
        { label: "Open", value: formatCurrency(instrumentDetails.openPrice) },
        { label: "High", value: formatCurrency(instrumentDetails.highPrice) },
        { label: "Low", value: formatCurrency(instrumentDetails.lowPrice) },
        { label: "Volume", value: formatVolume(instrumentDetails.volume) },
        { label: "Avg Daily Vol", value: refinitivReport ? formatVolume(refinitivReport.avgDailyVol) : "N/A" },
      ],
    },
    {
      column: [
        { label: "52-Week High", value: refinitivReport ? formatCurrency(refinitivReport.highPrice52week) : "N/A" },
        { label: "52-Week Low", value: refinitivReport ? formatCurrency(refinitivReport.lowPrice52week) : "N/A" },
        { label: "Market Cap", value: refinitivReport?.marketCap || "N/A" },
        { label: "Trailing PE", value: refinitivReport ? formatNumber(refinitivReport.trailingPriceToEarnings) : "N/A" },
        { label: "Forward PE", value: refinitivReport ? formatNumber(refinitivReport.forwardPriceToEarnings) : "N/A" },
      ],
    },
    {
      column: [
        { label: "LTG Forecast", value: refinitivReport?.ltg != null ? formatPercent(refinitivReport.ltg) : "N/A" },
        { label: "Shares Outstanding", value: formatVolume(instrumentDetails.shareOutstanding) },
        { label: "Dividend Yield", value: refinitivReport?.dividendYield != null ? `${formatNumber(refinitivReport.dividendYield)}%` : "N/A" },
        { label: "Annual Div", value: refinitivReport?.annualDiv != null ? formatCurrency(refinitivReport.annualDiv) : "N/A" },
        { label: "Annual Return", value: refinitivReport?.return1year != null ? formatPercent(refinitivReport.return1year) : "N/A" },
      ],
    },
  ];

  if (isLoading) {
    return (
      <section className="flex flex-col w-full items-start gap-4">
        <header className="inline-flex items-center gap-2">
          <h2 className="font-heading-desktop-h3-medium font-[number:var(--heading-desktop-h3-medium-font-weight)] text-white text-[length:var(--heading-desktop-h3-medium-font-size)] tracking-[var(--heading-desktop-h3-medium-letter-spacing)] leading-[var(--heading-desktop-h3-medium-line-height)] [font-style:var(--heading-desktop-h3-medium-font-style)]">
            Key Stats
          </h2>
        </header>
        <Card className="w-full bg-[#191919] border-0 rounded-[18px]">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
            {[1, 2, 3].map((col) => (
              <div key={col} className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex items-center gap-6 w-full">
                    <Skeleton className="h-4 w-24 bg-gray-700" />
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full items-start gap-4">
      <header className="inline-flex items-center gap-2">
        <h2 className="font-heading-desktop-h3-medium font-[number:var(--heading-desktop-h3-medium-font-weight)] text-white text-[length:var(--heading-desktop-h3-medium-font-size)] tracking-[var(--heading-desktop-h3-medium-letter-spacing)] leading-[var(--heading-desktop-h3-medium-line-height)] [font-style:var(--heading-desktop-h3-medium-font-style)]">
          Key Stats
        </h2>
      </header>

      <Card className="w-full bg-[#191919] border-0 rounded-[18px]">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
          {statsData.map((columnData, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className="flex flex-col items-start gap-3"
            >
              {columnData.column.map((stat, statIndex) => (
                <div
                  key={`stat-${columnIndex}-${statIndex}`}
                  className="flex items-center gap-6 w-full"
                >
                  <div className="flex items-center justify-start flex-1 font-body-4 font-[number:var(--body-4-font-weight)] text-[#ffffff80] text-[length:var(--body-4-font-size)] tracking-[var(--body-4-letter-spacing)] leading-[var(--body-4-line-height)] [font-style:var(--body-4-font-style)]">
                    {stat.label}
                  </div>
                  <div className="flex items-center justify-center font-body-4 font-[number:var(--body-4-font-weight)] text-white text-[length:var(--body-4-font-size)] tracking-[var(--body-4-letter-spacing)] leading-[var(--body-4-line-height)] whitespace-nowrap [font-style:var(--body-4-font-style)]">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
