"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Globe, FileText, Clock, ArrowRight, Loader2 } from "lucide-react";
import { useVisaServices } from "@/hooks/use-visas";
import { Country, VisaType } from "@/lib/api/visas";

export function VisaSearchTab() {
  const router = useRouter();

  // Fetch all active visa services directly from backend
  const { data: servicesResponse, isLoading, isError } = useVisaServices({
    isActive: true,
    limit: 100,
  });

  const allServices = useMemo(() => {
    if (!servicesResponse) return [];
    if (Array.isArray(servicesResponse)) return servicesResponse;
    if (Array.isArray(servicesResponse.data)) return servicesResponse.data;
    return [];
  }, [servicesResponse]);

  // Extract unique countries that actually have active visa services in the backend
  const availableCountries = useMemo(() => {
    const countryMap = new Map<string, Country>();
    allServices.forEach((service) => {
      if (service.country && service.country.slug) {
        countryMap.set(service.country.slug, service.country);
      }
    });
    return Array.from(countryMap.values()).sort((a, b) =>
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
  }, [allServices]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [speed, setSpeed] = useState<string>("standard");

  // Auto-select first available country when data loads
  useEffect(() => {
    if (availableCountries.length > 0) {
      if (!selectedCountry || !availableCountries.some((c) => c.slug === selectedCountry)) {
        setSelectedCountry(availableCountries[0].slug);
      }
    }
  }, [availableCountries, selectedCountry]);

  // Extract unique visa types available specifically for the currently selected country
  const availableVisaTypes = useMemo(() => {
    if (!selectedCountry) return [];
    const typeMap = new Map<string, VisaType>();
    allServices
      .filter((service) => service.country?.slug === selectedCountry)
      .forEach((service) => {
        if (service.visaType && service.visaType.slug) {
          typeMap.set(service.visaType.slug, service.visaType);
        }
      });
    return Array.from(typeMap.values()).sort((a, b) =>
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
  }, [allServices, selectedCountry]);

  // Auto-select first available visa type for the selected country
  useEffect(() => {
    if (availableVisaTypes.length > 0) {
      if (!selectedType || !availableVisaTypes.some((t) => t.slug === selectedType)) {
        setSelectedType(availableVisaTypes[0].slug);
      }
    } else {
      setSelectedType("");
    }
  }, [availableVisaTypes, selectedType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) return;

    // Navigate to /visa results page with search parameters
    const params = new URLSearchParams();
    if (selectedCountry) params.set("country", selectedCountry);
    if (selectedType) params.set("type", selectedType);
    if (speed && speed !== "standard") params.set("processing", speed);

    router.push(`/visa?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end"
    >
      {/* 1. Destination Country (Loaded strictly from Backend) */}
      <div className="md:col-span-4">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Destination Country
        </label>
        <div className="relative flex items-center">
          <Globe className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            aria-label="Destination Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={isLoading || availableCountries.length === 0}
            className="w-full h-12 pl-10 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 appearance-none outline-none focus:ring-1 focus:ring-[#061474] dark:focus:ring-blue-500 focus:border-[#061474] dark:focus:border-blue-500 transition-colors cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <option value="">Loading available destinations...</option>
            ) : availableCountries.length === 0 ? (
              <option value="">No active visa services</option>
            ) : (
              availableCountries.map((c) => (
                <option
                  key={c.slug}
                  value={c.slug}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {c.flag ? `${c.flag} ` : ""}{c.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* 2. Visa Type (Dynamically filtered for Selected Country) */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Visa Type
        </label>
        <div className="relative flex items-center">
          <FileText className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            aria-label="Visa Type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={isLoading || availableVisaTypes.length === 0}
            className="w-full h-12 pl-10 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 appearance-none outline-none focus:ring-1 focus:ring-[#061474] dark:focus:ring-blue-500 focus:border-[#061474] dark:focus:border-blue-500 transition-colors cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <option value="">Loading types...</option>
            ) : availableVisaTypes.length === 0 ? (
              <option value="">No types available</option>
            ) : (
              availableVisaTypes.map((t) => (
                <option
                  key={t.slug}
                  value={t.slug}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {t.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* 3. Processing Speed */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Processing Speed
        </label>
        <div className="relative flex items-center">
          <Clock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            aria-label="Processing Speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 appearance-none outline-none focus:ring-1 focus:ring-[#061474] dark:focus:ring-blue-500 focus:border-[#061474] dark:focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="standard" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              Standard (Regular)
            </option>
            <option value="express" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              Express (Priority)
            </option>
            <option value="urgent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              Urgent (Fast-track)
            </option>
          </select>
        </div>
      </div>

      {/* 4. Check Visa Action Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isLoading || availableCountries.length === 0}
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Check Visa</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
