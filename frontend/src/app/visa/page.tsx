"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeftRight,
  Heart,
  Plane,
  AlertCircle,
  FileText,
  RotateCcw,
  Globe,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import {
  useVisaServices,
  useActiveCountries,
  useActiveVisaTypes,
} from "@/hooks/use-visas";
import { VisaService } from "@/lib/api/visas";

function VisaResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read search parameters from URL
  const countryParam = searchParams.get("country") || "";
  const typeParam = searchParams.get("type") || "";
  const processingParam = searchParams.get("processing") || "";
  const queryParam = searchParams.get("q") || searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "popularity";

  const [searchDestination, setSearchDestination] = useState(queryParam);
  const [selectedCountrySlug, setSelectedCountrySlug] = useState(countryParam);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(typeParam ? [typeParam] : []);
  const [selectedSpeed, setSelectedSpeed] = useState<string>(processingParam || "any");
  const [selectedSort, setSelectedSort] = useState(sortParam);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Sync state when URL params change
  useEffect(() => {
    setSearchDestination(queryParam);
    setSelectedCountrySlug(countryParam);
    setSelectedTypes(typeParam ? [typeParam] : []);
    setSelectedSpeed(processingParam || "any");
    setSelectedSort(sortParam);
  }, [countryParam, typeParam, processingParam, queryParam, sortParam]);

  // Queries
  const { data: countries } = useActiveCountries();
  const { data: visaTypes } = useActiveVisaTypes();

  // Query visa services from backend API
  const {
    data: servicesData,
    isLoading,
    isError,
    refetch,
  } = useVisaServices({
    countrySlug: selectedCountrySlug || undefined,
    visaTypeSlug: selectedTypes.length === 1 ? selectedTypes[0] : undefined,
    search: searchDestination || undefined,
    limit: 100,
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTypeToggle = (typeSlug: string) => {
    const next = selectedTypes.includes(typeSlug)
      ? selectedTypes.filter((t) => t !== typeSlug)
      : [...selectedTypes, typeSlug];

    setSelectedTypes(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next.length === 1) {
      params.set("type", next[0]);
    } else {
      params.delete("type");
    }
    router.replace(`/visa?${params.toString()}`, { scroll: false });
  };

  const handleCountryChange = (countrySlug: string) => {
    setSelectedCountrySlug(countrySlug);
    const params = new URLSearchParams(searchParams.toString());
    if (countrySlug) {
      params.set("country", countrySlug);
    } else {
      params.delete("country");
    }
    router.replace(`/visa?${params.toString()}`, { scroll: false });
  };

  const handleSpeedChange = (speed: string) => {
    setSelectedSpeed(speed);
    const params = new URLSearchParams(searchParams.toString());
    if (speed && speed !== "any") {
      params.set("processing", speed);
    } else {
      params.delete("processing");
    }
    router.replace(`/visa?${params.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchDestination) {
      params.set("q", searchDestination);
    } else {
      params.delete("q");
    }
    if (selectedCountrySlug) {
      params.set("country", selectedCountrySlug);
    }
    router.replace(`/visa?${params.toString()}`, { scroll: false });
  };

  // Filter & Sort results locally based on selected speed and sort option
  const filteredVisaServices = useMemo(() => {
    let list: VisaService[] = [];
    if (Array.isArray(servicesData)) {
      list = servicesData;
    } else if (servicesData && Array.isArray(servicesData.data)) {
      list = servicesData.data;
    }

    // Filter by selected types if multiple
    if (selectedTypes.length > 0) {
      list = list.filter((item) =>
        selectedTypes.includes(item.visaType?.slug || "")
      );
    }

    // Filter by speed
    if (selectedSpeed === "fast-track") {
      list = list.filter((item) => (item.processingTime?.maxDays || 0) <= 7);
    } else if (selectedSpeed === "standard") {
      list = list.filter((item) => (item.processingTime?.minDays || 0) >= 7);
    }

    // Sort list
    if (selectedSort === "price-low") {
      list = [...list].sort((a, b) => (a.fees?.total || 0) - (b.fees?.total || 0));
    } else if (selectedSort === "price-high") {
      list = [...list].sort((a, b) => (b.fees?.total || 0) - (a.fees?.total || 0));
    } else if (selectedSort === "processing") {
      list = [...list].sort((a, b) => (a.processingTime?.minDays || 0) - (b.processingTime?.minDays || 0));
    } else {
      list = [...list].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
    }

    return list;
  }, [servicesData, selectedTypes, selectedSpeed, selectedSort]);

  const handleClearAll = () => {
    setSearchDestination("");
    setSelectedCountrySlug("");
    setSelectedTypes([]);
    setSelectedSpeed("any");
    setSelectedSort("popularity");
    router.replace("/visa", { scroll: false });
  };

  const selectedCountryObj = countries?.find((c) => c.slug === selectedCountrySlug);

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 sm:pt-36 pb-24 transition-colors duration-300">
      <Container className="max-w-6xl">
        
        {/* ========================================================================= */}
        {/* 1. Header Section                                                         */}
        {/* ========================================================================= */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/" className="hover:text-[#061474] dark:hover:text-blue-400">Home</Link>
            <span>›</span>
            <span className="text-slate-600 dark:text-slate-300 font-semibold">Visa Search</span>
            {selectedCountryObj && (
              <>
                <span>›</span>
                <span className="text-[#061474] dark:text-blue-400 font-bold">
                  {selectedCountryObj.flag} {selectedCountryObj.name}
                </span>
              </>
            )}
          </div>

          <h1 className="font-sora font-extrabold text-3xl sm:text-4xl text-[#061474] dark:text-white tracking-tight">
            Find Your Visa
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Streamlined processing for global destinations. Discover requirements and apply seamlessly.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. Top Search Bar Card                                                    */}
        {/* ========================================================================= */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm mb-10">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row items-center gap-3"
          >
            {/* Destination Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                placeholder="Where are you traveling to?"
                className="w-full h-12 pl-10 pr-4 bg-slate-50/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#061474] dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all"
              />
            </div>

            {/* Destination Country Filter Selector */}
            <div className="relative w-full md:w-64">
              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                aria-label="Destination Country"
                value={selectedCountrySlug}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full h-12 pl-10 pr-8 bg-slate-50/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 outline-none focus:border-[#061474] dark:focus:border-blue-500 cursor-pointer appearance-none transition-all"
              >
                <option value="">All Destinations</option>
                {countries?.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.flag ? `${c.flag} ` : ""}{c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Visas Button */}
            <button
              type="submit"
              className="w-full md:w-auto h-12 px-7 bg-[#061474] hover:bg-[#030A3A] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] shrink-0"
            >
              <span>Search Visas</span>
            </button>
          </form>
        </div>

        {/* ========================================================================= */}
        {/* 3. Main Content: Left Filters + Right Visa Grid                           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* Left Filters Card                                                       */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-sora font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Filters</span>
              </h2>
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            </div>

            {/* Visa Type Checkboxes (Loaded strictly from Backend) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Visa Type
              </label>
              <div className="space-y-2.5">
                {(visaTypes && visaTypes.length > 0
                  ? visaTypes
                  : []
                ).map((t) => {
                  const isChecked = selectedTypes.includes(t.slug);
                  return (
                    <label
                      key={t.slug}
                      className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-[#061474] dark:hover:text-white select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTypeToggle(t.slug)}
                        className="w-4 h-4 rounded border-slate-300 text-[#061474] focus:ring-[#061474] cursor-pointer"
                      />
                      <span>{t.name.replace(" Visa", "")}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Processing Speed Radios */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Processing Speed
              </label>
              <div className="space-y-2.5">
                {[
                  { id: "any", label: "Any" },
                  { id: "fast-track", label: "Fast Track (< 7 days)" },
                  { id: "standard", label: "Standard (1–3 weeks)" },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-[#061474] dark:hover:text-white select-none"
                  >
                    <input
                      type="radio"
                      name="processingSpeed"
                      value={item.id}
                      checked={selectedSpeed === item.id}
                      onChange={() => handleSpeedChange(item.id)}
                      className="w-4 h-4 text-[#061474] border-slate-300 focus:ring-[#061474] cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Filters */}
            {(selectedTypes.length > 0 || selectedSpeed !== "any" || searchDestination || selectedCountrySlug) && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-[#ED1B26] hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}

          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* Right Visa Cards Column                                                 */}
          {/* ----------------------------------------------------------------------- */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* Top Results Bar */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <div className="text-slate-500 dark:text-slate-400 font-medium">
                {isLoading ? (
                  <span>Loading available visa services...</span>
                ) : (
                  <span>
                    Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredVisaServices.length}</strong> results
                    {selectedCountryObj && ` for ${selectedCountryObj.name}`}
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>Sort by:</span>
                <select
                  aria-label="Sort visas by"
                  value={selectedSort}
                  onChange={(e) => {
                    setSelectedSort(e.target.value);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("sort", e.target.value);
                    router.replace(`/visa?${params.toString()}`, { scroll: false });
                  }}
                  className="bg-transparent font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="popularity" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Popularity</option>
                  <option value="price-low" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Price: High to Low</option>
                  <option value="processing" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Processing Time</option>
                </select>
              </div>
            </div>

            {/* Loading Skeletons */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-32 h-5 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    </div>
                    <div className="w-20 h-4 bg-slate-100 dark:bg-slate-800 rounded" />
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="h-10 bg-slate-50 dark:bg-slate-800 rounded" />
                      <div className="h-10 bg-slate-50 dark:bg-slate-800 rounded" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="w-16 h-6 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="w-20 h-8 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center space-y-4 shadow-sm">
                <AlertCircle className="w-12 h-12 text-[#ED1B26] mx-auto" />
                <h3 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                  Failed to Load Visa Catalog
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Unable to connect to the backend visa registry. Please click retry.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="px-5 py-2 rounded-lg bg-[#061474] text-white font-semibold text-xs transition-all hover:bg-[#030A3A]"
                >
                  Retry Search
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && filteredVisaServices.length === 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-4 shadow-sm">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="font-sora font-bold text-xl text-slate-900 dark:text-white">
                  No Visa Matches Found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any visa services matching your current filters. Try selecting different criteria.
                </p>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="px-5 py-2.5 rounded-lg bg-[#ED1B26] hover:bg-[#c9121c] text-white font-semibold text-xs transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Responsive Visa Cards Grid */}
            {!isLoading && !isError && filteredVisaServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredVisaServices.map((service) => {
                  const isFav = Boolean(favorites[service._id]);
                  const totalCost =
                    service.fees?.total ||
                    (service.fees?.government || 0) + (service.fees?.service || 0);

                  return (
                    <div
                      key={service._id}
                      className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        {/* Header: Flag + Country Name + Type Pill + Heart Icon */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl leading-none">{service.country?.flag || "🌐"}</span>
                            <div>
                              <Link
                                href={`/visa/${service.slug}`}
                                className="font-sora font-bold text-base text-slate-900 dark:text-white hover:text-[#ED1B26] transition-colors block"
                              >
                                {service.country?.name || service.name}
                              </Link>
                              
                              {/* Pill Badge */}
                              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                                {service.visaType?.name || "Standard Visitor"}
                              </span>
                            </div>
                          </div>

                          {/* Heart / Favorite Button */}
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(service._id, e)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Save to favorites"
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isFav ? "fill-red-500 text-red-500" : "stroke-slate-400"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Mid Meta Specifications */}
                        <div className="grid grid-cols-2 gap-y-2.5 pt-2 text-xs">
                          {/* Processing Time */}
                          <div>
                            <span className="text-[11px] text-slate-400 block mb-0.5">
                              Processing Time
                            </span>
                            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>
                                {service.processingTime?.minDays}-{service.processingTime?.maxDays}{" "}
                                {service.processingTime?.unit?.toLowerCase() || "days"}
                              </span>
                            </div>
                          </div>

                          {/* Max Stay */}
                          <div>
                            <span className="text-[11px] text-slate-400 block mb-0.5">
                              Max Stay
                            </span>
                            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{service.stayDuration}</span>
                            </div>
                          </div>

                          {/* Entry Type */}
                          <div className="col-span-2 pt-1">
                            <span className="text-[11px] text-slate-400 block mb-0.5">
                              Entry Type
                            </span>
                            <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>
                                {service.entryType === "MULTIPLE"
                                  ? "⇄ Multiple"
                                  : service.entryType === "DOUBLE"
                                  ? "⇄ Double"
                                  : "→ Single"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Starting from $X + Red Apply CTA */}
                      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[11px] text-slate-400 block font-normal">
                            Starting from
                          </span>
                          <span className="font-sora font-extrabold text-2xl text-slate-900 dark:text-white">
                            ${totalCost}
                          </span>
                        </div>

                        <Link
                          href={`/visa/${service.slug}`}
                          className="h-10 px-6 rounded-lg bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-xs flex items-center justify-center shadow-sm shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Apply</span>
                        </Link>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>

      </Container>
    </div>
  );
}

export default function VisaResultsPage() {
  return (
    <PageShell>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center pt-32">
            <div className="w-8 h-8 border-4 border-[#061474] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <VisaResultsContent />
      </Suspense>
    </PageShell>
  );
}
