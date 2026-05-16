import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/ApiError";
import {
  createLead,
  deleteLead,
  getLeadById,
  listLeads,
  listLeadsForExport,
  updateLead
} from "../services/leadService";
import { buildLeadCsv } from "../utils/csv";
import type { LeadFilters } from "../types/lead";

export const list = asyncHandler(async (req, res) => {
  const { items, pagination } = await listLeads(req.query as LeadFilters);
  res
    .status(200)
    .json(apiResponse(true, "Leads fetched successfully", items, pagination));
});

export const getById = asyncHandler(async (req, res) => {
  const lead = await getLeadById(req.params.id);
  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }
  res.status(200).json(apiResponse(true, "Lead fetched successfully", lead));
});

export const create = asyncHandler(async (req, res) => {
  const lead = await createLead(req.body);
  res.status(201).json(apiResponse(true, "Lead created successfully", lead));
});

export const update = asyncHandler(async (req, res) => {
  const lead = await updateLead(req.params.id, req.body);
  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }
  res.status(200).json(apiResponse(true, "Lead updated successfully", lead));
});

export const remove = asyncHandler(async (req, res) => {
  const lead = await deleteLead(req.params.id);
  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }
  res.status(200).json(apiResponse(true, "Lead deleted successfully"));
});

export const exportCsv = asyncHandler(async (req, res) => {
  const leads = await listLeadsForExport(req.query as LeadFilters);
  const csv = buildLeadCsv(
    leads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt
    }))
  );

  res.header("Content-Type", "text/csv");
  res.attachment("leads.csv");
  res.send(csv);
});
