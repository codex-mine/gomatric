"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { CustomersTab } from "@/components/dashboard/tabs/customers-tab";

export default function CustomersPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <CustomersTab role={userRole} />;
}
