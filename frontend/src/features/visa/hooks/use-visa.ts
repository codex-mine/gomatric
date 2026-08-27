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
        const res = await apiClient.get<any>("/visa/countries");
        const list = Array.isArray(res) ? res : (res?.data || res?.items);
        return list && list.length > 0 ? list : mockVisaCountries;
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
        const res = await apiClient.get<any>(`/visa/requirements/${countrySlug}`);
        const item = res?.data !== undefined ? res.data : res;
        return item || mockVisaRequirements.find((r) => r.country.toLowerCase() === countrySlug.toLowerCase()) || null;
      } catch {
        return mockVisaRequirements.find((r) => r.country.toLowerCase() === countrySlug.toLowerCase()) || null;
      }
    },
    enabled: !!countrySlug,
  });
}
