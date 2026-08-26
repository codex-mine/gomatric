"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, File, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";

const steps = ["Journey", "Details", "Documents", "Review", "Confirm"];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const formData = watch();

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(curr => curr + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const onSubmit = (data: any) => {
    console.log("Final submission:", data);
    nextStep();
  };

  return (
    <PageShell>
      <PageHero 
        title="Start Your Journey." 
        subtitle="BOOKING" 
        size="default"
      />

      <Section>
        <Container className="max-w-4xl">
          {/* Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10"></div>
              {steps.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-2 bg-surface px-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                    index < currentStep ? "bg-brand-primary border-brand-primary text-white" :
                    index === currentStep ? "bg-white border-brand-accent text-brand-accent" :
                    "bg-white border-border text-text-muted"
                  }`}>
                    {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : `0${index + 1}`}
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider hidden md:block ${
                    index <= currentStep ? "text-brand-primary" : "text-text-muted"
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-[14px] p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* Step 1: Journey */}
              {currentStep === 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-sora text-2xl font-bold text-brand-primary mb-6">Journey Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Destination</label>
                      <Input {...register("destination", { required: true })} placeholder="Where to?" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Service Type</label>
                      <select {...register("serviceType")} className="w-full h-12 px-3 border border-input rounded-[10px] bg-background text-sm">
                        <option value="Visa">Visa Services</option>
                        <option value="Tour">Tour Package</option>
                        <option value="Flight">Flight Ticket</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Travel Date</label>
                      <Input type="date" {...register("travelDate")} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Travelers</label>
                      <Input type="number" min="1" {...register("travelers")} defaultValue="1" className="h-12" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-sora text-2xl font-bold text-brand-primary mb-6">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Full Name</label>
                      <Input {...register("fullName", { required: true })} placeholder="John Doe" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Email</label>
                      <Input type="email" {...register("email", { required: true })} placeholder="john@example.com" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Phone</label>
                      <Input {...register("phone", { required: true })} placeholder="+1234567890" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-primary">Address</label>
                      <Input {...register("address")} placeholder="123 Main St" className="h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-primary">Special Requirements</label>
                    <Textarea {...register("requirements")} placeholder="Any dietary preferences, mobility needs, etc." className="min-h-[100px]" />
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-sora text-2xl font-bold text-brand-primary mb-6">Upload Documents</h3>
                  <div className="border-2 border-dashed border-border rounded-[14px] p-12 flex flex-col items-center justify-center text-center hover:bg-surface transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mb-4">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-lg text-brand-primary">Drop your documents here</h4>
                    <p className="text-text-muted mt-2">Support PDF, JPG, PNG (Max 10MB)</p>
                    <Button type="button" variant="outline" className="mt-6">Browse Files</Button>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-text-primary">Uploaded Files</p>
                    <div className="flex items-center gap-4 p-4 border border-border rounded-[10px] bg-surface">
                      <File className="w-6 h-6 text-text-muted" />
                      <div className="flex-grow">
                        <p className="text-sm font-medium">passport_copy.pdf</p>
                        <p className="text-xs text-text-muted">2.4 MB</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h3 className="font-sora text-2xl font-bold text-brand-primary mb-6">Review Information</h3>
                  <div className="bg-surface p-6 rounded-[14px] space-y-6">
                    <div className="grid grid-cols-2 gap-4 border-b border-border pb-6">
                      <div>
                        <p className="text-sm text-text-muted">Destination</p>
                        <p className="font-medium">{formData.destination || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Service Type</p>
                        <p className="font-medium">{formData.serviceType || "Visa Services"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Travel Date</p>
                        <p className="font-medium">{formData.travelDate || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Travelers</p>
                        <p className="font-medium">{formData.travelers || "1"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-text-muted">Full Name</p>
                        <p className="font-medium">{formData.fullName || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Email</p>
                        <p className="font-medium">{formData.email || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Phone</p>
                        <p className="font-medium">{formData.phone || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirm */}
              {currentStep === 4 && (
                <div className="text-center py-12 animate-in fade-in zoom-in-95">
                  <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="font-sora text-4xl font-bold text-brand-primary mb-4">You're All Set.</h3>
                  <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                    Your booking request has been received. Your reference number is:
                  </p>
                  <div className="inline-block bg-surface border border-border px-8 py-4 rounded-[10px] text-2xl font-bold font-sora text-brand-primary mb-10 tracking-widest">
                    GM-2026-X8F9
                  </div>
                  <div>
                    <Button type="button" onClick={() => window.location.href='/tracking'} className="h-12 px-8 rounded-[10px]">
                      Track My Journey →
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="text-text-secondary"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep} className="bg-brand-primary hover:bg-brand-primary-hover px-8">
                      Continue <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-brand-accent hover:bg-brand-accent-dark px-8">
                      Confirm Booking <CheckCircle2 className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}

            </form>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
