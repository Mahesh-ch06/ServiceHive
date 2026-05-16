export const LEAD_SOURCE = ["Website", "Instagram", "Referral"] as const;
export type LeadSource = (typeof LEAD_SOURCE)[number];
