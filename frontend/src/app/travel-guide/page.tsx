import { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';
import { CTASection as CTA } from '@/components/layout/cta';
import { GuideClient } from './guide-client';

export const metadata: Metadata = {
  title: 'Travel Guide | GoMatric',
  description: 'Tips, guides, and inspiration for your next journey.',
};

export default function TravelGuidePage() {
  return (
    <PageShell>
      <PageHero
        title="Before You Go."
        subtitle="TRAVEL GUIDE"
      />
      <Section>
        <Container>
          <GuideClient />
        </Container>
      </Section>
      <CTA
        title="Subscribe to our newsletter for travel tips." description="" primaryAction={{ label: "Subscribe Now", href: "#subscribe" }}
      />
    </PageShell>
  );
}
