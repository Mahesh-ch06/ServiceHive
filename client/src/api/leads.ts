import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type { Lead, LeadFilters } from "../types/lead";

export const fetchLeads = async (filters: LeadFilters) => {
  const response = await apiClient.get<ApiResponse<Lead[]>>("/leads", {
    params: {
      ...filters,
      limit: 10
    }
  });
  return response.data;
};

export const fetchLead = async (id: string) => {
  const response = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
  return response.data.data;
};

export const createLead = async (payload: Partial<Lead>) => {
  const response = await apiClient.post<ApiResponse<Lead>>("/leads", payload);
  return response.data.data;
};

export const updateLead = async (id: string, payload: Partial<Lead>) => {
  const response = await apiClient.patch<ApiResponse<Lead>>(
    `/leads/${id}`,
    payload
  );
  return response.data.data;
};

export const deleteLead = async (id: string) => {
  const response = await apiClient.delete<ApiResponse<null>>(`/leads/${id}`);
  return response.data;
};

export const exportLeads = async (filters: LeadFilters) => {
  const response = await apiClient.get("/leads/export", {
    params: filters,
    responseType: "blob"
  });
  return response.data as Blob;
};
