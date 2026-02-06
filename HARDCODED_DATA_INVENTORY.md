# Hardcoded Data Inventory - Baraka Website

This document provides a comprehensive inventory of all hardcoded data in the Baraka website codebase that needs to be replaced with dynamic API calls.

**Last Updated:** January 29, 2026
**Total Files Affected:** ~20 files
**Total Hardcoded Items:** 200+ individual data points

---

## 🔴 HIGH PRIORITY (Core Dynamic Content)

### 1. News & Articles (2 files)

#### `/client/src/pages/NewsListingPage.tsx`
- **Hardcoded Items:**
  - `heroNews` (1 hero article with image, title, subtitle, category, date, read time)
  - `sidebarNews` (3 sidebar news items)
  - `recentHeadlines` (5 recent headlines)
  - `moreFromAkhbaraka` (6 news items with percentage changes)
  - `inOtherNews` (6 news items with sources: Reuters, Bloomberg, CNBC, Financial Times, WSJ, MarketWatch)
- **Total Items:** 22+ articles and headlines

#### `/client/src/pages/NewsDetailPage.tsx`
- **Hardcoded Items:**
  - `newsArticles` (3 complete articles with full content paragraphs - 26+ paragraphs total)
  - `similarNews` (3 similar news cards)
- **Total Items:** 6 articles

### 2. Stock Financial Data (5 files)

#### `/client/src/pages/sections/StockSummarySection.tsx`
- **Hardcoded Items:**
  - `chartDataByPeriod` - Historical stock price data for 6 time periods:
    - Today (14 intraday data points)
    - Week (5 weekly data points)
    - Month (4 weekly aggregates)
    - Year (7 monthly data points)
    - 5 Years (6 yearly data points)
    - YTD (6 monthly data points)
  - `breadcrumbItems` (3 breadcrumb links)
  - `timePeriods` (6 period labels)
- **Total Items:** 40+ data points

#### `/client/src/pages/sections/KeyStatsSection.tsx`
- **Hardcoded Items:**
  - `statsData` (12 key statistics):
    - Open, High, Low, 52-week High
    - Daily Volume, Average Daily Volume, Market Cap, Annual Return
    - Annual Dividend, P/E ratios, 52-week Low
- **Total Items:** 12 statistics

#### `/client/src/pages/sections/EarningsSection.tsx`
- **Hardcoded Items:**
  - `earnings` (4 quarterly earnings with actual vs forecast)
  - EPS value: 1.85
- **Total Items:** 5 data points

#### `/client/src/pages/sections/DividendsSection.tsx`
- **Hardcoded Items:**
  - `dividends` (5 dividend payments with dates and amounts)
- **Total Items:** 5 dividend records

#### `/client/src/pages/sections/ShariaScoreSection.tsx`
- **Hardcoded Items:**
  - Halal: 95.69%
  - Questionable: 0%
  - Not Halal: 4.31%
  - Score: 5
- **Total Items:** 4 data points

### 3. Company Information (2 files)

#### `/client/src/pages/sections/CompanyOverviewSection.tsx`
- **Hardcoded Items:**
  - `executivesData` (12 executives with name, age, title, gender, compensation)
  - `detailsData` (11 company details):
    - Country, Employees, Website, Exchange, IPO Date
    - SEDOL, ISIN, CUSIP, NAICS Code, NAICS Sector, NAICS Subsector
  - `shortText` and `fullText` (company description paragraphs)
- **Total Items:** 24+ data points

#### `/client/src/pages/sections/ShareholdersSection.tsx`
- **Hardcoded Items:**
  - `institutionsData` (11 institutional investors with percentage holdings and share counts)
  - Ownership percentages: 33.58% (institutions), 66.42% (others)
- **Total Items:** 13 data points

### 4. Market Data (2 files)

#### `/client/src/pages/sections/StockAnalysisSection.tsx`
- **Hardcoded Items:**
  - `trendData` (5 trend data points with scores 4-9 and time periods: 1w, 1m, 3m, 6m, 1y)
- **Total Items:** 5 data points

#### `/client/src/pages/sections/SentimentAnalysisSection.tsx`
- **Hardcoded Items:**
  - Positive sentiment: 34%
  - Negative sentiment: 66%
  - Total mentions: 3K+
- **Total Items:** 3 data points

