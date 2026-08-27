"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Calendar,
  Plane,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Building,
  Sparkles,
  Info,
  Check,
  Globe,
  UploadCloud,
  Fingerprint,
  FileCheck2,
  PhoneCall,
  Lock,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Container } from "@/components/ui/container";
import {
  useVisaServiceBySlug,
  useVisaServices,
} from "@/hooks/use-visas";
import { StructuredDocument, VisaService } from "@/lib/api/visas";

const DESTINATION_HERO_IMAGES: Record<string, string> = {
  "united-kingdom": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
  "united-states": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2000&auto=format&fit=crop",
  "france": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
  "germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2000&auto=format&fit=crop",
  "italy": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000&auto=format&fit=crop",
  "switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop",
  "spain": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop",
  "united-arab-emirates": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
  "saudi-arabia": "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop",
  "qatar": "https://images.unsplash.com/photo-1568454537842-d933259bb258?q=80&w=2000&auto=format&fit=crop",
  "turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop",
  "canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000&auto=format&fit=crop",
  "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
  "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
  "malaysia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
  "thailand": "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2000&auto=format&fit=crop",
  "australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop",
  "new-zealand": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop",
  "indonesia": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
  "vietnam": "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2000&auto=format&fit=crop",
  "south-korea": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2000&auto=format&fit=crop",
  "china": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop",
  "egypt": "https://images.unsplash.com/photo-1539768942893-daf53e448371?q=80&w=2000&auto=format&fit=crop",
};

