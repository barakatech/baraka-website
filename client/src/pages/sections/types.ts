import type { InstrumentDetails, Stock } from "@/lib/stocksApi";

/**
 * Common prop interface for stock detail sections
 */
export interface StockSectionProps {
  instrumentDetails: InstrumentDetails;
}

/**
 * Props for sections that display a list of stocks
 */
export interface StockListSectionProps {
  stocks: Stock[];
  title?: string;
  description?: string;
}

/**
 * Props for sections with optional configuration
 */
export interface ConfigurableSectionProps extends StockSectionProps {
  config?: {
    showTitle?: boolean;
    showDescription?: boolean;
    maxItems?: number;
  };
}

/**
 * Re-export commonly used types
 */
export type { InstrumentDetails, Stock } from "@/lib/stocksApi";
