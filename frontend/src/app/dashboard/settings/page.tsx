"use client";

import { useAuth } from "@/providers/auth-provider";
import { Role } from "@/lib/permissions";
import { SettingsTab } from "@/components/dashboard/tabs/settings-tab";

export default function SettingsPage() {
  const { user } = useAuth();
  const userRole: Role = (user?.role as Role) || "ADMIN";

  return <SettingsTab user={user} role={userRole} />;
}
