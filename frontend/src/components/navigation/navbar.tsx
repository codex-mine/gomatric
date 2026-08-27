"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ChevronDown, ArrowRight, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenMobileNav = useCallback(() => {
    setIsMobileNavOpen(true);
  }, []);

  const handleCloseMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
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
        { opacity: 0, y: 10, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    }
  }, [isVisaDropdownOpen]);

  // Determine if navbar is in minimized state
  const isMinimized = isScrolled && !isHovered;

  // Check active routes
  const isToursActive = pathname.startsWith("/tours");
  const isVisaActive = pathname.startsWith("/visa");
  const isServicesActive = pathname.startsWith("/services");
  const isConsultationActive = pathname === "/contact" || pathname === "/booking";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-4 px-3 sm:px-6 lg:px-8 pointer-events-none flex justify-center">
        <div
          ref={navContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsVisaDropdownOpen(false);
          }}
          className={cn(
            "pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm flex items-center justify-between relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,max-width,padding,transform]",
            isMinimized
              ? "w-[68px] sm:w-[76px] h-[52px] md:h-[56px] rounded-full px-3 justify-center shadow-sm ring-1 ring-[#ED1B26]/20 cursor-pointer hover:scale-105"
              : "w-full max-w-7xl rounded-2xl md:rounded-[20px] px-4 md:px-7 py-3 shadow-sm"
          )}
        >
          {/* ======================================================== */}
          {/* Logo Section                                             */}
          {/* ======================================================== */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none"
            >
              {/* Minimized Favicon Icon */}
              {isMinimized ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm ring-1 ring-[#ED1B26]/20 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/fav.png"
                    alt="GoMatric"
                    fill
                    sizes="32px"
                    className="object-contain"
                  />
                </div>
              ) : (
                /* Full Brand Logo */
                <div className="relative h-8 md:h-9 w-auto flex items-center shrink-0">
                  <Image
                    src="/logo.png"
                    alt="GoMatric Logo"
                    width={145}
                    height={36}
                    priority
                    className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
            </Link>
          </div>

          {/* ======================================================== */}
          {/* Center: Desktop Navigation Links                         */}
          {/* ======================================================== */}
          <nav
            className={cn(
              "items-center gap-7 xl:gap-9 text-[15px] transition-all duration-500 ease-out",
              isMinimized
                ? "hidden opacity-0 pointer-events-none"
                : "hidden lg:flex opacity-100 pointer-events-auto delay-100"
            )}
          >
            {/* Tours Link */}
            <Link
              href="/tours"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
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

            {/* Visa Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsVisaDropdownOpen(true)}
              onMouseLeave={() => setIsVisaDropdownOpen(false)}
            >
              <Link
                href="/visa"
                className={cn(
                  "flex items-center gap-1 font-medium py-1 transition-colors duration-200 whitespace-nowrap",
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

              {/* Visa Dropdown Card (Unclipped, Above All Elements) */}
              {isVisaDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full -left-6 pt-3.5 w-80 z-50 pointer-events-auto"
                >
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 space-y-1">
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
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
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
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
                isConsultationActive
                  ? "text-[#061474] font-semibold"
                  : "text-slate-700 hover:text-[#061474]"
              )}
            >
              Consultation
            </Link>
          </nav>

          {/* ======================================================== */}
          {/* Right Side Action Items (Desktop)                        */}
          {/* ======================================================== */}
          <div
            className={cn(
              "items-center gap-6 transition-all duration-500 ease-out",
              isMinimized
                ? "hidden opacity-0 pointer-events-none"
                : "hidden lg:flex opacity-100 pointer-events-auto delay-100"
            )}
          >
            <Link
              href="/contact"
              className="text-[#061474] hover:text-[#ED1B26] font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>

            <Link
              href="/booking"
              className="h-11 px-6 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group whitespace-nowrap"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ======================================================== */}
          {/* Mobile Right Controls: Search + Hamburger                */}
          {/* ======================================================== */}
          <div
            className={cn(
              "items-center gap-2",
              isMinimized ? "hidden" : "flex lg:hidden"
            )}
          >
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
