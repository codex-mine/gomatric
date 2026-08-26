"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const VISA_FEATURES = [
  {
    title: "Document Verification",
    description: "Thorough review to ensure all your paperwork is flawless before submission.",
  },
  {
    title: "Application Processing",
    description: "Fast-tracked submission and ongoing status tracking until approval.",
  },
  {
    title: "Interview Preparation",
    description: "Expert guidance and mock sessions for embassy interviews.",
  },
];

export function VisaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left Image Animation
      gsap.from(".gsap-visa-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Right Content Box Animation
      gsap.from(".gsap-visa-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Bullets Stagger
      gsap.from(".gsap-visa-feature", {
        scrollTrigger: {
          trigger: ".gsap-visa-content",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#F8FAFC]/50 relative overflow-hidden">
      <Container className="max-w-7xl">
        {/* Split-Banner Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12   overflow-hidden shadow-xl border border-slate-100 items-stretch bg-white">
          
          {/* ======================================================== */}
          {/* Left Column: Real Open Passport & Visa Photo             */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 gsap-visa-image relative min-h-[380px] sm:min-h-[440px] lg:min-h-[540px] w-full overflow-hidden bg-slate-900 group">
            <Image
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
              alt="Real Passports with Approved Visa Page"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle natural lighting vignette */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500" />
          </div>

          {/* ======================================================== */}
          {/* Right Column: Deep Navy Feature Box (Span 6)             */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 gsap-visa-content bg-[#061474] p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center relative overflow-hidden text-white">
            
            {/* Background Transparent Passport Stamp Vector */}
            <div className="absolute -top-10 -right-10 w-72 h-72 pointer-events-none opacity-[0.04] select-none rotate-12">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-white">
                <circle cx="100" cy="100" r="90" strokeWidth="2" strokeDasharray="6 3" />
                <circle cx="100" cy="100" r="72" strokeWidth="1.25" />
                <rect x="35" y="75" width="130" height="50" rx="6" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Heading */}
              <h2 className="font-sora text-3xl sm:text-4xl md:text-[42px] font-bold text-white leading-[1.18] tracking-tight mb-4">
                Seamless Visa <br className="hidden sm:block" />
                Processing
              </h2>

              {/* Subtitle */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                Navigate complex visa requirements with our expert team. We provide end-to-end assistance for tourist, business, and transit visas across major destinations worldwide.
              </p>

              {/* 3 Feature Bullets */}
              <div className="space-y-6 mb-8">
                {VISA_FEATURES.map((feature, idx) => (
                  <div key={idx} className="gsap-visa-feature flex items-start gap-3.5">
                    <div className="shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#ED1B26]" />
                    </div>
                    <div>
                      <h4 className="font-sora font-semibold text-base sm:text-lg text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-md">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/visa"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-[#ED1B26]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] w-fit group"
              >
                <span>Explore Visa Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
