"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface TourPackage {
  title: string;
  duration: string;
  description: string;
  price: string;
  slug: string;
  image: string;
}

const TOUR_PACKAGES: TourPackage[] = [
  {
    title: "Dubai Explorer",
    duration: "5 DAYS / 4 NIGHTS",
    description: "Experience the perfect blend of modern luxury and rich culture in the heart of the UAE.",
    price: "৳ 65,000",
    slug: "dubai-explorer",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Bali Escape",
    duration: "7 DAYS / 6 NIGHTS",
    description: "Relax on serene beaches, explore ancient temples, and discover the spiritual heart of Indonesia.",
    price: "৳ 85,000",
    slug: "bali-escape",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Thailand Adventure",
    duration: "6 DAYS / 5 NIGHTS",
    description: "From the bustling streets of Bangkok to the tranquil islands of Phuket.",
    price: "৳ 55,000",
    slug: "thailand-adventure",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1000&auto=format&fit=crop",
  },
];

export function ToursSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".gsap-tours-header", {
        scrollTrigger: {
          trigger: ".gsap-tours-header",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // Cards Stagger Animation
      gsap.from(".gsap-tour-card", {
        scrollTrigger: {
          trigger: ".gsap-tours-grid",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 35,
        stagger: 0.12,
        duration: 0.75,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#F8FAFC]/60 border-t border-slate-100 relative overflow-hidden">
      <Container className="max-w-7xl">
        {/* Section Header (Centered) */}
        <div className="gsap-tours-header text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-[#061474] leading-tight mb-3">
            Featured Tour Packages
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Exclusive experiences designed to create memories that last a lifetime.
          </p>
        </div>

        {/* 3-Column Card Grid */}
        <div className="gsap-tours-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg, index) => (
            <Link
              key={index}
              href={`/tours/${pkg.slug}`}
              className="gsap-tour-card group relative flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-[250px] sm:h-[260px] w-full overflow-hidden bg-slate-900">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Duration Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#061474] text-[11px] font-bold tracking-wider shadow-sm">
                    {pkg.duration}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-sora font-bold text-xl md:text-2xl text-[#061474] group-hover:text-[#ED1B26] transition-colors mb-2.5">
                    {pkg.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>
                </div>

                {/* Bottom Price & Action Row */}
                <div className="border-t border-slate-100 pt-5 mt-auto flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-slate-400 font-medium mb-0.5">
                      Starting from
                    </span>
                    <span className="font-sora font-bold text-2xl text-[#ED1B26]">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-11 h-11 rounded-full border border-slate-200 group-hover:border-[#ED1B26] group-hover:bg-[#ED1B26] text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
