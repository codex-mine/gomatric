import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Section, SectionHeading } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';
import { CTASection as CTA } from '@/components/layout/cta';
import { Card } from '@/components/ui/card';
import { RouteLine } from '@/components/visual/route-line';
import { Waypoint } from '@/components/visual/waypoint';
import { mockVisaCountries } from '@/lib/mock-data';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Visa Services | GoMatric',
  description: 'Apply for tourist and business visas to destinations worldwide.',
};

export default function VisaPage() {
  const popularCountries = mockVisaCountries.filter(c => c.popular).slice(0, 4);
  const otherCountries = mockVisaCountries.filter(c => !c.popular);

  return (
    <PageShell>
      <PageHero
        title="Less Paperwork. More Possibilities."
        subtitle="VISA SERVICES"
      />

      <Section>
        <Container>
          <SectionHeading
            title="Popular Destinations"
            subtitle="Most requested visas"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCountries.map((country) => (
              <Card key={country.id} className="group overflow-hidden rounded-md p-6 hover:shadow-lg transition-all border-border relative">
                <div className="aspect-square bg-slate-100 rounded-md mb-6 overflow-hidden relative">
                  <Image
                    src={country.image?.src || '/images/placeholder.jpg'}
                    alt={`${country.country} visa`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-sora font-semibold text-xl">{country.country}</h3>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {country.visaTypes.map((type: any, i: number) => (
                    <div key={i} className="flex items-center text-sm text-text-secondary">
                      <Check className="w-4 h-4 mr-2 text-brand-accent" />
                      {type.name || type}
                    </div>
                  ))}
                </div>
                <Link
                  href={`/visa/${country.slug}`}
                  className="inline-flex items-center text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                title="How It Works"
                subtitle="The Process"
                description="We simplify the complex visa application process. From consultation to document preparation and submission, our experts guide you every step of the way."
              />
            </div>
            <div className="relative pl-8">
              <RouteLine className="absolute left-0 top-4 bottom-4 w-px bg-border" color="brand-accent" />
              <div className="space-y-12">
                {[
                  { title: 'Consult', desc: 'Expert advice on visa requirements based on your profile.' },
                  { title: 'Documents', desc: 'Gather and prepare all necessary documentation accurately.' },
                  { title: 'Application', desc: 'We submit your application and handle any queries.' },
                  { title: 'Processing', desc: 'Track your application status in real-time.' },
                  { title: 'Decision', desc: 'Receive your approved visa and get ready to travel.' },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <Waypoint
                      className="absolute -left-[39px] top-1"
                      color="brand-accent"
                      active={true}
                    />
                    <h4 className="font-sora font-semibold text-lg mb-2 text-text-primary">{step.title}</h4>
                    <p className="text-text-secondary">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            title="All Destinations"
            subtitle="Explore More"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherCountries.map((country) => (
              <Link key={country.id} href={`/visa/${country.slug}`}>
                <Card className="p-4 hover:border-brand-primary/20 hover:shadow-md transition-all rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-surface overflow-hidden relative">
                      <Image
                        src={country.image?.src || '/images/flag-placeholder.jpg'}
                        alt={`${country.country} flag`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">{country.country}</h4>
                      <p className="text-xs text-text-muted">{country.visaTypes.length} Visa Types</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTA
        title="Ready to apply? Start your visa journey today." description="" primaryAction={{ label: "Get Free Consultation", href: "/contact" }}
      />
    </PageShell>
  );
}
