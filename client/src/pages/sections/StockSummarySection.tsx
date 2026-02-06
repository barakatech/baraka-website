import { useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { InstrumentDetails, ChartRange } from "@/lib/stocksApi";
import { getStockImageUrl, formatPrice, formatChangePercent, getChangeColor } from "@/lib/utils/stockFormatters";
import { useHistoricalChartData } from "@/lib/stocksQueries";

// Map display period to API range values
const PERIOD_TO_RANGE: Record<string, ChartRange> = {
  "Today": "day",
  "Week": "week",
  "Month": "month",
  "Year": "year",
  "5 Years": "five_year",
  "YTD": "ytd",
};

// Format timestamp for X-axis labels based on interval granularity
function formatTimestamp(timestamp: number, interval: string): string {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  const userLocale = navigator.language || 'en-US';

  switch (interval) {
    case "minute":
    case "five_minute":
    case "thirty_minute":
      return date.toLocaleTimeString(userLocale, { hour: "2-digit", minute: "2-digit", hour12: false });
    case "hour":
      return date.toLocaleTimeString(userLocale, { hour: "2-digit", minute: "2-digit", hour12: false });
    case "day":
      return date.toLocaleDateString(userLocale, { month: "short", day: "numeric" });
    case "week":
      return date.toLocaleDateString(userLocale, { month: "short" });
    case "month":
      return date.getFullYear().toString();
    default:
      return date.toLocaleDateString(userLocale, { month: "short", day: "numeric" });
  }
}

// Format tooltip date/time based on selected period
function formatTooltipDateTime(timestamp: number, period: string): { line1: string; line2?: string } {
  const date = new Date(timestamp * 1000);

  // Format date as "D MMM YYYY" (no leading zero on day)
  const formatDate = () => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Format time as 12-hour with AM/PM
  const formatTime = () => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  switch (period) {
    case "Today":
      return { line1: formatTime() };
    case "Week":
      return { line1: formatDate(), line2: formatTime() };
    case "Month":
    case "Year":
    case "5 Years":
    case "YTD":
      return { line1: formatDate() };
    default:
      return { line1: formatDate() };
  }
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { timestamp: number; price: number } }>;
  period: string;
}

const CustomTooltip = ({ active, payload, period }: TooltipProps) => {
  if (active && payload && payload.length) {
    const timestamp = payload[0].payload.timestamp;
    const formatted = formatTooltipDateTime(timestamp, period);

    return (
      <div className="bg-[#191919] border border-[#333] rounded-lg px-3 py-2">
        <p className="text-white text-sm font-medium">{formatted.line1}</p>
        {formatted.line2 && (
          <p className="text-[#ffffff80] text-xs">{formatted.line2}</p>
        )}
      </div>
    );
  }
  return null;
};

const timePeriods = ["Today", "Week", "Month", "Year", "5 Years", "YTD"];

interface StockSummarySectionProps {
  instrumentDetails: InstrumentDetails;
}