---

## 🟡 MEDIUM PRIORITY (Configuration & Categories)

### 5. Investment Themes (3 files)

#### `/client/src/pages/ThemesPage.tsx`
- **Hardcoded Items:**
  - `infoPopupContent` (5 popup descriptions: trending, themes, calendar, onRepeat, topEsg)
  - `spotlightNews` (3 news items with stock changes)
  - `themes` (20 investment themes with stock counts, ETF counts, new badges)
  - `categories` (6 category filters)
  - `mockPopularStocks` (6 stocks with prices and changes)
  - `mockStocks` (8 stocks with full details)
  - Sector names array (10 sectors)
- **Total Items:** 58+ items

#### `/client/src/pages/ThemeDetailPage.tsx`
- **Hardcoded Items:**
  - `themeDescriptions` (26 theme descriptions with icons)
  - `otherThemes` (6 theme cards)
- **Total Items:** 32 items

#### `/client/src/pages/SectorDetailPage.tsx`
- **Hardcoded Items:**
  - `sectorData` (10 sectors with descriptions)
  - `otherSectors` (6 sectors for sidebar)
- **Total Items:** 16 sector entries

### 6. Navigation & Footer (2 files)

#### `/client/src/components/Header.tsx`
- **Hardcoded Items:**
  - `navLinks` (5 items) - main navigation menu
  - `mobileNavLinks` (7 items) - mobile navigation menu
  - `investDropdownLinks` (3 items) - invest dropdown with "new" badges
- **Total Items:** 15 links

#### `/client/src/components/Footer.tsx`
- **Hardcoded Items:**
  - `companyLinks` (9 items)
  - `productLinks` (11 items with "new" badges)
  - `popularStocks` (9 items)
  - `investingLinks` (4 items)
  - `legalLinks` (2 items)
  - `socialLinks` (5 items)
  - `disclaimerText` (multi-paragraph legal disclaimer)
- **Total Items:** 40+ links and text

---

## 🟢 LOW PRIORITY (Static Content)

### 7. Educational Content

#### `/client/src/pages/sections/FAQSection.tsx`
- **Hardcoded Items:**
  - `faqItems` (5 Q&A pairs about Apple Inc. and investing)
- **Total Items:** 5 Q&A pairs

### 8. Comparison Data

#### `/client/src/pages/sections/SimilarStocksSection.tsx`
- **Hardcoded Items:**
  - `similarStocks` (5 similar companies with prices and changes)
- **Total Items:** 5 stocks

---

## ✅ Already Dynamic (Using APIs)

The following components already fetch data from APIs:

1. **`/client/src/pages/sections/TrendingTodaySection.tsx`**
   - Fetches top gainers/losers from API
   - Uses `fetchTopGainersLosers()` function

2. **`/client/src/pages/sections/TopMoversListSection.tsx`**
   - Fetches top gainers/losers from API
   - Uses `fetchTopGainersLosers()` function

3. **`/client/src/pages/ThemesPage.tsx`** (Partial)
   - Fetches themes from API
   - Has mock data fallback for development

---

## Implementation Priority Breakdown

### Phase 1: Critical Stock Data APIs
**Priority:** URGENT
**Impact:** High - Core functionality

- [ ] Stock price history API (StockSummarySection.tsx)
- [ ] Key statistics API (KeyStatsSection.tsx)
- [ ] Earnings data API (EarningsSection.tsx)
- [ ] Dividends data API (DividendsSection.tsx)
- [ ] Company details API (CompanyOverviewSection.tsx)
- [ ] Shareholders data API (ShareholdersSection.tsx)

### Phase 2: News & Content APIs
**Priority:** HIGH
**Impact:** High - Content freshness

- [ ] News listing API (NewsListingPage.tsx)
- [ ] News detail API (NewsDetailPage.tsx)
- [ ] Similar articles recommendation API

### Phase 3: Market Analysis APIs
**Priority:** MEDIUM
**Impact:** Medium - Enhanced features

- [ ] Stock analysis/trends API (StockAnalysisSection.tsx)
- [ ] Sentiment analysis API (SentimentAnalysisSection.tsx)
- [ ] Similar stocks recommendation API (SimilarStocksSection.tsx)
- [ ] Sharia compliance scoring API (ShariaScoreSection.tsx)

