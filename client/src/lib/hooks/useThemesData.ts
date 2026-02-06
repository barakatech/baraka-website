import { useState, useEffect, useCallback } from "react";
import {
  fetchTopGainersLosers,
  fetchPopular,
  fetchBarakaTop10,
  fetch52WeekHigh,
  fetch52WeekLow,
  fetchNewlyListed,
  fetchTopAutoInvest,
  fetchTopESG,
  searchStocks,
  fetchSectors,
  fetchTrackers,
  fetchThemes,
  type Stock,
  type Sector,
  type Tracker,
  type Theme
} from "../stocksApi";
import { mockPopularStocks } from "../constants/mockData";
import { useDebounce } from "./useDebounce";

export interface ThemesDataState {
  gainers: Stock[];
  losers: Stock[];
  popularStocks: Stock[];
  trendingStocks: Stock[];
  week52High: Stock[];
  week52Low: Stock[];
  barakaTop10: Stock[];
  newlyListed: Stock[];
  topAutoInvest: Stock[];
  topESG: Stock[];
  sectors: Sector[];
  trackers: Tracker[];
  themes: Theme[];
  searchResults: Stock[];
  isLoading: boolean;
  isSearching: boolean;
}

export function useThemesData(searchQuery: string) {
  const [data, setData] = useState<ThemesDataState>({
    gainers: [],
    losers: [],
    popularStocks: [],
    trendingStocks: [],
    week52High: [],
    week52Low: [],
    barakaTop10: [],
    newlyListed: [],
    topAutoInvest: [],
    topESG: [],
    sectors: [],
    trackers: [],
    themes: [],
    searchResults: [],
    isLoading: true,
    isSearching: false,
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Initial data loading
  useEffect(() => {
    async function loadInitialData() {
      try {
        setData(prev => ({ ...prev, isLoading: true }));
        console.log("Starting to fetch all data...");

        const [
          gainersLosers,
          popular,
          high52Week,
          low52Week,
          barakaTop,
          newlyAdded,
          autoInvest,
          esgStocks,
          sectorsList,
          trackersList,
          themesList
        ] = await Promise.all([
          fetchTopGainersLosers().catch(e => { console.error("fetchTopGainersLosers failed:", e); return { gainers: [], losers: [] }; }),
          fetchPopular().catch(e => { console.error("fetchPopular failed:", e); return []; }),
          fetch52WeekHigh().catch(e => { console.error("fetch52WeekHigh failed:", e); return []; }),
          fetch52WeekLow().catch(e => { console.error("fetch52WeekLow failed:", e); return []; }),
          fetchBarakaTop10().catch(e => { console.error("fetchBarakaTop10 failed:", e); return []; }),
          fetchNewlyListed().catch(e => { console.error("fetchNewlyListed failed:", e); return []; }),
          fetchTopAutoInvest().catch(e => { console.error("fetchTopAutoInvest failed:", e); return []; }),
          fetchTopESG().catch(e => { console.error("fetchTopESG failed:", e); return []; }),
          fetchSectors().catch(e => { console.error("fetchSectors failed:", e); return []; }),
          fetchTrackers().catch(e => { console.error("fetchTrackers failed:", e); return []; }),
          fetchThemes().catch(e => { console.error("fetchThemes failed:", e); return []; })
        ]);

        console.log("All data fetched successfully");

        // Ensure we always have at least 6 stocks for popular
        const combinedPopular = popular.length >= 6 ? popular : [...popular, ...mockPopularStocks.slice(popular.length)];

        setData({
          gainers: gainersLosers.gainers,
          losers: gainersLosers.losers,
          popularStocks: combinedPopular,
          trendingStocks: high52Week.length > 0 ? high52Week : mockPopularStocks,
          week52High: high52Week,
          week52Low: low52Week,
          barakaTop10: barakaTop,
          newlyListed: newlyAdded,
          topAutoInvest: autoInvest,
          topESG: esgStocks,
          sectors: sectorsList,
          trackers: trackersList,
          themes: themesList,
          searchResults: [],
          isLoading: false,
          isSearching: false,
        });
      } catch (error) {
        console.error("Error loading initial data:", error);
        setData(prev => ({ ...prev, isLoading: false }));
      }
    }

    loadInitialData();
  }, []);

  // Search handling
  useEffect(() => {
    async function performSearch() {
      if (!debouncedSearch.trim()) {
        setData(prev => ({ ...prev, searchResults: [], isSearching: false }));
        return;
      }

      try {
        setData(prev => ({ ...prev, isSearching: true }));
        const results = await searchStocks(debouncedSearch);
        setData(prev => ({ ...prev, searchResults: results, isSearching: false }));
      } catch (error) {
        console.error("Search failed:", error);
        setData(prev => ({ ...prev, searchResults: [], isSearching: false }));
      }
    }

    performSearch();
  }, [debouncedSearch]);

  const updateTrendingStocks = useCallback((stocks: Stock[]) => {
    setData(prev => ({ ...prev, trendingStocks: stocks }));
  }, []);

  return {
    ...data,
    updateTrendingStocks,
  };
}
