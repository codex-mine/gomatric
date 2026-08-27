"use client";

import Link from "next/link";
import {
  CreditCard,
  Search,
  Download,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { PermissionGuard } from "../ui/permission-guard";
import { EmptyState } from "../ui/empty-state";
import { Role } from "@/lib/permissions";

interface PaymentsTabProps {
  role?: Role;
}

export function PaymentsTab({ role = "ADMIN" }: PaymentsTabProps) {
  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Payments & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track gateway transactions, invoice generation, customer refunds, and payment receipts.
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
            placeholder="Search payments..."
            className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="text-xs font-semibold text-slate-400">
          Showing 0 entries
        </div>
      </div>

      {/* 3. Empty State */}
      <EmptyState
        icon={CreditCard}
        badge="Billing Ledger"
        title="No Payment Records Found"
        description="Client invoice payments, gateway settlements, and refunded transactions will appear here once processed."
        action={
          <Link
            href="/dashboard/services"
            className="h-10 px-5 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Visa Fee Structures</span>
          </Link>
        }
      />

    </div>
  );
}
