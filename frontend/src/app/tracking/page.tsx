"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, CheckCircle2, Clock, Circle } from "lucide-react";

export default function TrackingPage() {
  const [refNumber, setRefNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "error">("idle");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber) return;
    
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      if (refNumber.toUpperCase().startsWith("GM-")) {
        setStatus("found");
      } else {
        setStatus("error");
      }
    }, 1500);
  };

  return (
    <PageShell>
      <PageHero 
        title="Where Is My Journey?" 
        subtitle="APPLICATION TRACKING" 
        size="default"
      />

      <Section>
        <Container className="max-w-3xl">
          <div className="bg-white border border-border p-8 md:p-12 rounded-md shadow-sm mb-12">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <Input
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="Enter your reference number (e.g. GM-2026-XXXX)"
                  className="pl-12 h-14 text-lg rounded-md"
                />
              </div>
              <Button type="submit" disabled={status === "loading"} className="h-14 px-8 rounded-md text-base font-semibold">
                {status === "loading" ? "Searching..." : "Track Application →"}
              </Button>
            </form>
          </div>

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md text-center">
              <p className="font-semibold text-lg">Application Not Found</p>
              <p className="mt-2">Please check your reference number and try again, or contact support if you need assistance.</p>
            </div>
          )}

          {status === "found" && (
            <div className="bg-surface border border-border rounded-md p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">Application Reference</p>
                  <h3 className="font-sora text-2xl font-bold text-brand-primary">GM-VISA-000123</h3>
                </div>
                <div className="ml-auto bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                  Processing
                </div>
              </div>

              <div className="relative pl-6 space-y-10 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-accent before:via-brand-accent before:to-border">
                <div className="relative flex items-start gap-6">
                  <div className="absolute left-[-24px] top-1 bg-white p-1 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">Application Submitted</h4>
                    <p className="text-text-secondary mt-1">Aug 15, 2026 - 10:30 AM</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="absolute left-[-24px] top-1 bg-white p-1 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">Documents Verified</h4>
                    <p className="text-text-secondary mt-1">Aug 16, 2026 - 02:15 PM</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6">
                  <div className="absolute left-[-24px] top-1 bg-white p-1 rounded-full">
                    <Clock className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">Processing</h4>
                    <p className="text-text-secondary mt-1">Currently being reviewed by our experts.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6 opacity-50">
                  <div className="absolute left-[-24px] top-1 bg-white p-1 rounded-full">
                    <Circle className="w-6 h-6 text-border" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">Embassy Processing</h4>
                    <p className="text-text-secondary mt-1">Pending submission to embassy.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-6 opacity-50">
                  <div className="absolute left-[-24px] top-1 bg-white p-1 rounded-full">
                    <Circle className="w-6 h-6 text-border" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">Decision</h4>
                    <p className="text-text-secondary mt-1">Final outcome of application.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </PageShell>
  );
}
