export type Role = 'ADMIN' | 'MANAGER' | 'AGENT' | 'CUSTOMER';

export type Permission =
  // Dashboard & Analytics
  | 'dashboard:view'
  | 'analytics:view'
  | 'reports:export'
  // Visa Management
  | 'visa:view'
  | 'visa:create'
  | 'visa:update'
  | 'visa:delete'
  | 'visa:publish'
  // Visa Applications
  | 'application:view'
  | 'application:view_all'
  | 'application:create'
  | 'application:update'
  | 'application:review'
  | 'application:approve'
  | 'application:reject'
  | 'application:assign'
  // Tours & Packages
  | 'tours:view'
  | 'tours:create'
  | 'tours:update'
  | 'tours:delete'
  // Bookings
  | 'bookings:view'
  | 'bookings:view_all'
  | 'bookings:create'
  | 'bookings:update'
  | 'bookings:cancel'
  // Customers & CRM
  | 'customers:view'
  | 'customers:view_all'
  | 'customers:create'
  | 'customers:update'
  | 'customers:delete'
  | 'customers:assign'
  // Payments & Invoices
  | 'payments:view'
  | 'payments:view_all'
  | 'payments:create'
  | 'payments:refund'
  | 'invoices:download'
  // Users & Staff Management
  | 'users:view'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  | 'users:manage_roles'
  // System & Settings
  | 'settings:view'
  | 'settings:update'
  | 'audit:view'
  | 'notifications:view';

/**
 * Standard Role Permissions Matrix
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'dashboard:view',
    'analytics:view',
    'reports:export',
    'visa:view',
    'visa:create',
    'visa:update',
    'visa:delete',
    'visa:publish',
    'application:view',
    'application:view_all',
    'application:create',
    'application:update',
    'application:review',
    'application:approve',
    'application:reject',
    'application:assign',
    'tours:view',
    'tours:create',
    'tours:update',
    'tours:delete',
    'bookings:view',
    'bookings:view_all',
    'bookings:create',
    'bookings:update',
    'bookings:cancel',
    'customers:view',
    'customers:view_all',
    'customers:create',
    'customers:update',
    'customers:delete',
    'customers:assign',
    'payments:view',
    'payments:view_all',
    'payments:create',
    'payments:refund',
    'invoices:download',
    'users:view',
    'users:create',
    'users:update',
    'users:delete',
    'users:manage_roles',
    'settings:view',
    'settings:update',
    'audit:view',
    'notifications:view',
  ],
  MANAGER: [
    'dashboard:view',
    'analytics:view',
    'reports:export',
    'visa:view',
    'visa:create',
    'visa:update',
    'application:view',
    'application:view_all',
    'application:create',
    'application:update',
    'application:review',
    'application:approve',
    'application:reject',
    'application:assign',
    'tours:view',
    'tours:create',
    'tours:update',
    'bookings:view',
    'bookings:view_all',
    'bookings:create',
    'bookings:update',
    'customers:view',
    'customers:view_all',
    'customers:create',
    'customers:update',
    'customers:assign',
    'payments:view',
    'payments:view_all',
    'payments:create',
    'invoices:download',
    'settings:view',
    'notifications:view',
  ],
  AGENT: [
    'dashboard:view',
    'visa:view',
    'application:view',
    'application:create',
    'application:update',
    'tours:view',
    'bookings:view',
    'bookings:create',
    'customers:view',
    'customers:create',
    'customers:update',
    'payments:view',
    'invoices:download',
    'settings:view',
    'notifications:view',
  ],
  CUSTOMER: [
    'dashboard:view',
    'visa:view',
    'application:view',
    'application:create',
    'tours:view',
    'bookings:view',
    'bookings:create',
    'payments:view',
    'invoices:download',
    'settings:view',
    'notifications:view',
  ],
};
