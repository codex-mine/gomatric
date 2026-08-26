"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Globe2, Award } from "lucide-react";
import { Container } from "@/components/ui/container";

const STATS = [
  {
    value: "10K+",
    label: "Travelers Served",
    subtext: "Across 50+ countries worldwide",
    icon: Users,
  },
  {
    value: "50+",
    label: "Global Destinations",
    subtext: "Curated bespoke holiday routes",
    icon: Globe2,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    subtext: "Verified 5-star traveler reviews",
    icon: Award,
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".gsap-stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 24,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white border-b border-slate-100 pt-36 sm:pt-40 md:pt-44 pb-16 md:pb-20 overflow-hidden"
    >
      {/* Background Subtle Travel Coordinate Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.025]">
        <svg viewBox="0 0 1200 200" fill="none" className="w-full h-full stroke-[#061474]">
          <line x1="0" y1="100" x2="1200" y2="100" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="200" cy="100" r="60" strokeWidth="1" />
          <circle cx="600" cy="100" r="80" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="1000" cy="100" r="60" strokeWidth="1" />
        </svg>
      </div>

      <Container className="max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 text-center items-center">
          
          {/* Stat 1 */}
          <div className="gsap-stat-item md:px-8 flex flex-col items-center text-center justify-center group">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="font-sora font-bold text-4xl sm:text-5xl md:text-[48px] text-[#061474] leading-none tracking-tight">
                {STATS[0].value}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B26] shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-sm" />
            </div>
            <h3 className="text-slate-800 text-base md:text-lg font-semibold font-sora">
              {STATS[0].label}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xs">
              {STATS[0].subtext}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="gsap-stat-item md:border-l md:border-slate-200/80 md:px-8 flex flex-col items-center text-center justify-center group">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="font-sora font-bold text-4xl sm:text-5xl md:text-[48px] text-[#061474] leading-none tracking-tight">
                {STATS[1].value}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B26] shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-sm" />
            </div>
            <h3 className="text-slate-800 text-base md:text-lg font-semibold font-sora">
              {STATS[1].label}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xs">
              {STATS[1].subtext}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="gsap-stat-item md:border-l md:border-slate-200/80 md:px-8 flex flex-col items-center text-center justify-center group">
            <div className="flex items-center justify-center gap-2.5 mb-2">
              <span className="font-sora font-bold text-4xl sm:text-5xl md:text-[48px] text-[#061474] leading-none tracking-tight">
                {STATS[2].value}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B26] shrink-0 group-hover:scale-150 transition-transform duration-300 shadow-sm" />
            </div>
            <h3 className="text-slate-800 text-base md:text-lg font-semibold font-sora">
              {STATS[2].label}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xs">
              {STATS[2].subtext}
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}
