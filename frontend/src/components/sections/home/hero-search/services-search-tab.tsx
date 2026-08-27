"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, Calendar, MapPin, ArrowRight } from "lucide-react";

export function ServicesSearchTab() {
  const router = useRouter();
  const [serviceType, setServiceType] = useState("Air Ticketing");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/contact");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end">
      {/* Service Type */}
      <div className="md:col-span-4">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Service Type
        </label>
        <div className="relative flex items-center">
          <Plane className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            <option value="Air Ticketing">Air Ticketing (Flights)</option>
            <option value="Hotel Booking">Hotel & Resort Booking</option>
            <option value="Travel Insurance">Comprehensive Travel Insurance</option>
            <option value="Airport Transfer">VIP Airport Transfer</option>
            <option value="Custom Tour Concierge">Custom Tour Concierge</option>
          </select>
        </div>
      </div>

      {/* Destination / Route */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Departure / Destination
        </label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City or Airport"
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Travel Date */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Travel Date
        </label>
        <div className="relative flex items-center">
          <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <span>Get Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
