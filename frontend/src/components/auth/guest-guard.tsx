"use client";

import { useEffect, Suspense, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

interface GuestGuardProps {
  children: ReactNode;
}

function GuestGuardInternal({ children }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const redirect = searchParams.get("redirect");
      const isValidRedirect =
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//") &&
        !redirect.startsWith("/login") &&
        !redirect.startsWith("/register") &&
        !redirect.startsWith("/forgot-password") &&
        !redirect.startsWith("/reset-password");

      router.replace(isValidRedirect ? redirect : "/dashboard");
    }
  }, [isLoading, isAuthenticated, router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#061474] dark:text-blue-400" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function GuestGuard({ children }: GuestGuardProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#061474] dark:text-blue-400" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">
              Checking authentication...
            </p>
          </div>
        </div>
      }
    >
      <GuestGuardInternal>{children}</GuestGuardInternal>
    </Suspense>
  );
}
