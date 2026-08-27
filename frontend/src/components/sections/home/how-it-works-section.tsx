"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Compass, FileCheck2, ShieldCheck, Plane } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Choose Your Service & Destination",
    description:
      "Explore our curated luxury tour collections or select fast-track visa processing across 50+ worldwide destinations.",
    tag: "Stage 01 • Consultation",
    icon: Compass,
  },
  {
    number: "02",
    title: "Submit Requirements Securely",
    description:
      "Provide simple trip details and upload your documents through our 256-bit encrypted digital verification portal.",
    tag: "Stage 02 • Verification",
    icon: FileCheck2,
  },
  {
    number: "03",
    title: "Expert Concierge Processing",
    description:
      "Our certified specialists handle all embassy submissions, appointment bookings, flight reservations, and 5-star logistics.",
    tag: "Stage 03 • Processing",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Embark With Complete Confidence",
    description:
      "Receive your approved visa, verified flight tickets, and bespoke luxury itinerary ready for unforgettable departure.",
    tag: "Stage 04 • Departure",
    icon: Plane,
    isDestination: true,
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gsap-how-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
      });

      // Stagger Steps entrance
      gsap.from(".gsap-how-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
      });

      // Animated Waypoints
      gsap.from(".gsap-how-node", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20 bg-[#02072B] text-white border-t border-white/10 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#061474]/30 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#ED1B26]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Hairline Trajectory Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ED1B26] to-transparent opacity-80 z-10" />

      <Container className="max-w-7xl relative z-10">
        {/* Section Header (No Eyebrow Badge & No Text Tracking) */}
        <div className="gsap-how-header text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            How It Works
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            A transparent, effortless pathway from your initial dream to your final departure.
          </p>
        </div>

        {/* Serpentine S-Curve Timeline With Cards */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Serpentine S-Curve Vector (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none select-none z-0">
            <svg
              viewBox="0 0 1000 1100"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Secondary Dashed White Line */}
              <path
                d="M 500,50 C 540,160 410,240 430,340 C 460,450 620,530 590,670 C 560,800 480,920 500,1060"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="opacity-30"
              />

              {/* Primary Solid Red Trajectory Curve */}
              <path
                ref={pathRef}
                d="M 500,50 C 540,150 440,240 430,330 C 410,430 450,540 590,620 C 670,700 620,830 590,920 C 570,980 620,1040 620,1060"
                stroke="#ED1B26"
                strokeWidth="3"
                strokeLinecap="round"
                className="drop-shadow-[0_0_12px_rgba(237,27,38,0.6)]"
              />
            </svg>
          </div>

          {/* Steps Flow (Alternating Grid on Desktop) */}
          <div className="space-y-10 lg:space-y-16 relative z-10">
            
            {/* ----------------- STEP 01 ----------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Spacer on Desktop */}
              <div className="hidden lg:block lg:col-span-5" />

              {/* Center Waypoint Node 01 */}
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="gsap-how-node relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#02072B] border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="font-sora font-bold text-xs text-white">01</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ED1B26]" />
                </div>
              </div>

              {/* Right Card 01 */}
              <div className="lg:col-span-5">
                <div className="gsap-how-card relative overflow-hidden bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-[#ED1B26]/60 rounded-md p-7 md:p-8 transition-all duration-500 shadow-sm group">
                  {/* Background Animated Travel Vector Shape */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
                      <circle cx="50" cy="50" r="45" strokeWidth="1.5" strokeDasharray="4 2" />
                      <circle cx="50" cy="50" r="30" strokeWidth="1" />
                      <polygon points="50,15 54,46 85,50 54,54 50,85 46,54 15,50 46,46" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-md bg-[#ED1B26]/15 border border-[#ED1B26]/30 flex items-center justify-center text-[#ED1B26] group-hover:scale-110 transition-transform">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#ED1B26] px-3 py-1 rounded-full bg-[#ED1B26]/10 border border-[#ED1B26]/20">
                      {STEPS[0].tag}
                    </span>
                  </div>

                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#ED1B26] transition-colors relative z-10">
                    {STEPS[0].title}
                  </h3>

                  <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed relative z-10">
                    {STEPS[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------- STEP 02 ----------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Card 02 */}
              <div className="lg:col-span-5">
                <div className="gsap-how-card relative overflow-hidden bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-[#ED1B26]/60 rounded-md p-7 md:p-8 transition-all duration-500 shadow-sm group">
                  {/* Background Animated Travel Vector Shape */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
                      <rect x="15" y="15" width="70" height="70" rx="8" strokeWidth="1.5" strokeDasharray="4 2" />
                      <line x1="25" y1="35" x2="75" y2="35" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="25" y1="50" x2="75" y2="50" strokeWidth="1" />
                      <line x1="25" y1="65" x2="55" y2="65" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-md bg-[#ED1B26]/15 border border-[#ED1B26]/30 flex items-center justify-center text-[#ED1B26] group-hover:scale-110 transition-transform">
                      <FileCheck2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#ED1B26] px-3 py-1 rounded-full bg-[#ED1B26]/10 border border-[#ED1B26]/20">
                      {STEPS[1].tag}
                    </span>
                  </div>

                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#ED1B26] transition-colors relative z-10">
                    {STEPS[1].title}
                  </h3>

                  <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed relative z-10">
                    {STEPS[1].description}
                  </p>
                </div>
              </div>

              {/* Center Waypoint Node 02 */}
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="gsap-how-node relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#02072B] border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="font-sora font-bold text-xs text-white">02</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ED1B26]" />
                </div>
              </div>

              {/* Right Spacer */}
              <div className="hidden lg:block lg:col-span-5" />
            </div>

            {/* ----------------- STEP 03 ----------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Spacer */}
              <div className="hidden lg:block lg:col-span-5" />

              {/* Center Waypoint Node 03 */}
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="gsap-how-node relative flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#02072B] border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="font-sora font-bold text-xs text-white">03</span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ED1B26]" />
                </div>
              </div>

              {/* Right Card 03 */}
              <div className="lg:col-span-5">
                <div className="gsap-how-card relative overflow-hidden bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-white/15 hover:border-[#ED1B26]/60 rounded-md p-7 md:p-8 transition-all duration-500 shadow-sm group">
                  {/* Background Animated Travel Vector Shape */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 text-white">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
                      <circle cx="50" cy="50" r="45" strokeWidth="1.5" />
                      <ellipse cx="50" cy="50" rx="45" ry="20" strokeWidth="1" strokeDasharray="3 3" />
                      <ellipse cx="50" cy="50" rx="20" ry="45" strokeWidth="1" strokeDasharray="3 3" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-md bg-[#ED1B26]/15 border border-[#ED1B26]/30 flex items-center justify-center text-[#ED1B26] group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#ED1B26] px-3 py-1 rounded-full bg-[#ED1B26]/10 border border-[#ED1B26]/20">
                      {STEPS[2].tag}
                    </span>
                  </div>

                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#ED1B26] transition-colors relative z-10">
                    {STEPS[2].title}
                  </h3>

                  <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed relative z-10">
                    {STEPS[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* ----------------- STEP 04 (DESTINATION) ----------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Card 04 */}
              <div className="lg:col-span-5">
                <div className="gsap-how-card relative overflow-hidden bg-white/[0.05] hover:bg-white/[0.09] backdrop-blur-md border border-[#ED1B26]/40 hover:border-[#ED1B26] rounded-md p-7 md:p-8 transition-all duration-500 shadow-sm group">
                  {/* Background Animated Travel Vector Shape */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 text-[#ED1B26]">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
                      <path d="M 10,80 C 40,20 70,30 90,60" strokeWidth="2" strokeDasharray="4 4" />
                      <g transform="translate(60, 35) rotate(15) scale(0.9)">
                        <path d="M12 2L15 9L22 10L17 14L18.5 21L12 17.5L5.5 21L7 14L2 10L9 9L12 2Z" fill="currentColor" />
                      </g>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-md bg-[#ED1B26] flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                      <Plane className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#ED1B26] px-3 py-1 rounded-full bg-[#ED1B26]/15 border border-[#ED1B26]/30">
                      {STEPS[3].tag}
                    </span>
                  </div>

                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#ED1B26] transition-colors relative z-10">
                    {STEPS[3].title}
                  </h3>

                  <p className="text-white/75 text-sm sm:text-[15px] leading-relaxed relative z-10">
                    {STEPS[3].description}
                  </p>
                </div>
              </div>

              {/* Center Waypoint Node 04 (Glowing Red Destination Target) */}
              <div className="hidden lg:flex lg:col-span-2 justify-center">
                <div className="gsap-how-node relative flex flex-col items-center justify-center">
                  <span className="font-mono text-[10px] text-[#ED1B26] font-bold mb-1.5">
                    DESTINATION
                  </span>
                  <div className="w-11 h-11 rounded-full bg-[#ED1B26] border-4 border-white flex items-center justify-center shadow-sm">
                    <span className="font-sora font-extrabold text-xs text-white">04</span>
                  </div>
                </div>
              </div>

              {/* Right Spacer */}
              <div className="hidden lg:block lg:col-span-5" />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
