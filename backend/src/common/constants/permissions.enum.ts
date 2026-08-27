export enum Permission {
  // Users & Staff
  USERS_READ = 'users:read',
  USERS_WRITE = 'users:write',
  USERS_DELETE = 'users:delete',

  // Customers
  CUSTOMERS_READ = 'customers:read',
  CUSTOMERS_WRITE = 'customers:write',
  CUSTOMERS_DELETE = 'customers:delete',

  // Visas
  VISAS_READ = 'visas:read',
  VISAS_WRITE = 'visas:write',
  VISAS_DELETE = 'visas:delete',

  // Tours & Destinations
  TOURS_READ = 'tours:read',
  TOURS_WRITE = 'tours:write',
  TOURS_DELETE = 'tours:delete',

  // Services
  SERVICES_READ = 'services:read',
  SERVICES_WRITE = 'services:write',

  // Leads
  LEADS_READ = 'leads:read',
  LEADS_WRITE = 'leads:write',
  LEADS_DELETE = 'leads:delete',

  // Quotations
  QUOTATIONS_READ = 'quotations:read',
  QUOTATIONS_WRITE = 'quotations:write',

  // Bookings
  BOOKINGS_READ = 'bookings:read',
  BOOKINGS_WRITE = 'bookings:write',
  BOOKINGS_DELETE = 'bookings:delete',

  // Payments
  PAYMENTS_READ = 'payments:read',
  PAYMENTS_WRITE = 'payments:write',

  // Documents
  DOCUMENTS_READ = 'documents:read',
  DOCUMENTS_WRITE = 'documents:write',
  DOCUMENTS_DELETE = 'documents:delete',

  // Audit Logs & Reports
  AUDIT_READ = 'audit:read',
  REPORTS_READ = 'reports:read',

  // Settings
  SETTINGS_WRITE = 'settings:write',
}

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: Object.values(Permission),
  MANAGER: [
    Permission.USERS_READ,
    Permission.CUSTOMERS_READ,
    Permission.CUSTOMERS_WRITE,
    Permission.VISAS_READ,
    Permission.VISAS_WRITE,
    Permission.TOURS_READ,
    Permission.TOURS_WRITE,
    Permission.SERVICES_READ,
    Permission.LEADS_READ,
    Permission.LEADS_WRITE,
    Permission.QUOTATIONS_READ,
    Permission.QUOTATIONS_WRITE,
    Permission.BOOKINGS_READ,
    Permission.BOOKINGS_WRITE,
    Permission.PAYMENTS_READ,
    Permission.PAYMENTS_WRITE,
    Permission.DOCUMENTS_READ,
    Permission.DOCUMENTS_WRITE,
    Permission.AUDIT_READ,
    Permission.REPORTS_READ,
  ],
  AGENT: [
    Permission.CUSTOMERS_READ,
    Permission.CUSTOMERS_WRITE,
    Permission.VISAS_READ,
    Permission.VISAS_WRITE,
    Permission.TOURS_READ,
    Permission.SERVICES_READ,
    Permission.LEADS_READ,
    Permission.LEADS_WRITE,
    Permission.QUOTATIONS_READ,
    Permission.QUOTATIONS_WRITE,
    Permission.BOOKINGS_READ,
    Permission.BOOKINGS_WRITE,
    Permission.PAYMENTS_READ,
    Permission.DOCUMENTS_READ,
    Permission.DOCUMENTS_WRITE,
  ],
  CUSTOMER: [
    Permission.VISAS_READ,
    Permission.TOURS_READ,
    Permission.SERVICES_READ,
    Permission.DOCUMENTS_READ,
    Permission.DOCUMENTS_WRITE,
    Permission.BOOKINGS_READ,
    Permission.PAYMENTS_READ,
    Permission.QUOTATIONS_READ,
  ],
};
