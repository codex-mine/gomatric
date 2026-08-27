"use client";

import {
  Banknote,
  FileText,
  Plane,
  Users,
  TrendingUp,
  Plus,
  ShieldCheck,
  Award,
  ArrowRight,
  UserCheck,
  LifeBuoy,
  CreditCard,
  Building,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../ui/stat-card";
import { ActivityTimeline, ActivityItem } from "../ui/activity-timeline";
import { PermissionGuard } from "../ui/permission-guard";

interface AdminOverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export function AdminOverview({ onNavigateTab }: AdminOverviewProps) {
  const router = useRouter();
  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    } else {
      router.push(`/dashboard/${tabId}`);
    }
  };
  const adminActivities: ActivityItem[] = [
    {
      id: "1",
      title: "UK Standard Visitor Visa Approved for",
      subject: "Jane Doe (GBR-9921)",
      time: "15 mins ago",
      type: "application",
      statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
    {
      id: "2",
      title: "Full payment of $4,850 received for",
      subject: "Dubai Explorer (x4 Pax)",
      time: "1 hour ago",
      type: "payment",
      statusColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    },
    {
      id: "3",
      title: "Staff Role updated to [Manager] for",
      subject: "Sarah Connor (Staff #104)",
      time: "3 hours ago",
      type: "system",
      statusColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
    {
      id: "4",
      title: "New Visa Application lodged for Canada by",
      subject: "Ahmed Al-Mansoor",
      time: "5 hours ago",
      type: "application",
      statusColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    },
    {
      id: "5",
      title: "French Schengen dossier approved by",
      subject: "Operations Desk",
      time: "8 hours ago",
      type: "application",
      statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Top Enterprise KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Revenue"
          value="$124,500"
          change="+12.5%"
          isPositive={true}
          subtext="vs last month"
          icon={Banknote}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400"
          sparklineData={[45, 52, 58, 64, 72, 85, 96, 110, 124.5]}
          sparklineColor="#2563eb"
        />

        <StatCard
          title="Active Visa Applications"
          value="842"
          change="+5.2%"
          isPositive={true}
          subtext="across 23 embassies"
          icon={FileText}
          iconColor="text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400"
          sparklineData={[710, 740, 780, 800, 815, 830, 842]}
          sparklineColor="#ED1B26"
        />

        <StatCard
          title="Tour Bookings"
          value="156"
          change="-2.1%"
          isPositive={false}
          subtext="18 pending departure"
          icon={Plane}
          iconColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400"
          sparklineData={[180, 172, 168, 160, 158, 156]}
          sparklineColor="#6366f1"
        />

        <StatCard
          title="Active Customers"
          value="1,204"
          change="+18.4%"
          isPositive={true}
          subtext="98.2% retention rate"
          icon={Users}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400"
          sparklineData={[920, 980, 1040, 1120, 1170, 1204]}
          sparklineColor="#9333ea"
        />
      </div>

      {/* 2. Middle Grid: Booking Volume Chart (2/3) + Quick Control Actions (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Booking & Revenue Chart Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                Platform Revenue & Application Volume
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Multi-channel visa processing and tour booking trends
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time Sync</span>
            </span>
          </div>

          {/* Graphical Bars Presentation */}
          <div className="space-y-4 pt-2">
            {[
              { month: "Jan", visas: 140, tours: 42, revenue: "$28,400" },
              { month: "Feb", visas: 180, tours: 55, revenue: "$36,200" },
              { month: "Mar", visas: 240, tours: 70, revenue: "$48,900" },
              { month: "Apr", visas: 310, tours: 92, revenue: "$64,300" },
              { month: "May", visas: 420, tours: 120, revenue: "$88,100" },
              { month: "Jun", visas: 580, tours: 156, revenue: "$124,500" },
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 w-10">
                    {bar.month}
                  </span>
                  <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                    <span>
                      <strong className="text-slate-900 dark:text-white">{bar.visas}</strong> Visas
                    </span>
                    <span>
                      <strong className="text-slate-900 dark:text-white">{bar.tours}</strong> Tours
                    </span>
                    <span className="font-bold text-[#061474] dark:text-blue-400">
                      {bar.revenue}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                  <div
                    className="bg-[#061474] dark:bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(bar.visas / 600) * 70}%` }}
                  />
                  <div
                    className="bg-[#ED1B26] rounded-full transition-all duration-500"
                    style={{ width: `${(bar.tours / 180) * 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#061474] dark:bg-blue-600" />
                <span>Visa Applications</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B26]" />
                <span>Tour Bookings</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("analytics")}
              className="font-bold text-[#061474] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Detailed Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Admin Actions & Success Ratio */}
        <div className="space-y-6">
          
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
              Quick Administrative Triggers
            </h3>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleNavigate("applications")}
                className="w-full h-11 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center justify-between shadow-xs transition-all hover:scale-[1.01] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-300" />
                  <span>Review Pending Visas (842)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("users")}
                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-500" />
                  <span>Staff & Roles Management</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("services")}
                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-emerald-500" />
                  <span>Visa Service Registry (23)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Embassy Success Index */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-sora font-bold text-sm text-slate-900 dark:text-white">
                Global Visa Approval Rate
              </span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-sora font-extrabold text-3xl text-slate-900 dark:text-white">
                85.4%
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                +1.8% vs benchmark
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block">85%</span>
                <span className="text-[10px] text-slate-500">Approved</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40">
                <span className="font-bold text-amber-700 dark:text-amber-300 block">10%</span>
                <span className="text-[10px] text-slate-500">Pending</span>
              </div>
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40">
                <span className="font-bold text-red-700 dark:text-red-300 block">5%</span>
                <span className="text-[10px] text-slate-500">Queries</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Row: Chronological Activity Feed */}
      <ActivityTimeline
        items={adminActivities}
        title="Live Platform Activity Feed"
        subtitle="Chronological audit records across all branch offices and agents"
      />

    </div>
  );
}
