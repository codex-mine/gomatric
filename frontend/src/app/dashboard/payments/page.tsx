"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { PaymentsTab } from "@/components/dashboard/tabs/payments-tab";

export default function PaymentsPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <PaymentsTab role={userRole} />;
}
