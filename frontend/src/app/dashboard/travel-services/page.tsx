"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { ServicesTab } from "@/components/dashboard/tabs/services-tab";

export default function TravelServicesPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <ServicesTab role={userRole} />;
}
