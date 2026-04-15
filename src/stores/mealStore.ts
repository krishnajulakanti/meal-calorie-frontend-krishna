import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalorieResult, MealHistoryItem } from "@/types";

interface MealState {
  lastResult: CalorieResult | null;
  history: MealHistoryItem[];
  saveSearchResult: (result: CalorieResult) => void;
  clearResult: () => void;
  clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
  persist(
    (set) => ({
      lastResult: null,
      history: [],
      saveSearchResult: (result) =>
        set((state) => ({
          lastResult: result,
          history: [
            { ...result, searched_at: new Date().toISOString() },
            ...state.history,
          ].slice(0, 20),
        })),
      clearResult: () => set({ lastResult: null }),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "meal-storage" }
  )
);
