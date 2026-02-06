import { Suspense, lazy } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageLoadingFallback } from "@/components/PageLoader";

// Eager load: Homepage (critical path)
import { ThemesPage } from "@/pages/ThemesPage";

// Lazy load: All other pages
const ThemeDetailPage = lazy(() =>
  import("@/pages/ThemeDetailPage").then(m => ({ default: m.ThemeDetailPage }))
);
const SectorDetailPage = lazy(() =>
  import("@/pages/SectorDetailPage").then(m => ({ default: m.SectorDetailPage }))
);
const DetailedStockPage = lazy(() =>
  import("@/pages/DetailedStockPage").then(m => ({ default: m.DetailedStockPage }))
);
const NewsListingPage = lazy(() =>
  import("@/pages/NewsListingPage").then(m => ({ default: m.NewsListingPage }))
);
const NewsDetailPage = lazy(() =>
  import("@/pages/NewsDetailPage").then(m => ({ default: m.NewsDetailPage }))
);
const NewsListingPageV2 = lazy(() =>
  import("@/pages/NewsListingPageV2").then(m => ({ default: m.NewsListingPageV2 }))
);
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Switch>
        <Route path="/" component={ThemesPage} />
        <Route path="/themes" component={ThemesPage} />
        <Route path="/theme/:themeId" component={ThemeDetailPage} />
        <Route path="/sector/:sectorId" component={SectorDetailPage} />
        <Route path="/stocks/:slug" component={DetailedStockPage} />
        <Route path="/news" component={NewsListingPage} />
        <Route path="/news-v2" component={NewsListingPageV2} />
        <Route path="/news/:id" component={NewsDetailPage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-black flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
