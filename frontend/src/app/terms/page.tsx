"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import {
  FileCheck2,
  Briefcase,
  CalendarCheck,
  CreditCard,
  Ban,
  Stamp,
  FileBadge,
  Scale,
  AlertTriangle,
  RefreshCw,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TermsSection {
  id: string;
  number: string;
  title: string;
  icon: typeof FileCheck2;
  content: React.ReactNode;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    icon: FileCheck2,
    content: (
      <>
        <p>
          Welcome to GoMatric. These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and GoMatric concerning your access to and use of our website, mobile platforms, and bespoke travel concierge services.
        </p>
        <p>
          By browsing, booking, or utilizing any services provided by GoMatric, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms.
        </p>
      </>
    ),
  },
  {
    id: "services",
    number: "02",
    title: "Description of Services",
    icon: Briefcase,
    content: (
      <>
        <p>
          GoMatric operates as a premium travel management and concierge agency. Our service portfolio includes:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>Curated international and domestic tour packages, bespoke excursions, and guided itineraries.</li>
          <li>End-to-end visa consultation, document verification, appointment scheduling, and submission assistance.</li>
          <li>Commercial airline ticketing, charter flight bookings, and priority seat arrangements.</li>
          <li>Luxury hotel, resort, and boutique accommodation reservations worldwide.</li>
          <li>VIP airport meet-and-assist, chauffeured transfers, and comprehensive travel insurance facilitation.</li>
        </ul>
      </>
    ),
  },
  {
    id: "booking-reservations",
    number: "03",
    title: "Booking & Reservations",
    icon: CalendarCheck,
    content: (
      <>
        <p>
          All reservations are subject to inventory availability and confirmation from partner airlines, hotels, and operators:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>
            <strong className="text-[#061474] font-semibold">Confirmation:</strong> A booking is finalized only upon receipt of the designated deposit or full payment and issuance of an official GoMatric Confirmation Voucher.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Accuracy of Details:</strong> Travelers must ensure all names, passport numbers, and dates match their official passport documents exactly. GoMatric is not liable for errors provided by the client.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payments-pricing",
    number: "04",
    title: "Payments & Pricing",
    icon: CreditCard,
    content: (
      <>
        <p>
          All published pricing is quoted in Bangladeshi Taka (BDT ৳) or US Dollars (USD $) as designated on specific package listings:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>We accept payments via verified international credit/debit cards, bank wire transfers, and authorized mobile payment gateways.</li>
          <li>Prices are subject to revision prior to booking confirmation in the event of major currency fluctuations, airline fuel surcharge increases, or government tax modifications.</li>
          <li>Full payment must be completed before the issuance of flight tickets or the dispatch of approved visa documentation.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation-refunds",
    number: "05",
    title: "Cancellation & Refunds",
    icon: Ban,
    content: (
      <>
        <p>
          Cancellation requests must be submitted in writing to GoMatric support. Refund eligibility adheres to the following schedule:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>
            <strong className="text-[#061474] font-semibold">Tour Packages:</strong> Cancellations made 30+ days prior to departure qualify for an 80% refund. Cancellations made 15–29 days prior receive a 50% refund. Cancellations within 14 days of departure are non-refundable.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Flights & Hotels:</strong> Subject strictly to the individual fare rules, cancellation penalties, and refund policies of the respective airline or hotel property.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Visa Processing Fees:</strong> Embassy statutory fees and administrative processing fees are 100% non-refundable once the application has been initiated with the consulate.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "visa-assistance-disclaimer",
    number: "06",
    title: "Visa Assistance Disclaimer",
    icon: Stamp,
    content: (
      <>
        <p>
          GoMatric operates exclusively as an advisory and processing intermediary for visa applications:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>
            <strong className="text-[#061474] font-semibold">Decision Authority:</strong> The sole authority to grant or deny a visa rests entirely with the respective government embassy, consulate, or immigration department.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">No Guarantee:</strong> GoMatric does not guarantee visa approval, processing timelines, or the issuance of specific visa categories.
          </li>
          <li>
            <strong className="text-[#061474] font-semibold">Document Authenticity:</strong> Applicants bear full legal responsibility for the veracity and authenticity of all submitted financial statements and employment records.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "travel-documents-health",
    number: "07",
    title: "Travel Documents & Health",
    icon: FileBadge,
    content: (
      <>
        <p>
          It is the primary responsibility of each traveler to ensure compliance with international border requirements:
        </p>
        <ul className="space-y-2 mt-3 list-disc pl-5">
          <li>Passports must have a minimum of 6 months validity remaining beyond the intended date of return, with at least 2 blank visa pages.</li>
          <li>Travelers must satisfy all health advisories, mandatory vaccinations, and destination entry forms required by the destination nation.</li>
        </ul>
      </>
    ),
  },
  {
    id: "user-conduct-obligations",
    number: "08",
    title: "User Conduct & Obligations",
    icon: Scale,
    content: (
      <>
        <p>
          When utilizing our services, you agree not to submit fraudulent credentials, interfere with platform security, or engage in disruptive behavior during guided tour operations.
        </p>
        <p>
          GoMatric reserves the right to terminate tour participation or service delivery immediately, without refund, in cases of unlawful conduct or safety violations.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    number: "09",
    title: "Limitation of Liability",
    icon: AlertTriangle,
    content: (
      <>
        <p>
          GoMatric acts solely as an agent for airlines, hotels, transport operators, and third-party vendors:
        </p>
        <p>
          To the maximum extent permitted by applicable law, GoMatric shall not be held liable for any personal injury, property loss, travel delay, airline schedule modification, weather disruption, political unrest, or Force Majeure events beyond our reasonable operational control.
        </p>
      </>
    ),
  },
  {
    id: "amendments-to-terms",
    number: "10",
    title: "Amendments to Terms",
    icon: RefreshCw,
    content: (
      <>
        <p>
          GoMatric reserves the right to modify, amend, or update these Terms at any time without prior individual notice. Revisions become effective immediately upon posting to this URL.
        </p>
      </>
    ),
  },
  {
    id: "contact-legal",
    number: "11",
    title: "Contact Legal Team",
    icon: Mail,
    content: (
      <>
        <p>
          For questions, legal notices, or clarifications regarding these Terms of Service, please communicate directly with our compliance department:
        </p>
        <div className="mt-5 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-sm text-slate-700 space-y-2 shadow-xs">
          <div>
            <strong className="text-[#061474] font-semibold">Legal Email:</strong>{" "}
            <a
              href="mailto:legal@gomatric.com"
              className="text-[#ED1B26] hover:underline font-medium"
            >
              legal@gomatric.com
            </a>
          </div>
          <div>
            <strong className="text-[#061474] font-semibold">Corporate Office:</strong>{" "}
            <span>GoMatric Headquarters, 100 Global Way, Metropolis, NY 10001</span>
          </div>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");

  // ScrollSpy listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of TERMS_SECTIONS) {
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
        title="Terms of Service"
        subtitle="LEGAL"
        description="Clear terms, conditions, and service guidelines governing your travel bookings and visa assistance with GoMatric."
      />

      <section className="py-14 md:py-20 bg-white min-h-screen">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ======================================================== */}
            {/* Left Column: Sticky Table of Contents (Span 4)           */}
            {/* ======================================================== */}
            <aside className="lg:col-span-4 sticky top-28 hidden lg:block">
              <nav className="space-y-1 pr-4">
                {TERMS_SECTIONS.map((section) => {
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
              {TERMS_SECTIONS.map((section) => {
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
