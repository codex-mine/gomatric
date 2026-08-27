"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  areaOfInterest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      areaOfInterest: "Bespoke Itinerary",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Inquiry submitted:", values);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <PageShell>
      <PageHero
        title="Let's Talk About Your Next Trip."
        subtitle="CONTACT US"
        description="Have a question or ready to plan your next journey? Our dedicated team is here to help you every step of the way."
      />

      <Section className="py-16 md:py-24 bg-[#F8FAFC]/60">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* ======================================================== */}
            {/* Left Column: 3 Contact Info Cards (Span 5)               */}
            {/* ======================================================== */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Call Us */}
              <div className="bg-white rounded-md p-6 sm:p-7 border border-slate-100 shadow-sm transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#061474]/5 flex items-center justify-center text-[#061474] shrink-0 group-hover:bg-[#061474] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-lg text-[#061474] mb-1">
                      Call Us
                    </h3>
                    <p className="text-slate-500 text-sm mb-2">
                      Available 24/7 for global support.
                    </p>
                    <a
                      href="tel:+18001234567"
                      className="font-sora font-semibold text-base text-[#ED1B26] hover:text-[#C4141E] transition-colors"
                    >
                      +1 (800) 123–4567
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Email */}
              <div className="bg-white rounded-md p-6 sm:p-7 border border-slate-100 shadow-sm transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#061474]/5 flex items-center justify-center text-[#061474] shrink-0 group-hover:bg-[#061474] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-lg text-[#061474] mb-1">
                      Email
                    </h3>
                    <p className="text-slate-500 text-sm mb-2">
                      Expect a reply within 2 hours.
                    </p>
                    <a
                      href="mailto:concierge@gomatric.com"
                      className="font-sora font-semibold text-base text-[#ED1B26] hover:text-[#C4141E] transition-colors break-all"
                    >
                      concierge@gomatric.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Global Office & Map */}
              <div className="bg-white rounded-md p-6 sm:p-7 pb-0 sm:pb-0 border border-slate-100 shadow-sm transition-all overflow-hidden group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#061474]/5 flex items-center justify-center text-[#061474] shrink-0 group-hover:bg-[#061474] group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-lg text-[#061474] mb-1">
                      Global Office
                    </h3>
                    <div className="text-slate-600 text-sm leading-relaxed">
                      <p>100 Premium Way,</p>
                      <p>Suite 500</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                </div>

                {/* Map Preview Image */}
                <div className="relative h-44 -mx-6 sm:-mx-7 -mb-0 overflow-hidden border-t border-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                    alt="Office Location Map"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Map Overlay with Location Pin Indicator */}
                  <div className="absolute inset-0 bg-[#061474]/15 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-slate-200/80">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ED1B26]" />
                      <span className="font-sora font-bold text-xs text-[#061474]">
                        GoMatric NYC HQ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ======================================================== */}
            {/* Right Column: Send an Inquiry Form (Span 7)              */}
            {/* ======================================================== */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-md p-8 sm:p-10 md:p-12 border border-slate-100 shadow-sm">
                <h2 className="font-sora text-2xl sm:text-3xl font-bold text-[#061474] mb-8">
                  Send an Inquiry
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-sm font-medium">
                      Thank you! Your inquiry has been received. Our concierge will be in touch shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        First Name
                      </label>
                      <Input
                        placeholder="Jane"
                        className="h-12 bg-white border border-slate-200 rounded-md px-4 text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:ring-1 focus:ring-slate-300 focus:outline-none"
                        error={!!errors.firstName}
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-[#ED1B26] mt-1.5">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Last Name
                      </label>
                      <Input
                        placeholder="Doe"
                        className="h-12 bg-white border border-slate-200 rounded-md px-4 text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:ring-1 focus:ring-slate-300 focus:outline-none"
                        error={!!errors.lastName}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-[#ED1B26] mt-1.5">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      className="h-12 bg-white border border-slate-200 rounded-md px-4 text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:ring-1 focus:ring-slate-300 focus:outline-none"
                      error={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-[#ED1B26] mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Row 3: Area of Interest */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Area of Interest
                    </label>
                    <select
                      className="w-full h-12 bg-white border border-slate-200 rounded-md px-4 text-slate-800 focus:border-slate-300 focus:ring-1 focus:ring-slate-300 focus:outline-none cursor-pointer"
                      {...register("areaOfInterest")}
                    >
                      <option value="Bespoke Itinerary">Bespoke Itinerary</option>
                      <option value="Visa Application & Processing">Visa Application & Processing</option>
                      <option value="Luxury Tour Package">Luxury Tour Package</option>
                      <option value="Air Ticket Booking">Air Ticket Booking</option>
                      <option value="Corporate & Group Travel">Corporate & Group Travel</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    {errors.areaOfInterest && (
                      <p className="text-xs text-[#ED1B26] mt-1.5">{errors.areaOfInterest.message}</p>
                    )}
                  </div>

                  {/* Row 4: Your Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your travel dreams..."
                      rows={5}
                      className="bg-white border border-slate-200 rounded-md p-4 text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:ring-1 focus:ring-slate-300 focus:outline-none min-h-[140px]"
                      error={!!errors.message}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-[#ED1B26] mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#ED1B26] hover:bg-[#C4141E] text-white font-semibold text-sm sm:text-base rounded-md transition-all shadow-md shadow-[#ED1B26]/25 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
