"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

interface DestinationItem {
  name: string;
  subtitle: string;
  slug: string;
  price: string;
  highlight: string;
  primaryImage: string;
  hoverImage: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    name: "Dubai",
    subtitle: "12 Tours • Visa Available",
    slug: "dubai",
    price: "From $499",
    highlight: "Luxury Skyline & Desert Safaris",
    primaryImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Bali",
    subtitle: "8 Tours • Visa on Arrival",
    slug: "bali",
    price: "From $350",
    highlight: "Emerald Terraces & Island Temples",
    primaryImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Singapore",
    subtitle: "6 Tours • Visa in 48h",
    slug: "singapore",
    price: "From $550",
    highlight: "Marina Bay & Supertree Grove",
    primaryImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1506351421178-63b52a2d15c2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Switzerland",
    subtitle: "5 Tours • Schengen Support",
    slug: "switzerland",
    price: "From $890",
    highlight: "Swiss Alpine Valley & Chalets",
    primaryImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=1000&auto=format&fit=crop",
  },
];

export function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gsap-dest-header", {
        scrollTrigger: {
          trigger: ".gsap-dest-header",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // Cards Entrance - Animate Y position only to keep 100% card opacity
      gsap.from(".gsap-dest-card", {
        scrollTrigger: {
          trigger: ".gsap-dest-grid",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="gsap-dest-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-[#061474] leading-tight mb-3">
              Discover the World with Us
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              From pristine beaches to towering skylines, explore our most sought-after destinations curated just for you.
            </p>
          </div>

          <div>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-[#ED1B26] hover:text-[#C4141E] font-semibold text-base transition-colors group whitespace-nowrap"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="gsap-dest-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ======================================================== */}
          {/* Left Column: Large Dubai Card (Span 6)                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6">
            <Link
              href={`/destinations/${DESTINATIONS[0].slug}`}
              className="gsap-dest-card group relative block w-full h-[440px] sm:h-[500px] lg:h-full min-h-[480px] lg:min-h-[580px] rounded-[24px] overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Secondary Hover Image (Layered Underneath) */}
              <Image
                src={DESTINATIONS[0].hoverImage}
                alt={`${DESTINATIONS[0].name} Marina`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />

              {/* Primary Image (On Top — Fades out on hover) */}
              <Image
                src={DESTINATIONS[0].primaryImage}
                alt={DESTINATIONS[0].name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-100 group-hover:scale-105 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out"
              />

              {/* Rich Contrast Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 z-10" />

              {/* Top Tag on Hover */}
              <div className="absolute top-6 left-6 z-20 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#ED1B26]" />
                  {DESTINATIONS[0].highlight}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-end">
                <h3 className="font-sora text-3xl sm:text-4xl font-bold text-white leading-tight mb-1 drop-shadow">
                  {DESTINATIONS[0].name}
                </h3>
                <p className="text-white text-base font-semibold drop-shadow">
                  {DESTINATIONS[0].subtitle}
                </p>

                {/* Expanded Details on Hover */}
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                  <span className="font-sora font-bold text-white text-lg">
                    {DESTINATIONS[0].price}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ED1B26] hover:bg-[#C4141E] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md">
                    <span>Explore Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* ======================================================== */}
          {/* Right Column: 3 Cards (Span 6)                           */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* Top Right: Bali Card */}
            <Link
              href={`/destinations/${DESTINATIONS[1].slug}`}
              className="gsap-dest-card group relative block w-full h-[260px] sm:h-[278px] rounded-[24px] overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Secondary Hover Image (Layered Underneath) */}
              <Image
                src={DESTINATIONS[1].hoverImage}
                alt={`${DESTINATIONS[1].name} Temple`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />

              {/* Primary Image (On Top — Fades out on hover) */}
              <Image
                src={DESTINATIONS[1].primaryImage}
                alt={DESTINATIONS[1].name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-100 group-hover:scale-105 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <h3 className="font-sora text-2xl sm:text-3xl font-bold text-white leading-tight mb-1 drop-shadow">
                  {DESTINATIONS[1].name}
                </h3>
                <p className="text-white text-sm sm:text-base font-semibold drop-shadow">
                  {DESTINATIONS[1].subtitle}
                </p>

                {/* Details on Hover */}
                <div className="mt-2 flex items-center justify-between opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-500 overflow-hidden">
                  <span className="font-sora font-bold text-white text-base">
                    {DESTINATIONS[1].price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#ED1B26] bg-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Bottom Row: 2 Side-by-Side Cards (Singapore & Switzerland) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* Singapore Card */}
              <Link
                href={`/destinations/${DESTINATIONS[2].slug}`}
                className="gsap-dest-card group relative block w-full h-[250px] sm:h-[278px] rounded-[24px] overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Secondary Hover Image (Layered Underneath) */}
                <Image
                  src={DESTINATIONS[2].hoverImage}
                  alt={`${DESTINATIONS[2].name} Supertree`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />

                {/* Primary Image (On Top — Fades out on hover) */}
                <Image
                  src={DESTINATIONS[2].primaryImage}
                  alt={DESTINATIONS[2].name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white leading-tight mb-1 drop-shadow">
                    {DESTINATIONS[2].name}
                  </h3>
                  <p className="text-white text-xs sm:text-sm font-semibold drop-shadow">
                    {DESTINATIONS[2].subtitle}
                  </p>

                  {/* Details on Hover */}
                  <div className="mt-2 flex items-center justify-between opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-500 overflow-hidden">
                    <span className="font-sora font-bold text-white text-sm">
                      {DESTINATIONS[2].price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#ED1B26] bg-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Switzerland Card */}
              <Link
                href={`/destinations/${DESTINATIONS[3].slug}`}
                className="gsap-dest-card group relative block w-full h-[250px] sm:h-[278px] rounded-[24px] overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Secondary Hover Image (Layered Underneath) */}
                <Image
                  src={DESTINATIONS[3].hoverImage}
                  alt={`${DESTINATIONS[3].name} Lake`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />

                {/* Primary Image (On Top — Fades out on hover) */}
                <Image
                  src={DESTINATIONS[3].primaryImage}
                  alt={DESTINATIONS[3].name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-center scale-100 group-hover:scale-105 opacity-100 group-hover:opacity-0 transition-all duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-500 group-hover:from-black/95 z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-sora text-xl sm:text-2xl font-bold text-white leading-tight mb-1 drop-shadow">
                    {DESTINATIONS[3].name}
                  </h3>
                  <p className="text-white text-xs sm:text-sm font-semibold drop-shadow">
                    {DESTINATIONS[3].subtitle}
                  </p>

                  {/* Details on Hover */}
                  <div className="mt-2 flex items-center justify-between opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-16 transition-all duration-500 overflow-hidden">
                    <span className="font-sora font-bold text-white text-sm">
                      {DESTINATIONS[3].price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#ED1B26] bg-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
