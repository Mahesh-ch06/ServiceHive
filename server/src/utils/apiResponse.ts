import type { PaginationMeta } from "../types/common";

export const apiResponse = <T>(
  success: boolean,
  message: string,
  data?: T,
  pagination?: PaginationMeta
) => ({
  success,
  message,
  data,
  pagination
});
