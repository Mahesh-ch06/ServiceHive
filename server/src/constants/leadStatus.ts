export const LEAD_STATUS = ["New", "Contacted", "Qualified", "Lost"] as const;
export type LeadStatus = (typeof LEAD_STATUS)[number];
