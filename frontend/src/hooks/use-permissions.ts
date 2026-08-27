"use client";

import { useMemo } from "react";
import { useAuth } from "@/providers/auth-provider";
import { Role, Permission, ROLE_PERMISSIONS } from "@/lib/permissions";

export function usePermissions(overrideRole?: Role) {
  const { user } = useAuth();
  
  const currentRole: Role = useMemo(() => {
    if (overrideRole) return overrideRole;
    return (user?.role as Role) || "CUSTOMER";
  }, [overrideRole, user]);

  const userPermissions = useMemo(() => {
    // If user object has specific custom permissions from backend, union them with default role permissions
    const defaultPerms = ROLE_PERMISSIONS[currentRole] || [];
    const customPerms = (user?.permissions as Permission[]) || [];
    return Array.from(new Set([...defaultPerms, ...customPerms]));
  }, [currentRole, user]);

  const hasRole = (role: Role | Role[]): boolean => {
    if (Array.isArray(role)) {
      return role.includes(currentRole);
    }
    return currentRole === role;
  };

  const can = (permission: Permission): boolean => {
    if (currentRole === "ADMIN") return true; // Admin has superuser access
    return userPermissions.includes(permission);
  };

  const canAny = (permissions: Permission[]): boolean => {
    if (currentRole === "ADMIN") return true;
    return permissions.some((p) => userPermissions.includes(p));
  };

  const canAll = (permissions: Permission[]): boolean => {
    if (currentRole === "ADMIN") return true;
    return permissions.every((p) => userPermissions.includes(p));
  };

  return {
    role: currentRole,
    permissions: userPermissions,
    hasRole,
    can,
    canAny,
    canAll,
    isAdmin: currentRole === "ADMIN",
    isManager: currentRole === "MANAGER",
    isAgent: currentRole === "AGENT",
    isCustomer: currentRole === "CUSTOMER",
  };
}
