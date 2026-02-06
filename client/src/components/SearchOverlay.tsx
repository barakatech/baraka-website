import { useEffect, useState, useRef } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { searchAll, type Stock, type Theme } from "@/lib/stocksApi";
import { Link } from "wouter";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function SearchOverlay({ isOpen, onClose, initialQuery = "" }: SearchOverlayProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{
    stocks: Stock[];
    themes: Theme[];
    sectors: Theme[];
  }>({ stocks: [], themes: [], sectors: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults({ stocks: [], themes: [], sectors: [] });
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await searchAll(debouncedQuery);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults({ stocks: [], themes: [], sectors: [] });
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResults = results.stocks.length > 0 || results.themes.length > 0 || results.sectors.length > 0;
  const showResults = debouncedQuery.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#1a1a1a] rounded-[24px] shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-white/10">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search stocks, ETFs, themes, sectors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 bg-black rounded-full pl-14 pr-14 text-white placeholder-white/40 text-base focus:outline-none focus:ring-2 focus:ring-white/20"
              style={{ fontFamily: '"Proxima Nova", sans-serif' }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-5 flex items-center text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            style={{ fontFamily: '"Proxima Nova", sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isSearching && (
            <div className="flex items-center justify-center py-12 text-white/50">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Searching...</span>
              </div>
            </div>
          )}

          {!isSearching && showResults && !hasResults && (
            <div className="flex flex-col items-center justify-center py-12 text-white/50">
              <svg className="w-16 h-16 mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-base" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                No results found for "{debouncedQuery}"
              </p>
            </div>
          )}

          {!isSearching && showResults && hasResults && (
            <div className="py-4">
              {results.stocks.length > 0 && (
                <div className="mb-6">
                  <h3 className="px-6 mb-3 text-sm font-semibold text-white/50 uppercase tracking-wide" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    Stocks & ETFs ({results.stocks.length})
                  </h3>
                  <div className="space-y-1">
                    {results.stocks.slice(0, 8).map((stock) => (
                      <Link
                        key={stock.instrumentId || stock.symbol}
                        href={`/stocks/${stock.instrumentId || stock.symbol.toLowerCase()}`}
                        onClick={onClose}
                      >
                        <div className="px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
                            {stock.imageUrl ? (
                              <img
                                src={stock.imageUrl}
                                alt={stock.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <span className="text-white font-semibold text-sm">
                                {stock.symbol.slice(0, 2)}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                              {stock.name}
                            </p>
                            <p className="text-white/40 text-xs" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                              {stock.symbol} {stock.sector && `• ${stock.sector}`}
                            </p>
                          </div>
                          {stock.changePercent !== undefined && (
                            <div className={`text-sm font-semibold ${stock.changePercent >= 0 ? 'text-[#0DDD00]' : 'text-red-500'}`}>
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.themes.length > 0 && (
                <div className="mb-6">
                  <h3 className="px-6 mb-3 text-sm font-semibold text-white/50 uppercase tracking-wide" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    Themes ({results.themes.length})
                  </h3>
                  <div className="space-y-1">
                    {results.themes.slice(0, 5).map((theme) => (
                      <Link
                        key={theme.id}
                        href={`/theme/${theme.slug || theme.id}`}
                        onClick={onClose}
                      >
                        <div className="px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-4">
                          {theme.image?.thumbnailUrl && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={theme.image.thumbnailUrl}
                                alt={theme.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                              {theme.title}
                            </p>
                            {theme.description && (
                              <p className="text-white/40 text-xs truncate" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                                {theme.description}
                              </p>
                            )}
                          </div>
                          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.sectors.length > 0 && (
                <div className="mb-6">
                  <h3 className="px-6 mb-3 text-sm font-semibold text-white/50 uppercase tracking-wide" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    Sectors ({results.sectors.length})
                  </h3>
                  <div className="space-y-1">
                    {results.sectors.slice(0, 5).map((sector) => (
                      <Link
                        key={sector.id}
                        href={`/sector/${sector.slug || sector.title.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={onClose}
                      >
                        <div className="px-6 py-3 hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                              {sector.title}
                            </p>
                            {sector.description && (
                              <p className="text-white/40 text-xs truncate" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                                {sector.description}
                              </p>
                            )}
                          </div>
                          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!showResults && (
            <div className="flex flex-col items-center justify-center py-12 text-white/30">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-base" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                Start typing to search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
