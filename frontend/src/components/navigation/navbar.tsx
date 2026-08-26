"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ChevronDown, ArrowRight, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

interface DropdownItem {
  title: string;
  desc?: string;
  href: string;
}

const VISA_DROPDOWN_ITEMS: DropdownItem[] = [
  { title: "Dubai Tourist Visa", desc: "Express 30 & 60 days processing", href: "/visa/dubai-uae" },
  { title: "Malaysia Tourist Visa", desc: "Single & multiple entry eVisa", href: "/visa/malaysia" },
  { title: "Thailand Tourist Visa", desc: "Fast approval assistance", href: "/visa/thailand" },
  { title: "Singapore Tourist Visa", desc: "Guaranteed paper submission", href: "/visa/singapore" },
  { title: "Turkey Tourist Visa", desc: "Instant eVisa application", href: "/visa/turkey" },
  { title: "View All Visa Countries →", desc: "Over 50+ destinations supported", href: "/visa" },
];

export function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isVisaDropdownOpen, setIsVisaDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const handleCloseMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  // GSAP Entrance Animation on mount
  useEffect(() => {
    if (!navContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(navContainerRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, navContainerRef);

    return () => ctx.revert();
  }, []);

  // GSAP Animation for Visa Dropdown
  useEffect(() => {
    if (!dropdownRef.current) return;

    if (isVisaDropdownOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: 8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [isVisaDropdownOpen]);

  // Check active states
  const isToursActive = pathname.startsWith("/tours");
  const isVisaActive = pathname.startsWith("/visa");
  const isServicesActive = pathname.startsWith("/services");
  const isConsultationActive = pathname === "/contact" || pathname === "/booking";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          ref={navContainerRef}
          className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl md:rounded-[20px] border border-slate-200/80 shadow-lg shadow-slate-900/[0.04] px-4 md:px-7 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300"
        >
          {/* Left: Brand Logo */}
          <Logo />

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[15px]">
            {/* Tours Link (Active Red Indicator with bar) */}
            <Link
              href="/tours"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200",
                isToursActive
                  ? "text-[#ED1B26] font-semibold"
                  : "text-slate-700 hover:text-[#ED1B26]"
              )}
            >
              Tours
              {isToursActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#ED1B26] rounded-full animate-fadeIn" />
              )}
            </Link>

            {/* Visa with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsVisaDropdownOpen(true)}
              onMouseLeave={() => setIsVisaDropdownOpen(false)}
            >
              <Link
                href="/visa"
                className={cn(
                  "flex items-center gap-1 font-medium py-1 transition-colors duration-200",
                  isVisaActive
                    ? "text-[#ED1B26] font-semibold"
                    : "text-slate-700 hover:text-[#061474]"
                )}
              >
                <span>Visa</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-slate-500 transition-transform duration-200",
                    isVisaDropdownOpen && "rotate-180 text-[#061474]"
                  )}
                />
              </Link>

              {/* Visa Dropdown Card */}
              {isVisaDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full -left-4 pt-3 w-80 z-50"
                >
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-900/10 p-3 space-y-1">
                    {VISA_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsVisaDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                      >
                        <div className="font-semibold text-sm text-[#061474] group-hover:text-[#ED1B26] transition-colors">
                          {item.title}
                        </div>
                        {item.desc && (
                          <div className="text-xs text-slate-500 mt-0.5">
                            {item.desc}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Link */}
            <Link
              href="/services"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200",
                isServicesActive
                  ? "text-[#061474] font-semibold"
                  : "text-slate-700 hover:text-[#061474]"
              )}
            >
              Services
            </Link>

            {/* Consultation Link */}
            <Link
              href="/contact"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200",
                isConsultationActive
                  ? "text-[#061474] font-semibold"
                  : "text-slate-700 hover:text-[#061474]"
              )}
            >
              Consultation
            </Link>
          </nav>

          {/* Right Side Action Items */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contact"
              className="text-[#061474] hover:text-[#ED1B26] font-semibold text-sm transition-colors"
            >
              Contact Us
            </Link>

            <Link
              href="/booking"
              className="h-11 px-6 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Right Controls: Search + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleOpenMobileNav}
              className="p-2 text-slate-700 hover:text-[#061474] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleOpenMobileNav}
              className="p-2 text-slate-700 hover:text-[#061474] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={handleCloseMobileNav}
      />
    </>
  );
}
