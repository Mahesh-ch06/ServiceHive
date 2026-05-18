import axios from "axios";
import { useAuthStore } from "../store/authStore";

const defaultApiUrl = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://servicehive-cap8.onrender.com";

const rawApiUrl = (import.meta.env.VITE_API_URL ?? "").trim() || defaultApiUrl;
const normalizedApiUrl = rawApiUrl.replace(/\/+$/g, "");
const base = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

export const apiClient = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
