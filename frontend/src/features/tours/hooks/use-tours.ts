"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockTours } from "@/lib/mock-data";
import type { Tour } from "@/types";

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<any>("/tours");
        const list = Array.isArray(res) ? res : (res?.data || res?.items);
        return list && list.length > 0 ? list : mockTours;
      } catch {
        return mockTours;
      }
    },
  });
}

export function useTour(slug: string) {
  return useQuery({
    queryKey: ["tours", slug],
    queryFn: async () => {
      try {
        const res = await apiClient.get<any>(`/tours/${slug}`);
        const item = res?.data !== undefined ? res.data : res;
        return item || mockTours.find((t) => (t.slug || t.id) === slug) || null;
      } catch {
        return mockTours.find((t) => (t.slug || t.id) === slug) || null;
      }
    },
    enabled: !!slug,
  });
}
