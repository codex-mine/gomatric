"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { UsersTab } from "@/components/dashboard/tabs/users-tab";

export default function UsersPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <UsersTab role={userRole} />;
}
