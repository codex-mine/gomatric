"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import {
  Search,
  X,
  ChevronDown,
  ArrowRight,
  Camera,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavSection {
  title: string;
  href?: string;
  subItems?: { title: string; href: string }[];
}

const MENU_SECTIONS: NavSection[] = [
  {
    title: "Visa Services",
    subItems: [
      { title: "Dubai Tourist Visa", href: "/visa/dubai-uae" },
      { title: "Malaysia Tourist Visa", href: "/visa/malaysia" },
      { title: "Thailand Tourist Visa", href: "/visa/thailand" },
      { title: "Singapore Tourist Visa", href: "/visa/singapore" },
      { title: "Turkey Tourist Visa", href: "/visa/turkey" },
      { title: "All Visa Services", href: "/visa" },
    ],
  },
  {
    title: "Tour Packages",
    subItems: [
      { title: "Dubai Explorer (5D/4N)", href: "/tours/dubai-explorer" },
      { title: "Thailand Adventure (7D/6N)", href: "/tours/thailand-adventure" },
      { title: "Malaysia Discovery (6D/5N)", href: "/tours/malaysia-discovery" },
      { title: "Singapore Delight (4D/3N)", href: "/tours/singapore-delight" },
      { title: "All Tour Packages", href: "/tours" },
    ],
  },
  {
    title: "Destinations",
    subItems: [
      { title: "Dubai, UAE", href: "/destinations/dubai-uae" },
      { title: "Kuala Lumpur, Malaysia", href: "/destinations/malaysia" },
      { title: "Bangkok, Thailand", href: "/destinations/thailand" },
      { title: "Singapore City", href: "/destinations/singapore" },
      { title: "All Destinations", href: "/destinations" },
    ],
  },
  {
    title: "Travel Services",
    href: "/services",
  },
  {
    title: "Travel Guide",
    href: "/travel-guide",
  },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevPathnameRef = useRef(pathname);

  // Close only on genuine route transition
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Body scroll lock & ESC key listener
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("nav-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("nav-open");
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // GSAP animation when opening
  useEffect(() => {
    if (!isOpen || !drawerRef.current || !backdropRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.38, ease: "power3.out" }
      );

      gsap.fromTo(
        ".gsap-mobile-item",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.3,
          delay: 0.08,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      {/* Drawer Container */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-[380px] sm:max-w-[400px] h-full bg-white flex flex-col justify-between shadow-2xl overflow-y-auto"
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 bg-white px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <Link href="/" onClick={onClose} className="flex items-center">
            <span className="font-sora font-bold text-2xl text-[#061474] tracking-tight">
              GoMatric
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => searchInputRef.current?.focus()}
              className="p-2 text-slate-700 hover:text-[#061474] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-700 hover:text-[#ED1B26] rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Search Input Box */}
          <form onSubmit={handleSearchSubmit} className="gsap-mobile-item relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full h-11 pl-10 pr-4 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#061474] focus:bg-white transition-all"
            />
          </form>

          {/* Large Bold Menu Navigation */}
          <nav className="space-y-4 pt-2">
            {MENU_SECTIONS.map((item) => {
              const isExpanded = expandedSection === item.title;
              const hasSubItems = item.subItems && item.subItems.length > 0;

              return (
                <div key={item.title} className="gsap-mobile-item">
                  {hasSubItems ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleSection(item.title)}
                        className="w-full flex items-center justify-between py-2 text-left group"
                      >
                        <span className="font-sora font-bold text-2xl text-[#061474] group-hover:text-[#ED1B26] transition-colors">
                          {item.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-[#ED1B26] transition-transform duration-300",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Sub-menu accordion */}
                      {isExpanded && (
                        <div className="pl-4 pr-2 py-2 space-y-2.5 border-l-2 border-[#ED1B26]/30 mt-1.5 ml-1 animate-fadeIn">
                          {item.subItems?.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={onClose}
                              className="block text-base font-medium text-slate-600 hover:text-[#061474] transition-colors py-0.5"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className="block py-2 font-sora font-bold text-2xl text-[#061474] hover:text-[#ED1B26] transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Need Help Card Box */}
          <div className="gsap-mobile-item    ">
            

            <div className="space-y-2.5">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full py-3 px-4 bg-white border border-[#061474]/20 hover:border-[#061474] text-[#061474] font-semibold text-sm rounded-xl text-center block transition-all shadow-sm"
              >
                Contact Us
              </Link>

              <Link
                href="/booking"
                onClick={onClose}
                className="w-full py-3 px-4 bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-sm rounded-xl text-center flex items-center justify-center gap-2 group transition-all shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-[#ED1B26] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Social / Utility Icons Footer */}
        <div className="gsap-mobile-item px-6 py-5 border-t border-slate-100 flex items-center justify-center gap-8 text-[#061474]">
          <Link
            href="/travel-guide"
            onClick={onClose}
            aria-label="Gallery & Guides"
            className="p-2 hover:text-[#ED1B26] hover:scale-110 transition-transform"
          >
            <Camera className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            aria-label="Chat & Support"
            className="p-2 hover:text-[#ED1B26] hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>
          <Link
            href="/destinations"
            onClick={onClose}
            aria-label="Saved Destinations"
            className="p-2 hover:text-[#ED1B26] hover:scale-110 transition-transform"
          >
            <Bookmark className="w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "GoMatric — Premium Travel Solutions",
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            aria-label="Share GoMatric"
            className="p-2 hover:text-[#ED1B26] hover:scale-110 transition-transform"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
