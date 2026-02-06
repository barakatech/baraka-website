const API_BASE = "/api";

export const THEME_ID_MAP: Record<string, string> = {
  "adrs": "124",
  "penny-stocks": "123",
  "gold-etfs": "120",
  "halal-etfs": "61",
  "bitcoin-etfs": "119",
  "metaverse": "15",
  "titans": "115",
  "organic-food": "111",
  "robotics": "112",
  "drones": "108",
  "future-of-food": "109",
  "cyber-security": "110",
  "vehicles-of-the-future": "20",
  "financial-exchanges-data": "22",
  "future-of-entertainment": "35",
  "wind-energy": "37",
  "artificial-intelligence": "39",
  "saudi-backed": "16",
  "uae-backed": "12",
  "halal-stocks": "60",
  "blockchain": "4",
  "global-clean-energy": "21",
  "gaming": "34",
  "global-water": "36",
  "healthcare-innovation": "38",
  "technology": "39",
  "healthcare": "38",
  "clean-energy": "21",
  "ai-robotics": "112",
};

export const THEME_NAME_MAP: Record<string, string> = {
  "124": "ADRs",
  "123": "Penny Stocks",
  "120": "Gold ETFs",
  "61": "Halal ETFs",
  "119": "Bitcoin ETFs",
  "15": "Metaverse",
  "115": "Titans",
  "111": "Organic Food",
  "112": "Robotics",
  "108": "Drones",
  "109": "Future of Food",
  "110": "Cyber Security",
  "20": "Vehicles of the Future",
  "22": "Financial Exchanges & Data",
  "35": "Future of Entertainment",
  "37": "Wind Energy",
  "39": "Artificial Intelligence",
  "16": "Saudi Backed",
  "12": "UAE Backed",
  "60": "Halal Stocks",
  "4": "Blockchain",
  "21": "Global Clean Energy",
  "34": "Gaming",
  "36": "Global Water",
  "38": "Healthcare Innovation",
};

export interface Stock {
  instrumentId: string;
  symbol: string;
  name: string;
  description?: string;
  imageUrl: string;
  styleImageUrl?: {
    light: string;
    dark: string;
  };
  lastPrice?: number;
  lastTrade?: number;
  changePrice: number;
  changePercent: number;
  type?: string;
  sector?: string;
  exchange?: string;
}

export interface GainersLosersResponse {
  data: {
    gainers: Stock[];
    losers: Stock[];
  };
}

export interface StocksResponse {
  data: Stock[];
}

export interface SearchResponse {
  data: {
    stocks?: Stock[];
    themes?: Theme[];
    sectors?: Theme[];
  };
  nextCursor?: string | null;
}

export interface Sector {
  id: string | number;
  title: string;
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  isPremium?: boolean;
}

export interface Tracker {
  id: number;
  title: string;
  description?: string;
  shortDescription?: string;
  isNew?: boolean;
  tracker: string;
  image?: {
    imageUrl?: string;
    smallImageUrl?: string;
    thumbnailUrl?: string;
    icon?: string;
  };
}

export interface Theme {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  isNew?: boolean;
  stockCount?: number;
  etfCount?: number;
  image?: {
    imageUrl?: string;
    smallImageUrl?: string;
    thumbnailUrl?: string;
    icon?: string;
  };
}

function getStockImage(stock: Stock): string {
  return stock.styleImageUrl?.dark || stock.imageUrl || "";
}

function getStockPrice(stock: Stock): number {
  // Prioritize lastPrice, fallback to lastTrade, then default to 0
  return stock.lastPrice ?? stock.lastTrade ?? 0;
}

export async function fetchTopGainersLosers(): Promise<{ gainers: Stock[]; losers: Stock[] }> {
  const response = await fetch(`${API_BASE}/stocks/top-gainers-losers`);
  const data: GainersLosersResponse = await response.json();
  return {
    gainers: data.data.gainers.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) })),
    losers: data.data.losers.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) })),
  };
}

export async function fetchTrending(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/trending`);
  const data: StocksResponse = await response.json();
  return data.data.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchPopular(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/popular`);
  const data: StocksResponse = await response.json();
  return data.data.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export interface SearchResults {
  stocks: Stock[];
  themes: Theme[];
  sectors: Theme[];
  nextCursor?: string | null;
}

