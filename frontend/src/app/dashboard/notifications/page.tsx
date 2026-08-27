"use client";

import { Bell, CheckCheck } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/empty-state";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title */}
      <div>
        <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          Notifications & Alerts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Chronological activity alerts, travel advisory updates, and security notices.
        </p>
      </div>

      {/* 2. Empty State */}
      <EmptyState
        icon={Bell}
        badge="Live Notifications"
        title="No Unread Notifications"
        description="You're completely caught up! New visa submission status alerts, booking confirmations, and security notices will appear here."
      />

    </div>
  );
}
