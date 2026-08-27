"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import {
  Cookie,
  Layers,
  CheckCircle2,
  BarChart3,
  Sliders,
  Settings2,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CookieSection {
  id: string;
  number: string;
  title: string;
  icon: typeof Cookie;
  content: React.ReactNode;
}

const COOKIE_SECTIONS: CookieSection[] = [
  {
    id: "what-are-cookies",
    number: "01",
    title: "What Are Cookies",
    icon: Cookie,
    content: (
      <>
        <p>
          Cookies are compact text files stored on your computer or mobile device when you interact with online platforms. They enable the website to recognize your browser, retain preferences, and optimize your navigation flow.
        </p>
      </>
    ),
  },
  {
    id: "types-of-cookies",
    number: "02",
    title: "Types of Cookies We Use",
    icon: Layers,
    content: (
      <>
        <p>
          GoMatric utilizes both first-party cookies (set directly by our infrastructure) and third-party cookies (set by certified partners such as payment gateways, map providers, and analytics services):
        </p>
      </>
    ),
  },
  {
    id: "essential-cookies",
    number: "03",
    title: "Essential Cookies",
    icon: CheckCircle2,
    content: (
      <>
        <p>
          Strictly necessary cookies required to operate our travel booking engine, secure transactions, and maintain authenticated user sessions. These cannot be disabled without impairing core functionality.
        </p>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    number: "04",
    title: "Analytics & Performance",
    icon: BarChart3,
    content: (
      <>
        <p>
          These cookies collect aggregated, anonymized metrics on how travelers browse our tours and visa packages, assisting us in enhancing platform performance and responsiveness.
        </p>
      </>
    ),
  },
  {
    id: "preference-cookies",
    number: "05",
    title: "Preference & Customization",
    icon: Sliders,
    content: (
      <>
        <p>
          Preference cookies record your chosen currency, destination favorites, and search filters so you do not need to reconfigure them on every return visit.
        </p>
      </>
    ),
  },
  {
    id: "managing-cookies",
    number: "06",
    title: "Managing Your Cookie Settings",
    icon: Settings2,
    content: (
      <>
        <p>
          You hold the right to modify or withdraw cookie consent at any time through your browser settings or our on-screen Cookie Preference center.
        </p>
      </>
    ),
  },
  {
    id: "contact-team",
    number: "07",
    title: "Contact Privacy Team",
    icon: Mail,
    content: (
      <>
        <p>
          For queries concerning our cookie policy or tracking technologies, please contact our team:
        </p>
        <div className="mt-5 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-sm text-slate-700 space-y-2 shadow-xs">
          <div>
            <strong className="text-[#061474] font-semibold">Email:</strong>{" "}
            <a
              href="mailto:privacy@gomatric.com"
              className="text-[#ED1B26] hover:underline font-medium"
            >
              privacy@gomatric.com
            </a>
          </div>
          <div>
            <strong className="text-[#061474] font-semibold">Address:</strong>{" "}
            <span>GoMatric Headquarters, 100 Global Way, Metropolis, NY 10001</span>
          </div>
        </div>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("what-are-cookies");

  // ScrollSpy listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of COOKIE_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 120;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <PageShell>
      <PageHero
        title="Cookie Policy"
        subtitle="LEGAL"
        description="Learn how GoMatric uses cookies and tracking technologies to optimize your travel booking experience."
      />

      <section className="py-14 md:py-20 bg-white min-h-screen">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Sticky Table of Contents (Span 4) */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <nav className="space-y-1 pr-4">
                {COOKIE_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleNavClick(section.id)}
                      className={cn(
                        "w-full flex items-center gap-3.5 py-2.5 px-3 rounded-xl text-left text-sm transition-all duration-200 cursor-pointer group",
                        isActive
                          ? "text-[#ED1B26] font-bold"
                          : "text-slate-600 hover:text-[#061474] font-medium"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors shrink-0",
                          isActive ? "text-[#ED1B26]" : "text-slate-400 group-hover:text-slate-600"
                        )}
                      >
                        {section.number}
                      </span>
                      <span className="truncate">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Right Column: Content Blocks (Span 8) */}
            <div className="lg:col-span-8 space-y-12 lg:space-y-16">
              {COOKIE_SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-32 pb-12 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    {/* Section Header */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#061474]/40 select-none">
                          {section.number}
                        </span>
                        <h2 className="font-sora font-bold text-2xl sm:text-3xl text-[#061474] leading-tight">
                          {section.title}
                        </h2>
                      </div>

                      {/* Pure Borderless, Backgroundless Vector SVG Icon */}
                      <div className="text-slate-300 shrink-0 select-none pointer-events-none">
                        <Icon className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.25]" />
                      </div>
                    </div>

                    {/* Section Content Body */}
                    <div className="space-y-4 text-slate-600 text-[15px] sm:text-base leading-relaxed">
                      {section.content}
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </Container>
      </section>
    </PageShell>
  );
}
