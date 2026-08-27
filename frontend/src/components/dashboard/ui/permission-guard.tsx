"use client";

import { ReactNode } from "react";
import { usePermissions } from "@/hooks/use-permissions";
import { Permission, Role } from "@/lib/permissions";

interface PermissionGuardProps {
  children: ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean;
  role?: Role | Role[];
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  permission,
  permissions,
  requireAll = false,
  role,
  fallback = null,
}: PermissionGuardProps) {
  const { can, canAny, canAll, hasRole } = usePermissions();

  // Role validation
  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  // Single permission validation
  if (permission && !can(permission)) {
    return <>{fallback}</>;
  }

  // Multiple permissions validation
  if (permissions && permissions.length > 0) {
    const isAuthorized = requireAll ? canAll(permissions) : canAny(permissions);
    if (!isAuthorized) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}
