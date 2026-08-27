"use client";

import Link from "next/link";
import { Compass, Plane, Calendar, Users, Plus, Eye } from "lucide-react";
import { DataTable, Column } from "../ui/data-table";
import { StatusBadge } from "../ui/status-badge";
import { Role } from "@/lib/permissions";

interface BookingRow {
  id: string;
  tourName: string;
  destination: string;
  customerName: string;
  pax: number;
  travelDate: string;
  totalPrice: string;
  status: string;
}

const MOCK_BOOKINGS: BookingRow[] = [
  {
    id: "BK-8821",
    tourName: "Bali Tropical Sunset Escape (5D4N)",
    destination: "Indonesia 🇮🇩",
    customerName: "Jane Doe",
    pax: 2,
    travelDate: "2026-10-15",
    status: "CONFIRMED",
    totalPrice: "$1,450",
  },
  {
    id: "BK-8822",
    tourName: "Dubai Marina & Desert Safari Luxury",
    destination: "United Arab Emirates 🇦🇪",
    customerName: "Mark Wilson",
    pax: 4,
    travelDate: "2026-11-01",
    status: "CONFIRMED",
    totalPrice: "$3,800",
  },
  {
    id: "BK-8823",
    tourName: "Swiss Alps & Zurich Winter Highlights",
    destination: "Switzerland 🇨🇭",
    customerName: "Sarah Connor",
    pax: 2,
    travelDate: "2026-12-10",
    status: "PENDING",
    totalPrice: "$4,200",
  },
  {
    id: "BK-8824",
    tourName: "Tokyo & Mt. Fuji Cherry Blossom Tour",
    destination: "Japan 🇯🇵",
    customerName: "Carlos Martinez",
    pax: 1,
    travelDate: "2027-03-25",
    status: "CONFIRMED",
    totalPrice: "$2,100",
  },
];

export function BookingsTab({ role }: { role: Role }) {
  const columns: Column<BookingRow>[] = [
    {
      header: "Booking Ref / Tour",
      cell: (item) => (
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900 dark:text-white block">
            {item.tourName}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            #{item.id} • {item.destination}
          </span>
        </div>
      ),
    },
    {
      header: "Lead Traveler",
      accessorKey: "customerName",
      className: "font-medium text-slate-800 dark:text-slate-200",
    },
    {
      header: "Pax Count",
      cell: (item) => (
        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>{item.pax} Guests</span>
        </span>
      ),
    },
    {
      header: "Travel Date",
      accessorKey: "travelDate",
      className: "text-slate-500 dark:text-slate-400 font-mono text-xs",
    },
    {
      header: "Total Cost",
      accessorKey: "totalPrice",
      className: "font-sora font-bold text-slate-900 dark:text-white",
      sortable: true,
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
          title="View Itinerary"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Tour & Itinerary Bookings"
        description="Active reservations, group departures, and confirmed holiday bookings"
        data={MOCK_BOOKINGS}
        columns={columns}
        searchPlaceholder="Search by tour name, booking ID, customer..."
        searchKeys={["tourName", "id", "customerName", "destination"]}
        actionButton={
          <Link
            href="/tours"
            className="h-9 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Booking</span>
          </Link>
        }
      />
    </div>
  );
}
