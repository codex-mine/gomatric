"use client";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { BookingFormData } from "@/types";

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: BookingFormData) => {
      try {
        const res = await apiClient.post<{ success: boolean; referenceNumber: string }>(
          "/bookings",
          data
        );
        return res;
      } catch {
        // Fallback for mock simulation
        return {
          success: true,
          referenceNumber: `GM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        };
      }
    },
  });
}
