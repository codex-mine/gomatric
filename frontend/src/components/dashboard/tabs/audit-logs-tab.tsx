"use client";

import { History, Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { Role } from "@/lib/permissions";

interface AuditLogRow {
  id: string;
  action: string;
  user: string;
  role: string;
  ipAddress: string;
  timestamp: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
}

const MOCK_AUDIT_LOGS: AuditLogRow[] = [
  {
    id: "LOG-9921",
    action: "Visa Application #GBR-9921 approved",
    user: "Alexander Rossi",
    role: "ADMIN",
    ipAddress: "192.168.1.45",
    timestamp: "2026-08-27 15:42:10",
    status: "SUCCESS",
  },
  {
    id: "LOG-9922",
    action: "Role change: Sarah Connor updated to [MANAGER]",
    user: "Alexander Rossi",
    role: "ADMIN",
    ipAddress: "192.168.1.45",
    timestamp: "2026-08-27 14:15:02",
    status: "SUCCESS",
  },
  {
    id: "LOG-9923",
    action: "Failed login attempt (3 consecutive invalid passwords)",
    user: "unknown@client.com",
    role: "UNKNOWN",
    ipAddress: "103.205.12.8",
    timestamp: "2026-08-27 12:05:44",
    status: "FAILED",
  },
  {
    id: "LOG-9924",
    action: "Tour package published: Bali Sunset 7D6N",
    user: "Sarah Connor",
    role: "MANAGER",
    ipAddress: "192.168.1.88",
    timestamp: "2026-08-27 11:20:18",
    status: "SUCCESS",
  },
];

export function AuditLogsTab({ role }: { role: Role }) {
  const columns: Column<AuditLogRow>[] = [
    {
      header: "Action / Event",
      cell: (item) => (
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-900 dark:text-white block">
            {item.action}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            #{item.id}
          </span>
        </div>
      ),
    },
    {
      header: "Actor & Role",
      cell: (item) => (
        <div className="text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 block">
            {item.user}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            [{item.role}]
          </span>
        </div>
      ),
    },
    {
      header: "IP Address",
      accessorKey: "ipAddress",
      className: "font-mono text-xs text-slate-500",
    },
    {
      header: "Timestamp",
      accessorKey: "timestamp",
      className: "text-xs text-slate-400 font-mono",
    },
    {
      header: "Status",
      cell: (item) => (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            item.status === "SUCCESS"
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400"
          }`}
        >
          {item.status === "SUCCESS" ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <AlertTriangle className="w-3 h-3" />
          )}
          <span>{item.status}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Security & System Audit Logs"
        description="Immutable chronological security ledger recording administrative triggers and role adjustments"
        data={MOCK_AUDIT_LOGS}
        columns={columns}
        searchPlaceholder="Search action, actor, IP address..."
        searchKeys={["action", "user", "ipAddress", "id"]}
      />
    </div>
  );
}
