import { create } from "zustand";
import type { LeadFilters, LeadSource, LeadStatus } from "../types/lead";

interface FilterState {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page: number;
  setFilters: (updates: Partial<LeadFilters>) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: undefined,
  source: undefined,
  search: "",
  sort: "latest",
  page: 1,
  setFilters: (updates) =>
    set((state) => {
      const resetsPage =
        "status" in updates ||
        "source" in updates ||
        "sort" in updates ||
        "search" in updates;
      return {
        ...state,
        ...updates,
        page: updates.page ?? (resetsPage ? 1 : state.page)
      };
    }),
  reset: () => set({ status: undefined, source: undefined, search: "", sort: "latest", page: 1 })
}));
