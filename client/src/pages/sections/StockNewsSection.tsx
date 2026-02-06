import { useStockNews } from "@/lib/stocksQueries";
import { Skeleton } from "@/components/ui/skeleton";

interface StockNewsSectionProps {
  symbol: string;
}

export const StockNewsSection = ({ symbol }: StockNewsSectionProps): JSX.Element | null => {
  const { data: news, isLoading } = useStockNews(symbol);

  if (isLoading) {
    return (
      <section className="flex flex-col w-full items-start gap-6 mt-8">
        <Skeleton className="h-8 w-40 bg-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-[180px] w-full rounded-[18px] bg-gray-800 mb-4" />
              <Skeleton className="h-5 w-3/4 mx-auto bg-gray-800" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col w-full items-start gap-6 mt-8">
      <header className="inline-flex items-center gap-2">
        <h2 className="text-2xl md:text-3xl font-medium text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          Similar News
        </h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {news.map((item) => (
          <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer">
            <div className="cursor-pointer group">
              <div className="h-[180px] overflow-hidden rounded-[18px] mb-4 bg-[#191919]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="text-center px-2">
                <h3 className="text-white text-base font-medium line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm mt-1">{item.source}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
