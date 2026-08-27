"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  FileText,
  Bookmark,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AuthUser } from "@/lib/api/auth";
import { Role } from "@/lib/permissions";

interface HeaderProps {
  user: AuthUser | null;
  selectedRole: Role;
  onLogout: () => void;
}

export function DashboardHeader({
  user,
  selectedRole,
  onLogout,
}: HeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Extract page title from pathname
  const routeSegment = pathname.replace("/dashboard", "").replace("/", "") || "Overview";
  const formattedTitle = routeSegment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const notifications = [
    {
      id: "1",
      title: "UK Standard Visitor Visa Approved",
      time: "10 mins ago",
      read: false,
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
    },
    {
      id: "2",
      title: "New booking request for Dubai Explorer",
      time: "1 hour ago",
      read: false,
      icon: Bookmark,
      iconColor: "text-blue-500",
    },
    {
      id: "3",
      title: "Invoice #INV-2026-089 generated",
      time: "3 hours ago",
      read: true,
      icon: FileText,
      iconColor: "text-amber-500",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-18 px-6 lg:px-8 shrink-0 border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 flex items-center justify-between gap-4">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Home
        </Link>
        <span>›</span>
        <Link
          href="/dashboard"
          className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          Dashboard
        </Link>
        {routeSegment !== "Overview" && (
          <>
            <span>›</span>
            <span className="font-semibold text-slate-800 dark:text-white">
              {formattedTitle}
            </span>
          </>
        )}
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-44 lg:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Global search..."
            className="w-full h-9 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
          />
        </div>

        {/* Theme Toggle Button */}
        <div className="hidden sm:flex">
          <ThemeToggle />
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen((prev) => !prev);
              setIsUserMenuOpen(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ED1B26] rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 z-50 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-sora font-bold text-sm text-slate-900 dark:text-white">
                  Notifications
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-[#ED1B26]">
                  {unreadCount} New
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-start gap-3 transition-colors cursor-pointer"
                    >
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${n.iconColor}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs font-bold text-[#061474] dark:text-blue-400 hover:underline"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#061474] to-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "AR"}
            </div>

            <div className="hidden lg:block text-left">
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white leading-tight truncate max-w-[140px]">
                {user?.name || "Alexander Rossi"}
              </p>
              <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-tight">
                {selectedRole}
              </p>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user?.name || "Alexander Rossi"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.email || "alexander@gomatric.com"}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/contact"
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Help & Support</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