### Phase 4: Configuration & Categories
**Priority:** MEDIUM
**Impact:** Medium - User experience

- [ ] Themes catalog API (ThemesPage.tsx)
- [ ] Theme details API (ThemeDetailPage.tsx)
- [ ] Sector data API (SectorDetailPage.tsx)
- [ ] Navigation links CMS integration (Header.tsx, Footer.tsx)

### Phase 5: Static Content Management
**Priority:** LOW
**Impact:** Low - Can remain static

- [ ] FAQ content API (FAQSection.tsx) - Optional CMS
- [ ] Legal disclaimer CMS (Footer.tsx) - Optional

---

## Data Dependencies & Relationships

### Stock Detail Page Dependencies
All sections on the stock detail page currently hardcoded for Apple (AAPL):
- StockSummarySection → Requires: Stock price history
- KeyStatsSection → Requires: Real-time stock statistics
- EarningsSection → Requires: Quarterly earnings data
- DividendsSection → Requires: Dividend payment history
- CompanyOverviewSection → Requires: Company profile & executives
- ShareholdersSection → Requires: Institutional holdings
- StockAnalysisSection → Requires: Technical analysis data
- SentimentAnalysisSection → Requires: Social sentiment data
- ShariaScoreSection → Requires: Religious compliance scores
- SimilarStocksSection → Requires: Stock recommendations

**Note:** All these sections need dynamic stock symbol routing instead of hardcoded AAPL data.

### News Page Dependencies
- NewsListingPage → Requires: News articles API with pagination
- NewsDetailPage → Requires: Article detail API by ID/slug
- Similar articles → Requires: Content recommendation engine

### Themes Dependencies
- ThemesPage → Partially implemented, needs complete API
- ThemeDetailPage → Requires: Theme stocks/ETFs listing
- SectorDetailPage → Requires: Sector companies listing

---

## API Endpoints Needed

### Stock APIs
```
GET /api/stocks/:symbol/price-history?period=1d|1w|1m|1y|5y|ytd
GET /api/stocks/:symbol/statistics
GET /api/stocks/:symbol/earnings
GET /api/stocks/:symbol/dividends
GET /api/stocks/:symbol/company
GET /api/stocks/:symbol/shareholders
GET /api/stocks/:symbol/analysis
GET /api/stocks/:symbol/sentiment
GET /api/stocks/:symbol/sharia-score
GET /api/stocks/:symbol/similar
```

### News APIs
```
GET /api/news?page=1&limit=10&category=all
GET /api/news/:id
GET /api/news/:id/similar
GET /api/news/headlines?limit=5
GET /api/news/spotlight?limit=3
```

### Themes & Sectors APIs
```
GET /api/themes?category=all
GET /api/themes/:id/stocks
GET /api/sectors
GET /api/sectors/:id/stocks
```

### Configuration APIs
```
GET /api/config/navigation
GET /api/config/footer
GET /api/faqs?category=investing
```

---

## Mock Data Currently Present

These mock data structures can be used as API response templates:

1. `mockPopularStocks` - 6 stocks with basic info
2. `mockStocks` - 8 stocks with detailed info
3. Stock chart data with realistic time series
4. News articles with full content structure
5. Executive compensation data structure
6. Institutional shareholder data structure

---

## Notes

1. **Current State:** Most data is hardcoded for demonstration/testing purposes
2. **API Infrastructure:** Check if backend endpoints exist in `/server` directory
3. **Data Sources:** Need to identify external data providers (e.g., financial data APIs, news feeds)
4. **Caching Strategy:** Consider implementing caching for frequently accessed data
5. **Real-time Updates:** Determine which data needs real-time vs. periodic updates
6. **Authentication:** Some endpoints may require user authentication
7. **Rate Limiting:** Financial data APIs often have rate limits
8. **Fallback Strategy:** Consider keeping mock data as fallback for development/testing

---

## Next Steps

1. Review existing backend API implementations in `/server` directory
2. Identify which external data providers to integrate (e.g., Alpha Vantage, Polygon.io, Finnhub)
3. Design database schema for cacheable data
4. Create API endpoints following priority phases
5. Update frontend components to consume APIs
6. Implement error handling and loading states
7. Add data refresh/polling mechanisms for real-time data
8. Test with production-like data volumes
