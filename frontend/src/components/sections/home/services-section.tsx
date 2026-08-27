"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { ArrowRight, Stamp, Map, Plane, Hotel, Shield, Car } from "lucide-react";

const SERVICES = [
  {
    title: "Visa Services",
    description: "Expert guidance for tourist, business, and student visas with high success rates worldwide.",
    icon: Stamp,
    href: "/visa",
    tag: "99.2% Success Rate",
  },
  {
    title: "Tour Packages",
    description: "Curated international and domestic holiday packages tailored to your exact travel preferences.",
    icon: Map,
    href: "/tours",
    tag: "Bespoke Routes",
  },
  {
    title: "Air Ticketing",
    description: "Best routes, competitive fares, and priority seating on premier international airlines.",
    icon: Plane,
    href: "/services",
    tag: "Global Flights",
  },
  {
    title: "Hotel Booking",
    description: "Handpicked stays at luxury resorts and boutique hotels across 50+ destinations.",
    icon: Hotel,
    href: "/services",
    tag: "Premium Stays",
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive medical emergency, flight delay, and baggage loss protection.",
    icon: Shield,
    href: "/services",
    tag: "Complete Peace of Mind",
  },
  {
    title: "Airport Transfer",
    description: "Punctual VIP airport pickup, drop-off, and chauffeured transport at your destination.",
    icon: Car,
    href: "/services",
    tag: "VIP Chauffeur",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gsap-services-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Cards Stagger Animation
      gsap.from(".gsap-service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 24,
        stagger: 0.06,
        duration: 0.65,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-18 bg-[#F8FAFC]/70 relative overflow-hidden border-t border-slate-100"
    >
      {/* Background Travel Coordinate Vectors */}
      <div className="absolute top-10 right-0 w-96 h-96 pointer-events-none opacity-[0.03] select-none">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full stroke-[#061474]">
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
          <ellipse cx="200" cy="200" rx="180" ry="70" strokeWidth="1" strokeDasharray="6 4" />
          <ellipse cx="200" cy="200" rx="70" ry="180" strokeWidth="1" strokeDasharray="6 4" />
          <path d="M 50,300 Q 200,100 350,250" stroke="#ED1B26" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      <Container className="max-w-7xl relative z-10">
        {/* Section Header (No Eyebrow Badge & No Text Tracking) */}
        <div className="gsap-services-header text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-[#061474] leading-tight mb-3">
            Choose Your Path
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            From visa processing to luxury tours, explore our end-to-end travel services crafted for seamless journeys.
          </p>
        </div>

        {/* 6-Card Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="gsap-service-card group relative bg-white border border-slate-200/80 rounded-md p-7 md:p-8 hover:shadow-sm hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs opacity-100"
              >
                {/* Top Crimson Highlight Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#ED1B26] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Background Silhouette Watermark with hover scale */}
                <div className="absolute -bottom-5 -right-5 w-24 h-24 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 select-none text-[#061474]">
                  <Icon className="w-full h-full" />
                </div>

                {/* Editorial Number */}
                <span className="absolute top-5 right-6 text-4xl sm:text-5xl font-sora font-extrabold text-slate-100 group-hover:text-slate-200/70 transition-colors pointer-events-none select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-md bg-[#061474]/5 group-hover:bg-[#061474] text-[#061474] group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-sora font-bold text-[#061474] group-hover:text-[#ED1B26] transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                    {service.tag}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED1B26] group-hover:text-[#C4141E] transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
