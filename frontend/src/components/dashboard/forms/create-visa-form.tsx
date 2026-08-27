"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Globe,
  Camera,
  Banknote,
  FileText,
  Clock,
  HelpCircle,
} from "lucide-react";
import { useActiveCountries, useActiveVisaTypes, useCreateVisaService } from "@/hooks/use-visas";
import { useQueryClient } from "@tanstack/react-query";

const createVisaSchema = z.object({
  name: z.string().min(3, "Visa Name must be at least 3 characters"),
  countryId: z.string().min(1, "Please select a destination country"),
  visaTypeId: z.string().min(1, "Please select a visa category"),
  entryType: z.enum(["SINGLE", "DOUBLE", "MULTIPLE"]),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  
  // Processing
  minDays: z.coerce.number().min(1, "Min days is required"),
  maxDays: z.coerce.number().min(1, "Max days is required"),
  processingUnit: z.enum(["HOURS", "DAYS", "WEEKS", "MONTHS"]),
  stayDuration: z.string().min(1, "Max stay duration is required (e.g. 90 Days)"),
  validity: z.string().min(1, "Visa validity is required (e.g. 6 Months)"),
  recommendedApplyBefore: z.string().optional(),

  // Pricing
  governmentFee: z.coerce.number().min(0, "Base embassy fee must be 0 or more"),
  serviceFee: z.coerce.number().min(0, "Service charge must be 0 or more"),
  currency: z.string(),

  // Consular Requirements
  passportMinValidityMonths: z.coerce.number(),
  passportBlankPages: z.coerce.number(),
  photoSpec: z.string(),
  minBankBalance: z.coerce.number(),
  statementMonths: z.coerce.number(),
  biometricsRequired: z.boolean(),
  interviewRequired: z.boolean(),
  insuranceRequired: z.boolean(),
  officialUrl: z.string().optional(),
  isFeatured: z.boolean(),

  // Document checklist
  requiredDocs: z.array(z.string()),
});

type CreateVisaFormData = z.infer<typeof createVisaSchema>;

const STANDARD_DOCUMENTS = [
  { id: "passport", label: "Valid Passport (6 months validity)", category: "IDENTIFICATION", defaultChecked: true },
  { id: "photo", label: "Recent Passport-sized Photo (White Background)", category: "IDENTIFICATION", defaultChecked: true },
  { id: "bank_statement", label: "Personal Bank Statement (Last 3–6 months with bank seal)", category: "FINANCIAL", defaultChecked: true },
  { id: "flight_ticket", label: "Round-Trip Flight Itinerary / Confirmed Return Ticket", category: "TRAVEL", defaultChecked: true },
  { id: "accommodation", label: "Confirmed Hotel Voucher / Host Proof of Accommodation", category: "ACCOMMODATION", defaultChecked: true },
  { id: "noc_letter", label: "Employment Leave NOC / Salary Certificate / Trade License", category: "EMPLOYMENT", defaultChecked: false },
  { id: "insurance", label: "Schengen/International Travel Medical Insurance ($50,000 min)", category: "TRAVEL", defaultChecked: false },
  { id: "invitation", label: "Official Host / Sponsor Invitation Letter & ID Copy", category: "SPONSORSHIP", defaultChecked: false },
  { id: "tax_returns", label: "Income Tax Returns (ITR / Tax Assessment Certificate)", category: "FINANCIAL", defaultChecked: false },
  { id: "minor_consent", label: "Notarized Parental Consent & Birth Certificate (For Minors)", category: "LEGAL", defaultChecked: false },
];

