"use client";

import { useState, ReactNode } from "react";
import { Menu } from "lucide-react";
import { AuthUser } from "@/lib/api/auth";
import { Role } from "@/lib/permissions";
import { DashboardSidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { Logo } from "@/components/navigation/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DashboardShellProps {
  children: ReactNode;
  user: AuthUser | null;
  selectedRole: Role;
  onLogout: () => void;
}

export function DashboardShell({
  children,
  user,
  selectedRole,
  onLogout,
}: DashboardShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div
      data-lenis-prevent="true"
      className="h-screen max-h-screen w-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300"
    >
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#030A3A] text-white border-b border-slate-800 shrink-0 z-40">
        <Logo variant="white" onClick={() => setIsMobileOpen(false)} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Role-Aware Dynamic Sidebar */}
      <DashboardSidebar
        selectedRole={selectedRole}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        onLogout={onLogout}
      />

      {/* Main Workspace: Fixed Top Header + Fully Scrollable Inner Viewport */}
      <div className="flex-1 h-full min-w-0 min-h-0 flex flex-col overflow-hidden">
        
        {/* Top Fixed Header */}
        <DashboardHeader
          user={user}
          selectedRole={selectedRole}
          onLogout={onLogout}
        />

        {/* Scrollable Content Viewport */}
        <main
          data-lenis-prevent="true"
          className="flex-1 h-full min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 overscroll-contain"
        >
          <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-16">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
