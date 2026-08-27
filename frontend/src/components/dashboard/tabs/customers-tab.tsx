"use client";

import { useState } from "react";
import { Users, Mail, Phone, MapPin, Plus, MoreVertical, ShieldCheck } from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { Role } from "@/lib/permissions";

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: string;
  activeVisas: number;
  totalSpent: string;
  joinedDate: string;
  status: string;
}

const MOCK_CUSTOMERS: CustomerRow[] = [
  {
    id: "CUST-101",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 555-0192",
    tier: "Gold Voyager",
    activeVisas: 1,
    totalSpent: "$3,450",
    joinedDate: "2025-11-12",
    status: "ACTIVE",
  },
  {
    id: "CUST-102",
    name: "Michael Chang",
    email: "m.chang@example.com",
    phone: "+1 555-0482",
    tier: "Silver Explorer",
    activeVisas: 1,
    totalSpent: "$1,850",
    joinedDate: "2026-01-20",
    status: "ACTIVE",
  },
  {
    id: "CUST-103",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    phone: "+44 20 7946 0912",
    tier: "Platinum VIP",
    activeVisas: 2,
    totalSpent: "$8,920",
    joinedDate: "2025-06-15",
    status: "ACTIVE",
  },
  {
    id: "CUST-104",
    name: "Ahmed Al-Mansoor",
    email: "ahmed.m@example.com",
    phone: "+971 50 123 4567",
    tier: "Gold Voyager",
    activeVisas: 1,
    totalSpent: "$4,200",
    joinedDate: "2026-03-02",
    status: "ACTIVE",
  },
  {
    id: "CUST-105",
    name: "Carlos Martinez",
    email: "carlos.m@example.com",
    phone: "+34 91 123 4567",
    tier: "Member",
    activeVisas: 1,
    totalSpent: "$750",
    joinedDate: "2026-07-10",
    status: "ACTIVE",
  },
];

export function CustomersTab({ role }: { role: Role }) {
  const columns: Column<CustomerRow>[] = [
    {
      header: "Customer Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#061474] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block">
              {item.name}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              #{item.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Details",
      cell: (item) => (
        <div className="space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{item.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{item.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Membership Tier",
      cell: (item) => (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-[#061474] dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
          {item.tier}
        </span>
      ),
    },
    {
      header: "Active Visas",
      accessorKey: "activeVisas",
      className: "text-center font-bold text-slate-800 dark:text-white",
    },
    {
      header: "Total Spent",
      accessorKey: "totalSpent",
      className: "font-sora font-bold text-slate-900 dark:text-white",
      sortable: true,
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} size="sm" />,
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Customer Relationship Management (CRM)"
        description="Comprehensive directory of registered travelers, corporate accounts, and VIP clients"
        data={MOCK_CUSTOMERS}
        columns={columns}
        searchPlaceholder="Search customer by name, email, phone..."
        searchKeys={["name", "email", "phone", "id"]}
        actionButton={
          <button
            type="button"
            className="h-9 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Customer</span>
          </button>
        }
      />
    </div>
  );
}
