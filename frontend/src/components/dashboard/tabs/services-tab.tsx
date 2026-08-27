"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Globe,
  Loader2,
} from "lucide-react";
import { useVisaServices, useActiveCountries, useActiveVisaTypes, useDeleteVisaService } from "@/hooks/use-visas";
import { VisaService } from "@/lib/api/visas";
import { Role } from "@/lib/permissions";
import { useQueryClient } from "@tanstack/react-query";

interface ServicesTabProps {
  role: Role;
}

export function ServicesTab({ role }: ServicesTabProps) {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: countries = [] } = useActiveCountries();
  const { data: visaTypes = [] } = useActiveVisaTypes();
  const { data: servicesResponse, isLoading } = useVisaServices({ limit: 100 });
  const deleteMutation = useDeleteVisaService();

  const servicesList: VisaService[] = useMemo(() => {
    if (Array.isArray(servicesResponse)) return servicesResponse;
    return servicesResponse?.data || [];
  }, [servicesResponse]);

  // Multi-criteria filtering
  const filteredServices = useMemo(() => {
    return servicesList.filter((item) => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name?.toLowerCase().includes(q);
        const matchCountry = item.country?.name?.toLowerCase().includes(q);
        const matchType = item.visaType?.name?.toLowerCase().includes(q);
        if (!matchName && !matchCountry && !matchType) return false;
      }

      // Country filter
      if (selectedCountry !== "ALL") {
        const countryMatch =
          item.country?._id === selectedCountry ||
          item.country?.slug === selectedCountry ||
          item.country?.name === selectedCountry;
        if (!countryMatch) return false;
      }

      // Visa type filter
      if (selectedType !== "ALL") {
        const typeMatch =
          item.visaType?._id === selectedType ||
          item.visaType?.slug === selectedType ||
          item.visaType?.name?.toLowerCase() === selectedType.toLowerCase();
        if (!typeMatch) return false;
      }

      return true;
    });
  }, [servicesList, searchQuery, selectedCountry, selectedType]);

  // Pagination
  const totalEntries = filteredServices.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredServices.slice(start, start + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Visa Name", "Country", "Type", "Processing Time", "Price (USD)", "Status"];
    const rows = filteredServices.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.country?.name || ''}"`,
      `"${s.visaType?.name || ''}"`,
      `"${s.processingTime?.minDays}-${s.processingTime?.maxDays} ${s.processingTime?.unit || 'Days'}"`,
      `"$${s.fees?.total || (s.fees?.government || 0) + (s.fees?.service || 0)}"`,
      `"${s.isActive ? 'Active' : 'Draft'}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gomatric-visas-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      queryClient.invalidateQueries({ queryKey: ["visa-services"] });
    } catch (err: any) {
      alert("Failed to delete visa service: " + (err?.message || "Server error"));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header with Title & Action Buttons matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Visa Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, review, and export current visa offerings across global destinations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {(role === "ADMIN" || role === "MANAGER") && (
            <Link
              href="/dashboard/services/create"
              className="h-10 px-5 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Visa</span>
            </Link>
          )}
        </div>
      </div>

      {/* 2. Controls & Filter Bar Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Search and Dropdown Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search visas..."
              className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
            />
          </div>

          {/* All Countries Select Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by destination country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 pl-3.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none focus:border-[#061474] dark:focus:border-blue-500 transition-all"
            >
              <option value="ALL">All Countries</option>
              {countries.map((c) => {
                const cId = c.id || c._id;
                return (
                  <option key={cId} value={cId}>
                    {c.flag} {c.name}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* All Types Select Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by visa category"
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 pl-3.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer appearance-none focus:border-[#061474] dark:focus:border-blue-500 transition-all"
            >
              <option value="ALL">All Types</option>
              {visaTypes.map((t) => {
                const tId = t.id || t._id;
                return (
                  <option key={tId} value={tId}>
                    {t.name}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Right Pagination Indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>
            Showing <strong className="text-slate-900 dark:text-white font-bold">{totalEntries > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, totalEntries)}</strong> of{" "}
            <strong className="text-slate-900 dark:text-white font-bold">{totalEntries}</strong> entries
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Main Data Table matching Screenshot 1 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider">
                <th className="px-5 py-4 whitespace-nowrap">Visa Name</th>
                <th className="px-5 py-4 whitespace-nowrap">Country</th>
                <th className="px-5 py-4 whitespace-nowrap">Type</th>
                <th className="px-5 py-4 whitespace-nowrap">Processing Time</th>
                <th className="px-5 py-4 whitespace-nowrap">Price (USD)</th>
                <th className="px-5 py-4 whitespace-nowrap">Status</th>
                <th className="px-5 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2.5">
                      <Loader2 className="w-7 h-7 text-[#061474] dark:text-blue-500 animate-spin" />
                      <span className="text-xs font-semibold">Loading catalog entries...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="max-w-sm mx-auto space-y-2">
                      <Globe className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
                      <p className="font-bold text-sm text-slate-700 dark:text-slate-200">
                        No Visa Services Found
                      </p>
                      <p className="text-xs text-slate-400">
                        Try adjusting your search query or country filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedServices.map((service) => {
                  const totalPrice =
                    service.fees?.total ||
                    (service.fees?.government || 0) + (service.fees?.service || 0);

                  const processingText = service.processingTime
                    ? `${service.processingTime.minDays} - ${service.processingTime.maxDays} ${
                        service.processingTime.unit
                          ? service.processingTime.unit.charAt(0) +
                            service.processingTime.unit.slice(1).toLowerCase()
                          : "Days"
                      }`
                    : "10 - 15 Days";

                  return (
                    <tr
                      key={service._id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Visa Name */}
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                        <Link
                          href={`/visa/${service.slug}`}
                          className="hover:text-[#ED1B26] transition-colors"
                        >
                          {service.name}
                        </Link>
                      </td>

                      {/* Country with Flag Badge */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg shrink-0 leading-none">
                            {service.country?.flag || "🌐"}
                          </span>
                          <span className="font-medium text-slate-800 dark:text-slate-200 text-xs">
                            {service.country?.name || "Global"}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs whitespace-nowrap">
                        {service.visaType?.name || "Tourist"}
                      </td>

                      {/* Processing Time */}
                      <td className="px-5 py-4 text-slate-600 dark:text-slate-300 text-xs whitespace-nowrap">
                        {processingText}
                      </td>

                      {/* Price (USD) */}
                      <td className="px-5 py-4 font-sora font-bold text-slate-900 dark:text-white text-xs sm:text-sm whitespace-nowrap">
                        ${totalPrice.toFixed(2)}
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            service.isActive
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {service.isActive ? "Active" : "Draft"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/visa/${service.slug}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit Visa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          {(role === "ADMIN" || role === "MANAGER") && (
                            <button
                              type="button"
                              onClick={() => handleDelete(service._id, service.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                              title="Delete Visa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
