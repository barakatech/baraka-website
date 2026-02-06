/**
 * Stock Detail Page Sections
 *
 * This file exports all section components used in the DetailedStockPage.
 * Each section requires `instrumentDetails` prop of type InstrumentDetails.
 */

// Stock Information Sections
export { StockSummarySection } from './StockSummarySection';
export { KeyStatsSection } from './KeyStatsSection';
export { CompanyOverviewSection } from './CompanyOverviewSection';

// Financial Data Sections
export { DividendsSection } from './DividendsSection';
export { EarningsSection } from './EarningsSection';
export { ShareholdersSection } from './ShareholdersSection';
export { StockSplitsSection } from './StockSplitsSection';

// Analysis Sections
export { StockAnalysisSection } from './StockAnalysisSection';
export { AdvancedStockAnalysisSection } from './AdvancedStockAnalysisSection';
export { SentimentAnalysisSection } from './SentimentAnalysisSection';

// Compliance & Ratings
export { ShariaScoreSection } from './ShariaScoreSection';

// Related Content Sections
export { SimilarStocksSection } from './SimilarStocksSection';
export { StockNewsSection } from './StockNewsSection';

// Engagement Sections
export { TradeSection } from './TradeSection';
export { WatchlistSubscriptionSection } from './WatchlistSubscriptionSection';
export { FAQSection } from './FAQSection';
export { AppPromotionSection } from './AppPromotionSection';

// Homepage Sections
export { TrendingTodaySection } from './TrendingTodaySection';
export { TopMoversListSection } from './TopMoversListSection';

/**
 * Common Props Interface
 *
 * Most sections accept these props:
 * - instrumentDetails: InstrumentDetails (required) - Full stock/instrument data
 *
 * Import InstrumentDetails type from: @/lib/stocksApi
 */
