import { PageShell } from "@/components/layout/page-shell";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  DestinationsSection,
  VisaSection,
  ToursSection,
  TestimonialsSection,
  HowItWorksSection,
} from "@/components/sections/home";

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <DestinationsSection />
      <VisaSection />
      <ToursSection />
      <TestimonialsSection />
      <HowItWorksSection />
    </PageShell>
  );
}
