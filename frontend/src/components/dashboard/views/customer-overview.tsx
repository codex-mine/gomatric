"use client";

import Link from "next/link";
import {
  FileText,
  Clock,
  ArrowRight,
  Compass,
  Settings,
  Bell,
  Sparkles,
  ShieldCheck,
  User,
  ExternalLink,
  Calendar,
  KeyRound,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { StatCard } from "../ui/stat-card";

export function CustomerOverview() {
  const { user } = useAuth();

  // Format real registration date if available
  const memberSinceFormatted = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* 1. Customer Real Welcome Header Banner */}
      <div className="bg-gradient-to-r from-[#030A3A] to-[#0A1A6B] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        {/* Background decorative watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none select-none hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-white">
            <circle cx="100" cy="100" r="80" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="50" strokeWidth="1" />
            <polygon points="100,20 106,94 180,100 106,106 100,180 94,106 20,100 94,94" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ED1B26]" />
            <span>GoMatric Customer Account</span>
          </div>

          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl tracking-tight">
            Welcome back, {user?.name || "Traveler"}!
          </h1>

          <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
            Manage your personal profile, notification preferences, and account security. Self-service visa applications and live booking management will be available directly in your dashboard soon.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/dashboard/settings"
              className="h-10 px-5 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Profile & Settings</span>
            </Link>

            <Link
              href="/dashboard/notifications"
              className="h-10 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-xs transition-colors"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Notifications</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Real Customer Account Metrics (Strictly based on Authenticated User) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Account Status"
          value={user?.isEmailVerified ? "Verified" : "Active"}
          change={user?.isEmailVerified ? "Email Confirmed" : "Standard"}
          isPositive={true}
          subtext={user?.email || "customer@gomatric.com"}
          icon={User}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400"
        />

        <StatCard
          title="Assigned Role"
          value="Customer"
          change="Client Access"
          isPositive={true}
          subtext="Personal Portal"
          icon={ShieldCheck}
          iconColor="text-[#061474] bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400"
        />

        <StatCard
          title="Member Since"
          value={memberSinceFormatted}
          change="Registered"
          isPositive={true}
          subtext="GoMatric Client"
          icon={Calendar}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400"
        />

        <StatCard
          title="Security & Session"
          value="Protected"
          change="Active"
          isPositive={true}
          subtext="Encrypted JWT Auth"
          icon={KeyRound}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400"
        />
      </div>

      {/* 3. Account Navigation & Coming Soon Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2/3): Real Available Account Options */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Account Management
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Profile Card */}
              <Link
                href="/dashboard/settings"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#061474]/10 dark:bg-blue-900/40 text-[#061474] dark:text-blue-400 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-sm text-slate-900 dark:text-white">
                    Profile & Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Update your full name, email address, contact information, and security password.
                  </p>
                </div>
              </Link>

              {/* Notifications Card */}
              <Link
                href="/dashboard/notifications"
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-[#ED1B26] flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="font-sora font-bold text-sm text-slate-900 dark:text-white">
                    Notifications & Alerts
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Review incoming travel advisory messages, security alerts, and system notices.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Coming Soon Features Banner */}
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-sora font-bold text-sm text-amber-950 dark:text-amber-200">
                  New Customer Features Coming Soon
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                  IN PROGRESS
                </span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Direct self-service application dossier tracking, live tour booking management, and downloadable invoice repositories will be activated for customer accounts in the upcoming release.
              </p>
            </div>
          </div>
        </div>

        {/* Right (1/3): Public Services Shortcuts */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
            Explore Services
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse verified visa offerings or explore curated tour packages.
          </p>

          <div className="space-y-2.5 pt-1">
            <Link
              href="/visa"
              className="w-full h-11 px-4 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-xs flex items-center justify-between shadow-sm transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Browse Visa Catalog</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/tours"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-500" />
                <span>Explore Tour Packages</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/contact"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Contact Travel Concierge</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
