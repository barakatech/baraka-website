import { lazy, Suspense, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { SectionSkeleton } from "@/components/PageLoader";
import { useInstrumentDetails, useStockPage, useStockPageBySlug } from "@/lib/stocksQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/lib/config";

// Priority 1: Immediate (above fold)
import { StockSummarySection } from "./sections/StockSummarySection";
import { TradeSection } from "./sections/TradeSection";
import { AppPromotionSection } from "./sections/AppPromotionSection";
import { WatchlistSubscriptionSection } from "./sections/WatchlistSubscriptionSection";

// Priority 2: Load after paint
const KeyStatsSection = lazy(() =>
  import("./sections/KeyStatsSection").then(m => ({ default: m.KeyStatsSection }))
);
const SentimentAnalysisSection = lazy(() =>
  import("./sections/SentimentAnalysisSection").then(m => ({ default: m.SentimentAnalysisSection }))
);
const CompanyOverviewSection = lazy(() =>
  import("./sections/CompanyOverviewSection").then(m => ({ default: m.CompanyOverviewSection }))
);

// Priority 3: Lazy load on scroll
const DividendsSection = lazy(() =>
  import("./sections/DividendsSection").then(m => ({ default: m.DividendsSection }))
);
const EarningsSection = lazy(() =>
  import("./sections/EarningsSection").then(m => ({ default: m.EarningsSection }))
);
const StockSplitsSection = lazy(() =>
  import("./sections/StockSplitsSection").then(m => ({ default: m.StockSplitsSection }))
);
const AdvancedStockAnalysisSection = lazy(() =>
  import("./sections/AdvancedStockAnalysisSection").then(m => ({ default: m.AdvancedStockAnalysisSection }))
);
const SimilarStocksSection = lazy(() =>
  import("./sections/SimilarStocksSection").then(m => ({ default: m.SimilarStocksSection }))
);
const StockNewsSection = lazy(() =>
  import("./sections/StockNewsSection").then(m => ({ default: m.StockNewsSection }))
);
const FAQSection = lazy(() =>
  import("./sections/FAQSection").then(m => ({ default: m.FAQSection }))
);
const ShareholdersSection = lazy(() =>
  import("./sections/ShareholdersSection").then(m => ({ default: m.ShareholdersSection }))
);
const ShariaScoreSection = lazy(() =>
  import("./sections/ShariaScoreSection").then(m => ({ default: m.ShariaScoreSection }))
);

function LoadingState() {
  return (
    <div className="bg-black w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 bg-gray-800" />
        <Skeleton className="h-96 w-full bg-gray-800" />
      </div>
    </div>
  );
}

function ErrorState({ error, symbol }: { error: any; symbol?: string }) {
  return (
    <div className="bg-black w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Failed to load stock details</h2>
        <p className="text-gray-400 mb-4">
          {symbol ? `Could not load details for symbol: ${symbol}` : 'Could not load stock details'}
        </p>
        <p className="text-sm text-red-500">{error?.message}</p>
      </div>
    </div>
  );
}

// Helper to detect if a string is a UUID (instrumentId) vs a slug
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export const DetailedStockPage = (): JSX.Element => {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  const slugOrId = slug!;
  const isInstrumentId = isUUID(slugOrId);

  // Flow 1: Navigate with instrumentId (from listing click)
  // Fetch by instrumentId to get slug and replace URL
  const {
    data: stockPageDataById,
    isLoading: isLoadingById,
    error: errorById
  } = useStockPage(slugOrId, { enabled: isInstrumentId });

  // Flow 2: Direct URL visit with slug (bookmark/share)
  // Fetch by slug to get instrumentId
  const {
    data: stockPageDataBySlug,
    isLoading: isLoadingBySlug,
    error: errorBySlug
  } = useStockPageBySlug(slugOrId, { enabled: !isInstrumentId });

  // Use whichever data we got
  const stockPageData = isInstrumentId ? stockPageDataById : stockPageDataBySlug;
  const isLoadingPage = isInstrumentId ? isLoadingById : isLoadingBySlug;
  const pageError = isInstrumentId ? errorById : errorBySlug;

  // Get instrumentId from the appropriate source
  const instrumentId = stockPageData?.instrument_id || (isInstrumentId ? slugOrId : '');

  // Fetch instrument details once we have the instrumentId
  const {
    data: instrumentDetails,
    isLoading: isLoadingDetails,
    error: detailsError
  } = useInstrumentDetails(instrumentId, { enabled: !!instrumentId });

  // Flow 1: If we came with instrumentId, replace URL with slug once loaded
  useEffect(() => {
    if (isInstrumentId && stockPageData?.slug && slugOrId !== stockPageData.slug) {
      window.history.replaceState(null, '', `/stocks/${stockPageData.slug}`);
    }
  }, [isInstrumentId, stockPageData, slugOrId]);

  // Update document title and meta tags when stock page data loads
  useEffect(() => {
    if (stockPageData) {


      // Use English by default (can be enhanced with i18n later)
      document.title = stockPageData.meta_title_en || `${stockPageData.symbol_name} Stock | Baraka`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', stockPageData.meta_description_en || '');
      }

      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', stockPageData.og_title_en || stockPageData.meta_title_en || '');
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', stockPageData.og_description_en || stockPageData.meta_description_en || '');
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && stockPageData.og_image) {
        ogImage.setAttribute('content', stockPageData.og_image);
      }

      // Update Twitter card tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', stockPageData.twitter_title_en || stockPageData.og_title_en || '');
      }

      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', stockPageData.twitter_description_en || stockPageData.og_description_en || '');
      }

      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage && stockPageData.twitter_image) {
        twitterImage.setAttribute('content', stockPageData.twitter_image);
      }
    }
  }, [stockPageData]);

  const isLoading = isLoadingPage || isLoadingDetails;
  const error = pageError || detailsError;

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !instrumentDetails) {
    return <ErrorState error={error} symbol={instrumentId} />;
  }

  return (
    <div className="bg-black w-full min-h-screen p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_452px] gap-6 lg:gap-8">
        <div className="flex flex-col gap-6">
          {/* Priority 1: Immediate load */}
          <StockSummarySection instrumentDetails={instrumentDetails} />

          {/* Priority 2: Load after initial paint */}
          <Suspense fallback={<SectionSkeleton />}>
            <KeyStatsSection instrumentDetails={instrumentDetails} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <SentimentAnalysisSection instrumentDetails={instrumentDetails} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <CompanyOverviewSection
              instrumentDetails={instrumentDetails}
              stockName={instrumentDetails.name || stockPageData?.symbol_name || instrumentId}
              overview={stockPageData?.overview_en}
              content={stockPageData?.content_en}
            />
          </Suspense>

          {/* Priority 3: Lazy load on scroll */}
          <Suspense fallback={<SectionSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DividendsSection instrumentDetails={instrumentDetails} />
              <EarningsSection instrumentDetails={instrumentDetails} />
            </div>
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ShareholdersSection instrumentDetails={instrumentDetails} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <StockSplitsSection instrumentDetails={instrumentDetails} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <AdvancedStockAnalysisSection instrumentId={instrumentId} />
          </Suspense>

          {config.SHOW_SHARIA && (
            <Suspense fallback={<SectionSkeleton />}>
              <ShariaScoreSection instrumentDetails={instrumentDetails} />
            </Suspense>
          )}

          <Suspense fallback={<SectionSkeleton />}>
            <SimilarStocksSection relatedTickers={stockPageData?.related_tickers || []} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <StockNewsSection symbol={instrumentDetails.symbol || stockPageData?.symbol_name || ''} />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <div className="mt-8">
              <FAQSection />
            </div>
          </Suspense>
        </div>

        <div className="flex flex-col gap-4">
          {/* Sidebar: Keep eager for CTA */}
          <TradeSection
            symbol={instrumentDetails.symbol || stockPageData?.symbol_name || instrumentDetails.id}
            name={instrumentDetails.name || stockPageData?.symbol_name || instrumentDetails.id}
            price={instrumentDetails.price ?? 0.0}
            styleImageUrl={instrumentDetails.styleImageUrl}
          />
          <WatchlistSubscriptionSection
            stockName={instrumentDetails.name || stockPageData?.symbol_name || instrumentDetails.id}
            stockSymbol={instrumentDetails.symbol || stockPageData?.symbol_name || instrumentDetails.id}
          />
          <AppPromotionSection />
        </div>
      </div>
    </div>
  );
};
