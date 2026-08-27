"use client";

import { CreditCard, Download, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { Role } from "@/lib/permissions";

interface PaymentRow {
  id: string;
  invoiceNo: string;
  customerName: string;
  serviceDescription: string;
  amount: string;
  method: string;
  date: string;
  status: string;
}

const MOCK_PAYMENTS: PaymentRow[] = [
  {
    id: "PAY-101",
    invoiceNo: "INV-2026-089",
    customerName: "Jane Doe",
    serviceDescription: "UK Standard Visitor Visa (x1)",
    amount: "$200.00",
    method: "Credit Card (Stripe)",
    date: "2026-08-22",
    status: "PAID",
  },
  {
    id: "PAY-102",
    invoiceNo: "INV-2026-090",
    customerName: "Michael Chang",
    serviceDescription: "USA B1/B2 Visa Consultation",
    amount: "$250.00",
    method: "Bank Transfer",
    date: "2026-08-24",
    status: "PAID",
  },
  {
    id: "PAY-103",
    invoiceNo: "INV-2026-091",
    customerName: "Sarah Connor",
    serviceDescription: "Dubai Explorer Luxury Tour (x4)",
    amount: "$3,800.00",
    method: "Credit Card (Visa)",
    date: "2026-08-25",
    status: "PAID",
  },
  {
    id: "PAY-104",
    invoiceNo: "INV-2026-092",
    customerName: "Carlos Martinez",
    serviceDescription: "Japan Sightseeing Visa Stamping",
    amount: "$75.00",
    method: "Digital Wallet",
    date: "2026-08-26",
    status: "UNPAID",
  },
];

export function PaymentsTab({ role }: { role: Role }) {
  const columns: Column<PaymentRow>[] = [
    {
      header: "Invoice No / Customer",
      cell: (item) => (
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900 dark:text-white block">
            {item.invoiceNo}
          </span>
          <span className="text-[11px] text-slate-400">
            {item.customerName}
          </span>
        </div>
      ),
    },
    {
      header: "Service",
      accessorKey: "serviceDescription",
      className: "text-slate-700 dark:text-slate-300 text-xs",
    },
    {
      header: "Payment Method",
      accessorKey: "method",
      className: "text-slate-500 text-xs hidden md:table-cell",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      className: "font-sora font-bold text-slate-900 dark:text-white",
      sortable: true,
    },
    {
      header: "Date",
      accessorKey: "date",
      className: "text-slate-400 text-xs hidden lg:table-cell",
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
          title="Download PDF Invoice"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Invoices & Transactions"
        description="Comprehensive accounting ledger of client payments, gateway receipts, and refunds"
        data={MOCK_PAYMENTS}
        columns={columns}
        searchPlaceholder="Search invoice #, customer name..."
        searchKeys={["invoiceNo", "customerName", "serviceDescription"]}
      />
    </div>
  );
}