export default function VisaDetailsPage() {
  const routeParams = useParams();
  const rawSlug = routeParams?.slug
    ? Array.isArray(routeParams.slug)
      ? routeParams.slug[0]
      : routeParams.slug
    : "";
  const slug = decodeURIComponent(rawSlug || "");

  const router = useRouter();
  const [selectedApplicantType, setSelectedApplicantType] = useState<string>("ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // 1. Fetch visa service by direct slug lookup
  const {
    data: directService,
    isLoading: isDirectLoading,
    isError: isDirectError,
  } = useVisaServiceBySlug(slug);

  // 2. Fetch all services as fallback lookup
  const {
    data: allServicesResponse,
    isLoading: isAllLoading,
  } = useVisaServices({ limit: 100 });

  const allServicesList = useMemo(() => {
    if (!allServicesResponse) return [];
    if (Array.isArray(allServicesResponse)) return allServicesResponse;
    if (Array.isArray(allServicesResponse.data)) return allServicesResponse.data;
    return [];
  }, [allServicesResponse]);

  // Resolve the active service either directly or by matching slug / country slug / id
  const activeService: VisaService | undefined = useMemo(() => {
    if (directService && directService._id) {
      return directService;
    }
    if (allServicesList.length > 0 && slug) {
      // Find matching service by slug
      const bySlug = allServicesList.find(
        (s) => s.slug?.toLowerCase() === slug.toLowerCase()
      );
      if (bySlug) return bySlug;

      // Find matching service by MongoDB _id
      const byId = allServicesList.find((s) => s._id === slug);
      if (byId) return byId;

      // Find matching service by country slug
      const byCountry = allServicesList.find(
        (s) => s.country?.slug?.toLowerCase() === slug.toLowerCase()
      );
      if (byCountry) return byCountry;
    }
    return undefined;
  }, [directService, allServicesList, slug]);

  const isLoading = (isDirectLoading || isAllLoading) && !activeService;

  if (isLoading) {
    return (
      <PageShell>
        <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 flex items-center justify-center pt-32 pb-24">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#061474] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-500">Loading visa details from registry...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  if (!activeService) {
    return (
      <PageShell>
        <div className="min-h-[70vh] bg-[#F8F9FC] dark:bg-slate-950 flex items-center justify-center pt-32 pb-24">
          <Container size="narrow">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center space-y-4 shadow-sm">
              <AlertCircle className="w-14 h-14 text-[#ED1B26] mx-auto" />
              <h1 className="font-sora font-bold text-2xl text-slate-900 dark:text-white">
                Visa Service Not Found
              </h1>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                No active visa service matches &quot;{slug}&quot;. Explore our directory for all official destinations.
              </p>
              <div className="pt-2">
                <Link
                  href="/visa"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#061474] hover:bg-[#030A3A] text-white font-semibold text-sm transition-colors"
                >
                  <span>Browse Visa Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </PageShell>
    );
  }

  const service = activeService!;
  const totalCost =
    service.fees?.total ||
    (service.fees?.government || 0) + (service.fees?.service || 0);
  const currencySymbol =
    service.fees?.currency === "EUR" ? "€" : service.fees?.currency === "GBP" ? "£" : "$";

  // Filter documents by applicant profile
  const filteredDocuments = (service.documents || []).filter((doc: StructuredDocument) => {
    if (selectedApplicantType === "ALL") return true;
    return (
      doc.applicableFor?.includes(selectedApplicantType) ||
      doc.applicableFor?.includes("ALL")
    );
  });

  // Group filtered documents by category
  const documentsByCategory = filteredDocuments.reduce((acc, doc) => {
    const cat = doc.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, StructuredDocument[]>);

  const applicantTabs = [
    { id: "ALL", label: "All Applicants" },
    { id: "EMPLOYED", label: "Salaried / Employed" },
    { id: "SELF_EMPLOYED", label: "Business Owner" },
    { id: "STUDENT", label: "Student" },
    { id: "MINOR", label: "Minors" },
    { id: "SPONSORED", label: "Sponsored" },
  ];

  // Hero Background Image fallback
  const heroImage =
    DESTINATION_HERO_IMAGES[service.country?.slug || ""] ||
    "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop";

  return (
    <PageShell>
      <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Matches Screenshot 2 Design)                              */}
        {/* ========================================================================= */}
        <section className="relative min-h-[460px] sm:min-h-[500px] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden select-none">
          {/* Background Cinematic Image with Gradient */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${service.country?.name} background`}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Rich multi-stop dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/80" />
          </div>

          <Container className="relative z-10 max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Pills + Title + Description */}
              <div className="lg:col-span-8 space-y-4 text-white">
                
                {/* Capsule Badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-white">
                    {service.country?.name || "DESTINATION"}
                  </span>
                  <span className="px-3 py-1 rounded-md bg-red-600/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-white">
                    {service.visaType?.name?.toUpperCase() || "VISITOR"}
                  </span>
                </div>

                {/* Hero Title */}
                <h1 className="font-sora font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
                  {service.name}
                </h1>

                {/* Hero Description */}
                <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl font-normal">
                  {service.shortDescription || service.description?.slice(0, 180)}
                </p>
              </div>

              {/* Right Column: Floating Hero Spec Card */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="w-full sm:w-72 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Processing Time</span>
                      <span className="font-sora font-bold text-sm text-white">
                        {service.processingTime?.minDays}-{service.processingTime?.maxDays} Days
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <span className="text-slate-300">Total Fee</span>
                      <span className="font-sora font-bold text-lg text-white">
                        {currencySymbol}{totalCost}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/booking?visa=${encodeURIComponent(service.slug)}`}
                    className="w-full h-11 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#ED1B26]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* ========================================================================= */}
        {/* 2. MAIN BODY SECTION (Matches Screenshot 2 Two-Column Layout)              */}
        {/* ========================================================================= */}
        <Container className="max-w-6xl py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 8 Columns (Application Process, Documents, Overview, FAQs) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* ------------------------------------------------------------------- */}
              {/* A. APPLICATION PROCESS TIMELINE (Matches Screenshot 2)              */}
              {/* ------------------------------------------------------------------- */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
                <div>
                  <h2 className="font-sora font-extrabold text-2xl text-[#061474] dark:text-white tracking-tight">
                    Application Process
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Your journey to {service.country?.name || "your destination"} outlined in clear, actionable steps.
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-7">
                  {(service.applicationSteps && service.applicationSteps.length > 0
                    ? service.applicationSteps
                    : [
                        {
                          stepNumber: 1,
                          title: "Complete the Application",
                          description:
                            "Fill out the official online form with our guided assistance ensuring zero errors.",
                        },
                        {
                          stepNumber: 2,
                          title: "Upload Documents",
                          description:
                            "Securely upload your verified documents to our portal for final review before submission.",
                        },
                        {
                          stepNumber: 3,
                          title: "Biometrics Appointment",
                          description:
                            "Attend a visa application centre to provide your fingerprints and photograph.",
                        },
                        {
                          stepNumber: 4,
                          title: "Receive Decision",
                          description:
                            "Get your passport back with the visa vignette, typically within 3 weeks of your appointment.",
                        },
                      ]
                  ).map((step, idx) => {
                    const isLast = idx === (service.applicationSteps?.length || 4) - 1;

                    return (
                      <div key={idx} className="flex items-start gap-4 sm:gap-5">
                        {/* Icon Circle */}
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                            isLast
                              ? "bg-[#061474] text-white"
                              : "bg-red-50 dark:bg-red-950/50 text-[#ED1B26] border border-red-200 dark:border-red-800/60"
                          }`}
                        >
                          {idx === 0 && <FileText className="w-5 h-5" />}
                          {idx === 1 && <UploadCloud className="w-5 h-5" />}
                          {idx === 2 && <Fingerprint className="w-5 h-5" />}
                          {idx >= 3 && <CheckCircle2 className="w-5 h-5" />}
                        </div>

                        {/* Step Details */}
                        <div className="space-y-1 pt-1">
                          <h3 className="font-sora font-bold text-base text-slate-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ------------------------------------------------------------------- */}
              {/* B. REQUIRED DOCUMENTS CHECKLIST                                     */}
              {/* ------------------------------------------------------------------- */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-[#061474] dark:text-white">
                    Required Documents
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Select your applicant profile to view custom document requirements
                  </p>
                </div>

                {/* Profile Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                  {applicantTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedApplicantType(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedApplicantType === tab.id
                          ? "bg-[#061474] text-white dark:bg-blue-600 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Grouped Documents */}
                <div className="space-y-5">
                  {Object.entries(documentsByCategory).map(([category, docs]) => (
                    <div key={category} className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#061474] dark:text-blue-400">
                        {category.replace("_", " ")} Documents
                      </span>

                      <div className="space-y-2.5">
                        {docs.map((doc, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                                  {doc.name}
                                </span>
                                {doc.required ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 dark:bg-red-950/50 text-[#ED1B26] dark:text-red-400">
                                    Required
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    Optional
                                  </span>
                                )}
                              </div>

                              {doc.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                  {doc.description}
                                </p>
                              )}

                              {doc.instructions && (
                                <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                                  💡 {doc.instructions}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ------------------------------------------------------------------- */}
              {/* C. OVERVIEW & DESCRIPTION                                           */}
              {/* ------------------------------------------------------------------- */}
              <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-[#061474] dark:text-white">
                    Visa Overview & Guidelines
                  </h2>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {service.description}
                </div>

                {service.recommendedApplyBefore && (
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-start gap-3 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Recommended Application Timeline:</span>
                      <span>{service.recommendedApplyBefore}</span>
                    </div>
                  </div>
                )}
              </section>

              {/* ------------------------------------------------------------------- */}
              {/* D. FAQS ACCORDION                                                   */}
              {/* ------------------------------------------------------------------- */}
              {service.faqs && service.faqs.length > 0 && (
                <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                  <h2 className="font-sora font-extrabold text-xl sm:text-2xl text-[#061474] dark:text-white">
                    Frequently Asked Questions
                  </h2>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="py-3.5">
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between gap-4 text-left font-semibold text-sm text-slate-800 dark:text-slate-200 hover:text-[#061474] dark:hover:text-blue-400 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                                isOpen ? "rotate-180 text-[#061474] dark:text-blue-400" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

            </div>

            {/* --------------------------------------------------------------------- */}
            {/* Right 4 Columns: Sticky Application Summary Card (Matches Screenshot 2) */}
            {/* --------------------------------------------------------------------- */}
            <aside className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
                
                <div>
                  <h2 className="font-sora font-bold text-lg text-slate-900 dark:text-white">
                    Application Summary
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Start your application process today with our guided service.
                  </p>
                </div>

                {/* Primary Action Button */}
                <Link
                  href={`/booking?visa=${encodeURIComponent(service.slug)}`}
                  className="w-full h-12 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#ED1B26]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Start Application</span>
                </Link>

                {/* Secondary Action Button */}
                <Link
                  href="/contact"
                  className="w-full h-11 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Talk to an Expert</span>
                </Link>

                {/* Itemized Details Strip */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Government Fee:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currencySymbol}{service.fees?.government || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Service Fee:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currencySymbol}{service.fees?.service || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    <span>Total Estimated:</span>
                    <span className="text-sm text-[#061474] dark:text-blue-400 font-extrabold">
                      {currencySymbol}{totalCost}
                    </span>
                  </div>
                </div>

                {/* Application Center info */}
                {service.applicationCenter && (
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      📍 {service.applicationCenter.name}
                    </span>
                    {service.applicationCenter.address && (
                      <p className="text-slate-500 text-[11px] leading-relaxed">
                        {service.applicationCenter.address}
                      </p>
                    )}
                  </div>
                )}

              </div>
            </aside>

          </div>
        </Container>

        {/* Sticky Mobile Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3.5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Est. Cost</span>
            <span className="font-sora font-extrabold text-lg text-[#061474] dark:text-white">
              {currencySymbol}{totalCost}
            </span>
          </div>

          <Link
            href={`/booking?visa=${encodeURIComponent(service.slug)}`}
            className="h-11 px-6 rounded-lg bg-[#ED1B26] hover:bg-[#c9121c] text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-[#ED1B26]/20 transition-all active:scale-95"
          >
            <span>Start Application</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </PageShell>
  );
}
