# Baraka Website Revamp - Comprehensive Plan

## Overview

Build a new website for getbaraka.com and akhbaraka using Next.js 14+ (App Router), replicating the design from `replit-stock-pages` while incorporating features from `website-front`. The website will support English and Arabic (RTL) from the start.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **State Management** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod validation |
| **i18n** | next-intl (supports App Router + RSC) |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **API Layer** | BFF (Backend for Frontend) using Next.js Route Handlers |

---

## Project Structure

```
website/
├── app/
│   ├── [locale]/                    # Locale-based routing (en/ar)
│   │   ├── layout.tsx               # Root layout with RTL support
│   │   ├── page.tsx                 # Homepage
│   │   ├── stock/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Stock detail page
│   │   ├── stocks/
│   │   │   └── page.tsx             # Stocks listing
│   │   ├── themes/
│   │   │   ├── page.tsx             # Themes listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Theme detail
│   │   ├── sectors/
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Sector detail
│   │   ├── news/                    # Akhbaraka news section
│   │   │   ├── page.tsx             # News listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # News detail
│   │   ├── learn/
│   │   │   ├── page.tsx             # Learn listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Learn article
│   │   └── blog/
│   │       ├── page.tsx             # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx         # Blog post
│   ├── api/                         # BFF API routes
│   │   ├── stocks/
│   │   │   ├── route.ts             # GET /api/stocks
│   │   │   ├── [symbol]/
│   │   │   │   └── route.ts         # GET /api/stocks/:symbol
│   │   │   ├── trending/route.ts
│   │   │   ├── top-gainers-losers/route.ts
│   │   │   └── search/route.ts
│   │   ├── themes/route.ts
│   │   ├── news/route.ts
│   │   └── learn/route.ts
│   ├── sitemap.ts                   # Dynamic sitemap generation
│   └── robots.ts                    # Robots.txt
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx               # From replit-stock-pages
│   │   └── Navigation.tsx
│   ├── stock/                       # Stock-related components
│   │   ├── StockSummarySection.tsx
│   │   ├── KeyStatsSection.tsx
│   │   ├── CompanyOverviewSection.tsx
│   │   ├── DividendsSection.tsx
│   │   ├── EarningsSection.tsx
│   │   ├── ShareholdersSection.tsx
│   │   ├── StockSplitsSection.tsx
│   │   ├── AdvancedStockAnalysisSection.tsx
│   │   ├── ShariaScoreSection.tsx
│   │   ├── SimilarStocksSection.tsx
│   │   ├── StockNewsSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── TradeSection.tsx
│   │   ├── WatchlistSubscriptionSection.tsx
│   │   ├── AppPromotionSection.tsx
│   │   ├── SentimentAnalysisSection.tsx
│   │   └── StockCell.tsx            # Reusable stock card
│   ├── news/                        # News/Akhbaraka components
│   │   ├── NewsCard.tsx
│   │   ├── NewsHero.tsx
│   │   └── NewsletterSubscribe.tsx
│   ├── theme/                       # Theme components
│   │   └── ThemeCard.tsx
│   └── common/
│       ├── SEOHead.tsx
│       ├── AppDownloadBadges.tsx
│       └── LanguageSwitcher.tsx
├── lib/
│   ├── api/                         # API client functions
│   │   ├── stocks.ts
│   │   ├── themes.ts
│   │   ├── news.ts
│   │   └── learn.ts
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useStock.ts
│   ├── useThemes.ts
│   └── useNews.ts
├── types/
│   ├── stock.ts
│   ├── theme.ts
│   ├── news.ts
│   └── seo.ts
├── messages/                        # i18n translations
│   ├── en.json
│   └── ar.json
├── config/
│   ├── site.ts                      # Site configuration
│   └── navigation.ts                # Navigation config
├── public/
│   ├── images/
│   └── figmaAssets/                 # Assets from replit-stock-pages
├── middleware.ts                    # Locale detection + Akhbaraka routing
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pages to Implement

### Phase 1: Core Pages (From replit-stock-pages)

| Page | Route | Source Reference |
|------|-------|-----------------|
| Stock Detail | `/stock/[slug]` | `DetailedStockPage.tsx` |
| Theme Detail | `/themes/[slug]` | `ThemeDetailPage.tsx` |
| Themes Listing | `/themes` | `ThemesPage.tsx` |
| Sector Detail | `/sectors/[slug]` | `SectorDetailPage.tsx` |
| News Listing (Akhbaraka) | `/news` | `NewsListingPage.tsx` |
| News Detail | `/news/[slug]` | `NewsDetailPage.tsx` |

### Phase 1: Additional Core Pages

| Page | Route | Notes |
|------|-------|-------|
| Homepage | `/` | New design based on replit style |
| Learn Listing | `/learn` | Dummy data initially |
| Learn Article | `/learn/[slug]` | Dummy data initially |
| Blog Listing | `/blog` | Dummy data initially |
| Blog Post | `/blog/[slug]` | Dummy data initially |

---

## SEO Implementation

Following the `STOCK-SEO-IMPLEMENTATION-GUIDE.md`:

### Database-Driven SEO (Lazy Generation)
- SEO metadata stored in database with `stock_seo_metadata` table
- On-demand generation from templates
- API returns pre-formatted SEO data

### SEO Components
```tsx
// Example: Stock page SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const stock = await getStock(params.slug)
  return {
    title: stock.seo.meta_title,
    description: stock.seo.meta_description,
    openGraph: {
      title: stock.seo.meta_title,
      description: stock.seo.meta_description,
      images: [stock.seo.meta_image],
    },
  }
}
```

### SEO Features
- Dynamic metadata generation for all pages
- Structured data (JSON-LD) for stocks, articles
- XML sitemaps (stocks, news, learn, blog)
- Canonical URLs with locale support
- Open Graph and Twitter cards

---

## Akhbaraka Implementation

### Routing Strategy
- Same codebase, environment-based configuration
- `IS_AKHBARAKA` flag controls:
  - Logo display (Baraka vs Akhbaraka)
  - Footer content (hide DFSA disclaimer for Akhbaraka)
  - Homepage hero content
  - Navigation items

### Middleware Configuration
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const isAkhbaraka = process.env.IS_AKHBARAKA === 'true'

  // Redirect certain routes for Akhbaraka
  if (isAkhbaraka) {
    // Akhbaraka-specific redirects
  }

  // Locale detection and routing
}
```

