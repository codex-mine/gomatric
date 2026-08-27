"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Banknote,
  Plane,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  CheckCircle2,
  Plus,
  LifeBuoy,
  Menu,
  X,
  Compass,
  ArrowRight,
  TrendingUp,
  Filter,
} from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/providers/auth-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type NavTab = "dashboard" | "applications" | "bookings" | "users" | "analytics" | "settings";

interface ActivityItem {
  id: string;
  title: string;
  user: string;
  time: string;
  type: "visa_approved" | "tour_booked" | "payment" | "visa_submitted";
  statusColor: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "UK Visa Approved for",
    user: "Jane Doe",
    time: "2 hours ago",
    type: "visa_approved",
    statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
  {
    id: "2",
    title: "Dubai Explorer (x2) Tour booked by",
    user: "Mark Wilson",
    time: "4 hours ago",
    type: "tour_booked",
    statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
  },
  {
    id: "3",
    title: "Payment of $2,450 confirmed from",
    user: "Sarah Connor",
    time: "5 hours ago",
    type: "payment",
    statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    id: "4",
    title: "New Visa Application submitted for Canada by",
    user: "Ahmed Al-Mansoor",
    time: "6 hours ago",
    type: "visa_submitted",
    statusColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400",
  },
  {
    id: "5",
    title: "Schengen Visa Approved for",
    user: "Carlos Martinez",
    time: "8 hours ago",
    type: "visa_approved",
    statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
  },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 30 Days");
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const chartGradientId = useId();