export async function searchStocks(query: string): Promise<Stock[]> {
  if (!query.trim()) return [];
  const response = await fetch(`${API_BASE}/stocks/search?query=${encodeURIComponent(query)}`);
  const data: SearchResponse = await response.json();
  return (data.data.stocks || []).map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function searchAll(query: string): Promise<SearchResults> {
  if (!query.trim()) return { stocks: [], themes: [], sectors: [] };
  const response = await fetch(`${API_BASE}/stocks/search?query=${encodeURIComponent(query)}`);
  const data: SearchResponse = await response.json();
  return {
    stocks: (data.data.stocks || []).map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) })),
    themes: data.data.themes || [],
    sectors: data.data.sectors || [],
    nextCursor: data.nextCursor,
  };
}

export async function fetchBarakaTop10(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/baraka-top-10`);
  const data: StocksResponse = await response.json();
  return data.data.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetch52WeekHigh(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/52-week-high`);
  const data = await response.json();
  console.log('fetch52WeekHigh response:', data);
  if (!data.data) {
    console.warn('fetch52WeekHigh returned no data:', data);
    return [];
  }
  return data.data.map((s: Stock) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetch52WeekLow(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/52-week-low`);
  const data = await response.json();
  console.log('fetch52WeekLow response:', data);
  if (!data.data) {
    console.warn('fetch52WeekLow returned no data:', data);
    return [];
  }
  return data.data.map((s: Stock) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchNewlyListed(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/newly-listed`);
  const data = await response.json();
  console.log('fetchNewlyListed response:', data);
  if (!data.data) {
    console.warn('fetchNewlyListed returned no data:', data);
    return [];
  }
  return data.data.map((s: Stock) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchTopAutoInvest(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/top-auto-invest`);
  const data = await response.json();
  console.log('fetchTopAutoInvest response:', data);
  if (!data.data) {
    console.warn('fetchTopAutoInvest returned no data:', data);
    return [];
  }
  return data.data.map((s: Stock) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchTopESG(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE}/stocks/top-esg`);
  const data = await response.json();
  console.log('fetchTopESG response:', data);
  if (!data.data) {
    console.warn('fetchTopESG returned no data:', data);
    return [];
  }
  return data.data.map((s: Stock) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchThemeStocks(themeSlug: string): Promise<Stock[]> {
  const themeId = THEME_ID_MAP[themeSlug];
  if (!themeId) {
    console.warn(`Unknown theme slug: ${themeSlug}`);
    return [];
  }
  const response = await fetch(`${API_BASE}/themes/${themeId}/stocks`);
  const data: StocksResponse = await response.json();
  return data.data.map((s) => ({ ...s, imageUrl: getStockImage(s), lastPrice: getStockPrice(s) }));
}

export async function fetchSectors(): Promise<Sector[]> {
  const response = await fetch(`${API_BASE}/sectors`);
  const data = await response.json();
  return data.data || [];
}

export async function fetchTrackers(): Promise<Tracker[]> {
  const response = await fetch(`${API_BASE}/trackers`);
  const data = await response.json();
  return data.data || [];
}

export async function fetchThemes(): Promise<Theme[]> {
  const response = await fetch(`${API_BASE}/themes`);
  const data = await response.json();
  return data.data || [];
}

// Instrument Details Types
export interface InstrumentDetails {
  id: string;
  symbol: string;
  name: string;
  description?: string;
  sector?: string;
  sectorName?: string;
  industry?: string;
  price?: number;
  changePrice?: number;
  changePercent?: number;
  imageUrl?: string;
  styleImageUrl?: {
    light: string;
    dark: string;
  };
  dividends: Dividend[];
  shareholderDistribution: ShareholderDistribution;
  sentiments: Sentiments;
  esg: ESGData;
  earningsPerShare: EarningsData[];
  institutions: Institution[];
  shariahScreening: ShariahScreening;
  executives: ExecutivesData;
  splits: StockSplit[];
  companyDetails: CompanyDetails;
  etfComposition?: ETFHolding[];
  etfCountryExposure?: CountryExposure[];
  etfSectorExposure?: SectorExposure[];
  sectionErrors?: SectionError[];
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volume?: number;
  shareOutstanding?: number;
}

export interface Dividend {
  instrumentId: string;
  symbol: string;
  date: string;
  amount: number;
  adjustedAmount: number;
  payDate: string;
  recordDate: string;
  declarationDate: string;
  currency: string;
}

export interface ShareholderDistribution {
  instrumentId: string;
  institutionRate: number;
  othersRate: number;
}

export interface Sentiments {
  symbol: string;
  social: {
    totalMention: number;
    positiveRate: number;
    negativeRate: number;
    historicalData: Array<{
      avgOfPositiveMention: number;
      avgOfNegativeMention: number;
      totalMention: number;
      date: string;
    }>;
  };
  news: {
    totalMention: number;
    positiveRate: number;
    negativeRate: number;
  };
  instrumentId: string;
}

export interface ESGData {
  instrumentId: string;
  symbol: string;
  environmentScore: number;
  socialScore: number;
  totalESGScore: number;
  governanceScore: number;
}

export interface EarningsData {
  instrumentId: string;
  epsActual: number;
  epsEstimate: number;
  quarter: number;
  year: number;
}

export interface Institution {
  instrumentId: string;
  name: string;
  share: number;
  change: number;
  filingDate: string;
  portfolioPercent: number;
  symbol: string;
  logo: {
    light: string;
    dark: string;
  };
  isServed: boolean;
}

export interface ShariahScreening {
  instrumentId: string;
  companyName: string;
  stockName: string;
  shariahComplianceStatus: string;
  complianceRanking: number;
  revenueBreakdown: {
    notHalal: number;
    halal: number;
    doubtful: number;
    status: string;
  };
  interestBearingSecuritiesAndAssets: {
    interestRatio: number;
    status: string;
  };
  interestBearingDebt: {
    debtRatio: number;
    status: string;
  };
  source: string;
  reportDate: string;
}

export interface ExecutivesData {
  instrumentId: string;
  executives: Array<{
    age: number;
    compensation: number;
    currency: string;
    name: string;
    position: string;
    sex: string;
    since: string;
    title: string;
  }>;
  numberOfFemaleExecutives: number;
  numberOfMaleExecutives: number;
  femaleExecutivesPercentage: number;
}

export interface StockSplit {
  instrumentId: string;
  symbol: string;
  date: string;
  fromFactor: number;
  toFactor: number;
  dateInstant: string;
}

export interface CompanyDetails {
  instrumentId: string;
  country: string;
  employeeTotal: string;
  naics: string;
  naicsSector: string;
  naicsSubsector: string;
  ipo: string;
  exchange: string;
  cusip: string;
  isin: string;
  sedol: string;
  weburl: string;
}

export interface ETFHolding {
  exposure: number;
  name: string;
  symbol: string;
  sector: string;
  logo: {
    light: string;
    dark: string;
  };
  isServed: boolean;
}

export interface CountryExposure {
  exposure: number;
  country: string;
  countryCode: string;
  imageUrl: string;
}

export interface SectorExposure {
  exposure: number;
  industry: string;
  sectorKey: string;
}

export interface SectionError {
  section: string;
  code: string;
  message: string;
}

// Stock Page Data (SEO & Content)
export interface StockPageData {
  instrument_id: string;
  symbol_name: string;
  exchange: string;
  slug: string;
  overview_en: string;
  overview_ar: string;
  content_en: string;
  content_ar: string;
  related_tickers: string[];
  meta_title_en: string;
  meta_title_ar: string;
  meta_description_en: string;
  meta_description_ar: string;
  og_title_en: string;
  og_title_ar: string;
  og_description_en: string;
  og_description_ar: string;
  og_image: string;
  twitter_title_en: string;
  twitter_title_ar: string;
  twitter_description_en: string;
  twitter_description_ar: string;
  twitter_image: string;
  twitter_card_type: string;
  schema_type: string;
  schema_currency: string;
}

export async function fetchInstrumentDetails(
  symbolOrId: string
): Promise<InstrumentDetails> {
  const res = await fetch(`${API_BASE}/stocks/${symbolOrId}/details`);
  if (!res.ok) {
    throw new Error(`Failed to fetch instrument details: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchStockPage(
  instrumentId: string
): Promise<StockPageData> {
  const res = await fetch(`${API_BASE}/stocks/${instrumentId}/page`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stock page data: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchStockPageBySlug(
  slug: string
): Promise<StockPageData> {
  const res = await fetch(`${API_BASE}/stocks/by-slug/${slug}/page`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stock page data by slug: ${res.statusText}`);
  }
  return res.json();
}

// Historical Chart Data Types
export interface HistoricalDataPoint {
  timestamp: number;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

export interface HistoricalChartData {
  symbol: string;
  range: string;
  interval: string;
  data: HistoricalDataPoint[];
}

// Valid range and interval values (from iOS)
export type ChartRange = "day" | "day_hybrid" | "week" | "month" | "year" | "five_year" | "ytd";
export type ChartInterval = "minute" | "five_minute" | "thirty_minute" | "hour" | "day" | "week" | "month";

// Interval selection by range (matching iOS logic)
export const INTERVAL_BY_RANGE: Record<ChartRange, ChartInterval> = {
  "day": "five_minute",
  "day_hybrid": "five_minute",
  "week": "hour",
  "month": "day",
  "year": "week",
  "five_year": "month",
  "ytd": "week",
};

export async function fetchHistoricalChartData(
  symbol: string,
  range: ChartRange = "day",
  interval?: ChartInterval
): Promise<HistoricalChartData> {
  // Use provided interval or determine from range
  const selectedInterval = interval || INTERVAL_BY_RANGE[range];

  const params = new URLSearchParams({
    range,
    interval: selectedInterval,
  });

  const res = await fetch(`${API_BASE}/stocks/${symbol}/historical?${params}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch historical chart data: ${res.statusText}`);
  }
  return res.json();
}

// Refinitiv Report Types (Key Stats)
export interface RefinitivReport {
  reportType?: string;
  symbol?: string;
  ric?: string;
  exchcode?: string;
  country?: string;
  companyName?: string;
  description?: string;
  reportDate?: string;
  marketCap?: string | null;
  marketCapCurrency?: string;
  closePrice?: number | null;
  closePriceDate?: string;
  closePriceCurrency?: string;
  dividendYield?: number | null;
  trailingPriceToEarnings?: number | null;
  forwardPriceToEarnings?: number | null;
  peg?: number | null;
  ltg?: number | null;
  revenue?: string | null;
  roe?: number | null;
  nm?: number | null;
  return1week?: number | null;
  return1month?: number | null;
  return3month?: number | null;
  return1year?: number | null;
  avgDailyVol?: number | null;
  highPrice52week?: number | null;
  lowPrice52week?: number | null;
  annualDiv?: number | null;
  institutionalOwnership?: number | null;
  averageScore?: number | null;
  averageScore1w?: number | null;
  averageScore1m?: number | null;
  averageScore3m?: number | null;
  averageScore6m?: number | null;
  averageScore1y?: number | null;
  averageScoreOutlook?: string | null;
  trend?: string | null;
  instrumentId?: string;
}

export interface BatchQuote {
  instrumentId: string;
  symbol: string;
  name: string;
  imageUrl: string;
  price: number;
  changePercent: number;
  changePrice: number;
}

export async function fetchQuotesBatch(symbols: string[]): Promise<BatchQuote[]> {
  if (symbols.length === 0) return [];
  const res = await fetch(`${API_BASE}/stocks/quotes/batch?symbols=${encodeURIComponent(symbols.join(","))}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch batch quotes: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

// Stock News Types
export interface StockNewsItem {
  id: number;
  imageUrl: string;
  title: string;
  link: string;
  timestamp: string;
  source: string;
  tickers: Array<{
    symbol: string;
    changePercent: number;
    changePrice: number;
    exchange: string;
    instrumentId: string;
  }>;
}

export async function fetchStockNews(symbol: string): Promise<StockNewsItem[]> {
  const res = await fetch(`${API_BASE}/stocks/${encodeURIComponent(symbol)}/news`);
  if (!res.ok) {
    throw new Error(`Failed to fetch stock news: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

// Spotlight Types
export interface SpotlightTicker {
  symbol: string;
  imageUrl: string;
  name: string;
  styleImageUrl?: {
    light: string;
    dark: string;
  };
  exchange: string;
  instrumentId: string;
}

export interface SpotlightItem {
  id: string;
  thumbnailTitle: string;
  badge: string;
  thumbnailDescription: string;
  thumbnailImageUrl: string;
  portraitImageUrl: string;
  spotlightArticleUrl: string;
  tickers: SpotlightTicker[];
  position: number;
  published: boolean;
}

export async function fetchSpotlight(): Promise<SpotlightItem[]> {
  const res = await fetch(`${API_BASE}/content/spotlight`);
  if (!res.ok) {
    throw new Error(`Failed to fetch spotlight: ${res.statusText}`);
  }
  const data = await res.json();
  // API returns an array directly; take only the top 3
  const items = Array.isArray(data) ? data : data.data || [];
  return items.slice(0, 3);
}

export async function fetchRefinitivReport(
  instrumentId: string
): Promise<RefinitivReport> {
  const res = await fetch(`${API_BASE}/stocks/${instrumentId}/refinitiv-report`);
  if (!res.ok) {
    throw new Error(`Failed to fetch refinitiv report: ${res.statusText}`);
  }
  return res.json();
}
