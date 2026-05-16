import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type { AuthResponse } from "../types/auth";

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload
  );
  return response.data.data;
};

export const login = async (payload: { email: string; password: string }) => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload
  );
  return response.data.data;
};
