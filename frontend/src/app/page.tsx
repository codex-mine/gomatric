import { PageShell } from '@/components/layout/page-shell';
import {
  HeroSection,
  ServicesSection,
  DestinationsSection,
  VisaSection,
  ToursSection,
  WhySection,
  TestimonialsSection,
  HowItWorksSection,
  CtaFinalSection,
} from '@/components/sections/home';

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <ServicesSection />
      <DestinationsSection />
      <VisaSection />
      <ToursSection />
      <WhySection />
      <TestimonialsSection />
      <HowItWorksSection />
      <CtaFinalSection />
    </PageShell>
  );
}
