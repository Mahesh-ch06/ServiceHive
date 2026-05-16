import type { LeadFilters } from "../types/lead";

export const parseFiltersFromParams = (params: URLSearchParams): LeadFilters => {
  const status = params.get("status") || undefined;
  const source = params.get("source") || undefined;
  const search = params.get("search") || undefined;
  const sort = (params.get("sort") as "latest" | "oldest" | null) || undefined;
  const rawPage = params.get("page");
  const parsedPage = rawPage ? Number(rawPage) : undefined;
  const page = parsedPage && parsedPage > 0 ? parsedPage : undefined;

  return {
    status: status as LeadFilters["status"],
    source: source as LeadFilters["source"],
    search,
    sort,
    page
  };
};

export const buildParamsFromFilters = (filters: LeadFilters) => {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.source) params.set("source", filters.source);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  return params;
};
