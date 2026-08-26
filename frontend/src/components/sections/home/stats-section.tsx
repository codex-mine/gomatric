"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";

const STATS = [
  {
    value: "10K+",
    label: "Travelers Served",
  },
  {
    value: "50+",
    label: "Global Destinations",
  },
  {
    value: "98%",
    label: "Client Satisfaction",
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
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-white border-b border-slate-100 pt-36 md:pt-48 pb-12 md:pb-16"
    >
      <Container className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 text-left">
          {/* Stat 1 */}
          <div className="gsap-stat-item md:pr-12 flex flex-col justify-center">
            <div className="font-sora font-bold text-3xl sm:text-4xl md:text-[42px] text-[#061474] leading-none mb-2">
              {STATS[0].value}
            </div>
            <p className="text-slate-600 text-sm md:text-[15px] font-medium">
              {STATS[0].label}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="gsap-stat-item md:border-l md:border-slate-200/80 md:px-12 flex flex-col justify-center">
            <div className="font-sora font-bold text-3xl sm:text-4xl md:text-[42px] text-[#061474] leading-none mb-2">
              {STATS[1].value}
            </div>
            <p className="text-slate-600 text-sm md:text-[15px] font-medium">
              {STATS[1].label}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="gsap-stat-item md:border-l md:border-slate-200/80 md:pl-12 flex flex-col justify-center">
            <div className="font-sora font-bold text-3xl sm:text-4xl md:text-[42px] text-[#061474] leading-none mb-2">
              {STATS[2].value}
            </div>
            <p className="text-slate-600 text-sm md:text-[15px] font-medium">
              {STATS[2].label}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
