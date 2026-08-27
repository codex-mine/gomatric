"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ChevronDown, ArrowRight, Menu, Search, User as UserIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/providers/auth-provider";

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
  const { user, isAuthenticated, logout } = useAuth();
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
  const isDestinationsActive = pathname.startsWith("/destinations");
  const isServicesActive = pathname.startsWith("/services");
  const isConsultationActive = pathname === "/contact" || pathname === "/booking";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-2 md:pt-2.5 px-3 sm:px-6 lg:px-8 pointer-events-none flex justify-center">
        <div
          ref={navContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsVisaDropdownOpen(false);
          }}
          className={cn(
            "pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,max-width,padding,transform]",
            isMinimized
              ? "w-full lg:w-auto h-[52px] md:h-[56px] lg:h-[52px] px-4 py-0 rounded-md justify-between lg:justify-center shadow-sm lg:ring-1 lg:ring-slate-200/80 dark:lg:ring-slate-700 cursor-default lg:cursor-pointer lg:hover:scale-105"
              : "w-full max-w-7xl h-[56px] md:h-[60px] rounded-md px-4 md:px-6 py-0 shadow-sm"
          )}
        >
          {/* ======================================================== */}
          {/* Logo Section (Horizontal fav.png + GoMatric text)        */}
          {/* ======================================================== */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center gap-1.5 group select-none"
            >
              {/* Crisp Large Emblem Icon */}
              <div className="relative w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] md:w-[46px] md:h-[46px] rounded-full overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/fav.png"
                  alt="GoMatric"
                  fill
                  sizes="64px"
                  priority
                  className="object-contain scale-105"
                />
              </div>

              {/* Horizontal Brand Typography (Visible in both normal and minimized scroll pill) */}
              <span className="font-sora font-extrabold text-[16px] sm:text-[17px] md:text-[18px] text-[#061474] dark:text-white tracking-[-0.02em] leading-none whitespace-nowrap transition-colors duration-300">
                GoMatric
              </span>
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
                  : "text-slate-700 dark:text-slate-200 hover:text-[#ED1B26] dark:hover:text-[#ED1B26]"
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
                    : "text-slate-700 dark:text-slate-200 hover:text-[#061474] dark:hover:text-white"
                )}
              >
                <span>Visa</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200",
                    isVisaDropdownOpen && "rotate-180 text-[#061474] dark:text-white"
                  )}
                />
              </Link>

              {/* Visa Dropdown Card (Unclipped, Above All Elements) */}
              {isVisaDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full -left-6 pt-3.5 w-80 z-50 pointer-events-auto"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200/90 dark:border-slate-800 shadow-sm p-3 space-y-1">
                    {VISA_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsVisaDropdownOpen(false)}
                        className="block p-2.5 rounded-md hover:bg-[#F8FAFC] dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="font-semibold text-sm text-[#061474] dark:text-white group-hover:text-[#ED1B26] transition-colors">
                          {item.title}
                        </div>
                        {item.desc && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {item.desc}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Destinations */}
            <Link
              href="/destinations"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
                isDestinationsActive
                  ? "text-[#ED1B26] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#061474] dark:hover:text-white"
              )}
            >
              Destinations
              {isDestinationsActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#ED1B26] rounded-full animate-fadeIn" />
              )}
            </Link>

            {/* Services */}
            <Link
              href="/services"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
                isServicesActive
                  ? "text-[#ED1B26] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#061474] dark:hover:text-white"
              )}
            >
              Services
              {isServicesActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#ED1B26] rounded-full animate-fadeIn" />
              )}
            </Link>

            {/* Consultation Link */}
            <Link
              href="/contact"
              className={cn(
                "relative font-medium py-1 transition-colors duration-200 whitespace-nowrap",
                isConsultationActive
                  ? "text-[#ED1B26] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#061474] dark:hover:text-white"
              )}
            >
              Consultation
              {isConsultationActive && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#ED1B26] rounded-full animate-fadeIn" />
              )}
            </Link>
          </nav>

          {/* ======================================================== */}
          {/* Right Side Action Items (Desktop)                        */}
          {/* ======================================================== */}
          <div
            className={cn(
              "items-center gap-3 transition-all duration-500 ease-out",
              isMinimized
                ? "hidden opacity-0 pointer-events-none"
                : "hidden lg:flex opacity-100 pointer-events-auto delay-100"
            )}
          >
            {/* Dark / Light Mode Toggle Button */}
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                  title="My Dashboard"
                >
                  <div className="w-6 h-6 rounded-full bg-[#061474] dark:bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-500 hover:text-[#ED1B26] transition-colors cursor-pointer"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="h-9 sm:h-10 px-5 rounded-md bg-[#061474] dark:bg-blue-600 hover:bg-[#030A3A] dark:hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] group whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* ======================================================== */}
          {/* Mobile Right Controls: Theme + Search + Hamburger        */}
          {/* ======================================================== */}
          <div
            className="flex lg:hidden items-center gap-1.5"
          >
            <ThemeToggle />
            <button
              type="button"
              onClick={handleOpenMobileNav}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#061474] dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleOpenMobileNav}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-[#061474] dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
