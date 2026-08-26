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
        const res = await apiClient.get<{ data: Tour[] }>("/tours");
        return res.data;
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
        const res = await apiClient.get<{ data: Tour }>(`/tours/${slug}`);
        return res.data;
      } catch {
        return mockTours.find((t) => (t.slug || t.id) === slug) || null;
      }
    },
    enabled: !!slug,
  });
}
