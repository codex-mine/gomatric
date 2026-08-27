"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { BookingsTab } from "@/components/dashboard/tabs/bookings-tab";

export default function TicketsPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <BookingsTab role={userRole} />;
}
