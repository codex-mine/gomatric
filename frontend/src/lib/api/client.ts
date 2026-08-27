import { API_CONFIG } from "./config";
import type { ApiError, RequestOptions } from "./types";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("gomatric_access_token");
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    };

    const config: RequestInit = {
      method,
      headers,
      credentials: "include",
      signal: options?.signal,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || "An unexpected error occurred",
        statusCode: response.status,
        errors: errorData.errors,
      };
      throw error;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const json = await response.json();
    // Support NestJS TransformResponseInterceptor: { success: true, data: ... }
    if (json && typeof json === "object" && "success" in json && "data" in json) {
      return json.data as T;
    }

    return json as T;
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("POST", endpoint, body, options);
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, body, options);
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, body, options);
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}

export const apiClient = new ApiClient();
