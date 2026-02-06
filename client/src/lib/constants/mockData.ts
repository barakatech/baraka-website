import type { Stock } from "../stocksApi";

export const mockPopularStocks: Stock[] = [
  { instrumentId: "1", symbol: "AAPL", name: "Apple", lastPrice: 247.65, changePrice: 0.98, changePercent: 0.4, imageUrl: "https://logos.stockanalysis.com/aapl.svg" },
  { instrumentId: "2", symbol: "GOOGL", name: "Alphabet", lastPrice: 328.38, changePrice: 6.43, changePercent: 2.0, imageUrl: "https://logos.stockanalysis.com/googl.svg" },
  { instrumentId: "3", symbol: "NVDA", name: "NVIDIA", lastPrice: 183.32, changePrice: 5.34, changePercent: 3.0, imageUrl: "https://logos.stockanalysis.com/nvda.svg" },
  { instrumentId: "4", symbol: "TSLA", name: "Tesla", lastPrice: 431.44, changePrice: 12.18, changePercent: 2.9, imageUrl: "https://logos.stockanalysis.com/tsla.svg" },
  { instrumentId: "5", symbol: "MSFT", name: "Microsoft", lastPrice: 425.22, changePrice: 5.04, changePercent: 1.2, imageUrl: "https://logos.stockanalysis.com/msft.svg" },
  { instrumentId: "6", symbol: "AMZN", name: "Amazon", lastPrice: 198.45, changePrice: 3.51, changePercent: 1.8, imageUrl: "https://logos.stockanalysis.com/amzn.svg" },
];

export const categories = [
  { id: "all", label: "All", icon: null },
  { id: "themes", label: "Themes", icon: "🎯" },
  { id: "stocks", label: "Stocks", icon: "📈" },
  { id: "etfs", label: "ETFs", icon: "📊" },
  { id: "gainers", label: "Top Gainers", icon: "🚀" },
  { id: "losers", label: "Top Losers", icon: "📉" },
];