---

## BFF API Layer

### Endpoints

| Endpoint | Method | Description | Source |
|----------|--------|-------------|--------|
| `/api/stocks` | GET | List stocks (paginated, filtered) | baraka-api |
| `/api/stocks/[symbol]` | GET | Stock details + SEO | baraka-api |
| `/api/stocks/trending` | GET | Trending stocks | baraka-api |
| `/api/stocks/top-gainers-losers` | GET | Top movers | baraka-api |
| `/api/stocks/search` | GET | Search stocks | baraka-api |
| `/api/themes` | GET | List themes | baraka-api |
| `/api/themes/[id]/stocks` | GET | Stocks in theme | baraka-api |
| `/api/news` | GET | News articles | baraka-api/CMS |
| `/api/learn` | GET | Learn articles | Dummy data/CMS |

### BFF Benefits
- Transform/aggregate data for frontend needs
- Cache responses at edge
- Hide backend complexity
- Add frontend-specific business logic

---

## Components to Port from replit-stock-pages

### Stock Page Sections
1. `StockSummarySection` - Price chart, current price, change
2. `KeyStatsSection` - Market cap, P/E, volume, etc.
3. `SentimentAnalysisSection` - Analyst ratings, sentiment
4. `CompanyOverviewSection` - Company description
5. `DividendsSection` - Dividend history
6. `EarningsSection` - Earnings data
7. `ShareholdersSection` - Institutional ownership
8. `StockSplitsSection` - Split history
9. `AdvancedStockAnalysisSection` - Technical analysis
10. `ShariaScoreSection` - Shariah compliance score
11. `SimilarStocksSection` - Related stocks
12. `StockNewsSection` - Stock-specific news
13. `FAQSection` - Frequently asked questions
14. `TradeSection` - Trade CTA with app download
15. `WatchlistSubscriptionSection` - Email alerts
16. `AppPromotionSection` - App download promotion

