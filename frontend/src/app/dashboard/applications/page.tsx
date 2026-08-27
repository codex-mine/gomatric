"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { ApplicationsTab } from "@/components/dashboard/tabs/applications-tab";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <ApplicationsTab role={userRole} />;
}
