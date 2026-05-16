import type { PaginationMeta } from "../types/api";

export const usePagination = (pagination?: PaginationMeta) => {
  if (!pagination) {
    return { pages: [], hasNext: false, hasPrev: false, totalPages: 0 };
  }

  const pages = Array.from({ length: pagination.totalPages }, (_, idx) => idx + 1);
  return {
    pages,
    hasNext: pagination.hasNext,
    hasPrev: pagination.hasPrev,
    totalPages: pagination.totalPages
  };
};
