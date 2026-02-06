import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core - main bundle
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/wouter/')) {
            return 'vendor-react';
          }

          // React Query - separate chunk
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'vendor-query';
          }

          // Recharts - only needed on stock detail pages
          if (id.includes('node_modules/recharts') ||
              id.includes('node_modules/d3-')) {
            return 'vendor-charts';
          }

          // Radix UI Core (used in App.tsx)
          if (id.includes('@radix-ui/react-tooltip') ||
              id.includes('@radix-ui/react-toast')) {
            return 'vendor-radix-core';
          }

          // Radix UI (lazy loaded components)
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix-ui';
          }

          // Form libraries
          if (id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform') ||
              id.includes('node_modules/zod')) {
            return 'vendor-forms';
          }

          // Icons - small, keep with main
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }

          // Page components
          if (id.includes('client/src/pages/ThemesPage')) {
            return 'page-home';
          }
          if (id.includes('client/src/pages/DetailedStockPage')) {
            return 'page-stock-detail';
          }
          if (id.includes('client/src/pages/ThemeDetailPage')) {
            return 'page-theme-detail';
          }
          if (id.includes('client/src/pages/SectorDetailPage')) {
            return 'page-sector-detail';
          }
          if (id.includes('client/src/pages/NewsListingPage')) {
            return 'page-news-listing';
          }
          if (id.includes('client/src/pages/NewsDetailPage')) {
            return 'page-news-detail';
          }

          // Sections - group by usage pattern
          if (id.includes('client/src/pages/sections/')) {
            // Heavy sections with charts
            if (id.includes('StockSummarySection')) {
              return 'sections-charts';
            }
            // Core stock detail sections
            if (id.includes('KeyStatsSection') ||
                id.includes('SentimentAnalysisSection') ||
                id.includes('CompanyOverviewSection')) {
              return 'sections-stock-core';
            }
            // Financial data sections
            if (id.includes('DividendsSection') ||
                id.includes('EarningsSection') ||
                id.includes('StockSplitsSection')) {
              return 'sections-financial';
            }
            // Other sections
            return 'sections-misc';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
