"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { mockVisaCountries, mockVisaRequirements } from "@/lib/mock-data";
import type { VisaCountry, VisaRequirement } from "@/types";

export function useVisaCountries() {
  return useQuery({
    queryKey: ["visa-countries"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<{ data: VisaCountry[] }>("/visa/countries");
        return res.data;
      } catch {
        return mockVisaCountries;
      }
    },
  });
}

export function useVisaRequirements(countrySlug: string) {
  return useQuery({
    queryKey: ["visa-requirements", countrySlug],
    queryFn: async () => {
      try {
        const res = await apiClient.get<{ data: VisaRequirement }>(`/visa/requirements/${countrySlug}`);
        return res.data;
      } catch {
        return mockVisaRequirements.find((r) => r.country.toLowerCase() === countrySlug.toLowerCase()) || null;
      }
    },
    enabled: !!countrySlug,
  });
}
