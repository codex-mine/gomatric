"use client";

import { ActivityTimeline } from "@/components/dashboard/ui/activity-timeline";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <ActivityTimeline
        items={[
          {
            id: "1",
            title: "UK Standard Visitor Visa Approved for",
            subject: "Jane Doe (GBR-9921)",
            time: "10 mins ago",
            type: "application",
          },
          {
            id: "2",
            title: "Tour booking confirmed for",
            subject: "Bali Tropical Sunset (2 Pax)",
            time: "1 hour ago",
            type: "tour",
          },
          {
            id: "3",
            title: "Payment receipt generated for",
            subject: "Invoice #INV-2026-089",
            time: "3 hours ago",
            type: "payment",
          },
          {
            id: "4",
            title: "System security audit report completed",
            subject: "Weekly Audit",
            time: "Yesterday",
            type: "system",
          },
        ]}
        title="System Notifications & Alerts"
        subtitle="All chronological operational notifications for your profile"
      />
    </div>
  );
}
