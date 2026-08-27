"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShieldAlert, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: "ADMIN" | "MANAGER" | "AGENT" | "CUSTOMER" | ("ADMIN" | "MANAGER" | "AGENT" | "CUSTOMER")[];
  requiredPermission?: string | string[];
  fallbackUrl?: string;
}

export function AuthGuard({
  children,
  requiredRole,
  requiredPermission,
  fallbackUrl,
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectTarget = fallbackUrl || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectTarget);
    }
  }, [isLoading, isAuthenticated, router, pathname, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#061474] dark:text-blue-400" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Check role authorization if specified
  if (requiredRole) {
    const rolesArray = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!rolesArray.includes(user.role as any)) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 text-[#ED1B26] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="font-sora font-bold text-xl text-[#061474] dark:text-white">
              Access Restricted
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your current account role (<strong>{user.role}</strong>) does not have permission to view this section.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/dashboard"
                className="h-10 px-4 rounded-md bg-[#061474] dark:bg-blue-600 hover:bg-[#030A3A] dark:hover:bg-blue-700 text-white font-semibold text-xs inline-flex items-center gap-2 transition-all shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  // Check permission authorization if specified
  if (requiredPermission && user.permissions) {
    const permissionsArray = Array.isArray(requiredPermission)
      ? requiredPermission
      : [requiredPermission];
    const hasPermissions = permissionsArray.every((p) => user.permissions?.includes(p));

    if (!hasPermissions && user.role !== "ADMIN") {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 text-[#ED1B26] flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="font-sora font-bold text-xl text-[#061474] dark:text-white">
              Permission Required
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              You do not have the necessary permissions to access this feature.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/dashboard"
                className="h-10 px-4 rounded-md bg-[#061474] dark:bg-blue-600 text-white font-semibold text-xs inline-flex items-center gap-2"
              >
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}