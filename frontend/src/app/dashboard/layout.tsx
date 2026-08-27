"use client";

import { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return (
    <AuthGuard>
      <DashboardShell user={user} selectedRole={userRole} onLogout={logout}>
        {children}
      </DashboardShell>
    </AuthGuard>
  );
}
