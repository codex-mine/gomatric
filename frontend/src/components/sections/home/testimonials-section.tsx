"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface TestimonialSet {
  featured: {
    quote: string;
    author: string;
    trip: string;
    avatar: string;
    image: string;
  };
  card1: {
    quote: string;
    author: string;
    trip: string;
  };
  card2: {
    quote: string;
    author: string;
    trip: string;
  };
}

const TESTIMONIAL_SETS: TestimonialSet[] = [
  {
    featured: {
      quote:
        "The attention to detail was beyond my expectations. From the complex visa process to the hidden gems in Kyoto, every step was perfectly mapped out.",
      author: "Arifin Zaman",
      trip: "Kyoto Cultural Immersion | October 2024",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    },
    card1: {
      quote:
        "Our family trip to the Swiss Alps felt effortless. GoMatric handled the logistics beautifully, leaving us only the task of enjoying the breathtaking views.",
      author: "Michael Chen",
      trip: "Alpine Retreat | December 2024",
    },
    card2: {
      quote:
        "A seamlessly orchestrated corporate retreat in Dubai. The concierge service anticipated our needs before we even articulated them. A true luxury standard.",
      author: "Sarah Rahman",
      trip: "Dubai Executive Stay | November 2024",
    },
  },
  {
    featured: {
      quote:
        "From our private yacht charter in the Greek Islands to fast-track Schengen visa clearance, GoMatric created the most effortless luxury holiday we have ever taken.",
      author: "Elena Rostova",
      trip: "Santorini & Aegean Cruise | August 2024",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    },
    card1: {
      quote:
        "Navigating the Japan business visa was giving our corporate team headaches. GoMatric resolved everything in 3 days with pristine accuracy.",
      author: "Tanvir Ahmed",
      trip: "Tokyo Corporate Mission | January 2025",
    },
    card2: {
      quote:
        "Our honeymoon in Bali was sheer perfection. The private villa and candlelit beach arrangements exceeded every dream.",
      author: "Nusrat & Farhan",
      trip: "Bali Romance Itinerary | September 2024",
    },
  },
  {
    featured: {
      quote:
        "The VIP airport fast-track and bespoke desert safari in Dubai made our anniversary trip feel like royalty. Unmatched concierge standard.",
      author: "David Sterling",
      trip: "Emirates Luxury Voyage | January 2025",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    },
    card1: {
      quote:
        "Flawless UK tourist visa assistance for my entire family. 100% transparent fee structure and zero surprises.",
      author: "Anisur Rahman",
      trip: "London Summer Vacation | July 2024",
    },
    card2: {
      quote:
        "The customized culinary tour across Bangkok and Phuket gave us memories our friends are still asking about!",
      author: "Priya Sharma",
      trip: "Thailand Food Safari | December 2024",
    },
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const currentSet = TESTIMONIAL_SETS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_SETS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? TESTIMONIAL_SETS.length - 1 : prev - 1
    );
  };

  // Smooth GSAP sliding animation only on user slide switch
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!cardsContainerRef.current) return;

    gsap.fromTo(
      cardsContainerRef.current,
      { opacity: 0.2, x: 12 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [currentIndex]);

  // Entrance ScrollTrigger Animation (Y translation only - zero opacity blocking)
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".gsap-test-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-18 bg-white relative overflow-hidden border-t border-slate-100"
    >
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="gsap-test-header mb-12">
           

          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-[#061474] leading-tight mb-3">
            Journeys worth <br className="hidden sm:block" />
            remembering.
          </h2>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
            Real stories from discerning explorers who chose the GoMatric standard.
          </p>
        </div>

        {/* Testimonials Body (Left Hero Card + Right 2 Cards + Navigation Bar) */}
        <div ref={cardsContainerRef} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* ======================================================== */}
            {/* Left Column: Large Featured Photo Story Card (Span 7)    */}
            {/* ======================================================== */}
            <div className="lg:col-span-7">
              <div className="group relative block w-full h-[480px] sm:h-[540px] lg:h-[580px] rounded-[28px] overflow-hidden bg-slate-900 shadow-sm transition-all duration-500">
                {/* Background Photo with subtle zoom */}
                <Image
                  src={currentSet.featured.image}
                  alt={currentSet.featured.author}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay for Maximum Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />

                {/* Quote Content Inside Card */}
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 z-10 flex flex-col justify-end">
                  {/* Red Quote Mark */}
                  <div className="font-serif font-bold text-3xl sm:text-4xl text-[#ED1B26] leading-none mb-3">
                    &ldquo;&ldquo;
                  </div>

                  <blockquote className="font-sora text-lg sm:text-2xl font-bold text-white leading-snug mb-8">
                    &ldquo;{currentSet.featured.quote}&rdquo;
                  </blockquote>

                  {/* Author Row */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/20">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 shrink-0">
                      <Image
                        src={currentSet.featured.avatar}
                        alt={currentSet.featured.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-sora font-bold text-white text-sm sm:text-base leading-tight">
                        {currentSet.featured.author}
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm mt-0.5">
                        {currentSet.featured.trip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Right Column: 2 Stacked Minimal Cards + Controls (Span 5) */}
            {/* ======================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-[24px] p-7 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between flex-1">
                <div>
                  <div className="text-slate-400 font-serif text-2xl font-bold leading-none mb-3">
                    &ldquo;&ldquo;
                  </div>
                  <p className="text-slate-700 text-sm sm:text-[15px] italic leading-relaxed mb-6">
                    &ldquo;{currentSet.card1.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="font-sora font-bold text-[#061474] text-sm">
                    {currentSet.card1.author}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {currentSet.card1.trip}
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[24px] p-7 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between flex-1">
                <div>
                  <div className="text-slate-400 font-serif text-2xl font-bold leading-none mb-3">
                    &ldquo;&ldquo;
                  </div>
                  <p className="text-slate-700 text-sm sm:text-[15px] italic leading-relaxed mb-6">
                    &ldquo;{currentSet.card2.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="font-sora font-bold text-[#061474] text-sm">
                    {currentSet.card2.author}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {currentSet.card2.trip}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Navigation Bar */}
              <div className="flex items-center gap-5 pt-2">
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                  className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#ED1B26] hover:bg-[#ED1B26] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Animated Progress Indicator Bar */}
                <div className="flex-1 h-[2px] bg-slate-100 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#ED1B26] transition-all duration-500 rounded-full"
                    style={{
                      width: `${((currentIndex + 1) / TESTIMONIAL_SETS.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonials"
                  className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#ED1B26] hover:bg-[#ED1B26] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
