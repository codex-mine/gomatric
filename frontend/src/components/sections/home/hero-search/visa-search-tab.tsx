"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  FileText,
  Clock,
  ArrowRight,
  Loader2,
  Check,
  ChevronDown,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import { useVisaServices } from "@/hooks/use-visas";
import { Country, VisaType, VisaService } from "@/lib/api/visas";

export function VisaSearchTab() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Extract unique countries that have active visa services
  const availableCountries = useMemo(() => {
    const countryMap = new Map<string, { country: Country; count: number }>();
    allServices.forEach((service) => {
      if (service.country && service.country.slug) {
        const existing = countryMap.get(service.country.slug);
        if (existing) {
          existing.count += 1;
        } else {
          countryMap.set(service.country.slug, {
            country: service.country,
            count: 1,
          });
        }
      }
    });

    return Array.from(countryMap.values())
      .sort((a, b) => (a.country.sortOrder ?? 0) - (b.country.sortOrder ?? 0));
  }, [allServices]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedVisaSlugs, setSelectedVisaSlugs] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [speed, setSpeed] = useState<string>("standard");

  // Auto-select first available country when data loads
  useEffect(() => {
    if (availableCountries.length > 0) {
      if (!selectedCountry || !availableCountries.some((c) => c.country.slug === selectedCountry)) {
        setSelectedCountry(availableCountries[0].country.slug);
      }
    }
  }, [availableCountries, selectedCountry]);

  // Get all visa services available specifically for the currently selected country
  const countryVisaServices = useMemo(() => {
    if (!selectedCountry) return [];
    return allServices.filter(
      (service) => service.country?.slug === selectedCountry
    );
  }, [allServices, selectedCountry]);

  // Auto-select all visas for the chosen country by default
  useEffect(() => {
    if (countryVisaServices.length > 0) {
      // Select all by default so user has full coverage, or keep valid ones
      setSelectedVisaSlugs(countryVisaServices.map((s) => s.slug || s.visaType?.slug || ""));
    } else {
      setSelectedVisaSlugs([]);
    }
  }, [countryVisaServices]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleVisaSelection = (slug: string) => {
    setSelectedVisaSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectAll = () => {
    setSelectedVisaSlugs(countryVisaServices.map((s) => s.slug || s.visaType?.slug || ""));
  };

  const handleClearAll = () => {
    setSelectedVisaSlugs([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) return;

    const params = new URLSearchParams();
    params.set("country", selectedCountry);

    // Map selected visas back to their visa type slugs for catalog filtering
    if (selectedVisaSlugs.length > 0 && selectedVisaSlugs.length < countryVisaServices.length) {
      const chosenTypes = countryVisaServices
        .filter((s) => selectedVisaSlugs.includes(s.slug || s.visaType?.slug || ""))
        .map((s) => s.visaType?.slug)
        .filter(Boolean) as string[];

      const uniqueTypes = Array.from(new Set(chosenTypes));
      if (uniqueTypes.length > 0) {
        params.set("type", uniqueTypes.join(","));
      }
    }

    if (speed && speed !== "standard") {
      params.set("processing", speed);
    }

    router.push(`/visa?${params.toString()}`);
  };

  // Label to display on the multi-select input
  const selectionDisplayLabel = useMemo(() => {
    if (countryVisaServices.length === 0) return "No visas available";
    if (selectedVisaSlugs.length === 0) return "Select visa types...";
    if (selectedVisaSlugs.length === countryVisaServices.length) {
      return `All Visas Available (${countryVisaServices.length})`;
    }
    if (selectedVisaSlugs.length === 1) {
      const single = countryVisaServices.find(
        (s) => (s.slug || s.visaType?.slug) === selectedVisaSlugs[0]
      );
      return single?.name || single?.visaType?.name || "1 Visa Selected";
    }
    return `${selectedVisaSlugs.length} Visas Selected`;
  }, [countryVisaServices, selectedVisaSlugs]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end"
    >
      {/* 1. Destination Country */}
      <div className="md:col-span-4">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Destination Country
        </label>
        <div className="relative flex items-center">
          <Globe className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            aria-label="Destination Country"
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setIsDropdownOpen(false);
            }}
            disabled={isLoading || availableCountries.length === 0}
            className="w-full h-12 pl-10 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 appearance-none outline-none focus:ring-1 focus:ring-[#061474] dark:focus:ring-blue-500 focus:border-[#061474] dark:focus:border-blue-500 transition-colors cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <option value="">Loading available destinations...</option>
            ) : availableCountries.length === 0 ? (
              <option value="">No active visa services</option>
            ) : (
              availableCountries.map(({ country: c, count }) => (
                <option
                  key={c.slug}
                  value={c.slug}
                  className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  {c.flag ? `${c.flag} ` : ""}{c.name} ({count} {count === 1 ? "Visa" : "Visas"})
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* 2. Same Country Multiple Visa Selection */}
      <div className="md:col-span-4 relative z-30" ref={dropdownRef}>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-[11px] font-bold text-slate-500 uppercase">
            Select Visa Options
          </label>
          {countryVisaServices.length > 1 && (
            <span className="text-[10px] font-semibold text-[#061474] dark:text-blue-400">
              Multiple Choice
            </span>
          )}
        </div>

        {/* Multi-Select Trigger Button */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          disabled={isLoading || countryVisaServices.length === 0}
          className="w-full h-12 pl-10 pr-9 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-800 dark:text-slate-100 text-left flex items-center justify-between outline-none focus:ring-1 focus:ring-[#061474] dark:focus:ring-blue-500 focus:border-[#061474] dark:focus:border-blue-500 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Layers className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <span className="truncate pr-2">{selectionDisplayLabel}</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
              isDropdownOpen ? "rotate-180 text-[#061474] dark:text-blue-400" : ""
            }`}
          />
        </button>

        {/* Multi-Select Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 p-3 space-y-2 min-w-[280px] max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header / Select All / Clear All */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {countryVisaServices.length} {countryVisaServices.length === 1 ? "Visa" : "Visas"} for this Country
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] font-semibold text-[#061474] dark:text-blue-400 hover:underline cursor-pointer"
                >
                  All
                </button>
                <span className="text-slate-300 dark:text-slate-700 text-xs">•</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Checkbox Options List */}
            <div className="space-y-1.5 pt-1">
              {countryVisaServices.map((service) => {
                const sSlug = service.slug || service.visaType?.slug || "";
                const isSelected = selectedVisaSlugs.includes(sSlug);
                const totalFee = service.fees?.total || (service.fees?.government || 0) + (service.fees?.service || 0);

                return (
                  <div
                    key={service.id || service._id || sSlug}
                    onClick={() => toggleVisaSelection(sSlug)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-slate-50 dark:bg-slate-800/90 border-[#061474]/30 dark:border-blue-500/40"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Checkbox Icon */}
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? "bg-[#ED1B26] border border-[#ED1B26] text-white"
                            : "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Visa Details */}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          {service.name}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                          {service.visaType?.name && (
                            <span className="font-semibold text-slate-600 dark:text-slate-300">
                              {service.visaType.name}
                            </span>
                          )}
                          {service.validity && (
                            <>
                              <span>•</span>
                              <span>{service.validity}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price Tag */}
                    {totalFee > 0 && (
                      <span className="text-[11px] font-bold text-slate-900 dark:text-white shrink-0 font-mono">
                        ${totalFee}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Done button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="w-full h-8 rounded-lg bg-[#061474] hover:bg-[#030A3A] text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                Apply Selection ({selectedVisaSlugs.length})
              </button>
            </div>

          </div>
        )}
      </div>

      {/* 3. Processing Speed */}
      <div className="md:col-span-2">
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
              Standard
            </option>
            <option value="express" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              Express
            </option>
            <option value="urgent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              Urgent
            </option>
          </select>
        </div>
      </div>

      {/* 4. Check Visa Action Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isLoading || availableCountries.length === 0 || selectedVisaSlugs.length === 0}
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Check Visas</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
