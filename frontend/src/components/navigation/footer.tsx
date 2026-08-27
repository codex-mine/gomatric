"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Plane, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const globeShapeRef = useRef<HTMLDivElement>(null);
  const flightPathShapeRef = useRef<HTMLDivElement>(null);
  const airplaneVectorRef = useRef<SVGGElement>(null);
  const compassShapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ========================================================
      // SCROLL-MATCHED BACKGROUND VECTOR SHAPE PARALLAX & ANIMATIONS
      // ========================================================

      // 1. Globe Parallax & Rotation driven by Scroll
      if (globeShapeRef.current) {
        gsap.to(globeShapeRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
          rotation: 50,
          y: 60,
          scale: 1.18,
          ease: "none",
        });
      }

      // 2. Flight Trajectory & Moving Airplane on Scroll
      if (flightPathShapeRef.current) {
        gsap.to(flightPathShapeRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.2,
          },
          x: -40,
          y: -20,
          ease: "none",
        });
      }

      if (airplaneVectorRef.current) {
        gsap.to(airplaneVectorRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.5,
          },
          x: 140,
          y: -45,
          rotation: 32,
          ease: "none",
        });
      }

      // 3. Compass Rose Parallax & Reverse Rotation on Scroll
      if (compassShapeRef.current) {
        gsap.to(compassShapeRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.3,
          },
          rotation: -65,
          scale: 1.22,
          x: 40,
          y: -30,
          ease: "none",
        });
      }

      // ========================================================
      // CONTENT ENTRANCE ANIMATIONS
      // ========================================================

      // CTA Section Animation
      gsap.from(".gsap-footer-cta-text", {
        scrollTrigger: {
          trigger: ".gsap-footer-cta-text",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(".gsap-footer-cta-btn", {
        scrollTrigger: {
          trigger: ".gsap-footer-cta-btn",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
      });

      // 4-Column Links Stagger Animation
      gsap.from(".gsap-footer-col", {
        scrollTrigger: {
          trigger: ".gsap-footer-links-grid",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power2.out",
      });

      // Social Icons Stagger Pop
      gsap.from(".gsap-footer-social-btn", {
        scrollTrigger: {
          trigger: ".gsap-footer-social-btn",
          start: "top 92%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        delay: 0.15,
        ease: "back.out(1.5)",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#040E56] text-white relative overflow-hidden">
      
      {/* ======================================================== */}
      {/* SCROLL-ANIMATED TRAVEL BACKGROUND VECTORS               */}
      {/* ======================================================== */}

      {/* 1. Scroll-Rotating World Globe (Top Right) */}
      <div
        ref={globeShapeRef}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] pointer-events-none opacity-[0.05] origin-center will-change-transform"
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full stroke-white">
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="130" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="75" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="180" ry="80" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="80" ry="180" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" />
          <line x1="72" y1="72" x2="328" y2="328" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="328" y1="72" x2="72" y2="328" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 2. Scroll-Moving Flight Route Line & Airplane Vector */}
      <div
        ref={flightPathShapeRef}
        className="absolute top-10 left-0 right-0 w-full h-[360px] pointer-events-none overflow-hidden opacity-[0.08] will-change-transform"
      >
        <svg viewBox="0 0 1440 360" fill="none" preserveAspectRatio="none" className="w-full h-full">
          {/* Main Flight Trajectory Arc */}
          <path
            d="M -50,240 C 300,30 680,290 1080,70 C 1260,0 1420,120 1520,60"
            stroke="white"
            strokeWidth="1.75"
            strokeDasharray="8 8"
          />
          {/* Secondary Red Accent Arc */}
          <path
            d="M 100,320 C 420,140 820,40 1380,240"
            stroke="#ED1B26"
            strokeWidth="1.75"
            strokeDasharray="6 6"
            className="opacity-60"
          />
          {/* Waypoints */}
          <circle cx="300" cy="125" r="4" fill="white" />
          <circle cx="680" cy="190" r="5" fill="#ED1B26" />
          <circle cx="1080" cy="70" r="4" fill="white" />
          
          {/* Airplane Silhouette that moves across along the scroll */}
          <g ref={airplaneVectorRef} transform="translate(620, 160) rotate(20) scale(1.1)">
            <path
              d="M12 2L15 9L22 10L17 14L18.5 21L12 17.5L5.5 21L7 14L2 10L9 9L12 2Z"
              fill="#ED1B26"
              className="drop-shadow-[0_0_8px_rgba(237,27,38,0.6)]"
            />
          </g>
        </svg>
      </div>

      {/* 3. Scroll-Rotating Compass Rose & Coordinates (Bottom Left) */}
      <div
        ref={compassShapeRef}
        className="absolute -bottom-24 -left-24 w-96 h-96 pointer-events-none opacity-[0.05] origin-center will-change-transform"
      >
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-white">
          <circle cx="150" cy="150" r="140" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="150" cy="150" r="100" strokeWidth="1" />
          <polygon points="150,30 162,138 270,150 162,162 150,270 138,162 30,150 138,138" strokeWidth="1.5" />
          <polygon points="150,70 157,143 230,150 157,157 150,230 143,157 70,150 143,143" strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Top Red Trajectory Hairline Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ED1B26] to-transparent opacity-80 z-10" />

      {/* ======================================================== */}
      {/* FOOTER CONTENT                                          */}
      {/* ======================================================== */}

      {/* Top CTA Banner Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="gsap-footer-cta-text max-w-2xl">
            <h2 className="font-sora text-4xl md:text-5xl lg:text-[46px] font-bold text-white leading-tight tracking-tight">
              Your next journey starts here.
            </h2>
            <p className="text-white/80 text-base md:text-lg mt-4 leading-relaxed">
              Join thousands of premium travelers who trust GoMatric for seamless visa processing and luxury tour arrangements.
            </p>
          </div>

          <div className="gsap-footer-cta-btn shrink-0">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-base rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] group whitespace-nowrap"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="border-t border-white/10" />
      </div>

      {/* Main 4-Column Footer Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="gsap-footer-links-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="gsap-footer-col lg:col-span-4 flex flex-col gap-5">
            <Logo variant="white" />
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Premium travel concierge providing expert visa consultation and bespoke global tours.
            </p>

            {/* Social / Utility Icons */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href="https://www.facebook.com/gometricofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GoMatric on Facebook"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/gometricofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GoMatric on Instagram"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <Link
                href="/destinations"
                aria-label="Global Destinations"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1B26] text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <Globe className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                aria-label="Email Contact"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1B26] text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="gsap-footer-col lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-lg text-white mb-1">
              Services
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li>
                <Link href="/visa" className="hover:text-white transition-colors">
                  Visa Services
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Corporate Travel
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="gsap-footer-col lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-lg text-white mb-1">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="gsap-footer-col lg:col-span-3 flex flex-col gap-4">
            <h3 className="font-sora font-semibold text-lg text-white mb-1">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ED1B26] shrink-0 mt-0.5" />
                <span>123 Global Avenue, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ED1B26] shrink-0" />
                <a href="tel:+18001234567" className="hover:text-white transition-colors">
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ED1B26] shrink-0" />
                <a href="mailto:gometricofficial@gmail.com" className="hover:text-white transition-colors">
                  gometricofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Darker Navy Bottom Copyright Bar */}
      <div className="relative z-10 gsap-footer-bottom bg-[#02072B] border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2026 GoMatric Premium Travel. All rights reserved.</p>

           
          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
