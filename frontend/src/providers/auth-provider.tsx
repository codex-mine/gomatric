"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authApi, clearAuthCookies, type AuthUser, type AuthResponse } from "@/lib/api/auth";
import type { LoginFormData, RegisterFormData } from "@/lib/validations/auth";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<AuthResponse>;
  register: (data: RegisterFormData) => Promise<AuthResponse>;
  verifyEmail: (email: string, code: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const hasToken =
        typeof window !== "undefined" &&
        (!!localStorage.getItem("gomatric_access_token") ||
          document.cookie.includes("accessToken"));

      if (!hasToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const currentUser = await authApi.getMe();
      setUser(currentUser);
    } catch {
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("gomatric_access_token");
        clearAuthCookies();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (data: LoginFormData): Promise<AuthResponse> => {
    const res = await authApi.login({
      email: data.email,
      password: data.password,
    });
    setUser(res.user);
    return res;
  };

  const register = async (data: RegisterFormData): Promise<AuthResponse> => {
    const fullPhone = `${data.phoneCode || "+1"} ${data.phoneNumber || ""}`.trim();
    const res = await authApi.register({
      name: data.fullName,
      email: data.email,
      password: data.password,
      phone: fullPhone,
    });
    if (res?.user?.isEmailVerified) {
      setUser(res.user);
    }
    return res;
  };

  const verifyEmail = async (email: string, code: string): Promise<AuthResponse> => {
    const res = await authApi.verifyEmail({ email, code });
    setUser(res.user);
    return res;
  };

  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  const refetchUser = async (): Promise<void> => {
    await fetchCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyEmail,
        logout,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