  const navItems: { id: NavTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "bookings", label: "Bookings", icon: Bookmark },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "Global Admin";
      case "MANAGER":
        return "Operations Manager";
      case "AGENT":
        return "Travel Specialist";
      default:
        return "Customer";
    }
  };

  return (
    <AuthGuard>
      <div className="h-screen w-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
        
        {/* ========================================================================= */}
        {/* Mobile Header Bar                                                         */}
        {/* ========================================================================= */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#030A3A] text-white border-b border-slate-800 shrink-0 z-40">
          <div className="flex items-center gap-2.5">
            <span className="font-sora font-extrabold text-xl tracking-tight text-white">
              GoMatric
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-white/10 text-white transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Left Sidebar (Fixed & Independent)                                        */}
        {/* ========================================================================= */}
        {/* Mobile Backdrop */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          />
        )}

        <aside
          className={`fixed md:static inset-y-0 left-0 z-50 md:z-30 w-64 h-full shrink-0 bg-[#030A3A] dark:bg-[#02061F] text-white flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-8">
            {/* Top Brand Logo */}
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-sora font-extrabold text-2xl tracking-tight text-white group-hover:text-red-400 transition-colors">
                  GoMatric
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#ED1B26] text-white font-semibold shadow-md shadow-red-900/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Logout Button */}
          <div className="pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* Main Content Area (Fixed Header + Scrollable Body)                        */}
        {/* ========================================================================= */}
        <main className="flex-1 h-full min-w-0 flex flex-col overflow-hidden">
          
          {/* Top Header Bar (Fixed) */}
          <header className="h-18 px-6 lg:px-8 shrink-0 border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 flex items-center justify-between gap-4">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="font-semibold text-slate-800 dark:text-white capitalize">
                {activeTab}
              </span>
            </div>

            {/* Right Header Elements: Search + Notifications + Profile + Theme */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Global Search Input */}
              <div className="relative hidden sm:block w-48 lg:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Global Search..."
                  className="w-full h-10 pl-9 pr-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
              </div>

              {/* Theme Toggle (Desktop) */}
              <div className="hidden sm:flex">
                <ThemeToggle />
              </div>

              {/* Notification Bell with Dot */}
              <button
                type="button"
                className="relative p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#ED1B26] rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>

              {/* User Profile Avatar & Role */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#061474] to-blue-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs shrink-0">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AR"}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[140px]">
                    {user?.name || "Alexander Rossi"}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-tight">
                    {getRoleDisplayName(user?.role)}
                  </p>
                </div>
              </div>

            </div>
          </header>

          {/* ========================================================================= */}
          {/* Scrollable Dashboard Body Container                                       */}
          {/* ========================================================================= */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <div className="max-w-[1600px] w-full mx-auto space-y-6">
            
            {/* Overview Title Heading */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="font-sora font-bold text-2xl sm:text-[28px] text-slate-900 dark:text-white">
                  Overview
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Real-time analytics and platform performance metrics.
                </p>
              </div>

              {/* Action Buttons Header */}
              <div className="flex items-center gap-2">
                <Link
                  href="/visa"
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-[#ED1B26]" />
                  <span>Explore Tours</span>
                </Link>
                <Link
                  href="/booking"
                  className="px-3.5 py-2 rounded-lg bg-[#ED1B26] hover:bg-[#c9121c] text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Application</span>
                </Link>
              </div>
            </div>

            {/* ======================================================================= */}
            {/* 4 Stat KPI Metric Cards Grid                                            */}
            {/* ======================================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Total Revenue */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Total Revenue
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Banknote className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                    $124,500
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>+12.5%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Active Visa Apps */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Active Visa Apps
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/60 text-[#ED1B26] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                    842
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>+5.2%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Tour Bookings */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Tour Bookings
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Plane className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                    156
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400">
                    <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>-2.1%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                </div>
              </div>

              {/* Card 4: New Customers */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                    New Customers
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                    1,204
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>+18.4%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ======================================================================= */}
            {/* Middle Section: Booking Trends (2/3) + Quick Actions (1/3)              */}
            {/* ======================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Booking Trends Card (2 Cols) */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                
                {/* Trends Card Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                      Booking Trends
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Visa & tour processing volume over time
                    </p>
                  </div>

                  {/* Timeframe Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTimeframeOpen((prev) => !prev)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <span>{selectedTimeframe}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isTimeframeOpen && (
                      <div className="absolute right-0 mt-1.5 w-36 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg py-1 z-30 animate-fadeIn">
                        {["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setSelectedTimeframe(opt);
                              setIsTimeframeOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors ${
                              selectedTimeframe === opt
                                ? "bg-red-50 dark:bg-red-950/40 text-[#ED1B26] font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Line Chart Visual Container */}
                <div className="relative w-full h-[260px] sm:h-[300px] flex flex-col justify-between pt-2">
                  
                  {/* Background Grid Guide Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                    <div className="border-b border-slate-200 dark:border-slate-700 w-full" />
                  </div>

                  {/* SVG Multi-curve Area Chart */}
                  <div className="relative w-full h-full">
                    <svg
                      viewBox="0 0 700 240"
                      preserveAspectRatio="none"
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        <linearGradient id={`gradient-${chartGradientId}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ED1B26" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#ED1B26" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id={`gradient-blue-${chartGradientId}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#061474" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#061474" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Blue Secondary Curve (Tours) */}
                      <path
                        d="M 0 170 C 100 150, 180 180, 260 140 C 340 100, 420 130, 500 90 C 580 60, 640 100, 700 70 L 700 240 L 0 240 Z"
                        fill={`url(#gradient-blue-${chartGradientId})`}
                      />
                      <path
                        d="M 0 170 C 100 150, 180 180, 260 140 C 340 100, 420 130, 500 90 C 580 60, 640 100, 700 70"
                        fill="none"
                        stroke="#061474"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        className="dark:stroke-blue-400"
                      />

                      {/* Red Primary Curve (Visas) */}
                      <path
                        d="M 0 190 C 90 170, 170 120, 250 135 C 330 150, 410 70, 490 55 C 570 40, 630 65, 700 30 L 700 240 L 0 240 Z"
                        fill={`url(#gradient-${chartGradientId})`}
                      />
                      <path
                        d="M 0 190 C 90 170, 170 120, 250 135 C 330 150, 410 70, 490 55 C 570 40, 630 65, 700 30"
                        fill="none"
                        stroke="#ED1B26"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Highlight Data Points */}
                      <circle cx="250" cy="135" r="5" fill="#ED1B26" className="animate-pulse" />
                      <circle cx="490" cy="55" r="5" fill="#ED1B26" />
                      <circle cx="700" cy="30" r="5" fill="#ED1B26" />
                    </svg>
                  </div>

                  {/* X Axis Timestamps */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 dark:text-slate-500 pt-3">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                    <span>Today</span>
                  </div>

                </div>

              </div>

              {/* Quick Actions Card (1 Col - Dark Navy Background) */}
              <div className="bg-[#030A3A] dark:bg-[#02061F] border border-slate-800 rounded-xl p-6 text-white flex flex-col justify-between shadow-md">
                
                <div className="space-y-4">
                  <div>
                    <h2 className="font-sora font-bold text-lg text-white">
                      Quick Actions
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct operations and workflows
                    </p>
                  </div>

                  {/* Actions Button Group */}
                  <div className="space-y-3 pt-2">
                    
                    {/* Primary Action: Process Visa */}
                    <Link
                      href="/booking"
                      className="w-full h-12 rounded-lg bg-[#ED1B26] hover:bg-[#c9121c] text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Process Visa</span>
                    </Link>

                    {/* Secondary Action: Add Tour */}
                    <Link
                      href="/tours"
                      className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Tour</span>
                    </Link>

                    {/* Tertiary Action: User Support */}
                    <Link
                      href="/contact"
                      className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <LifeBuoy className="w-4 h-4" />
                      <span>User Support</span>
                    </Link>

                  </div>
                </div>

                {/* Subtext info */}
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-slate-400">
                  <span>Priority Queue Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

              </div>

            </div>

            {/* ======================================================================= */}
            {/* Bottom Section: Recent Activity (2/3) + Visa Success Rate (1/3)         */}
            {/* ======================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Activity Card (2 Cols) */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                      Recent Activity
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Live event logs and file updates
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#ED1B26] hover:underline"
                  >
                    View All
                  </button>
                </div>

                {/* Activity List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {ACTIVITIES.map((act) => (
                    <div
                      key={act.id}
                      className="py-3.5 flex items-center justify-between gap-3 first:pt-1 last:pb-1"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.statusColor}`}>
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                            {act.title} <strong>{act.user}</strong>
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Visa Success Rate Card (1 Col) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                
                <div>
                  <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                    Visa Success Rate
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                    Approval ratio across all embassies
                  </p>
                </div>

                {/* Donut Gauge Visualization */}
                <div className="relative flex flex-col items-center justify-center py-6">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background Circle Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="11"
                        className="text-slate-100 dark:text-slate-800"
                      />
                      {/* Red Progress Arc (85%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#ED1B26"
                        strokeWidth="11"
                        strokeDasharray="251.2"
                        strokeDashoffset="37.68"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    {/* Center Text Metrics */}
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="font-sora font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                        85%
                      </span>
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                        Approved
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Rate Breakdown Indicators */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="block text-[11px] text-slate-400">Approved</span>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">85%</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Pending</span>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">10%</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400">Review</span>
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">5%</span>
                  </div>
                </div>

              </div>

            </div>

            </div>
          </div>

        </main>
      </div>
    </AuthGuard>
  );
}
