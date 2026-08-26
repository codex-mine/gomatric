"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroSearchBox } from "./hero-search";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered hero text entrance
      gsap.from(".gsap-hero-title", {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".gsap-hero-sub", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from(".gsap-hero-buttons", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.from(".gsap-hero-search-card", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.55,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between pt-36 md:pt-44 pb-0"
    >
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2200&auto=format&fit=crop"
          alt="Luxury Destination Skyline"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Rich cinematic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-[#040E56]/90" />
      </div>

      {/* 2. Main Overhead Hero Content */}
      <Container className="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto my-auto">
        <h1 className="gsap-hero-title font-sora text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white leading-[1.08] tracking-tight mb-5">
          Go Further With <br />
          GoMatric.
        </h1>

        <p className="gsap-hero-sub text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Visa assistance, unforgettable tours, and expert travel services — all in one place.
        </p>

        {/* Action Buttons */}
        <div className="gsap-hero-buttons flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 h-13 px-8 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-base shadow-lg shadow-[#ED1B26]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>Explore Tours</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/visa"
            className="inline-flex items-center justify-center h-13 px-8 rounded-xl bg-[#061474]/60 backdrop-blur-md border border-white/40 hover:bg-white hover:text-[#061474] text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Apply for Visa
          </Link>
        </div>

        {/* Watermark Tagline */}
        <div className="text-white/50 uppercase font-sora font-semibold text-xs md:text-sm select-none mb-6">
          YOUR GATEWAY TO EXCEPTIONAL JOURNEYS
        </div>
      </Container>

      {/* 3. Overlapping Search Box Component (50% in Hero, 50% in Stats Section below) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mb-20 md:-mb-24">
        <div className="gsap-hero-search-card">
          <HeroSearchBox />
        </div>
      </div>
    </section>
  );
}
