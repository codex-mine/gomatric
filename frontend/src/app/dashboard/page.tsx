"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { AdminOverview } from "@/components/dashboard/views/admin-overview";
import { ManagerOverview } from "@/components/dashboard/views/manager-overview";
import { AgentOverview } from "@/components/dashboard/views/agent-overview";
import { CustomerOverview } from "@/components/dashboard/views/customer-overview";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  if (userRole === "ADMIN") {
    return <AdminOverview />;
  }

  if (userRole === "MANAGER") {
    return <ManagerOverview />;
  }

  if (userRole === "AGENT") {
    return <AgentOverview />;
  }

  return <CustomerOverview />;
}
