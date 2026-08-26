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
        const res = await apiClient.get<{ data: Destination[] }>("/destinations");
        return res.data;
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
        const res = await apiClient.get<{ data: Destination }>(`/destinations/${slug}`);
        return res.data;
      } catch {
        return mockDestinations.find((d) => (d.slug || d.id) === slug) || null;
      }
    },
    enabled: !!slug,
  });
}
