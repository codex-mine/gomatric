"use client";

import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  Filter,
  Download,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PermissionGuard } from "../ui/permission-guard";
import { EmptyState } from "../ui/empty-state";
import { Role } from "@/lib/permissions";

interface ApplicationsTabProps {
  role?: Role;
}

export function ApplicationsTab({ role = "ADMIN" }: ApplicationsTabProps) {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Visa Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track, audit, and review traveler visa applications submitted via client concierge.
          </p>
        </div>

        <PermissionGuard permission="application:create">
          <Link
            href="/dashboard/services"
            className="h-10 px-4 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-[1.01] shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Visa Application</span>
          </Link>
        </PermissionGuard>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            disabled
            placeholder="Search applications..."
            className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Showing 0 entries
        </div>
      </div>

      {/* 3. Empty State (No Dummy Data) */}
      <EmptyState
        icon={FileText}
        badge="Live Filings Pipeline"
        title="No Visa Applications Yet"
        description="Active client visa filings, document audit dossiers, and consular decision tracking will appear here once submitted by travelers."
        action={
          <Link
            href="/dashboard/services"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Manage Visa Services Catalog</span>
          </Link>
        }
      />

    </div>
  );
}
