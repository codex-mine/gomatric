"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Plane, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // CTA Section Animation
      gsap.from(".gsap-footer-cta-text", {
        scrollTrigger: {
          trigger: ".gsap-footer-cta-text",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".gsap-footer-cta-btn", {
        scrollTrigger: {
          trigger: ".gsap-footer-cta-btn",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        scale: 0.94,
        opacity: 0,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
      });

      // 4-Column Links Stagger Animation
      gsap.from(".gsap-footer-col", {
        scrollTrigger: {
          trigger: ".gsap-footer-links-grid",
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
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
        stagger: 0.06,
        duration: 0.4,
        delay: 0.25,
        ease: "back.out(1.5)",
      });

      // Bottom Bar Fade
      gsap.from(".gsap-footer-bottom", {
        scrollTrigger: {
          trigger: ".gsap-footer-bottom",
          start: "top 98%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#040E56] text-white relative overflow-hidden">
      {/* ======================================================== */}
      {/* TRAVEL BACKGROUND VECTOR GRAPHICS & TRANSPARENT SHAPES */}
      {/* ======================================================== */}

      {/* 1. Subtle World Globe / Lat-Long Grid (Top Right) */}
      <div className="absolute -top-16 -right-24 w-[480px] h-[480px] pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white">
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="130" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="75" strokeWidth="1" />
          {/* Latitude & Longitude ellipse arcs */}
          <ellipse cx="200" cy="200" rx="180" ry="80" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="80" ry="180" strokeWidth="1" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" />
          {/* Compass 45-degree ticks */}
          <line x1="72" y1="72" x2="328" y2="328" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="328" y1="72" x2="72" y2="328" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 2. Curved Flight Trajectory / Flight Route Line with Airplane (Middle Background) */}
      <div className="absolute top-12 left-0 right-0 w-full h-[320px] pointer-events-none overflow-hidden opacity-[0.06]">
        <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" className="w-full h-full">
          {/* Main flight arc 1 */}
          <path
            d="M -50,220 C 320,40 680,290 1100,80 C 1280,0 1420,120 1520,60"
            stroke="white"
            strokeWidth="1.75"
            strokeDasharray="8 8"
          />
          {/* Secondary flight arc 2 */}
          <path
            d="M 120,300 C 450,150 820,50 1350,220"
            stroke="#ED1B26"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            className="opacity-40"
          />
          {/* Waypoint markers along the route */}
          <circle cx="320" cy="130" r="4" fill="white" />
          <circle cx="680" cy="190" r="5" fill="#ED1B26" />
          <circle cx="1100" cy="80" r="4" fill="white" />
          {/* Airplane Silhouette vector */}
          <g transform="translate(680, 175) rotate(22) scale(0.9)">
            <path
              d="M12 2L15 9L22 10L17 14L18.5 21L12 17.5L5.5 21L7 14L2 10L9 9L12 2Z"
              fill="white"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      {/* 3. Navigation Compass Rose & Coordinate Dial (Bottom Left Background) */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-white">
          <circle cx="150" cy="150" r="140" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="150" cy="150" r="100" strokeWidth="1" />
          {/* Compass Diamond Star */}
          <polygon points="150,30 162,138 270,150 162,162 150,270 138,162 30,150 138,138" strokeWidth="1.5" />
          <polygon points="150,70 157,143 230,150 157,157 150,230 143,157 70,150 143,143" strokeWidth="0.75" strokeDasharray="2 2" />
        </svg>
      </div>

     
      {/* Red Route accent element at top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-accent opacity-80" />

      {/* ======================================================== */}
      {/* FOOTER CONTENT */}
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
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-[#ED1B26]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group whitespace-nowrap"
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
            <div className="flex items-center gap-3 mt-2">
              <Link
                href="/destinations"
                aria-label="Global Destinations"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1B26] text-white/80 hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4" />
              </Link>
              <Link
                href="/tours"
                aria-label="Flights & Tours"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1B26] text-white/80 hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <Plane className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                aria-label="Email Contact"
                className="gsap-footer-social-btn w-9 h-9 rounded-full bg-white/10 hover:bg-[#ED1B26] text-white/80 hover:text-white flex items-center justify-center transition-colors shadow-sm"
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
                <a href="mailto:hello@gomatric.com" className="hover:text-white transition-colors">
                  hello@gomatric.com
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
          <div className="flex items-center gap-6">
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
