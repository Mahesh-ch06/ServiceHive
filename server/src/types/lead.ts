import type { LeadSource, LeadStatus } from "../constants";

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: "latest" | "oldest";
  page?: number;
  limit?: number;
}