export const StockSummarySection = ({ instrumentDetails }: StockSummarySectionProps): JSX.Element => {
  const [activePeriod, setActivePeriod] = useState("Today");
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handlePeriodChange = (period: string) => {
    setActivePeriod(period);
    setAnimationKey(prev => prev + 1);
    setHoveredPrice(null); // Reset hover state when period changes
  };

  const companyName = instrumentDetails.name || "Unknown";
  const symbol = instrumentDetails.symbol || instrumentDetails.id || "";

  // Fetch historical chart data based on selected period
  const chartRange = PERIOD_TO_RANGE[activePeriod] || "day";
  const { data: historicalData, isLoading: isChartLoading } = useHistoricalChartData(
    symbol,
    chartRange,
    undefined, // Let the backend determine interval based on range
    { enabled: !!symbol }
  );

  // Price data from quotes API (via instrumentDetails)
  const currentPrice = instrumentDetails.price ?? 0.0;
  const changePrice = instrumentDetails.changePrice ?? 0;
  const changePercent = instrumentDetails.changePercent ?? 0;

  // Transform historical data for chart
  const chartData = useMemo(() => {
    if (!historicalData?.data?.length) {
      return [];
    }

    const interval = historicalData.interval || 'day';
    return historicalData.data.map((point) => ({
      timestamp: point.timestamp,
      price: point.close,
      time: formatTimestamp(point.timestamp, interval),
    }));
  }, [historicalData]);

  // Determine if the overall change is positive or negative for gradient color
  const isPositive = chartData.length > 0 && chartData[chartData.length - 1].price >= chartData[0].price;

  // Calculate displayed price and change based on hover state
  const baselinePrice = chartData.length > 0 ? chartData[0].price : 0;
  const displayPrice = hoveredPrice !== null ? hoveredPrice : currentPrice;
  const displayChangePrice = hoveredPrice !== null
    ? hoveredPrice - baselinePrice
    : changePrice;
  const displayChangePercent = hoveredPrice !== null && baselinePrice > 0
    ? ((hoveredPrice - baselinePrice) / baselinePrice) * 100
    : changePercent;

  // Handle chart hover events
  const handleChartMouseMove = useCallback((data: { activePayload?: Array<{ payload: { price: number } }> }) => {
    if (data.activePayload && data.activePayload.length > 0) {
      setHoveredPrice(data.activePayload[0].payload.price);
    }
  }, []);

  const handleChartMouseLeave = useCallback(() => {
    setHoveredPrice(null);
  }, []);

  const breadcrumbItems = [
    { label: "Home", isActive: false, href: "/" },
    { label: "Stocks", isActive: false, href: "/themes" },
    { label: companyName, isActive: true, href: null as string | null },
  ];

  return (
    <Card className="w-full bg-black rounded-3xl border-0">
      <CardContent className="flex flex-col gap-3 p-4 md:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 md:pb-8">
          <nav className="inline-flex items-center gap-1">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="inline-flex items-center gap-1">
                {item.href ? (
                  <Link href={item.href}>
                    <span
                      className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[16px] tracking-[0] leading-[18px] whitespace-nowrap text-[#ffffff80] hover:text-white cursor-pointer transition-colors"
                    >
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span
                    className="[font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-[16px] tracking-[0] leading-[18px] whitespace-nowrap text-white"
                  >
                    {item.label}
                  </span>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <img
                    className="w-3 h-3"
                    alt="Arrow"
                    src="/figmaAssets/-arrow-2.svg"
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="relative w-full sm:w-[343px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.4643C3.25 6.47995 6.47995 3.25 10.4643 3.25C14.4486 3.25 17.6786 6.47995 17.6786 10.4643C17.6786 14.4486 14.4486 17.6786 10.4643 17.6786C6.47995 17.6786 3.25 14.4486 3.25 10.4643ZM10.4643 2.25C5.92766 2.25 2.25 5.92766 2.25 10.4643C2.25 15.0009 5.92766 18.6786 10.4643 18.6786C12.5527 18.6786 14.459 17.8992 15.9084 16.6155L20.6464 21.3536L21.3536 20.6464L16.6155 15.9084C17.8992 14.459 18.6786 12.5527 18.6786 10.4643C18.6786 5.92766 15.0009 2.25 10.4643 2.25Z" fill="white" fillOpacity="0.3"/>
            </svg>
            <Input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search stock, companies"
              className="w-full h-[50px] bg-[#191919] rounded-[33px] border border-transparent pl-11 pr-12 [font-family:'Proxima_Nova-Regular',Helvetica] font-normal text-white text-[14px] tracking-[0] leading-[18px] placeholder:text-[#ffffff80] focus:outline-none focus:ring-0 focus:border-white"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </header>

        <div className="inline-flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#191919] flex items-center justify-center overflow-hidden p-2">
              {instrumentDetails.styleImageUrl?.dark ? (
                <img
                  src={getStockImageUrl(instrumentDetails.styleImageUrl)}
                  alt={symbol}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-white font-bold text-xl">{symbol ? symbol.charAt(0) : "?"}</span>
              )}
            </div>

            <div className="inline-flex flex-col items-start">
              <div className="font-heading-desktop-h2-medium font-[number:var(--heading-desktop-h2-medium-font-weight)] text-white text-[length:var(--heading-desktop-h2-medium-font-size)] tracking-[var(--heading-desktop-h2-medium-letter-spacing)] leading-[var(--heading-desktop-h2-medium-line-height)] whitespace-nowrap [font-style:var(--heading-desktop-h2-medium-font-style)]">
                {companyName}
              </div>

              <div className="font-heading-desktop-h4-regular font-[number:var(--heading-desktop-h4-regular-font-weight)] text-[#ffffff80] text-[length:var(--heading-desktop-h4-regular-font-size)] leading-[var(--heading-desktop-h4-regular-line-height)] whitespace-nowrap tracking-[var(--heading-desktop-h4-regular-letter-spacing)] [font-style:var(--heading-desktop-h4-regular-font-style)]">
                {symbol}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2">
            <div className="font-heading-desktop-h4-medium font-[number:var(--heading-desktop-h4-medium-font-weight)] text-white text-[length:var(--heading-desktop-h4-medium-font-size)] leading-[var(--heading-desktop-h4-medium-line-height)] whitespace-nowrap tracking-[var(--heading-desktop-h4-medium-letter-spacing)] [font-style:var(--heading-desktop-h4-medium-font-style)]">
              ${formatPrice(displayPrice)}
            </div>

            <div className={`font-heading-desktop-h5-regular font-[number:var(--heading-desktop-h5-regular-font-weight)] text-[length:var(--heading-desktop-h5-regular-font-size)] leading-[var(--heading-desktop-h5-regular-line-height)] whitespace-nowrap tracking-[var(--heading-desktop-h5-regular-letter-spacing)] [font-style:var(--heading-desktop-h5-regular-font-style)] ${getChangeColor(displayChangePercent)}`}>
              {formatChangePercent(displayChangePercent)} (${formatPrice(Math.abs(displayChangePrice))})
            </div>
          </div>
        </div>

        <div className="w-full h-[130px]">
          {isChartLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#ffffff80] text-sm">Loading chart...</div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#ffffff80] text-sm">No chart data available</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                key={animationKey}
                data={chartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
                onMouseMove={handleChartMouseMove}
                onMouseLeave={handleChartMouseLeave}
              >
                <defs>
                  <linearGradient id="colorPricePositive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0DDD00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0DDD00" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPriceNegative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3317" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF3317" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                <Tooltip
                  content={<CustomTooltip period={activePeriod} />}
                  cursor={{
                    stroke: isPositive ? '#0DDD00' : '#FF3317',
                    strokeWidth: 1,
                    strokeDasharray: '3 3'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "#0DDD00" : "#FF3317"}
                  strokeWidth={2}
                  fill={isPositive ? "url(#colorPricePositive)" : "url(#colorPriceNegative)"}
                  animationDuration={800}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex items-center justify-between w-full">
              {timePeriods.map((period, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handlePeriodChange(period)}
                    className={`text-[14px] font-normal whitespace-nowrap transition-colors duration-200 ${
                      period === activePeriod ? "text-white" : "text-[#ffffff80] hover:text-white/70"
                    }`}
                  >
                    {period}
                  </button>
                  <div className={`w-8 h-0.5 rounded-[100px] transition-all duration-300 ${period === activePeriod ? "bg-[#0DDD00]" : "bg-transparent"}`} />
                </div>
              ))}
            </div>
          </div>

          <Separator className="w-full h-px bg-[#ffffff1a]" />

          <footer className="flex items-center justify-between w-full">
            <div className="w-[81.67px] h-5">
              <div className="inline-flex items-end gap-[2.5px] relative top-px">
                <div className="w-[14.75px] h-[19.53px] bg-[url(/figmaAssets/layer-2-00000047055879271135863790000001974815911688759191-.png)] bg-[100%_100%]" />

                <img
                  className="w-[63.59px] h-[15.04px]"
                  alt="Text symbol"
                  src="/figmaAssets/text-symbol.svg"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-[72px] h-[9px] font-caption-mobile-caption-r font-[number:var(--caption-mobile-caption-r-font-weight)] text-[#ffffff80] text-[length:var(--caption-mobile-caption-r-font-size)] tracking-[var(--caption-mobile-caption-r-letter-spacing)] leading-[var(--caption-mobile-caption-r-line-height)] whitespace-nowrap [font-style:var(--caption-mobile-caption-r-font-style)]">
              getbaraka.com
            </div>
          </footer>
        </div>
      </CardContent>
    </Card>
  );
};
