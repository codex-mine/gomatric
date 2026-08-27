"use client";

import Link from "next/link";
import {
  FileText,
  Plane,
  Award,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  UploadCloud,
  Compass,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { StatCard } from "../ui/stat-card";
import { StatusBadge } from "../ui/status-badge";
import { ActivityTimeline, ActivityItem } from "../ui/activity-timeline";

interface CustomerOverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export function CustomerOverview({ onNavigateTab }: CustomerOverviewProps) {
  const router = useRouter();
  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
    } else {
      router.push(`/dashboard/${tabId}`);
    }
  };
  const customerActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Bank statement verified by Visa Specialist for",
      subject: "UK Standard Visitor Visa",
      time: "Today, 10:30 AM",
      type: "application",
      statusColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    },
    {
      id: "2",
      title: "Confirmed tour itinerary issued for",
      subject: "Bali Tropical Paradise (5D4N)",
      time: "Yesterday",
      type: "tour",
      statusColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
    },
    {
      id: "3",
      title: "Payment receipt #REC-9918 generated for",
      subject: "$1,450 (Visa + Hotel Vouchers)",
      time: "3 days ago",
      type: "payment",
      statusColor: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Customer Personal Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Active Visa Files"
          value="1 File"
          change="Under Review"
          isPositive={true}
          subtext="UK Standard Visitor Visa"
          icon={FileText}
          iconColor="text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400"
        />

        <StatCard
          title="Confirmed Bookings"
          value="2 Trips"
          change="Upcoming"
          isPositive={true}
          subtext="Bali (Oct) • Dubai (Dec)"
          icon={Plane}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400"
        />

        <StatCard
          title="Voyager Loyalty Points"
          value="3,400 Pts"
          change="$170 Value"
          isPositive={true}
          subtext="Redeemable on next tour"
          icon={Award}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400"
        />

        <StatCard
          title="Countries Visited"
          value="8 Countries"
          change="Gold Member"
          isPositive={true}
          subtext="GoMatric Voyager Club"
          icon={MapPin}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400"
        />
      </div>

      {/* 2. Visa Progress Tracker + Next Upcoming Trip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Visa Progress Roadmap Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Application (Ref: #GBR-9921)
              </span>
              <h2 className="font-sora font-bold text-xl text-slate-900 dark:text-white mt-0.5">
                UK Standard Visitor Visa (6 Months)
              </h2>
            </div>
            <StatusBadge status="IN_REVIEW" label="Dossier In Review" size="lg" />
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative pt-2">
            {[
              { title: "Application Submitted", date: "Aug 20", done: true },
              { title: "Documents Verified", date: "Aug 24", done: true },
              { title: "VFS Biometrics", date: "Aug 29 (Scheduled)", done: false, active: true },
              { title: "Passport Decision", date: "Est. Sep 10", done: false },
            ].map((step, idx) => (
              <div key={idx} className="space-y-2 relative">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      step.done
                        ? "bg-emerald-600 text-white"
                        : step.active
                        ? "bg-[#061474] text-white ring-4 ring-blue-100 dark:ring-blue-900/50"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                    }`}
                  >
                    {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className={`h-1 flex-1 rounded-full ${step.done ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-800"}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">{step.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row inside Card */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <p className="text-slate-500">
              Assigned Specialist: <strong className="text-slate-800 dark:text-white">Alex Rivera</strong> (alex@gomatric.com)
            </p>

            <div className="flex items-center gap-2">
              <Link
                href="/tracking"
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Track Status
              </Link>
              <button
                type="button"
                onClick={() => handleNavigate("applications")}
                className="px-4 py-2 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold shadow-xs transition-colors cursor-pointer"
              >
                View Full File
              </button>
            </div>
          </div>
        </div>

        {/* Quick Customer Shortcuts */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
            Travel Shortcuts
          </h3>

          <div className="space-y-3">
            <Link
              href="/visa"
              className="w-full h-11 px-4 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-xs flex items-center justify-between shadow-xs transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Apply for Another Visa</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tours"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-500" />
                <span>Explore Tour Destinations</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <button
              type="button"
              onClick={() => handleNavigate("payments")}
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Download Invoices & Vouchers</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Chronological Customer Log */}
      <ActivityTimeline
        items={customerActivities}
        title="My Account Timeline"
        subtitle="Recent status changes, document validations, and booking receipts"
      />

    </div>
  );
}
