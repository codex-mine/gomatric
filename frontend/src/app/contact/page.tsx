"use client";

import React from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  destination: z.string().min(2, "Destination is required"),
  service: z.string().min(1, "Please select a service"),
  travelDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      service: "Visa",
      travelDate: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("Inquiry submitted:", values);
    alert("Thank you! Your inquiry has been sent to our travel experts.");
    reset();
  };

  return (
    <PageShell>
      <PageHero 
        title="Let's Talk About Your Next Trip." 
        subtitle="CONTACT US" 
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="font-sora text-3xl font-bold text-brand-primary mb-4">Get in Touch</h2>
                <p className="text-text-secondary text-lg">
                  Have a question or ready to plan your next journey? Our team is here to help you every step of the way.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", details: "+880 1234-567890" },
                  { icon: Mail, title: "Email", details: "hello@gomatric.com" },
                  { icon: MapPin, title: "Office", details: "Dhaka, Bangladesh" },
                  { icon: Clock, title: "Business Hours", details: "Sun-Thu 9AM-6PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-surface rounded-[14px] border border-border/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-accent shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary mb-1">{item.title}</h4>
                      <p className="text-text-secondary">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-border p-8 md:p-10 rounded-[14px] shadow-sm">
                <h3 className="font-sora text-2xl font-bold text-brand-primary mb-6">Send an Inquiry</h3>
                
                {isSubmitSuccessful && (
                  <div className="mb-6 p-4 bg-success/10 border border-success/20 text-success rounded-[10px] text-sm">
                    Your inquiry has been submitted successfully. A GoMatric travel specialist will contact you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                      <Input
                        placeholder="John Doe"
                        error={!!errors.fullName}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-error mt-1.5">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        error={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-xs text-error mt-1.5">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                      <Input
                        placeholder="+880..."
                        error={!!errors.phone}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-error mt-1.5">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Travel Destination</label>
                      <Input
                        placeholder="E.g. Dubai, UK"
                        error={!!errors.destination}
                        {...register("destination")}
                      />
                      {errors.destination && (
                        <p className="text-xs text-error mt-1.5">{errors.destination.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Service Required</label>
                      <Select
                        error={!!errors.service}
                        {...register("service")}
                      >
                        <option value="Visa">Visa Processing</option>
                        <option value="Tour Package">Tour Packages</option>
                        <option value="Air Ticket">Air Ticketing</option>
                        <option value="Hotel">Hotel Booking</option>
                        <option value="Insurance">Travel Insurance</option>
                        <option value="Other">Other Travel Services</option>
                      </Select>
                      {errors.service && (
                        <p className="text-xs text-error mt-1.5">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Estimated Travel Date</label>
                      <Input
                        type="date"
                        error={!!errors.travelDate}
                        {...register("travelDate")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Your Message</label>
                    <Textarea
                      placeholder="Tell us about your trip requirements..."
                      className="min-h-[120px] rounded-[10px]"
                      error={!!errors.message}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-error mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Inquiry →"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
