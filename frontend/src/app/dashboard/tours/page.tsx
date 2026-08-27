"use client";

import Link from "next/link";
import { Compass, Search, Plus, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/empty-state";

export default function ToursManagementPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Tour Packages Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Curated group tour itineraries, bespoke holiday packages, and seasonal departures.
          </p>
        </div>

        <Link
          href="/tours"
          className="h-10 px-4 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-[1.01] shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Public Catalog</span>
        </Link>
      </div>

      {/* 2. Empty State */}
      <EmptyState
        icon={Compass}
        badge="Tour Offerings"
        title="No Custom Tours in Management Catalog"
        description="Custom published tour packages, day itineraries, and group departure dates will appear here."
        action={
          <Link
            href="/tours"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Tour Catalog</span>
          </Link>
        }
      />

    </div>
  );
}
