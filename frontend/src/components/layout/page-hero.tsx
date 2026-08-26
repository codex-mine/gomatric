"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  size?: "default" | "compact" | "large";
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  className,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const vectorContainerRef = useRef<HTMLDivElement>(null);
  const compassRingRef = useRef<SVGGElement>(null);

  // Contextual vector type from title / subtitle
  const titleLower = (title + " " + (subtitle || "")).toLowerCase();
  const isVisa =
    titleLower.includes("visa") ||
    titleLower.includes("passport") ||
    titleLower.includes("embassy");
  const isContact =
    titleLower.includes("contact") ||
    titleLower.includes("talk") ||
    titleLower.includes("touch") ||
    titleLower.includes("support");
  const isFlightOrService =
    titleLower.includes("service") ||
    titleLower.includes("flight") ||
    titleLower.includes("ticket") ||
    titleLower.includes("booking") ||
    titleLower.includes("tracking");

  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered text entrance
      gsap.from(".gsap-ph-item", {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });

      // Scroll-driven Scale Up on Scroll Down / Scale Down on Scroll Up
      if (vectorContainerRef.current) {
        gsap.to(vectorContainerRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          scale: 1.35,
          y: 25,
          opacity: 0.65,
          ease: "none",
        });
      }

      // Subtle slow rotation on right compass vector
      if (compassRingRef.current) {
        gsap.to(compassRingRef.current, {
          rotation: 360,
          transformOrigin: "center center",
          duration: 90,
          repeat: -1,
          ease: "none",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden bg-[#040E56] text-white border-b border-white/10 pt-28 pb-8 md:pt-32 md:pb-10",
        className
      )}
    >
      {/* Background Gradient */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02072B]/95 via-[#040E56]/85 to-[#040E56]/90 z-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#02072B] via-[#040E56] to-[#0A1B8A] z-0" />
      )}

      {/* Top Hairline Red Trajectory Accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ED1B26] to-transparent opacity-80 z-10" />

      {/* Compact Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center justify-between">
          
          {/* ====================================================== */}
          {/* Left Column: Minimal Typography                        */}
          {/* ====================================================== */}
          <div className="md:col-span-8 flex flex-col items-start text-left">
            {subtitle && (
              <div className="gsap-ph-item inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-semibold uppercase tracking-wider mb-2">
                 <span>{subtitle}</span>
              </div>
            )}

            <h1 className="gsap-ph-item font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-1.5 max-w-2xl drop-shadow-sm">
              {title}
            </h1>

            {description && (
              <p className="gsap-ph-item text-xs sm:text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
                {description}
              </p>
            )}

            {children && (
              <div className="gsap-ph-item w-full flex justify-start mt-3">
                {children}
              </div>
            )}
          </div>

          {/* ====================================================== */}
          {/* Right Column: Scroll-Reactive Scaling Vector Art       */}
          {/* ====================================================== */}
          <div className="md:col-span-4 hidden md:flex items-center justify-end pointer-events-none select-none">
            <div
              ref={vectorContainerRef}
              className="relative w-[200px] h-[120px] lg:w-[240px] lg:h-[130px] flex items-center justify-end origin-center transition-transform"
            >
              {/* 1. VISA VECTOR */}
              {isVisa && (
                <svg viewBox="0 0 240 140" fill="none" className="w-full h-full">
                  <rect x="15" y="15" width="210" height="110" rx="10" stroke="white" strokeWidth="1.25" strokeDasharray="4 2" className="opacity-25" />
                  <line x1="30" y1="50" x2="210" y2="50" stroke="white" strokeWidth="1" strokeDasharray="3 3" className="opacity-20" />
                  <line x1="30" y1="80" x2="150" y2="80" stroke="white" strokeWidth="1" className="opacity-20" />
                  
                  {/* Seal */}
                  <g ref={compassRingRef}>
                    <circle cx="180" cy="80" r="32" stroke="#ED1B26" strokeWidth="1.25" strokeDasharray="4 2" className="opacity-50" />
                    <circle cx="180" cy="80" r="24" stroke="#ED1B26" strokeWidth="0.75" className="opacity-30" />
                  </g>
                  <polygon points="180,68 182,75 190,75 184,80 186,87 180,83 174,87 176,80 170,75 178,75" fill="#ED1B26" className="opacity-70" />
                </svg>
              )}

              {/* 2. CONTACT US VECTOR */}
              {!isVisa && isContact && (
                <svg viewBox="0 0 240 140" fill="none" className="w-full h-full">
                  {/* Message & Communication Network Waves */}
                  <g ref={compassRingRef}>
                    <circle cx="170" cy="70" r="50" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
                    <circle cx="170" cy="70" r="32" stroke="white" strokeWidth="0.75" className="opacity-15" />
                  </g>
                  <path d="M 20,110 C 80,30 160,35 220,90" stroke="#ED1B26" strokeWidth="1.75" strokeDasharray="5 5" className="opacity-55" />
                  {/* Location & Support Beacon */}
                  <circle cx="170" cy="70" r="6" fill="#ED1B26" className="opacity-80" />
                  <circle cx="170" cy="70" r="12" stroke="#ED1B26" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
                  <circle cx="70" cy="85" r="3.5" fill="white" className="opacity-30" />
                </svg>
              )}

              {/* 3. FLIGHTS / SERVICES VECTOR */}
              {!isVisa && !isContact && isFlightOrService && (
                <svg viewBox="0 0 240 140" fill="none" className="w-full h-full">
                  <path d="M 10,120 C 80,20 160,25 230,80" stroke="#ED1B26" strokeWidth="1.75" strokeDasharray="5 5" className="opacity-50" />
                  <g transform="translate(135, 34) rotate(16) scale(0.95)">
                    <path d="M12 2L15 9L22 10L17 14L18.5 21L12 17.5L5.5 21L7 14L2 10L9 9L12 2Z" fill="#ED1B26" className="opacity-80" />
                  </g>
                  <g ref={compassRingRef}>
                    <circle cx="190" cy="80" r="45" stroke="white" strokeWidth="0.75" strokeDasharray="4 4" className="opacity-20" />
                    <circle cx="190" cy="80" r="25" stroke="white" strokeWidth="0.75" className="opacity-15" />
                  </g>
                </svg>
              )}

              {/* 4. DEFAULT / TOURS / DESTINATIONS VECTOR */}
              {!isVisa && !isContact && !isFlightOrService && (
                <svg viewBox="0 0 240 140" fill="none" className="w-full h-full">
                  <g ref={compassRingRef}>
                    <circle cx="150" cy="70" r="55" stroke="white" strokeWidth="1" className="opacity-20" />
                    <circle cx="150" cy="70" r="38" stroke="white" strokeWidth="0.75" strokeDasharray="3 3" className="opacity-15" />
                    <ellipse cx="150" cy="70" rx="55" ry="24" stroke="white" strokeWidth="0.75" className="opacity-15" />
                    <ellipse cx="150" cy="70" rx="24" ry="55" stroke="white" strokeWidth="0.75" className="opacity-15" />
                  </g>
                  <path d="M 15,105 C 80,15 170,20 230,85" stroke="#ED1B26" strokeWidth="1.75" strokeDasharray="5 5" className="opacity-55" />
                  <circle cx="140" cy="27" r="3.5" fill="#ED1B26" className="opacity-80" />
                  <circle cx="140" cy="27" r="7" stroke="#ED1B26" strokeWidth="1" strokeDasharray="2 2" className="opacity-40" />
                </svg>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