### Layout Components
1. `Footer` - From replit-stock-pages (comprehensive)
2. `Header/Navigation` - New implementation

### News Components (Akhbaraka)
1. `NewsListingPage` layout and components
2. `NewsCard` - News article card
3. `NewsletterSubscribe` - Email subscription form

---

## i18n Strategy

### Configuration
```typescript
// next-intl config
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
  timeZone: 'Asia/Dubai',
  now: new Date(),
}))
```

### RTL Support
- Tailwind CSS RTL plugin
- `dir="rtl"` on html element for Arabic
- RTL-aware component styling

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up i18n (next-intl)
- [ ] Create base layout with Header/Footer
- [ ] Implement middleware for locale detection
- [ ] Set up BFF API routes structure
- [ ] Configure environment for Baraka vs Akhbaraka

### Phase 2: Stock Pages (Week 3-4)
- [ ] Port all stock section components from replit-stock-pages
- [ ] Implement Stock Detail page
- [ ] Connect to baraka-api endpoints
- [ ] Implement SEO (metadata generation)
- [ ] Add stock search functionality

### Phase 3: Theme & Sector Pages (Week 5)
- [ ] Implement Themes listing page
- [ ] Implement Theme detail page
- [ ] Implement Sector detail page
- [ ] Connect to themes API

### Phase 4: News/Akhbaraka (Week 6)
- [ ] Port News listing page (NewsListingPage)
- [ ] Port News detail page
- [ ] Implement newsletter subscription
- [ ] Configure Akhbaraka-specific routing/branding

### Phase 5: Learn & Blog (Week 7)
- [ ] Create Learn listing page (dummy data)
- [ ] Create Learn article page
- [ ] Create Blog listing page (dummy data)
- [ ] Create Blog post page

### Phase 6: SEO & Polish (Week 8)
- [ ] Implement dynamic sitemaps
- [ ] Add structured data (JSON-LD)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Testing

---

## Key Files to Reference

### Design Reference (replit-stock-pages)
- `client/src/pages/DetailedStockPage.tsx` - Stock page layout
- `client/src/pages/sections/*.tsx` - All stock sections
- `client/src/components/Footer.tsx` - Footer component
- `client/src/pages/NewsListingPage.tsx` - Akhbaraka news
- `client/src/pages/ThemesPage.tsx` - Themes listing

### API Reference (baraka-api)
- `apps/api/src/finance-market/` - Market data endpoints
- `apps/api/src/stock-instrument/` - Stock instrument data
- `apps/api/src/stock-instrument/theme-stocks/` - Theme APIs

### SEO Reference
- `STOCK-SEO-IMPLEMENTATION-GUIDE.md` - Complete SEO strategy

---

## Verification Plan

### Development Testing
1. Run `npm run dev` and verify all pages render
2. Test stock detail page with real stock symbols (AAPL, TSLA, etc.)
3. Test language switching (EN/AR) and RTL layout
4. Verify API routes return correct data

### SEO Testing
1. Use browser dev tools to inspect meta tags
2. Test Open Graph tags with social media debuggers
3. Verify sitemap.xml generation
4. Check structured data with Google's Rich Results Test

### Akhbaraka Testing
1. Set `IS_AKHBARAKA=true` environment variable
2. Verify logo changes to Akhbaraka
3. Verify footer disclaimer is hidden
4. Test news page functionality

### Performance Testing
1. Run Lighthouse audit (target: 90+ scores)
2. Check Core Web Vitals
3. Verify images are optimized

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "typescript": "^5.x",
    "@tanstack/react-query": "^5.x",
    "next-intl": "^3.x",
    "tailwindcss": "^3.x",
    "@radix-ui/react-*": "latest",
    "lucide-react": "latest",
    "framer-motion": "^11.x",
    "recharts": "^2.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
```

---

## Notes

- All stock data fetched from existing `baraka-api`
- Learn and Blog pages will use dummy data initially (can connect to CMS later)
- News data source TBD (may need CMS integration)
- Footer from `replit-stock-pages/client/src/components/Footer.tsx` is comprehensive and should be used as-is
- Design tokens and colors should match replit-stock-pages (dark theme, #191919 cards, etc.)