export function CreateVisaForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: countries = [] } = useActiveCountries();
  const { data: visaTypes = [] } = useActiveVisaTypes();
  const createMutation = useCreateVisaService();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateVisaFormData>({
    resolver: zodResolver(createVisaSchema),
    defaultValues: {
      name: "",
      countryId: "",
      visaTypeId: "",
      entryType: "SINGLE",
      shortDescription: "",
      description: "",
      minDays: 10,
      maxDays: 15,
      processingUnit: "DAYS",
      stayDuration: "90 Days",
      validity: "6 Months",
      recommendedApplyBefore: "4-6 Weeks prior to travel",
      governmentFee: 0,
      serviceFee: 50,
      currency: "USD",
      passportMinValidityMonths: 6,
      passportBlankPages: 2,
      photoSpec: "35x45mm, white background, matte finish, 80% face coverage",
      minBankBalance: 3000,
      statementMonths: 3,
      biometricsRequired: true,
      interviewRequired: false,
      insuranceRequired: false,
      officialUrl: "",
      isFeatured: false,
      requiredDocs: ["passport", "photo", "bank_statement", "flight_ticket", "accommodation"],
    },
  });

  const selectedDocs = watch("requiredDocs") || [];
  const govFee = watch("governmentFee") || 0;
  const svcFee = watch("serviceFee") || 0;
  const selectedCurrency = watch("currency") || "USD";
  const totalDisplayPrice = (Number(govFee) + Number(svcFee)).toFixed(2);

  const toggleDoc = (docId: string) => {
    if (selectedDocs.includes(docId)) {
      setValue(
        "requiredDocs",
        selectedDocs.filter((id) => id !== docId)
      );
    } else {
      setValue("requiredDocs", [...selectedDocs, docId]);
    }
  };

  const executeSubmit = async (data: CreateVisaFormData, isActive: boolean) => {
    setServerError(null);

    // Build structured document objects strictly matching StructuredDocumentRequirementDto
    const formattedDocs = data.requiredDocs.map((docKey) => {
      const matched = STANDARD_DOCUMENTS.find((d) => d.id === docKey);
      return {
        name: matched?.label || docKey,
        description: `Original and valid ${matched?.label || docKey}`,
        category: (matched?.category || "IDENTIFICATION") as
          | "IDENTIFICATION"
          | "FINANCIAL"
          | "EMPLOYMENT"
          | "TRAVEL"
          | "ACCOMMODATION"
          | "SPONSORSHIP"
          | "LEGAL"
          | "OTHER",
        required: true,
        applicableFor: ["ALL"],
        instructions: `Please provide clear, legible scanned copy of ${matched?.label || docKey}.`,
        acceptedFormats: ["PDF", "JPG", "PNG"],
        maxFileSizeMb: 10,
      };
    });

    const payload: Record<string, any> = {
      name: data.name.trim(),
      countryId: data.countryId,
      visaTypeId: data.visaTypeId,
      shortDescription:
        data.shortDescription?.trim() ||
        `Official visa processing service for ${data.name.trim()}.`,
      description:
        data.description?.trim() ||
        `Complete guided concierge application service for ${data.name.trim()}. We handle documentation audit, embassy form submission, and biometric appointment scheduling.`,
      validity: data.validity.trim(),
      stayDuration: data.stayDuration.trim(),
      entryType: data.entryType,
      processingTime: {
        minDays: Number(data.minDays),
        maxDays: Number(data.maxDays),
        unit: data.processingUnit,
        description: `${data.minDays}-${data.maxDays} ${data.processingUnit.toLowerCase()} processing window following embassy submission`,
      },
      fees: {
        government: Number(data.governmentFee),
        service: Number(data.serviceFee),
        total: Number(data.governmentFee) + Number(data.serviceFee),
        currency: data.currency || "USD",
        breakdown: [
          {
            name: "Government Embassy Visa Fee",
            amount: Number(data.governmentFee),
            description: "Official consular processing fee",
          },
          {
            name: "GoMatric Concierge & Filing Fee",
            amount: Number(data.serviceFee),
            description: "Document review, preparation, and submission assistance",
          },
        ],
      },
      requirements: {
        passport: {
          minValidityMonths: Number(data.passportMinValidityMonths) || 6,
          blankPages: Number(data.passportBlankPages) || 2,
          previousPassportsRequired: false,
          description: `Must be valid for at least ${data.passportMinValidityMonths} months beyond intended stay with ${data.passportBlankPages} blank pages.`,
        },
        photo: {
          required: true,
          specification: data.photoSpec || "35x45mm, white background, matte finish, 80% face coverage",
          background: "White",
          recentMonths: 6,
        },
        financial: {
          required: true,
          minBalance: Number(data.minBankBalance) || 3000,
          statementsMonths: Number(data.statementMonths) || 3,
          sponsorAllowed: true,
          description: `Minimum closing balance of $${data.minBankBalance} across the last ${data.statementMonths} months.`,
        },
        biometrics: {
          required: Boolean(data.biometricsRequired),
          description: "Digital fingerprint scan and photograph at Visa Application Center.",
        },
        interview: {
          required: Boolean(data.interviewRequired),
          description: data.interviewRequired
            ? "In-person consular interview required."
            : "Interview waived for standard profile applications.",
          waiverEligible: !data.interviewRequired,
        },
        travelInsurance: {
          required: Boolean(data.insuranceRequired),
          minCoverage: 50000,
          currency: "USD",
          description: "Comprehensive medical repatriation and emergency hospital cover.",
        },
      },
      documents: formattedDocs,
      isFeatured: Boolean(data.isFeatured),
      isActive: isActive,
    };

    if (data.recommendedApplyBefore?.trim()) {
      payload.recommendedApplyBefore = data.recommendedApplyBefore.trim();
    }

    if (data.officialUrl?.trim()) {
      payload.officialUrl = data.officialUrl.trim();
    }

    try {
      await createMutation.mutateAsync(payload);
      queryClient.invalidateQueries({ queryKey: ["visa-services"] });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/services");
      }, 1200);
    } catch (err: any) {
      const backendMsg = err?.message || err?.response?.data?.message;
      if (Array.isArray(backendMsg)) {
        setServerError(backendMsg.join(" • "));
      } else if (typeof backendMsg === "string") {
        setServerError(backendMsg);
      } else {
        setServerError("Validation failed. Please verify all required fields.");
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      
      {/* Back Link & Title matching Screenshot 2 */}
      <div className="space-y-2">
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Visas</span>
        </Link>

        <div>
          <h1 className="font-sora font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
            Create New Visa
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Define a new visa product offering for your travelers.
          </p>
        </div>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Visa service created successfully! Redirecting...</span>
        </div>
      )}

      {/* Main 2-Column Form Layout matching Screenshot 2 */}
      <form
        onSubmit={handleSubmit((d) => executeSubmit(d, true))}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* Left Column (2/3): Basic Info, Processing, Consular Requirements, Checklist */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Basic Information Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Visa Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Visa Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Schengen Tourist Visa"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Destination Country, Visa Type & Entry Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Destination Country */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("countryId")}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white outline-none cursor-pointer focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                  >
                    <option value="">Select country...</option>
                    {countries.map((c) => {
                      const cId = c.id || c._id;
                      return (
                        <option key={cId} value={cId}>
                          {c.flag} {c.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.countryId && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.countryId.message}
                    </p>
                  )}
                </div>

                {/* Visa Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Visa Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("visaTypeId")}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white outline-none cursor-pointer focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                  >
                    <option value="">Select visa type...</option>
                    {visaTypes.map((t) => {
                      const tId = t.id || t._id;
                      return (
                        <option key={tId} value={tId}>
                          {t.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.visaTypeId && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.visaTypeId.message}
                    </p>
                  )}
                </div>

                {/* Entry Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Entry Type
                  </label>
                  <select
                    {...register("entryType")}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white outline-none cursor-pointer focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                  >
                    <option value="SINGLE">Single Entry</option>
                    <option value="DOUBLE">Double Entry</option>
                    <option value="MULTIPLE">Multiple Entry</option>
                  </select>
                </div>

              </div>

              {/* Short Summary Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Service Summary Description (Optional)
                </label>
                <textarea
                  rows={2}
                  {...register("shortDescription")}
                  placeholder="Concise overview highlight for travelers looking at catalog cards..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Processing Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Processing & Stay Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Min Processing Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Min Processing Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    {...register("minDays")}
                    placeholder="10"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Max Processing Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Max Processing Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    {...register("maxDays")}
                    placeholder="15"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all font-mono"
                  />
                  <select
                    {...register("processingUnit")}
                    className="h-11 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none"
                  >
                    <option value="DAYS">Days</option>
                    <option value="HOURS">Hours</option>
                    <option value="WEEKS">Weeks</option>
                    <option value="MONTHS">Months</option>
                  </select>
                </div>
              </div>

              {/* Recommended Apply Window */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Recommended Apply Window
                </label>
                <input
                  type="text"
                  {...register("recommendedApplyBefore")}
                  placeholder="e.g. 4-6 Weeks before trip"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
              </div>

              {/* Max Stay Duration */}
              <div className="space-y-1.5 sm:col-span-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Max Stay Duration
                </label>
                <input
                  type="text"
                  {...register("stayDuration")}
                  placeholder="e.g. 90 Days"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
                {errors.stayDuration && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.stayDuration.message}
                  </p>
                )}
              </div>

              {/* Visa Validity */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Visa Validity
                </label>
                <input
                  type="text"
                  {...register("validity")}
                  placeholder="e.g. 6 Months / 1 Year Multiple"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all"
                />
                {errors.validity && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.validity.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* 3. Consular Requirements Details */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Consular & Prerequisite Criteria
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Min Passport Validity */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Passport Minimum Validity (Months)
                </label>
                <input
                  type="number"
                  {...register("passportMinValidityMonths")}
                  placeholder="6"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none font-mono"
                />
              </div>

              {/* Min Bank Balance */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Min Recommended Bank Balance ($)
                </label>
                <input
                  type="number"
                  {...register("minBankBalance")}
                  placeholder="3000"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none font-mono"
                />
              </div>

              {/* Consular Toggles */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("biometricsRequired")}
                    className="w-4 h-4 rounded text-[#061474] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Biometrics Required
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("interviewRequired")}
                    className="w-4 h-4 rounded text-[#061474] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Consular Interview
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register("insuranceRequired")}
                    className="w-4 h-4 rounded text-[#061474] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Travel Insurance
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* 4. Applicant Requirements Checklist Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  Applicant Requirements Checklist
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Select the mandatory documents required for this application.
                </p>
              </div>

              <span className="text-xs font-bold text-slate-400">
                {selectedDocs.length} Selected
              </span>
            </div>

            <div className="space-y-2.5 pt-2">
              {STANDARD_DOCUMENTS.map((doc) => {
                const isChecked = selectedDocs.includes(doc.id);
                return (
                  <label
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer select-none transition-all ${
                      isChecked
                        ? "bg-slate-50 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700"
                        : "border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? "bg-[#030A3A] dark:bg-blue-600 border-[#030A3A] dark:border-blue-600 text-white"
                            : "border-slate-300 dark:border-slate-600"
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                        {doc.label}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                      {doc.category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1/3): Pricing & Submission Controls */}
        <div className="space-y-6">
          
          {/* 1. Pricing Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
            <h2 className="font-sora font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Pricing & Currency
            </h2>

            <div className="space-y-4">
              {/* Currency Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Billing Currency
                </label>
                <select
                  {...register("currency")}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-800 dark:text-white outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (AED)</option>
                  <option value="SAR">SAR (SAR)</option>
                  <option value="CAD">CAD (C$)</option>
                  <option value="AUD">AUD (A$)</option>
                </select>
              </div>

              {/* Base Embassy Fee */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Base Embassy Fee ({selectedCurrency}) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    {...register("governmentFee")}
                    placeholder="0.00"
                    className="w-full h-11 pl-8 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                {errors.governmentFee && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.governmentFee.message}
                  </p>
                )}
              </div>

              {/* GoMatric Service Charge */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  GoMatric Service Charge ({selectedCurrency})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    {...register("serviceFee")}
                    placeholder="0.00"
                    className="w-full h-11 pl-8 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-[#061474] dark:focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                {errors.serviceFee && (
                  <p className="text-xs text-red-500 font-medium">
                    {errors.serviceFee.message}
                  </p>
                )}
              </div>

              {/* Total Display Price Calculation */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Display Price:
                </span>
                <span className="font-sora font-extrabold text-xl text-slate-900 dark:text-white">
                  ${totalDisplayPrice}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Platform Options Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-sora font-bold text-sm text-slate-900 dark:text-white">
              Catalog Visibility & Links
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("isFeatured")}
                  className="w-4 h-4 rounded text-[#061474] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Feature on Homepage Hero & Cards
                </span>
              </label>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-slate-500">
                  Official Embassy Portal (Optional)
                </label>
                <input
                  type="url"
                  {...register("officialUrl")}
                  placeholder="https://visa.vfsglobal.com"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Action Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
              className="w-full h-11 rounded-xl bg-[#ED1B26] hover:bg-[#C4141E] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Visa...</span>
                </>
              ) : (
                <span>Create Visa</span>
              )}
            </button>

            <button
              type="button"
              disabled={isSubmitting || createMutation.isPending}
              onClick={handleSubmit((d) => executeSubmit(d, false))}
              className="w-full h-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Save as Draft
            </button>

            <div className="text-center pt-1">
              <Link
                href="/dashboard/services"
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
