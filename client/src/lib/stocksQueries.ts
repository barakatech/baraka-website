import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  Stock,
  InstrumentDetails,
  StockPageData,
  HistoricalChartData,
  ChartRange,
  ChartInterval,
  RefinitivReport,
  BatchQuote,
  StockNewsItem,
  SpotlightItem,
  fetchTopGainersLosers,
  fetchTrending,
  fetchPopular,
  searchStocks,
  fetchBarakaTop10,
  fetchThemeStocks,
  fetchInstrumentDetails,
  fetchStockPage,
  fetchStockPageBySlug,
  fetchHistoricalChartData,
  fetchRefinitivReport,
  fetchQuotesBatch,
  fetchStockNews,
  fetchSpotlight,
} from './stocksApi';

// Query keys
export const stocksKeys = {
  all: ['stocks'] as const,
  topGainersLosers: () => [...stocksKeys.all, 'top-gainers-losers'] as const,
  trending: () => [...stocksKeys.all, 'trending'] as const,
  popular: () => [...stocksKeys.all, 'popular'] as const,
  search: (query: string) => [...stocksKeys.all, 'search', query] as const,
  barakaTop10: () => [...stocksKeys.all, 'baraka-top-10'] as const,
  instrumentDetails: (symbolOrId: string) => [...stocksKeys.all, 'instrument-details', symbolOrId] as const,
  stockPage: (instrumentId: string) => [...stocksKeys.all, 'stock-page', instrumentId] as const,
  stockPageBySlug: (slug: string) => [...stocksKeys.all, 'stock-page-slug', slug] as const,
  historicalChart: (symbol: string, range: ChartRange, interval?: ChartInterval) => {
    const key = ['stocks', 'historical-chart', symbol, range, interval] as const;
    return key;
  },
  refinitivReport: (instrumentId: string) => [...stocksKeys.all, 'refinitiv-report', instrumentId] as const,
  stockNews: (symbol: string) => [...stocksKeys.all, 'stock-news', symbol] as const,
  quotesBatch: (symbols: string[]) => [...stocksKeys.all, 'quotes-batch', ...symbols] as const,
  spotlight: () => ['content', 'spotlight'] as const,
  themes: {
    all: ['themes'] as const,
    stocks: (themeId: string) => [...stocksKeys.themes.all, themeId, 'stocks'] as const,
  },
};

// Hook for top gainers/losers with aggressive caching
export function useTopGainersLosers(options?: Partial<UseQueryOptions<{ gainers: Stock[]; losers: Stock[] }>>) {
  return useQuery({
    queryKey: stocksKeys.topGainersLosers(),
    queryFn: fetchTopGainersLosers,
    staleTime: 30 * 1000,           // 30 seconds
    refetchInterval: 60 * 1000,     // Refetch every 1 minute
    refetchOnWindowFocus: true,     // Refetch when user returns
    ...options,
  });
}

// Hook for trending stocks
export function useTrending(options?: Partial<UseQueryOptions<Stock[]>>) {
  return useQuery({
    queryKey: stocksKeys.trending(),
    queryFn: fetchTrending,
    staleTime: 5 * 60 * 1000,       // 5 minutes
    refetchOnWindowFocus: true,
    ...options,
  });
}

// Hook for popular stocks
export function usePopular(options?: Partial<UseQueryOptions<Stock[]>>) {
  return useQuery({
    queryKey: stocksKeys.popular(),
    queryFn: fetchPopular,
    staleTime: 5 * 60 * 1000,       // 5 minutes
    refetchOnWindowFocus: true,
    ...options,
  });
}

// Hook for search with debouncing
export function useStockSearch(query: string, options?: Partial<UseQueryOptions<Stock[]>>) {
  return useQuery({
    queryKey: stocksKeys.search(query),
    queryFn: () => searchStocks(query),
    staleTime: 2 * 60 * 1000,       // 2 minutes
    enabled: query.length > 0,       // Only fetch when query exists
    refetchOnWindowFocus: false,     // Don't refetch searches
    ...options,
  });
}

// Hook for Baraka top 10
export function useBarakaTop10(options?: Partial<UseQueryOptions<Stock[]>>) {
  return useQuery({
    queryKey: stocksKeys.barakaTop10(),
    queryFn: fetchBarakaTop10,
    staleTime: 15 * 60 * 1000,      // 15 minutes
    refetchOnWindowFocus: true,
    ...options,
  });
}

