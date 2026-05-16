import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional()
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional()
});
