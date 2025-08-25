export const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE || "http://localhost:4000";

export const API_ENDPOINTS = {
  TODOS: `${BASE_URL}/todos`,
} as const;
