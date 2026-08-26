// ========================================
// Common Types
// ========================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface SEOMetadata {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
  label: string;
}

export type Status =
  | "pending"
  | "processing"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";