// Hook for theme stocks
export function useThemeStocks(themeId: string, options?: Partial<UseQueryOptions<Stock[]>>) {
  return useQuery({
    queryKey: stocksKeys.themes.stocks(themeId),
    queryFn: () => fetchThemeStocks(themeId),
    staleTime: 60 * 60 * 1000,      // 1 hour
    refetchOnWindowFocus: false,     // Static data, no auto-refetch
    enabled: !!themeId,
    ...options,
  });
}

// Hook for instrument details
export function useInstrumentDetails(symbolOrId: string, options?: Partial<UseQueryOptions<InstrumentDetails>>) {
  return useQuery({
    queryKey: stocksKeys.instrumentDetails(symbolOrId),
    queryFn: () => fetchInstrumentDetails(symbolOrId),
    staleTime: 5 * 60 * 1000,       // 5 minutes (matches backend cache)
    enabled: !!symbolOrId,           // Only fetch if symbolOrId is provided
    ...options,
  });
}

// Hook for stock page data (SEO & Content)
export function useStockPage(instrumentId: string, options?: Partial<UseQueryOptions<StockPageData>>) {
  return useQuery({
    queryKey: stocksKeys.stockPage(instrumentId),
    queryFn: () => fetchStockPage(instrumentId),
    staleTime: 60 * 60 * 1000,      // 1 hour (matches backend cache)
    enabled: !!instrumentId,         // Only fetch if instrumentId is provided
    ...options,
  });
}

// Hook for stock page data by slug (for direct URL visits)
export function useStockPageBySlug(slug: string, options?: Partial<UseQueryOptions<StockPageData>>) {
  return useQuery({
    queryKey: stocksKeys.stockPageBySlug(slug),
    queryFn: () => fetchStockPageBySlug(slug),
    staleTime: 60 * 60 * 1000,      // 1 hour (matches backend cache)
    enabled: !!slug,                 // Only fetch if slug is provided
    ...options,
  });
}

// Hook for historical chart data
export function useHistoricalChartData(
  symbol: string,
  range: ChartRange = "day",
  interval?: ChartInterval,
  options?: Partial<UseQueryOptions<HistoricalChartData>>
) {
  return useQuery({
    queryKey: stocksKeys.historicalChart(symbol, range, interval),
    queryFn: () => fetchHistoricalChartData(symbol, range, interval),
    staleTime: range === "day" || range === "day_hybrid" ? 60 * 1000 : 5 * 60 * 1000, // 1min for intraday, 5min for historical
    refetchOnWindowFocus: range === "day" || range === "day_hybrid", // Auto-refetch for intraday data
    enabled: !!symbol,               // Only fetch if symbol is provided
    ...options,
  });
}

// Hook for Refinitiv report (key stats)
export function useRefinitivReport(instrumentId: string, options?: Partial<UseQueryOptions<RefinitivReport>>) {
  return useQuery({
    queryKey: stocksKeys.refinitivReport(instrumentId),
    queryFn: () => fetchRefinitivReport(instrumentId),
    staleTime: 5 * 60 * 1000,       // 5 minutes (matches backend cache)
    enabled: !!instrumentId,         // Only fetch if instrumentId is provided
    ...options,
  });
}

// Hook for stock news
export function useStockNews(symbol: string, options?: Partial<UseQueryOptions<StockNewsItem[]>>) {
  return useQuery({
    queryKey: stocksKeys.stockNews(symbol),
    queryFn: () => fetchStockNews(symbol),
    staleTime: 5 * 60 * 1000,       // 5 minutes
    enabled: !!symbol,
    ...options,
  });
}

// Hook for batch quotes (similar stocks)
export function useQuotesBatch(symbols: string[], options?: Partial<UseQueryOptions<BatchQuote[]>>) {
  return useQuery({
    queryKey: stocksKeys.quotesBatch(symbols),
    queryFn: () => fetchQuotesBatch(symbols),
    staleTime: 5 * 60 * 1000,       // 5 minutes
    enabled: symbols.length > 0,
    ...options,
  });
}

// Hook for spotlight content
export function useSpotlight(options?: Partial<UseQueryOptions<SpotlightItem[]>>) {
  return useQuery({
    queryKey: stocksKeys.spotlight(),
    queryFn: fetchSpotlight,
    staleTime: 5 * 60 * 1000,       // 5 minutes
    refetchOnWindowFocus: true,
    ...options,
  });
}
