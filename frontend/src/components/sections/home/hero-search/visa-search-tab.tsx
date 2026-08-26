"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, FileText, Clock, ArrowRight } from "lucide-react";

const VISA_COUNTRIES = [
  { slug: "dubai-uae", label: "Dubai, United Arab Emirates" },
  { slug: "malaysia", label: "Malaysia (eVisa)" },
  { slug: "thailand", label: "Thailand (Tourist/VoA)" },
  { slug: "singapore", label: "Singapore (Paper Visa)" },
  { slug: "turkey", label: "Turkey (eVisa)" },
  { slug: "saudi-arabia", label: "Saudi Arabia (Tourist/Umrah)" },
];

export function VisaSearchTab() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("dubai-uae");
  const [visaType, setVisaType] = useState("Tourist (30 Days)");
  const [speed, setSpeed] = useState("Standard (3-5 Days)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/visa/${selectedCountry}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end">
      {/* Destination Country */}
      <div className="md:col-span-4">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Destination Country
        </label>
        <div className="relative flex items-center">
          <Globe className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            {VISA_COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visa Category */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Visa Type
        </label>
        <div className="relative flex items-center">
          <FileText className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            <option value="Tourist (30 Days)">Tourist (30 Days)</option>
            <option value="Tourist (60 Days)">Tourist (60 Days)</option>
            <option value="Business Visa">Business Visa</option>
            <option value="Transit Visa">Transit Visa</option>
          </select>
        </div>
      </div>

      {/* Processing Time */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Processing Speed
        </label>
        <div className="relative flex items-center">
          <Clock className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            <option value="Standard (3-5 Days)">Standard (3-5 Days)</option>
            <option value="Express (24-48 Hours)">Express (24-48 Hours)</option>
            <option value="Urgent / Same Day">Urgent / Same Day</option>
          </select>
        </div>
      </div>

      {/* Check Visa Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <span>Check Visa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
