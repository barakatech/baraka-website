import { StockCell } from "../../components/StockCell";
import { useQuotesBatch } from "../../lib/stocksQueries";
import { Skeleton } from "../../components/ui/skeleton";

interface SimilarStocksSectionProps {
  relatedTickers: string[];
}

export const SimilarStocksSection = ({ relatedTickers }: SimilarStocksSectionProps): JSX.Element | null => {
  const { data: stocks, isLoading } = useQuotesBatch(relatedTickers);

  if (!relatedTickers.length) return null;

  if (isLoading) {
    return (
      <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
        <h2 className="text-white text-xl font-semibold">Similar Stocks</h2>
        <div className="flex flex-col gap-2">
          {Array.from({ length: Math.min(relatedTickers.length, 5) }).map((_, i) => (
            <Skeleton key={i} className="h-[72px] w-full rounded-[18px] bg-[#191919]" />
          ))}
        </div>
      </div>
    );
  }

  if (!stocks || stocks.length === 0) return null;

  return (
    <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <h2 className="text-white text-xl font-semibold">Similar Stocks</h2>

      <div className="flex flex-col gap-2">
        {stocks.map((stock) => (
          <StockCell
            key={stock.symbol}
            symbol={stock.symbol}
            name={stock.name}
            price={stock.price}
            changePercent={stock.changePercent}
            imageUrl={stock.imageUrl}
            instrumentId={stock.instrumentId}
          />
        ))}
      </div>
    </div>
  );
};
