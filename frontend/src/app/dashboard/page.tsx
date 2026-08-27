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
  TrendingUp,
  ShieldCheck,
  Award,
  Sparkles,
  Calendar,
  Layers,
  MapPin,
  Clock,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/providers/auth-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/navigation/logo";

type UserRole = "ADMIN" | "MANAGER" | "AGENT" | "CUSTOMER";

interface RoleConfig {
  roleName: string;
  badgeColor: string;
  tabs: { id: string; label: string; icon: typeof LayoutDashboard }[];
  kpis: {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    subtext: string;
    icon: typeof Banknote;
    iconColor: string;
  }[];
  quickActions: {
    label: string;
    href: string;
    icon: typeof FileText;
    variant: "primary" | "secondary";
  }[];
  activities: {
    id: string;
    title: string;
    subject: string;
    time: string;
    statusColor: string;
  }[];
  successCard: {
    title: string;
    subtitle: string;
    percentage: number;
    badgeText: string;
    breakdown: { label: string; value: string }[];
  };
}

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  ADMIN: {
    roleName: "Global Admin",
    badgeColor: "bg-red-500/15 text-red-400 border-red-500/30",
    tabs: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "applications", label: "Applications", icon: FileText },
      { id: "bookings", label: "Bookings", icon: Bookmark },
      { id: "tours", label: "Tour Packages", icon: Compass },
      { id: "users", label: "Users & Staff", icon: Users },
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "settings", label: "Settings", icon: Settings },
    ],
    kpis: [
      {
        title: "Total Revenue",
        value: "$124,500",
        change: "+12.5%",
        isPositive: true,
        subtext: "vs last month",
        icon: Banknote,
        iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
      },
      {
        title: "Active Visa Apps",
        value: "842",
        change: "+5.2%",
        isPositive: true,
        subtext: "vs last month",
        icon: FileText,
        iconColor: "text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400",
      },
      {
        title: "Tour Bookings",
        value: "156",
        change: "-2.1%",
        isPositive: false,
        subtext: "vs last month",
        icon: Plane,
        iconColor: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400",
      },
      {
        title: "New Customers",
        value: "1,204",
        change: "+18.4%",
        isPositive: true,
        subtext: "vs last month",
        icon: UserPlus,
        iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400",
      },
    ],
    quickActions: [
      { label: "Process Visa", href: "/booking", icon: FileText, variant: "primary" },
      { label: "Create Tour", href: "/tours", icon: Compass, variant: "secondary" },
      { label: "User Support", href: "/contact", icon: LifeBuoy, variant: "secondary" },
    ],
    activities: [
      {
        id: "1",
        title: "UK Visa Approved for",
        subject: "Jane Doe",
        time: "2 hours ago",
        statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      },
      {
        id: "2",
        title: "Dubai Explorer (x2) booked by",
        subject: "Mark Wilson",
        time: "4 hours ago",
        statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
      },
      {
        id: "3",
        title: "Payment of $2,450 received from",
        subject: "Sarah Connor",
        time: "5 hours ago",
        statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      },
      {
        id: "4",
        title: "New Visa Application submitted for Canada by",
        subject: "Ahmed Al-Mansoor",
        time: "6 hours ago",
        statusColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400",
      },
      {
        id: "5",
        title: "Schengen Visa Approved for",
        subject: "Carlos Martinez",
        time: "8 hours ago",
        statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      },
    ],
    successCard: {
      title: "Visa Success Rate",
      subtitle: "Approval ratio across all embassies",
      percentage: 85,
      badgeText: "Approved",
      breakdown: [
        { label: "Approved", value: "85%" },
        { label: "Pending", value: "10%" },
        { label: "Review", value: "5%" },
      ],
    },
  },
  MANAGER: {
    roleName: "Operations Manager",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    tabs: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "tours", label: "Tour Packages", icon: Compass },
      { id: "visas", label: "Visa Processing", icon: FileCheck },
      { id: "bookings", label: "Bookings Review", icon: Bookmark },
      { id: "leads", label: "Customer Leads", icon: Users },
      { id: "analytics", label: "Operations Analytics", icon: BarChart3 },
    ],
    kpis: [
      {
        title: "Managed Revenue",
        value: "$86,400",
        change: "+9.4%",
        isPositive: true,
        subtext: "vs last month",
        icon: Banknote,
        iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
      },
      {
        title: "Active Tour Packages",
        value: "48 Active",
        change: "+4 new",
        isPositive: true,
        subtext: "ready for booking",
        icon: Compass,
        iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400",
      },
      {
        title: "Pending Visa Reviews",
        value: "38 Files",
        change: "Priority",
        isPositive: true,
        subtext: "embassy submission queue",
        icon: FileText,
        iconColor: "text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400",
      },
      {
        title: "Team Bookings",
        value: "94 Total",
        change: "+14.2%",
        isPositive: true,
        subtext: "handled this month",
        icon: Plane,
        iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400",
      },
    ],
    quickActions: [
      { label: "Create / Modify Tour", href: "/tours", icon: Plus, variant: "primary" },
      { label: "Review Visa Files", href: "/visa", icon: FileCheck, variant: "secondary" },
      { label: "Assign Agent", href: "/contact", icon: UserCheck, variant: "secondary" },
    ],
    activities: [
      {
        id: "1",
        title: "Package updated: Bali Sunset Escape by",
        subject: "Operations Team",
        time: "1 hour ago",
        statusColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400",
      },
      {
        id: "2",
        title: "Visa dossier approved for submission for",
        subject: "UK Embassy",
        time: "3 hours ago",
        statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      },
      {
        id: "3",
        title: "Agent assigned to luxury tour lead for",
        subject: "Dubai Private Yacht",
        time: "5 hours ago",
        statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
      },
      {
        id: "4",
        title: "Seasonal tour discounts applied to",
        subject: "European Summer 2026",
        time: "7 hours ago",
        statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      },
    ],
    successCard: {
      title: "Embassy Approval Index",
      subtitle: "Manager sign-off quality rate",
      percentage: 92,
      badgeText: "High Quality",
      breakdown: [
        { label: "Approved", value: "92%" },
        { label: "Queries", value: "6%" },
        { label: "Rejected", value: "2%" },
      ],
    },
  },
  AGENT: {
    roleName: "Travel Specialist",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    tabs: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "clients", label: "Assigned Clients", icon: Users },
      { id: "visas", label: "Client Visas", icon: FileText },
      { id: "bookings", label: "Tour Bookings", icon: Bookmark },
      { id: "quotes", label: "Quotations & Deals", icon: TrendingUp },
      { id: "performance", label: "My Performance", icon: BarChart3 },
    ],
    kpis: [
      {
        title: "My Monthly Sales",
        value: "$32,800",
        change: "+22.1%",
        isPositive: true,
        subtext: "vs target quota",
        icon: Banknote,
        iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400",
      },
      {
        title: "Assigned Visa Files",
        value: "28 Active",
        change: "4 pending docs",
        isPositive: true,
        subtext: "active client files",
        icon: FileText,
        iconColor: "text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400",
      },
      {
        title: "Client Tour Bookings",
        value: "19 Trips",
        change: "+5 this week",
        isPositive: true,
        subtext: "confirmed itineraries",
        icon: Plane,
        iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
      },
      {
        title: "Quote Win Rate",
        value: "88%",
        change: "+6.2%",
        isPositive: true,
        subtext: "lead conversion rate",
        icon: Award,
        iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400",
      },
    ],
    quickActions: [
      { label: "Submit Client Visa", href: "/visa", icon: FileText, variant: "primary" },
      { label: "Book Tour for Client", href: "/booking", icon: Plane, variant: "secondary" },
      { label: "Generate Quotation", href: "/services", icon: TrendingUp, variant: "secondary" },
    ],
    activities: [
      {
        id: "1",
        title: "Client visa documents uploaded by",
        subject: "David Miller",
        time: "1 hour ago",
        statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
      },
      {
        id: "2",
        title: "Malaysia Family Tour reservation confirmed for",
        subject: "Rahman Family (4 Pax)",
        time: "3 hours ago",
        statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      },
      {
        id: "3",
        title: "Custom quotation of $4,500 delivered to",
        subject: "Amina Rahman",
        time: "6 hours ago",
        statusColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400",
      },
      {
        id: "4",
        title: "Embassy appointment scheduled for",
        subject: "Johnathan Smith",
        time: "8 hours ago",
        statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      },
    ],
    successCard: {
      title: "Agent Visa Approval Rate",
      subtitle: "Your client successful submissions",
      percentage: 94,
      badgeText: "Top Tier",
      breakdown: [
        { label: "Approved", value: "94%" },
        { label: "In Review", value: "5%" },
        { label: "Queries", value: "1%" },
      ],
    },
  },
  CUSTOMER: {
    roleName: "Customer",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    tabs: [
      { id: "dashboard", label: "My Portfolio", icon: LayoutDashboard },
      { id: "visas", label: "My Visa Apps", icon: FileText },
      { id: "bookings", label: "My Tour Bookings", icon: Bookmark },
      { id: "tracking", label: "Track Application", icon: Search },
      { id: "saved", label: "Saved Itineraries", icon: Compass },
      { id: "settings", label: "Profile & Documents", icon: Settings },
    ],
    kpis: [
      {
        title: "Active Visa Files",
        value: "1 File",
        change: "Under Review",
        isPositive: true,
        subtext: "UK Standard Visitor Visa",
        icon: FileText,
        iconColor: "text-[#ED1B26] bg-red-50 dark:bg-red-950/60 dark:text-red-400",
      },
      {
        title: "Confirmed Tours",
        value: "2 Trips",
        change: "Upcoming",
        isPositive: true,
        subtext: "Singapore & Bali Gateway",
        icon: Plane,
        iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400",
      },
      {
        title: "Reward Points",
        value: "3,400 Pts",
        change: "$170 Value",
        isPositive: true,
        subtext: "redeemable travel credits",
        icon: Award,
        iconColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400",
      },
      {
        title: "Destinations Visited",
        value: "8 Countries",
        change: "Gold Member",
        isPositive: true,
        subtext: "GoMatric Voyager Club",
        icon: MapPin,
        iconColor: "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400",
      },
    ],
    quickActions: [
      { label: "Apply for Visa", href: "/visa", icon: FileText, variant: "primary" },
      { label: "Explore Tours", href: "/tours", icon: Compass, variant: "secondary" },
      { label: "Track Visa Status", href: "/tracking", icon: Search, variant: "secondary" },
    ],
    activities: [
      {
        id: "1",
        title: "UK Visa Dossier: Verified by Specialist for",
        subject: "Embassy Queue",
        time: "Today",
        statusColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400",
      },
      {
        id: "2",
        title: "Tour confirmation sent for",
        subject: "5-Day Bali Paradise Getaway",
        time: "Yesterday",
        statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400",
      },
      {
        id: "3",
        title: "Payment receipt issued for",
        subject: "$1,250 Visa & Consultation",
        time: "3 days ago",
        statusColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400",
      },
    ],
    successCard: {
      title: "Document Readiness",
      subtitle: "Application completeness score",
      percentage: 100,
      badgeText: "Ready",
      breakdown: [
        { label: "Verified", value: "100%" },
        { label: "Pending", value: "0" },
        { label: "Status", value: "Ready" },
      ],
    },
  },
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const rawRole = (user?.role as UserRole) || "ADMIN";
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    rawRole in ROLE_CONFIGS ? rawRole : "CUSTOMER"
  );
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 30 Days");
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const chartGradientId = useId();
  const currentConfig = ROLE_CONFIGS[selectedRole] || ROLE_CONFIGS.ADMIN;

  return (
    <AuthGuard>
      <div className="h-screen w-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
        
        {/* ========================================================================= */}
        {/* Mobile Header Bar (Fixed at top for mobile)                               */}
        {/* ========================================================================= */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#030A3A] text-white border-b border-slate-800 shrink-0 z-40">
          <Logo variant="white" onClick={() => setIsMobileSidebarOpen(false)} />
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
        {/* Left Sidebar (Fixed & Independent, RBAC Rendered)                         */}
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
          <div className="space-y-6">
            {/* Top Brand Logo Section */}
            <div className="flex items-center justify-between">
              <Logo variant="white" onClick={() => setIsMobileSidebarOpen(false)} />
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Role Indicator */}
            <div className="px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Active Role
                </span>
                <span className="text-xs font-semibold text-white">
                  {currentConfig.roleName}
                </span>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${currentConfig.badgeColor}`}>
                {selectedRole}
              </span>
            </div>

            {/* Role-Based Navigation Links */}
            <nav className="space-y-1">
              {currentConfig.tabs.map((item) => {
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
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#ED1B26] text-white font-semibold shadow-md shadow-red-900/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar: Role Switcher Demo + Logout */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            {/* Interactive Role Switcher for previewing RBAC */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Preview RBAC Role
              </label>
              <select
                aria-label="Switch RBAC Role"
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value as UserRole);
                  setActiveTab("dashboard");
                }}
                className="w-full h-8 px-2.5 rounded bg-white/10 text-white text-xs font-semibold border border-white/15 outline-none cursor-pointer hover:bg-white/15 transition-colors"
              >
                <option value="ADMIN" className="bg-slate-900 text-white">Admin (Full System)</option>
                <option value="MANAGER" className="bg-slate-900 text-white">Manager (Tours & Visas)</option>
                <option value="AGENT" className="bg-slate-900 text-white">Agent (Clients & Quotes)</option>
                <option value="CUSTOMER" className="bg-slate-900 text-white">Customer (My Portfolio)</option>
              </select>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* Main Workspace (Fixed Header + Fully Scrollable Content)                   */}
        {/* ========================================================================= */}
        <main className="flex-1 h-full min-w-0 min-h-0 flex flex-col overflow-hidden">
          
          {/* Top Header Bar (Fixed & Locked) */}
          <header className="h-18 px-6 lg:px-8 shrink-0 border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 flex items-center justify-between gap-4">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="font-semibold text-slate-800 dark:text-white capitalize">
                {activeTab}
              </span>
            </div>

            {/* Right Header Elements */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Global Search Input */}
              <div className="relative hidden sm:block w-44 lg:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Global Search..."
                  className="w-full h-9 pl-9 pr-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
              </div>

              {/* Theme Toggle (Desktop) */}
              <div className="hidden sm:flex">
                <ThemeToggle />
              </div>

              {/* Notification Bell with Dot */}
              <button
                type="button"
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ED1B26] rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>

              {/* User Profile Avatar & Role */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#061474] to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "AR"}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[140px]">
                    {user?.name || "Alexander Rossi"}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-tight">
                    {currentConfig.roleName}
                  </p>
                </div>
              </div>

            </div>
          </header>

          {/* ========================================================================= */}
          {/* Content Body Container (Fully Scrollable Viewport)                         */}
          {/* ========================================================================= */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="max-w-[1600px] w-full mx-auto space-y-6">
              
              {/* Overview Title Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-sora font-bold text-2xl sm:text-[28px] text-slate-900 dark:text-white">
                    Overview
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedRole === "CUSTOMER"
                      ? "Personal travel itinerary, active visas, and loyalty credits."
                      : "Real-time operations, analytics, and platform metrics."}
                  </p>
                </div>

                {/* Role Switcher Pills */}
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
                  {(["ADMIN", "MANAGER", "AGENT", "CUSTOMER"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setSelectedRole(r);
                        setActiveTab("dashboard");
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase transition-all ${
                        selectedRole === r
                          ? "bg-[#061474] dark:bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* ===================================================================== */}
              {/* 4 Role-Based Stat KPI Metric Cards                                    */}
              {/* ===================================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                {currentConfig.kpis.map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                          {kpi.title}
                        </span>
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${kpi.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                          {kpi.value}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          {kpi.isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />
                          )}
                          <span className={kpi.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}>
                            {kpi.change}
                          </span>
                          <span className="text-slate-400 font-normal">{kpi.subtext}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ===================================================================== */}
              {/* Middle Section: Booking Trends (2/3) + Quick Actions (1/3)            */}
              {/* ===================================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Trends Chart Card (2 Cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                  
                  {/* Trends Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                        {selectedRole === "CUSTOMER" ? "Travel & Visa Timeline" : "Booking Trends"}
                      </h2>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {selectedRole === "CUSTOMER"
                          ? "Application milestones and travel calendar"
                          : "Visa & tour processing volume over time"}
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

                  {/* SVG Multi-curve Area Chart */}
                  <div className="relative w-full h-[260px] sm:h-[300px] flex flex-col justify-between pt-2">
                    
                    {/* Background Grid Guide Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 w-full" />
                      <div className="border-b border-slate-200 dark:border-slate-700 w-full" />
                    </div>

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

                        {/* Blue Secondary Curve */}
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

                        {/* Red Primary Curve */}
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
                        {selectedRole === "CUSTOMER"
                          ? "Instant booking and application shortcuts"
                          : "Direct operations and workflows"}
                      </p>
                    </div>

                    {/* Actions Button Group */}
                    <div className="space-y-3 pt-2">
                      {currentConfig.quickActions.map((action, i) => {
                        const Icon = action.icon;
                        if (action.variant === "primary") {
                          return (
                            <Link
                              key={i}
                              href={action.href}
                              className="w-full h-12 rounded-lg bg-[#ED1B26] hover:bg-[#c9121c] text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                            >
                              <Icon className="w-4 h-4" />
                              <span>{action.label}</span>
                            </Link>
                          );
                        }
                        return (
                          <Link
                            key={i}
                            href={action.href}
                            className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <Icon className="w-4 h-4" />
                            <span>{action.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subtext info */}
                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      {selectedRole === "CUSTOMER"
                        ? "24/7 Concierge Available"
                        : "Priority Operations Active"}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                </div>

              </div>

              {/* ===================================================================== */}
              {/* Bottom Section: Recent Activity (2/3) + Success Rate Gauge (1/3)      */}
              {/* ===================================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Activity Card (2 Cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                        Recent Activity
                      </h2>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        {selectedRole === "CUSTOMER"
                          ? "Your personal travel updates & notifications"
                          : "Live event logs and file updates"}
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
                    {currentConfig.activities.map((act) => (
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
                              {act.title} <strong>{act.subject}</strong>
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

                {/* Visa Success Rate Gauge Card (1 Col) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                  
                  <div>
                    <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                      {currentConfig.successCard.title}
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {currentConfig.successCard.subtitle}
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
                        {/* Red Progress Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#ED1B26"
                          strokeWidth="11"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * currentConfig.successCard.percentage) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>

                      {/* Center Text Metrics */}
                      <div className="absolute flex flex-col items-center justify-center text-center">
                        <span className="font-sora font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
                          {currentConfig.successCard.percentage}%
                        </span>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                          {currentConfig.successCard.badgeText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Rate Breakdown Indicators */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                    {currentConfig.successCard.breakdown.map((item, i) => (
                      <div key={i}>
                        <span className="block text-[11px] text-slate-400">{item.label}</span>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                          {item.value}
                        </span>
                      </div>
                    ))}
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
