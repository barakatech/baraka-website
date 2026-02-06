# Baraka Investment Platform

## Overview

This is a modern investment platform web application built with React and Express. The app provides stock market information, investment themes, news articles, and detailed stock analysis pages. It features a dark-themed UI inspired by the Baraka brand, with pages for browsing investment themes, viewing detailed stock information, and reading financial news.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router alternative to React Router)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Build Tool**: Vite with React plugin

The frontend follows a page-based architecture with:
- Pages located in `client/src/pages/`
- Reusable sections in `client/src/pages/sections/`
- UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture

- **Framework**: Express.js with TypeScript
- **HTTP Server**: Node.js native HTTP server
- **Development**: Vite middleware integration for hot module replacement
- **Static Assets**: Served from `attached_assets/` directory
- **Port**: 5000 (set via PORT env var)

The server uses a clean separation pattern:
- `server/index.ts` - Main entry point and middleware setup
- `server/routes/` - API route definitions (stocks, themes, sectors, trackers)
- `server/storage.ts` - Data storage interface (currently in-memory)
- `server/vite.ts` - Development server configuration
- `server/cache.ts` - Caching layer
- `server/utils/apiProxy.ts` - API proxy utilities
- `server/middleware/errorHandler.ts` - Centralized error handling

### Data Layer

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (Replit built-in, accessed via DATABASE_URL)
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table builders
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Storage**: Currently uses in-memory storage (`MemStorage`) with interface ready for database migration

### Scripts

- `npm run dev` - Start development server (Express + Vite HMR)
- `npm run build` - Build for production (Vite frontend + esbuild backend)
- `npm run start` - Start production server
- `npm run db:push` - Push Drizzle schema to database

### Design Patterns

- **Path Aliases**: Uses `@/` for client source, `@shared/` for shared code
- **Component Pattern**: Functional components with TypeScript, using forwardRef for UI primitives
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Query Pattern**: React Query with custom query function wrapper for error handling

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable (Replit built-in)
- **Neon Database**: Uses `@neondatabase/serverless` for serverless PostgreSQL connections

### UI Libraries
- **Radix UI**: Complete set of accessible, unstyled UI primitives
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **React Day Picker**: Date picker component
- **Vaul**: Drawer component
- **CMDK**: Command menu component

### Development Tools
- **Drizzle Kit**: Database migration and schema management
- **ESBuild**: Production build bundling for server
- **Replit Plugins**: Development banner, error overlay, and cartographer for Replit environment

### Deployment
- **Target**: Autoscale
- **Build**: `npm run build`
- **Run**: `npm run start`

## Design Rules & Component Consistency

### Stock Component Styles
**IMPORTANT: When changing a component style in one place, update it consistently across ALL places.**

There are TWO standardized stock display styles:

1. **Compact Card (StockCompactCard)** - For horizontal scrollable rows
   - Used in: Trending section, Popular Stocks horizontal row
   - Dimensions: 127px × 88px
   - Background: #191919, hover: #252525
   - Border radius: 16px
   - Logo: 16px × 16px black circle background
   - Layout: Symbol top-left, logo top-right, price bottom-left, percentage bottom-right

2. **Full Width Cell (StockCell)** - For vertical stock lists
   - Used in: TrendingToday (Gainers/Losers), SimilarStocks, ThemeDetail stock list
   - Height: 72px (48px inner content + 12px top/bottom padding)
   - Background: #191919, hover: #252525
   - Border radius: 18px
   - Logo: 48px × 48px black circle background
   - Padding: 12px top, 16px left/right
   - Layout: Logo left, name/symbol center, price/percentage right
   - Arrow icons: Use image assets (/attached_assets/Icons_Arrows_*.png)

### UI Element Consistency
- Stock logo circles: Always use black background (#000)
- Positive change: Green #0DDD00
- Negative change: Red #FF3317
- News cards: #191919 background, 32px outer radius, no default border, 1.5px border on hover
- Load More buttons: White background, no border
