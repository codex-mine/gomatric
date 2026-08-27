"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockDestinations } from "@/lib/mock-data";
import type { Destination } from "@/types";

export function useDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<any>("/destinations");
        const list = Array.isArray(res) ? res : (res?.data || res?.items);
        return list && list.length > 0 ? list : mockDestinations;
      } catch {
        return mockDestinations;
      }
    },
  });
}

export function useDestination(slug: string) {
  return useQuery({
    queryKey: ["destinations", slug],
    queryFn: async () => {
      try {
        const res = await apiClient.get<any>(`/destinations/${slug}`);
        const item = res?.data !== undefined ? res.data : res;
        return item || mockDestinations.find((d) => (d.slug || d.id) === slug) || null;
      } catch {
        return mockDestinations.find((d) => (d.slug || d.id) === slug) || null;
      }
    },
    enabled: !!slug,
  });
}
