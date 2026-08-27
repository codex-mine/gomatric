"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRight } from "lucide-react";

export function AirTicketsSearchTab() {
  const router = useRouter();
  const [from, setFrom] = useState("DAC - Dhaka, Bangladesh");
  const [to, setTo] = useState("DXB - Dubai, UAE");
  const [departDate, setDepartDate] = useState("");
  const [passengerClass, setPassengerClass] = useState("1 Passenger, Economy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/contact");
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-end">
      {/* From City / Airport */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          From
        </label>
        <div className="relative flex items-center">
          <PlaneTakeoff className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Origin Airport"
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* To City / Airport */}
      <div className="md:col-span-3">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          To
        </label>
        <div className="relative flex items-center">
          <PlaneLanding className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Destination Airport"
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Departure Date */}
      <div className="md:col-span-2">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Depart
        </label>
        <div className="relative flex items-center">
          <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
            className="w-full h-12 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          />
        </div>
      </div>

      {/* Passengers & Class */}
      <div className="md:col-span-2">
        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
          Passengers
        </label>
        <div className="relative flex items-center">
          <Users className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={passengerClass}
            onChange={(e) => setPassengerClass(e.target.value)}
            className="w-full h-12 pl-10 pr-6 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-800 appearance-none outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:border-slate-300 transition-colors"
          >
            <option value="1 Passenger, Economy">1 Adult, Economy</option>
            <option value="2 Passengers, Economy">2 Adults, Economy</option>
            <option value="1 Passenger, Business">1 Adult, Business</option>
            <option value="2 Passengers, Business">2 Adults, Business</option>
            <option value="Family / Group">Family Group</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full h-12 px-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm rounded-md flex items-center justify-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <span>Find Flights</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
