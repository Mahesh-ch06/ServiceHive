import { z } from "zod";

export const leadQuerySchema = z.object({
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional(),
  search: z.string().min(1).optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional()
});

export const leadParamsSchema = z.object({
  id: z.string().min(1)
});
