"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import {
  Shield,
  FileText,
  Workflow,
  Share2,
  Cookie,
  Lock,
  Clock,
  UserCheck,
  ExternalLink,
  RefreshCw,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PolicySection {
  id: string;
  number: string;
  title: string;
  icon: typeof Shield;
  content: React.ReactNode;
}

const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: Shield,
    content: (
      <>
        <p>
          Welcome to GoMatric&apos;s Privacy Policy. This document outlines our commitment to protecting your personal information while providing you with premier travel concierge services. By utilizing our platform, you consent to the practices described herein.
        </p>
        <p>
          We believe transparency is fundamental to trust, and we aim to be clear about how we handle the data that powers your journeys.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    icon: FileText,
    content: (
      <>
        <p>
          To orchestrate seamless travel experiences, we collect specific categories of information:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>
            <strong className="text-[#061474] font-semibold">Identity Data:</strong> Names, passport details, national identification numbers, and dates of birth required for flight bookings and embassy visa filings.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Contact Data:</strong> Email addresses, telephone numbers, billing addresses, and physical dispatch addresses for travel documents.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Transaction Data:</strong> Payment confirmations, invoice history, and itinerary records. All payment cards are processed via PCI-DSS compliant gateways.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Preference Data:</strong> Dietary requirements, seating preferences, hotel room specifications, and special travel accommodations to personalize your trip.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    number: "03",
    title: "How We Use Information",
    icon: Workflow,
    content: (
      <>
        <p>
          Your information is utilized strictly to provide, maintain, and elevate our concierge services:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>Fulfilling travel reservations with airlines, luxury hotels, and local operators.</li>
          <li>Preparing, verifying, and submitting official visa applications to consulates and embassies on your behalf.</li>
          <li>Delivering real-time flight updates, itinerary changes, and 24/7 emergency customer support.</li>
          <li>Complying with mandatory international border control, security, and immigration legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing-of-information",
    number: "04",
    title: "Sharing of Information",
    icon: Share2,
    content: (
      <>
        <p>
          GoMatric will never sell or monetize your personal data. We only share necessary information with trusted third parties involved in fulfilling your journey:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>Government immigration authorities, visa application centers (VFS, TLS, etc.), and embassies.</li>
          <li>Airlines, hotel chains, chauffeured transfer partners, and licensed local tour guides.</li>
          <li>Secure cloud infrastructure and encrypted communication vendors under strict non-disclosure terms.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-tracking",
    number: "05",
    title: "Cookies & Tracking",
    icon: Cookie,
    content: (
      <>
        <p>
          We employ essential and analytical cookies to ensure our booking engines function efficiently, remember your session preferences, and evaluate website performance.
        </p>
        <p>
          You can manage cookie settings directly within your browser preferences. Please note that disabling cookies may affect certain interactive booking features.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    number: "06",
    title: "Data Security",
    icon: Lock,
    content: (
      <>
        <p>
          We employ enterprise-grade security protocols, including 256-bit TLS encryption in transit, AES-256 encryption at rest, regular vulnerability assessments, and strict role-based employee access controls.
        </p>
        <p>
          Sensitive passport images and financial documents are stored in segregated, restricted-access vaults with automated retention lifecycles.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data Retention",
    icon: Clock,
    content: (
      <>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes for which it was gathered, comply with financial audit requirements, and resolve any post-travel inquiries.
        </p>
        <p>
          Visa application documents are automatically purged from our active processing servers following verified embassy adjudication and document return.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your Rights",
    icon: UserCheck,
    content: (
      <>
        <p>
          Depending on your jurisdiction, you hold specific legal rights concerning your personal data:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>The right to request a full copy of the personal information we hold about you.</li>
          <li>The right to correct inaccurate or incomplete identity and contact details.</li>
          <li>The right to request data erasure (&ldquo;Right to be Forgotten&rdquo;) where legally permissible.</li>
          <li>The right to withdraw marketing consent at any time.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-links",
    number: "09",
    title: "Third-Party Links",
    icon: ExternalLink,
    content: (
      <>
        <p>
          Our platform may contain links to third-party portals, such as airline check-in pages, government embassy portals, and payment providers. We are not responsible for the privacy practices or content of external websites.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-policy",
    number: "10",
    title: "Changes to Policy",
    icon: RefreshCw,
    content: (
      <>
        <p>
          We may revise this Privacy Policy periodically to reflect changes in international regulations or our service offerings. When updates occur, we will update the &ldquo;Last Modified&rdquo; date at the top of this document.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    number: "11",
    title: "Contact Us",
    icon: Mail,
    content: (
      <>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or our data practices, please reach out to our dedicated privacy team:
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

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  // ScrollSpy listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of PRIVACY_SECTIONS) {
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
        title="Privacy Policy"
        subtitle="LEGAL"
        description="Comprehensive information on how GoMatric protects, encrypts, and handles your personal data across our global travel services."
      />

      <section className="py-14 md:py-20 bg-white min-h-screen">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ======================================================== */}
            {/* Left Column: Sticky Table of Contents (Span 4)           */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <nav className="space-y-1 pr-4">
                {PRIVACY_SECTIONS.map((section) => {
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

            {/* ======================================================== */}
            {/* Right Column: Policy Content Blocks (Span 8)             */}
            {/* ======================================================== */}
            <div className="lg:col-span-8 space-y-12 lg:space-y-16">
              {PRIVACY_SECTIONS.map((section) => {
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
