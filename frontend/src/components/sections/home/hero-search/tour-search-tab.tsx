"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

export function TourSearchTab() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2 Guests");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (destination) query.set("destination", destination);
    if (date) query.set("date", date);
    router.push(`/tours?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end">
      {/* Destination Field */}
      <div className="md:col-span-4">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Destination
        </label>
        <div className="relative flex items-center">
          <MapPin className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Date Field */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Date
        </label>
        <div className="relative flex items-center">
          <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Travelers Field */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Travelers
        </label>
        <div className="relative flex items-center">
          <Users className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full h-12 pl-10 pr-8 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            <option value="1 Guest">1 Guest</option>
            <option value="2 Guests">2 Guests</option>
            <option value="3 Guests">3 Guests</option>
            <option value="4+ Guests">4+ Guests</option>
            <option value="Family / Group">Family / Group</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <span>Search Tours</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
