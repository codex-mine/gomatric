"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { AuditLogsTab } from "@/components/dashboard/tabs/audit-logs-tab";

export default function AuditLogsPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <AuditLogsTab role={userRole} />;
}
