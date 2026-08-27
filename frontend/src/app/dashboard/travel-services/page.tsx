"use client";

import Link from "next/link";
import { Briefcase, Sparkles, Plus, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/empty-state";

export default function TravelServicesPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Travel Services & Concierge
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Airport VIP lounge access, hotel vouchers, and bespoke travel concierge orders.
          </p>
        </div>
      </div>

      {/* 2. Empty State */}
      <EmptyState
        icon={Briefcase}
        badge="Concierge Desk"
        title="No Additional Travel Services Active"
        description="Supplemental travel bookings, medical insurance policies, and corporate transfer services will appear here."
        action={
          <Link
            href="/services"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Travel Services</span>
          </Link>
        }
      />

    </div>
  );
}
