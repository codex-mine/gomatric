"use client";

import { UserCheck, Shield, Plus, MoreVertical, KeyRound } from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { Role } from "@/lib/permissions";

interface UserStaffRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  lastLogin: string;
  status: string;
}

const MOCK_USERS: UserStaffRow[] = [
  {
    id: "USR-001",
    name: "Alexander Rossi",
    email: "alexander@gomatric.com",
    role: "ADMIN",
    department: "Executive Management",
    lastLogin: "Active Now",
    status: "ACTIVE",
  },
  {
    id: "USR-002",
    name: "Sarah Connor",
    email: "sarah.c@gomatric.com",
    role: "MANAGER",
    department: "Operations & Tours",
    lastLogin: "2 hours ago",
    status: "ACTIVE",
  },
  {
    id: "USR-003",
    name: "Alex Rivera",
    email: "alex.r@gomatric.com",
    role: "AGENT",
    department: "Visa Processing Desk",
    lastLogin: "10 mins ago",
    status: "ACTIVE",
  },
  {
    id: "USR-004",
    name: "Emily Watson",
    email: "emily.w@gomatric.com",
    role: "AGENT",
    department: "VIP Client Relations",
    lastLogin: "1 day ago",
    status: "ACTIVE",
  },
];

export function UsersTab({ role }: { role: Role }) {
  const columns: Column<UserStaffRow>[] = [
    {
      header: "Staff Member",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#061474] to-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {item.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              #{item.id} • {item.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      accessorKey: "department",
      className: "text-slate-600 dark:text-slate-400 text-xs",
    },
    {
      header: "Assigned Role",
      cell: (item) => (
        <span
          className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${
            item.role === "ADMIN"
              ? "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30"
              : item.role === "MANAGER"
              ? "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30"
              : "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30"
          }`}
        >
          {item.role}
        </span>
      ),
    },
    {
      header: "Last Session",
      accessorKey: "lastLogin",
      className: "text-slate-400 text-xs",
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: "Action",
      className: "text-right",
      cell: (item) => (
        <button
          type="button"
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Manage Role & Permissions"
        >
          <KeyRound className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Staff & User Management"
        description="Configure role-based access control (RBAC), team assignments, and security privileges"
        data={MOCK_USERS}
        columns={columns}
        searchPlaceholder="Search staff by name, email, department..."
        searchKeys={["name", "email", "department", "id"]}
        actionButton={
          <button
            type="button"
            className="h-9 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff Account</span>
          </button>
        }
      />
    </div>
  );
}
