# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with HMR (port 9000)
npm run build        # Build for production (client + server)
npm start            # Run production build
npm run check        # Type check with TypeScript
```

### Database
```bash
npm run db:push      # Push schema changes to database using Drizzle Kit
```

## High-Level Architecture

### Monorepo Structure
This is a full-stack TypeScript monorepo with three main directories:
- **client/** - React frontend (Vite + React 18)
- **server/** - Express backend (BFF pattern)
- **shared/** - Shared types, schemas, and validators

### Backend as Frontend-for-Frontend (BFF)
The Express server acts as a proxy to the Baraka API, providing:
- **Caching**: Three-tier cache system (price: 30s, data: 5min, static: 1hr)
- **API Proxying**: Centralized error handling via `server/utils/apiProxy.ts`
- **Route Modules**: Domain-specific routers in `server/routes/` (stocks, themes, sectors, trackers)

Key files:
- `server/index.ts` - Main entry point, middleware setup
- `server/routes/index.ts` - Route composition
- `server/cache.ts` - NodeCache instances with different TTLs
- `server/utils/apiProxy.ts` - Generic proxy function with validation
- `server/lib/config.ts` - Centralized configuration from environment variables

### Frontend Architecture
React SPA with route-based code splitting:
- **Router**: Wouter (lightweight, 6KB)
- **State Management**: TanStack Query with infinite stale time
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: shadcn/ui (Radix UI primitives)

Key patterns:
- **Lazy Loading**: All pages except ThemesPage (homepage) are lazy loaded
- **Path Aliases**: `@/` for client/src, `@shared/` for shared, `@assets/` for attached_assets
- **API Layer**: `client/src/lib/stocksApi.ts` contains all API calls
- **Query Layer**: `client/src/lib/stocksQueries.ts` wraps API calls with React Query

### Page Structure
Pages are in `client/src/pages/` with extracted sections in `client/src/pages/sections/`:
- **ThemesPage.tsx** - Homepage with trending stocks, themes, and trackers
- **ThemeDetailPage.tsx** - Individual theme with stock list
- **SectorDetailPage.tsx** - Sector overview with stocks
- **DetailedStockPage.tsx** - Stock details with charts, stats, and financials
- **NewsListingPage.tsx** / **NewsDetailPage.tsx** - News articles

Each detail page composes multiple sections from the `sections/` directory. Sections are self-contained components that handle their own data fetching.

### Data Flow
1. Client requests data via query hooks (`stocksQueries.ts`)
2. Queries call API functions (`stocksApi.ts`)
3. API hits Express endpoints (`/api/*`)
4. Express routes check cache, then proxy to Baraka API
5. Response validated with Zod schemas (`shared/validators/`)
6. Data cached and returned to client

### Type Safety & Validation
- **Shared Schemas**: `shared/schema.ts` defines Drizzle ORM schemas
- **Validators**: `shared/validators/` contains Zod schemas for API responses
- **Runtime Validation**: API proxy validates responses but doesn't break on errors (logs warning)

### Caching Strategy
Three NodeCache instances:
- **priceCache** (30s TTL) - Real-time price data, top gainers/losers
- **dataCache** (5min TTL) - General data like stock details, search results
- **staticCache** (1hr TTL) - Themes, sectors, relatively static content

Cache middleware intercepts responses and stores them by URL key. On error, serves stale cache if available.

### Static Assets
The `attached_assets/` directory (~78MB, 275 files) contains:
- Stock logos and brand icons
- Arrow icons for price movements (green up, red down)
- Placeholder images and design references
- Served via Express static middleware at `/attached_assets`

Only ~14 files are actively used in code; the rest are design references.

### WebSocket Integration
Real-time stock price updates:
- `client/src/lib/websocket/stockTickerWebSocket.ts` - WebSocket client
- `client/src/hooks/useStockLiveTicker.ts` - React hook for live prices
- `client/src/components/WebSocketIndicator.tsx` - Connection status indicator
- Used in DetailedStockPage for live price updates

### Database Setup
Drizzle ORM configured for PostgreSQL (Neon serverless):
- `drizzle.config.ts` - Drizzle Kit configuration
- `shared/schema.ts` - Database schema (currently just users table)
- Requires `DATABASE_URL` environment variable

## Environment Variables
```bash
BARAKA_API_BASE_URL=https://api.production.app.axasbjeg.com # Legacy API for discover endpoints
BARAKA_CLIENT_FACADE_URL=https://services.production.app.getbaraka.com/b-client-facade # New API for instrument-details and search
BARAKA_API_AUTH_TOKEN=your_auth_token_here
NODE_ENV=development|production
DATABASE_URL=postgresql://... # (optional, for future DB features)
PORT=9000 # Server port (default 9000)
```

**Note:** The application uses two different API base URLs:
- `BARAKA_API_BASE_URL` - Used for discover endpoints (trending, popular, gainers/losers, etc.)
- `BARAKA_CLIENT_FACADE_URL` - Used for instrument-details and search endpoints

## Design System

### Stock Display Components
Two standardized patterns:

**Compact Card (`StockCompactCard.tsx`)**
- 127×88px, #191919 bg, 16px radius
- Used in horizontal scrollable rows (Trending, Popular Stocks)
- 16×16px logo with black circle background

**Full Width Cell (`StockCell.tsx`)**
- 72px height, #191919 bg, 18px radius
- Used in vertical lists (Gainers/Losers, Similar Stocks, Theme details)
- 48×48px logo with black circle background
- Arrow icons from `/attached_assets/Icons_Arrows_*.png`

### Color Tokens
- Positive change: `#0DDD00` (green)
- Negative change: `#FF3317` (red)
- Card background: `#191919`
- Card hover: `#252525`
- Logo background: `#000`

**IMPORTANT**: When changing stock component styles, update ALL instances consistently.

## Key Files Reference

### Entry Points
- `client/src/main.tsx` - React app entry
- `client/src/App.tsx` - App root with providers and router
- `server/index.ts` - Express server entry

### API Integration
- `client/src/lib/stocksApi.ts` - All API call functions
- `client/src/lib/stocksQueries.ts` - React Query hooks
- `client/src/lib/queryClient.ts` - Query client config (staleTime: Infinity)

### Routing
- `client/src/App.tsx` - Route definitions with lazy loading
- Routes: `/`, `/themes`, `/theme/:id`, `/sector/:id`, `/stocks/:slug`, `/news`, `/news/:id`

### Server Routes
All routes are in `server/routes/`:
- `stocks.ts` - 15 endpoints (search, details, gainers/losers, quotes, batch quotes, historical chart, news, refinitiv report, etc.)
- `themes.ts` - 2 endpoints (list all themes, theme details)
- `sectors.ts` - 1 endpoint (sector details)
- `trackers.ts` - 1 endpoint (all trackers)

### Validators
All in `shared/validators/`:
- `stocks.ts` - Stock, GainersLosers, SearchResponse, InstrumentDetails, HistoricalChartData, RefinitivReport
- `themes.ts` - Theme, ThemeDetails
- `trackers.ts` - Tracker
- `api.ts` - Generic wrapper with helper functions

## Build Output
- **Client**: `dist/public/` (Vite build)
- **Server**: `dist/index.js` (esbuild bundle)
- **Production**: Single entry point serves both API and static files

## Development Notes

### Vite Configuration
- Custom chunk splitting for optimal loading (see `vite.config.ts`)
- Separate chunks: react, query, charts, radix-ui, forms, icons
- Page-level code splitting for each route
- Section-level chunking by usage pattern (charts, financial, stock-core)

### No Tests Currently
Project does not have a test suite set up. No Jest, Vitest, or other test runners configured.

### Replit Environment
Development environment includes Replit-specific plugins:
- `@replit/vite-plugin-dev-banner` - Development banner
- `@replit/vite-plugin-runtime-error-modal` - Error overlay
- `@replit/vite-plugin-cartographer` - Code navigation

These only load in development when `REPL_ID` is set.

## Common Patterns

### Adding a New API Endpoint
1. Add validator to `shared/validators/` if needed
2. Add route handler to appropriate `server/routes/*.ts` file
3. Use `proxyBarakaAPI()` helper with cache and validation
4. Add API function to `client/src/lib/stocksApi.ts`
5. Add query hook to `client/src/lib/stocksQueries.ts`

### Creating a New Page
1. Create page component in `client/src/pages/`
2. Extract large sections to `client/src/pages/sections/`
3. Add lazy import in `App.tsx`
4. Add route in `Router` component
5. Use query hooks for data fetching

### Adding a New Section
1. Create in `client/src/pages/sections/`
2. Export from `client/src/pages/sections/index.ts`
3. Define types in `client/src/pages/sections/types.ts` if needed
4. Use React Query hooks for data fetching
5. Handle loading and error states

### Feature Flags
`client/src/lib/config.ts` - Client-side feature flags:
- `IS_PREMIUM` - Controls premium features (e.g. Analyst Ratings)
- `SHOW_SHARIA` - Controls Sharia Score section visibility on stock detail page

### Historical Chart Data
Real stock chart integration with API-driven historical prices:
- Backend auto-selects interval by range (day→5min, week→hour, month→day, year→week, 5yr→month)
- Smart caching: 60s for intraday, 5min for historical
- Dynamic chart colors (green/red based on performance)
- Endpoint: `GET /api/stocks/:symbol/historical?range=month&interval=day`

### Error Handling
- Server: Centralized error handler in `server/middleware/errorHandler.ts`
- Client: React Query handles errors, sections show error states
- Cache fallback: Serves stale cache on API errors when available
