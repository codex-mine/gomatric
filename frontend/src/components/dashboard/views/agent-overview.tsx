"use client";

import {
  Banknote,
  FileText,
  Plane,
  Award,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  Plus,
  Send,
  LifeBuoy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../ui/stat-card";
import { ActivityTimeline, ActivityItem } from "../ui/activity-timeline";

interface AgentOverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export function AgentOverview({ onNavigateTab }: AgentOverviewProps) {
  const router = useRouter();
  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    } else {
      router.push(`/dashboard/${tabId}`);
    }
  };
  const agentActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Bank statement verified for client",
      subject: "David Miller (USA-1920)",
      time: "20 mins ago",
      type: "application",
      statusColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    },
    {
      id: "2",
      title: "Custom 4-Pax Tour Quote ($4,500) sent to",
      subject: "Amina Rahman",
      time: "2 hours ago",
      type: "booking",
      statusColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
    {
      id: "3",
      title: "VFS Biometrics appointment booked for",
      subject: "Jonathan Smith (UK-8812)",
      time: "4 hours ago",
      type: "application",
      statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
    {
      id: "4",
      title: "Lead follow-up call completed with",
      subject: "Dr. Farhan Qureshi",
      time: "Yesterday",
      type: "system",
      statusColor: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Agent Personal Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="My Monthly Sales"
          value="$32,800"
          change="+22.1%"
          isPositive={true}
          subtext="109% of sales quota"
          icon={Banknote}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400"
          sparklineData={[18, 22, 25, 27, 30, 32.8]}
          sparklineColor="#10b981"
        />

        <StatCard
          title="Assigned Visa Files"
          value="28 Active"
          change="4 need docs"
          isPositive={true}
          subtext="active client files"
          icon={FileText}
          iconColor="text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400"
          sparklineData={[34, 32, 30, 29, 28]}
          sparklineColor="#ED1B26"
        />

        <StatCard
          title="Client Tour Bookings"
          value="19 Trips"
          change="+5 this week"
          isPositive={true}
          subtext="confirmed itineraries"
          icon={Plane}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400"
          sparklineData={[12, 14, 15, 17, 19]}
          sparklineColor="#2563eb"
        />

        <StatCard
          title="Quote Win Rate"
          value="88.2%"
          change="+6.2%"
          isPositive={true}
          subtext="lead conversion rate"
          icon={Award}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400"
          sparklineData={[76, 80, 82, 85, 88.2]}
          sparklineColor="#9333ea"
        />
      </div>

      {/* 2. Middle Grid: Client Follow-up Taskboard (2/3) + Quick Agent Triggers (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Client Taskboard */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Client Tasks & Follow-ups
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Urgent actions required on your active client accounts
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleNavigate("customers")}
              className="text-xs font-bold text-[#061474] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>CRM Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                client: "David Miller",
                action: "Request missing employment leave NOC letter",
                service: "USA B1/B2 Visa",
                due: "Today (High Priority)",
                dueColor: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50",
              },
              {
                client: "Sarah Jenkins",
                action: "Send updated flight & hotel itinerary vouchers",
                service: "Singapore 4D3N Tour",
                due: "Tomorrow, 11:00 AM",
                dueColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50",
              },
              {
                client: "Dr. Farhan Qureshi",
                action: "Confirm appointment slot at VFS Global",
                service: "UK Standard Visitor Visa",
                due: "In 2 days",
                dueColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50",
              },
            ].map((task, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {task.client}
                    </span>
                    <span className="text-xs text-slate-400">• {task.service}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {task.action}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${task.dueColor}`}>
                    {task.due}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNavigate("applications")}
                    className="px-3 py-1.5 rounded-lg bg-[#061474] hover:bg-[#030A3A] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Open File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Triggers */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
            Specialist Quick Tools
          </h3>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleNavigate("applications")}
              className="w-full h-11 px-4 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-xs flex items-center justify-between transition-all hover:scale-[1.01] cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-300" />
                <span>Submit Client Visa Application</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("bookings")}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-500" />
                <span>Book Tour Package for Client</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("payments")}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-purple-500" />
                <span>Generate Client Invoice</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Chronological Agent Activity Log */}
      <ActivityTimeline
        items={agentActivities}
        title="My Client Action Log"
        subtitle="Chronological list of interactions and application submissions"
      />

    </div>
  );
}
