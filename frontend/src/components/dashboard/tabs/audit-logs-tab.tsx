"use client";

import Link from "next/link";
import {
  History,
  Search,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { EmptyState } from "../ui/empty-state";
import { Role } from "@/lib/permissions";

interface AuditLogsTabProps {
  role?: Role;
}

export function AuditLogsTab({ role = "ADMIN" }: AuditLogsTabProps) {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Security Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System security log stream, staff role modifications, and authentication telemetry.
          </p>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            disabled
            placeholder="Search audit trail..."
            className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Showing 0 entries
        </div>
      </div>

      {/* 3. Empty State */}
      <EmptyState
        icon={ShieldCheck}
        badge="Security & Compliance"
        title="Audit Logs Clean"
        description="Privilege escalations, role assignment changes, sensitive document accesses, and login events will be logged here."
        action={
          <Link
            href="/dashboard/users"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Manage User Permissions</span>
          </Link>
        }
      />

    </div>
  );
}
