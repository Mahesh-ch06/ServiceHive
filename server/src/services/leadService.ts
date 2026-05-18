import type { FilterQuery } from "mongoose";
import { Lead } from "../models/Lead";
import type { LeadDocument } from "../models/Lead";
import type { LeadFilters } from "../types/lead";
import { buildPaginationMeta } from "../utils/pagination";

const buildLeadFilter = (filters: LeadFilters) => {
  const query: FilterQuery<LeadDocument> = {};
  if (filters.status) {
    query.status = filters.status;
  }
  if (filters.source) {
    query.source = filters.source;
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } }
    ];
  }
  return query;
};

const resolveSort = (sort?: "latest" | "oldest"): Record<"createdAt", 1 | -1> => {
  if (sort === "oldest") {
    return { createdAt: 1 };
  }
  return { createdAt: -1 };
};

export const listLeads = async (filters: LeadFilters) => {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const query = buildLeadFilter(filters);
  const sort = resolveSort(filters.sort);

  const [items, total] = await Promise.all([
    Lead.find(query).sort(sort).skip((page - 1) * limit).limit(limit),
    Lead.countDocuments(query)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(total, page, limit)
  };
};

export const listLeadsForExport = async (filters: LeadFilters) => {
  const query = buildLeadFilter(filters);
  const sort = resolveSort(filters.sort);
  return Lead.find(query).sort(sort);
};

export const getLeadById = async (id: string) => {
  return Lead.findById(id);
};

export const createLead = async (data: Partial<LeadDocument>) => {
  return Lead.create(data);
};

export const updateLead = async (id: string, data: Partial<LeadDocument>) => {
  return Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteLead = async (id: string) => {
  return Lead.findByIdAndDelete(id);
};

export const getLeadStats = async () => {
  const [total, byStatus, bySource] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Lead.aggregate([{ $group: { _id: "$source", count: { $sum: 1 } } }])
  ]);

  const statusMap: Record<string, number> = {};
  for (const item of byStatus) {
    statusMap[item._id] = item.count;
  }

  const sourceMap: Record<string, number> = {};
  for (const item of bySource) {
    sourceMap[item._id] = item.count;
  }

  return { total, byStatus: statusMap, bySource: sourceMap };
};
