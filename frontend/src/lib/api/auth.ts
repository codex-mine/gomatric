import { apiClient } from "./client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "AGENT" | "CUSTOMER";
  phone?: string;
  avatar?: string;
  isActive?: boolean;
  isEmailVerified: boolean;
  permissions?: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthResponse {
  message?: string;
  user: AuthUser;
  tokens: AuthTokens;
  devVerificationCode?: string;
}

export interface MessageResponse {
  message: string;
  devVerificationCode?: string;
  devResetCode?: string;
  devResetToken?: string;
}

export function setAuthCookies(tokens?: Partial<AuthTokens>) {
  if (typeof window === "undefined" || !tokens) return;
  if (tokens.accessToken) {
    document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  }
  if (tokens.refreshToken) {
    document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
  }
}

export function clearAuthCookies() {
  if (typeof window === "undefined") return;
  document.cookie = "accessToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie = "refreshToken=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

export const authApi = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>("/auth/register", data);
    if (res?.tokens?.accessToken && res?.user?.isEmailVerified && typeof window !== "undefined") {
      localStorage.setItem("gomatric_access_token", res.tokens.accessToken);
      setAuthCookies(res.tokens);
    }
    return res;
  },

  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>("/auth/login", data);
    if (res?.tokens?.accessToken && typeof window !== "undefined") {
      localStorage.setItem("gomatric_access_token", res.tokens.accessToken);
      setAuthCookies(res.tokens);
    }
    return res;
  },

  async verifyEmail(data: {
    email: string;
    code: string;
  }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>("/auth/verify-email", data);
    if (res?.tokens?.accessToken && typeof window !== "undefined") {
      localStorage.setItem("gomatric_access_token", res.tokens.accessToken);
      setAuthCookies(res.tokens);
    }
    return res;
  },

  async resendVerification(data: {
    email: string;
  }): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/resend-verification", data);
  },

  async forgotPassword(data: {
    email: string;
  }): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/forgot-password", data);
  },

  async resetPassword(data: {
    email?: string;
    code?: string;
    token?: string;
    newPassword: string;
  }): Promise<MessageResponse> {
    return apiClient.post<MessageResponse>("/auth/reset-password", data);
  },

  async logout(): Promise<MessageResponse> {
    try {
      const res = await apiClient.post<MessageResponse>("/auth/logout");
      return res;
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("gomatric_access_token");
        clearAuthCookies();
      }
    }
  },

  async getMe(): Promise<AuthUser> {
    return apiClient.get<AuthUser>("/auth/me");
  },
};
