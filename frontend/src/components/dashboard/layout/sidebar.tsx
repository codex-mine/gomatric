"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Bookmark,
  Users,
  Compass,
  FileCheck2,
  Ticket,
  Briefcase,
  CreditCard,
  BarChart3,
  UserCheck,
  History,
  Bell,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Logo } from "@/components/navigation/logo";
import { Role, Permission } from "@/lib/permissions";
import { usePermissions } from "@/hooks/use-permissions";

export interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  permission?: Permission;
  roles?: Role[];
  badge?: string;
  badgeColor?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  selectedRole: Role;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onLogout: () => void;
}

const ALL_NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        id: "dashboard",
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        permission: "dashboard:view",
      },
    ],
  },
  {
    title: "Operations & Leads",
    items: [
      {
        id: "applications",
        href: "/dashboard/applications",
        label: "Visa Applications",
        icon: FileText,
        permission: "application:view",
        badge: "842",
        badgeColor: "bg-red-500/20 text-red-300",
      },
      {
        id: "bookings",
        href: "/dashboard/bookings",
        label: "Tour Bookings",
        icon: Bookmark,
        permission: "bookings:view",
      },
      {
        id: "customers",
        href: "/dashboard/customers",
        label: "Customers CRM",
        icon: Users,
        permission: "customers:view",
        roles: ["ADMIN", "MANAGER", "AGENT"],
      },
      {
        id: "tours",
        href: "/dashboard/tours",
        label: "Tour Packages",
        icon: Compass,
        permission: "tours:view",
      },
    ],
  },
  {
    title: "Services & Catalog",
    items: [
      {
        id: "services",
        href: "/dashboard/services",
        label: "Visa Services",
        icon: FileCheck2,
        permission: "visa:view",
      },
      {
        id: "tickets",
        href: "/dashboard/tickets",
        label: "Air Tickets",
        icon: Ticket,
        roles: ["ADMIN", "MANAGER", "AGENT"],
      },
      {
        id: "travel-services",
        href: "/dashboard/travel-services",
        label: "Travel Services",
        icon: Briefcase,
        roles: ["ADMIN", "MANAGER", "AGENT"],
      },
    ],
  },
  {
    title: "Finance & Analytics",
    items: [
      {
        id: "payments",
        href: "/dashboard/payments",
        label: "Payments & Invoices",
        icon: CreditCard,
        permission: "payments:view",
      },
      {
        id: "analytics",
        href: "/dashboard/analytics",
        label: "Reports & Analytics",
        icon: BarChart3,
        permission: "analytics:view",
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        id: "users",
        href: "/dashboard/users",
        label: "Users & Staff",
        icon: UserCheck,
        permission: "users:view",
        roles: ["ADMIN"],
      },
      {
        id: "audit-logs",
        href: "/dashboard/audit-logs",
        label: "Security Audit Logs",
        icon: History,
        permission: "audit:view",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        id: "notifications",
        href: "/dashboard/notifications",
        label: "Notifications",
        icon: Bell,
        permission: "notifications:view",
      },
      {
        id: "settings",
        href: "/dashboard/settings",
        label: "Profile & Settings",
        icon: Settings,
        permission: "settings:view",
      },
    ],
  },
];

export function DashboardSidebar({
  selectedRole,
  isMobileOpen,
  onMobileClose,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();
  const { can } = usePermissions(selectedRole);

  // Filter groups and items strictly according to permissions and roles
  const filteredNavGroups = useMemo(() => {
    return ALL_NAV_GROUPS.map((group) => {
      const visibleItems = group.items.filter((item) => {
        if (item.roles && !item.roles.includes(selectedRole)) {
          return false;
        }
        if (item.permission && !can(item.permission)) {
          return false;
        }
        return true;
      });

      return {
        ...group,
        items: visibleItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [selectedRole, can]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 md:z-30 w-64 h-full shrink-0 bg-[#030A3A] dark:bg-[#02061F] text-white flex flex-col justify-between p-5 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <Logo variant="white" onClick={onMobileClose} />
            <button
              type="button"
              onClick={onMobileClose}
              className="md:hidden p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grouped Clean Navigation */}
          <nav className="space-y-5">
            {filteredNavGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400/70 block mb-1.5">
                  {group.title}
                </span>

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onMobileClose}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                          isActive
                            ? "bg-[#ED1B26] text-white font-bold shadow-md shadow-[#ED1B26]/30"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && !isActive && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.badgeColor || "bg-white/10 text-white"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer: Sign Out Button */}
        <div className="pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
