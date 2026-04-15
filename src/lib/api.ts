import { useAuthStore } from "@/stores/authStore";
import { AuthResponse, CalorieResult, ApiError } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (res.status === 403) {
    useAuthStore.getState().logout();
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
    throw data as ApiError;
  }

  if (!res.ok) {
    throw data as ApiError;
  }

  return data as T;
}

export const authApi = {
  register: (body: object) =>
    apiClient<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: object) =>
    apiClient<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const calorieApi = {
  getCalories: (body: object) =>
    apiClient<CalorieResult>("/api/get-calories", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
