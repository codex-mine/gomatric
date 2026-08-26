"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { TourSearchTab } from "./tour-search-tab";
import { VisaSearchTab } from "./visa-search-tab";
import { AirTicketsSearchTab } from "./air-tickets-search-tab";
import { ServicesSearchTab } from "./services-search-tab";

type TabType = "tours" | "visa" | "flights" | "services";

const TABS: { id: TabType; label: string }[] = [
  { id: "tours", label: "Tours" },
  { id: "visa", label: "Visa" },
  { id: "flights", label: "Air Tickets" },
  { id: "services", label: "Travel Services" },
];

export function HeroSearchBox({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<TabType>("tours");
  const panelRef = useRef<HTMLDivElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);

  // GSAP animation when switching tabs (form content + background shapes)
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
    }
    if (vectorRef.current) {
      gsap.fromTo(
        vectorRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div
      className={cn(
        "relative bg-white rounded-[20px] shadow-2xl p-5 md:p-6 border border-slate-100 max-w-5xl mx-auto w-full text-left overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* =================================================================== */}
      {/* DYNAMIC TAB-SPECIFIC BACKGROUND TRAVEL VECTORS                      */}
      {/* =================================================================== */}
      <div ref={vectorRef} className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        
        {/* 1. TOURS: Mountain Peaks, Hiking Trail & Compass Rose */}
        {activeTab === "tours" && (
          <>
            {/* Mountain & Trail vector */}
            <div className="absolute top-0 right-0 w-[580px] h-full">
              <svg viewBox="0 0 580 180" fill="none" className="w-full h-full">
                {/* Mountain Ridge line */}
                <path
                  d="M 120,160 L 260,50 L 380,140 L 460,70 L 560,160"
                  stroke="#061474"
                  strokeWidth="1.5"
                  className="opacity-[0.06]"
                />
                <path d="M 230,75 L 260,50 L 290,75" stroke="#061474" strokeWidth="1" className="opacity-[0.08]" />
                <path d="M 440,88 L 460,70 L 480,88" stroke="#061474" strokeWidth="1" className="opacity-[0.08]" />

                {/* Exploration Red Trail */}
                <path
                  d="M 50,140 C 200,20 380,10 540,110"
                  stroke="#ED1B26"
                  strokeWidth="1.75"
                  strokeDasharray="6 6"
                  className="opacity-25"
                />
                <circle cx="280" cy="28" r="3.5" fill="#ED1B26" className="opacity-40" />
                <circle cx="280" cy="28" r="7" stroke="#ED1B26" strokeWidth="1" strokeDasharray="2 2" className="opacity-30" />
              </svg>
            </div>

            {/* Compass Rose (Bottom Right) */}
            <div className="absolute -bottom-14 -right-14 w-56 h-56 opacity-15">
              <svg viewBox="0 0 240 240" fill="none" className="w-full h-full stroke-[#061474]">
                <circle cx="120" cy="120" r="110" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="120" cy="120" r="80" strokeWidth="1" />
                <polygon points="120,16 128,112 224,120 128,128 120,224 112,128 16,120 112,112" strokeWidth="1.25" />
                <line x1="120" y1="10" x2="120" y2="230" strokeWidth="0.75" />
                <line x1="10" y1="120" x2="230" y2="120" strokeWidth="0.75" />
              </svg>
            </div>
          </>
        )}

        {/* 2. VISA: Passport Stamp, Approval Seal & Entry Watermark */}
        {activeTab === "visa" && (
          <>
            {/* Passport Entry Stamp (Top Right) */}
            <div className="absolute top-2 right-12 w-64 h-32 rotate-6 opacity-20">
              <svg viewBox="0 0 300 120" fill="none" className="w-full h-full stroke-[#ED1B26]">
                <rect x="10" y="10" width="280" height="100" rx="12" strokeWidth="1.75" strokeDasharray="6 3" />
                <rect x="20" y="20" width="260" height="80" rx="8" strokeWidth="1" />
                <line x1="30" y1="50" x2="270" y2="50" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="30" y1="75" x2="270" y2="75" strokeWidth="1" />
              </svg>
            </div>

            {/* Official Visa Approval Circular Seal (Bottom Right) */}
            <div className="absolute -bottom-10 -right-10 w-52 h-52 -rotate-12 opacity-15">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#061474]">
                <circle cx="100" cy="100" r="90" strokeWidth="1.75" strokeDasharray="5 3" />
                <circle cx="100" cy="100" r="72" strokeWidth="1.25" />
                <circle cx="100" cy="100" r="50" strokeWidth="0.75" strokeDasharray="3 3" />
                {/* 5-Star Row */}
                <polygon points="100,60 103,68 111,68 105,73 107,81 100,76 93,81 95,73 89,68 97,68" fill="#061474" />
              </svg>
            </div>

            {/* Trajectory flight curve */}
            <div className="absolute top-0 left-1/3 w-80 h-full opacity-20">
              <svg viewBox="0 0 300 180" fill="none" className="w-full h-full">
                <path d="M 10,120 Q 150,-10 290,90" stroke="#ED1B26" strokeWidth="1.5" strokeDasharray="5 5" />
              </svg>
            </div>
          </>
        )}

        {/* 3. AIR TICKETS: Airplane Silhouette, Jetstream Contrails & Runway Vectors */}
        {activeTab === "flights" && (
          <>
            {/* Ascending Airplane & Jetstream Route */}
            <div className="absolute inset-0 w-full h-full">
              <svg viewBox="0 0 1000 180" fill="none" preserveAspectRatio="none" className="w-full h-full">
                {/* Curved Contrail */}
                <path
                  d="M 320,130 C 520,-20 780,10 960,80"
                  stroke="#ED1B26"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="opacity-30"
                />
                {/* Secondary High-Altitude Track */}
                <path
                  d="M 440,160 C 620,30 840,40 1010,120"
                  stroke="#061474"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-15"
                />

                {/* Airplane Silhouette positioned on the jetstream */}
                <g transform="translate(670, 16) rotate(14) scale(1.15)">
                  <path
                    d="M12 2L15 9L22 10L17 14L18.5 21L12 17.5L5.5 21L7 14L2 10L9 9L12 2Z"
                    fill="#ED1B26"
                    className="opacity-40"
                  />
                </g>

                {/* Waypoint Nodes */}
                <circle cx="480" cy="52" r="3.5" fill="#061474" className="opacity-30" />
                <circle cx="860" cy="45" r="3.5" fill="#ED1B26" className="opacity-40" />
              </svg>
            </div>

            {/* Runway / Radar Coordinates Circle (Bottom Right) */}
            <div className="absolute -bottom-12 -right-12 w-52 h-52 opacity-15">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#061474]">
                <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="60" strokeWidth="1" />
                <circle cx="100" cy="100" r="30" strokeWidth="0.75" strokeDasharray="2 2" />
                <line x1="100" y1="10" x2="100" y2="190" strokeWidth="1" />
                <line x1="10" y1="100" x2="190" y2="100" strokeWidth="1" />
              </svg>
            </div>
          </>
        )}

        {/* 4. TRAVEL SERVICES: Concierge Luggage, Hotel Key & Service Shield */}
        {activeTab === "services" && (
          <>
            {/* Travel Network & Suitcase Tag (Top Right) */}
            <div className="absolute top-2 right-16 w-60 h-28 opacity-20">
              <svg viewBox="0 0 260 100" fill="none" className="w-full h-full stroke-[#061474]">
                {/* Luggage Tag Outline */}
                <rect x="20" y="20" width="160" height="60" rx="8" strokeWidth="1.5" strokeDasharray="6 3" />
                <circle cx="50" cy="50" r="8" strokeWidth="1.25" />
                <line x1="75" y1="40" x2="160" y2="40" strokeWidth="1" />
                <line x1="75" y1="60" x2="140" y2="60" strokeWidth="1" />
              </svg>
            </div>

            {/* Comprehensive Service Shield & Star Emblem (Bottom Right) */}
            <div className="absolute -bottom-10 -right-10 w-52 h-52 opacity-15">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#061474]">
                <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="4 4" />
                {/* Shield Path */}
                <path
                  d="M 100,45 L 145,65 C 145,115 100,150 100,150 C 100,150 55,115 55,65 Z"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="92" r="14" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Curved Service Network Line */}
            <div className="absolute inset-0 w-full h-full">
              <svg viewBox="0 0 1000 180" fill="none" preserveAspectRatio="none" className="w-full h-full">
                <path
                  d="M 380,120 C 580,-10 820,10 980,120"
                  stroke="#ED1B26"
                  strokeWidth="1.75"
                  strokeDasharray="5 5"
                  className="opacity-25"
                />
                <circle cx="680" cy="22" r="3.5" fill="#ED1B26" className="opacity-40" />
              </svg>
            </div>
          </>
        )}

      </div>

      {/* =================================================================== */}
      {/* SEARCH BOX CONTENT                                                  */}
      {/* =================================================================== */}

      {/* Top Tab Headers */}
      <div className="relative z-10 flex flex-wrap items-center gap-6 sm:gap-7 border-b border-slate-100 pb-3 mb-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative font-sora font-semibold text-sm sm:text-base md:text-lg transition-colors py-0.5 focus:outline-none whitespace-nowrap",
                isActive
                  ? "text-[#ED1B26]"
                  : "text-slate-600 hover:text-[#061474]"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-3 left-0 right-0 h-[3px] bg-[#ED1B26] rounded-full animate-fadeIn" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div ref={panelRef} className="relative z-10">
        {activeTab === "tours" && <TourSearchTab />}
        {activeTab === "visa" && <VisaSearchTab />}
        {activeTab === "flights" && <AirTicketsSearchTab />}
        {activeTab === "services" && <ServicesSearchTab />}
      </div>
    </div>
  );
}
