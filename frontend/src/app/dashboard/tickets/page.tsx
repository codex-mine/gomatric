"use client";

import Link from "next/link";
import { Ticket, Search, Plus, Plane, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/dashboard/ui/empty-state";

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Air Tickets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flight PNR reservations, airline ticketing requests, and issued client e-tickets.
          </p>
        </div>
      </div>

      {/* 2. Empty State */}
      <EmptyState
        icon={Ticket}
        badge="Aviation Desk"
        title="No Air Ticket Bookings Yet"
        description="Active airline reservations, GDS flight segments, and issued passenger e-tickets will appear here."
        action={
          <Link
            href="/contact"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Plane className="w-3.5 h-3.5 text-blue-400" />
            <span>Request Air Ticket Quotation</span>
          </Link>
        }
      />

    </div>
  );
}
