import { StockCell } from "../StockCell";
import type { Stock } from "../../lib/stocksApi";
import { getStockImageUrl } from "../../lib/utils/stockFormatters";

interface StockRowProps {
  stock: Stock;
}

export function StockRow({ stock }: StockRowProps) {
  return (
    <StockCell
      symbol={stock.symbol || 'N/A'}
      name={stock.name || stock.symbol || 'Unknown'}
      price={stock.lastPrice || 0}
      changePercent={stock.changePercent || 0}
      imageUrl={getStockImageUrl(stock.styleImageUrl)}
      href={`/stocks/${stock.instrumentId || stock.symbol?.toLowerCase() || 'aapl'}`}
      instrumentId={stock.instrumentId || stock.symbol}
    />
  );
}
