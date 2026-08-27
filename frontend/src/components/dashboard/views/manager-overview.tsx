"use client";

import {
  Banknote,
  FileCheck,
  Compass,
  Plane,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  FileText,
  Clock,
  Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../ui/stat-card";
import { ActivityTimeline, ActivityItem } from "../ui/activity-timeline";

interface ManagerOverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export function ManagerOverview({ onNavigateTab }: ManagerOverviewProps) {
  const router = useRouter();
  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    } else {
      router.push(`/dashboard/${tabId}`);
    }
  };
  const managerActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Package updated: Bali Sunset Explorer 7D6N by",
      subject: "Operations Team",
      time: "45 mins ago",
      type: "tour",
      statusColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
    {
      id: "2",
      title: "Visa dossier signed off for submission to",
      subject: "VFS UK Global (Ref: GBR-4091)",
      time: "2 hours ago",
      type: "application",
      statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
    {
      id: "3",
      title: "VIP Lead assigned to Senior Agent for",
      subject: "Dubai Luxury Corporate Retreat",
      time: "4 hours ago",
      type: "booking",
      statusColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    },
    {
      id: "4",
      title: "Seasonal tour discounts scheduled for",
      subject: "European Summer Group Departures",
      time: "6 hours ago",
      type: "tour",
      statusColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Manager Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Managed Department Revenue"
          value="$86,400"
          change="+9.4%"
          isPositive={true}
          subtext="operations target quota"
          icon={Banknote}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400"
          sparklineData={[40, 48, 55, 62, 70, 78, 86.4]}
          sparklineColor="#2563eb"
        />

        <StatCard
          title="Active Tour Packages"
          value="48 Active"
          change="+4 published"
          isPositive={true}
          subtext="ready for booking"
          icon={Compass}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400"
          sparklineData={[38, 40, 42, 44, 46, 48]}
          sparklineColor="#9333ea"
        />

        <StatCard
          title="Pending Visa Approvals"
          value="38 Files"
          change="Priority Queue"
          isPositive={true}
          subtext="awaiting manager sign-off"
          icon={FileCheck}
          iconColor="text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400"
          sparklineData={[50, 45, 42, 40, 38]}
          sparklineColor="#ED1B26"
        />

        <StatCard
          title="Team Bookings Processed"
          value="94 Trips"
          change="+14.2%"
          isPositive={true}
          subtext="handled this month"
          icon={Plane}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400"
          sparklineData={[60, 68, 74, 82, 88, 94]}
          sparklineColor="#10b981"
        />
      </div>

      {/* 2. Operational Pipeline + Review Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visa Verification Pipeline */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Operations Review Queue
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Active dossiers pending manager compliance verification
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("applications")}
              className="text-xs font-bold text-[#061474] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Files</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Queue Items */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              {
                id: "GBR-9921",
                applicant: "Jane Doe",
                destination: "United Kingdom 🇬🇧",
                type: "Tourist 6 Months",
                agent: "Alex Rivera",
                priority: "URGENT",
              },
              {
                id: "USA-3410",
                applicant: "Michael Chang",
                destination: "United States 🇺🇸",
                type: "B1/B2 Visa",
                agent: "Emily Watson",
                priority: "HIGH",
              },
              {
                id: "FRA-8820",
                applicant: "Carlos Martinez",
                destination: "France 🇫🇷",
                type: "Schengen Short-Stay",
                agent: "David Kim",
                priority: "NORMAL",
              },
              {
                id: "SAU-1029",
                applicant: "Amina Rahman",
                destination: "Saudi Arabia 🇸🇦",
                type: "Umrah eVisa",
                agent: "Alex Rivera",
                priority: "HIGH",
              },
            ].map((queue, idx) => (
              <div
                key={idx}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#061474] dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                    {queue.destination.slice(-2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {queue.applicant}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({queue.id})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {queue.destination} • {queue.type} • Assigned to{" "}
                      <strong className="text-slate-700 dark:text-slate-300">{queue.agent}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      queue.priority === "URGENT"
                        ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                        : queue.priority === "HIGH"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {queue.priority}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleNavigate("applications")}
                    className="px-3 py-1.5 rounded-lg bg-[#061474] hover:bg-[#030A3A] text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    Review Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Quick Tools */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
            Operational Quick Actions
          </h3>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleNavigate("tours")}
              className="w-full h-11 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-300" />
                <span>Publish New Tour Package</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("customers")}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-purple-500" />
                <span>Re-assign Client Leads</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("payments")}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-emerald-500" />
                <span>Verify Invoices & Receipts</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Team Operations Activity Stream */}
      <ActivityTimeline
        items={managerActivities}
        title="Operations Log"
        subtitle="Live verification approvals and agent assignments"
      />

    </div>
  );
}
