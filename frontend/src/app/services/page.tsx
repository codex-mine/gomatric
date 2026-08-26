import { PageShell } from "@/components/layout/page-shell";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CTA } from "@/components/layout/cta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Services | GoMatric",
  description: "Explore our premium travel services including visas, tours, and ticketing.",
};

const services = [
  { id: "01", name: "Visa Services", desc: "Expert guidance and processing for tourist, business, and student visas worldwide." },
  { id: "02", name: "Tour Packages", desc: "Curated experiences and custom itineraries for your perfect getaway." },
  { id: "03", name: "Air Ticketing", desc: "Competitive rates and seamless booking for domestic and international flights." },
  { id: "04", name: "Hotel Booking", desc: "Comfortable stays matched to your preferences and budget." },
  { id: "05", name: "Travel Insurance", desc: "Comprehensive coverage for peace of mind during your journey." },
  { id: "06", name: "Airport Transfer", desc: "Reliable and comfortable transportation to and from the airport." },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero 
        title="Everything Between Here And There." 
        subtitle="OUR SERVICES" 
      />

      <Section>
        <Container>
          <div className="flex flex-col">
            {services.map((service) => (
              <div key={service.id} className="group border-t border-border last:border-b py-12 md:py-16 hover:bg-surface transition-colors">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-center px-4 md:px-8">
                  <div className="text-brand-accent/50 font-sora text-4xl md:text-5xl font-bold md:w-1/12">
                    {service.id}
                  </div>
                  <div className="md:w-4/12">
                    <h3 className="font-sora font-bold text-3xl md:text-4xl text-brand-primary group-hover:text-brand-accent transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <div className="md:w-5/12">
                    <p className="text-lg text-text-secondary">
                      {service.desc}
                    </p>
                  </div>
                  <div className="md:w-2/12 flex md:justify-end">
                    <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center gap-2 font-medium text-brand-primary hover:text-brand-accent transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA 
        title="Need a custom solution?" 
        description="Our experts can tailor a package specifically for your travel needs."
        buttonText="Book a Consultation"
        buttonLink="/contact"
      />
    </PageShell>
  );
}
