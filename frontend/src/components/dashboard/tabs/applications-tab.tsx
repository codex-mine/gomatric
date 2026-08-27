"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Clock,
  ArrowRight,
} from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { PermissionGuard } from "../ui/permission-guard";
import { usePermissions } from "@/hooks/use-permissions";
import { Role } from "@/lib/permissions";

interface VisaApplicationRow {
  id: string;
  applicantName: string;
  email: string;
  country: string;
  countryFlag: string;
  visaType: string;
  submissionDate: string;
  status: string;
  amount: string;
  assignedAgent: string;
}

const MOCK_APPLICATIONS: VisaApplicationRow[] = [
  {
    id: "GBR-9921",
    applicantName: "Jane Doe",
    email: "jane.doe@example.com",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    visaType: "Standard Visitor (6 Mo)",
    submissionDate: "2026-08-22",
    status: "APPROVED",
    amount: "$200",
    assignedAgent: "Alex Rivera",
  },
  {
    id: "USA-3410",
    applicantName: "Michael Chang",
    email: "m.chang@example.com",
    country: "United States",
    countryFlag: "🇺🇸",
    visaType: "B1/B2 Tourist Visa",
    submissionDate: "2026-08-24",
    status: "IN_REVIEW",
    amount: "$250",
    assignedAgent: "Emily Watson",
  },
  {
    id: "FRA-8820",
    applicantName: "Carlos Martinez",
    email: "carlos.m@example.com",
    country: "France (Schengen)",
    countryFlag: "🇫🇷",
    visaType: "Short-Stay Type C",
    submissionDate: "2026-08-25",
    status: "SUBMITTED_TO_EMBASSY",
    amount: "$150",
    assignedAgent: "David Kim",
  },
  {
    id: "SAU-1029",
    applicantName: "Amina Rahman",
    email: "amina.r@example.com",
    country: "Saudi Arabia",
    countryFlag: "🇸🇦",
    visaType: "Umrah & Tourist eVisa",
    submissionDate: "2026-08-26",
    status: "APPROVED",
    amount: "$175",
    assignedAgent: "Alex Rivera",
  },
  {
    id: "CAN-5519",
    applicantName: "Ahmed Al-Mansoor",
    email: "ahmed.m@example.com",
    country: "Canada",
    countryFlag: "🇨🇦",
    visaType: "Visitor Visa V-1",
    submissionDate: "2026-08-27",
    status: "PENDING",
    amount: "$200",
    assignedAgent: "Emily Watson",
  },
  {
    id: "JPN-7712",
    applicantName: "Elena Rostova",
    email: "elena.r@example.com",
    country: "Japan",
    countryFlag: "🇯🇵",
    visaType: "Sightseeing Single Entry",
    submissionDate: "2026-08-27",
    status: "DOCUMENTS_REQUIRED",
    amount: "$75",
    assignedAgent: "David Kim",
  },
];

export function ApplicationsTab({ role }: { role: Role }) {
  const [activeStatusTab, setActiveStatusTab] = useState<string>("ALL");
  const { can } = usePermissions(role);

  const filteredData =
    activeStatusTab === "ALL"
      ? MOCK_APPLICATIONS
      : MOCK_APPLICATIONS.filter((item) => {
          if (activeStatusTab === "APPROVED") return item.status === "APPROVED";
          if (activeStatusTab === "PENDING")
            return item.status === "PENDING" || item.status === "IN_REVIEW";
          if (activeStatusTab === "EMBASSY")
            return item.status === "SUBMITTED_TO_EMBASSY";
          return true;
        });

  const columns: Column<VisaApplicationRow>[] = [
    {
      header: "Ref / Applicant",
      cell: (item) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">
              {item.applicantName}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono block">
            #{item.id} • {item.email}
          </span>
        </div>
      ),
    },
    {
      header: "Destination & Type",
      cell: (item) => (
        <div className="space-y-0.5">
          <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span>{item.countryFlag}</span>
            <span>{item.country}</span>
          </span>
          <span className="text-xs text-slate-400 block">{item.visaType}</span>
        </div>
      ),
    },
    {
      header: "Status",
      cell: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: "Fee",
      cell: (item) => (
        <span className="font-sora font-bold text-slate-900 dark:text-white">
          {item.amount}
        </span>
      ),
      sortable: true,
    },
    {
      header: "Specialist",
      accessorKey: "assignedAgent",
      className: "hidden md:table-cell text-slate-600 dark:text-slate-400 text-xs",
    },
    {
      header: "Date",
      accessorKey: "submissionDate",
      className: "hidden lg:table-cell text-slate-400 text-xs",
      sortable: true,
    },
    {
      header: "Action",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Inspect Dossier"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <PermissionGuard role={["ADMIN", "MANAGER"]}>
            <button
              type="button"
              className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-colors"
              title="Approve File"
            >
              <CheckCircle className="w-3.5 h-3.5" />
            </button>
          </PermissionGuard>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Visa Applications Registry"
        description="Comprehensive docket of active consular dossiers and client passport submissions"
        data={filteredData}
        columns={columns}
        searchPlaceholder="Search applicant, reference ID, country..."
        searchKeys={["applicantName", "id", "country", "email"]}
        tabs={[
          { id: "ALL", label: "All Applications", count: MOCK_APPLICATIONS.length },
          {
            id: "PENDING",
            label: "Pending Review",
            count: MOCK_APPLICATIONS.filter((a) => a.status === "PENDING" || a.status === "IN_REVIEW").length,
          },
          {
            id: "EMBASSY",
            label: "Embassy Queue",
            count: MOCK_APPLICATIONS.filter((a) => a.status === "SUBMITTED_TO_EMBASSY").length,
          },
          {
            id: "APPROVED",
            label: "Approved",
            count: MOCK_APPLICATIONS.filter((a) => a.status === "APPROVED").length,
          },
        ]}
        activeTab={activeStatusTab}
        onTabChange={setActiveStatusTab}
        actionButton={
          <div className="flex items-center gap-2">
            <Link
              href="/visa"
              className="h-9 px-4 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:scale-[1.01]"
            >
              <Plus className="w-4 h-4" />
              <span>New Visa Application</span>
            </Link>
          </div>
        }
      />
    </div>
  );
}
