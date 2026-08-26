import { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';
import { CTASection as CTA } from '@/components/layout/cta';
import { ToursClient } from './tours-client';

export const metadata: Metadata = {
  title: 'Tour Packages | GoMatric',
  description: 'Discover curated tour packages to the worlds most stunning destinations.',
};

export default function ToursPage() {
  return (
    <PageShell>
      <PageHero
        title="Find Your Next Escape."
        subtitle="JOURNEYS"
      />
      <Section>
        <Container>
          <ToursClient />
        </Container>
      </Section>
      <CTA
        title="Can't find what you're looking for?"
        buttonText="Request Custom Tour"
        buttonHref="/contact"
      />
    </PageShell>
  );
}
