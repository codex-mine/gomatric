import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';
import { CTASection as CTA } from '@/components/layout/cta';
import { Card } from '@/components/ui/card';
import { mockVisaCountries, mockVisaRequirements } from '@/lib/mock-data';
import { Check, Info, Clock, CreditCard, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: { params: { country: string } }) {
  const country = mockVisaCountries.find((c) => c.slug === params.country);
  if (!country) return { title: 'Visa Not Found' };
  return { title: `${country.country} Visa Requirements | GoMatric` };
}

export default function VisaCountryPage({ params }: { params: { country: string } }) {
  const country = mockVisaCountries.find((c) => c.slug === params.country);
  
  if (!country) {
    notFound();
  }

  // Find requirements or use a fallback
  const requirements: any = mockVisaRequirements.find(r => r.country === country.id) || mockVisaRequirements[0];

  return (
    <PageShell>
      <PageHero
        title={`${country.country} Tourist Visa`}
        subtitle="VISA SERVICES"
      />

      <Section>
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 rounded-[14px]">
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-brand-primary mt-1" />
                <div>
                  <h4 className="font-sora font-medium text-text-primary mb-1">Processing Time</h4>
                  <p className="text-text-secondary">{requirements.processingTime}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-[14px]">
              <div className="flex items-start space-x-4">
                <CreditCard className="w-6 h-6 text-brand-primary mt-1" />
                <div>
                  <h4 className="font-sora font-medium text-text-primary mb-1">Visa Fee</h4>
                  <p className="text-text-secondary">Starting from ৳{requirements.fee}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-[14px]">
              <div className="flex items-start space-x-4">
                <Info className="w-6 h-6 text-brand-primary mt-1" />
                <div>
                  <h4 className="font-sora font-medium text-text-primary mb-1">Duration</h4>
                  <p className="text-text-secondary">{requirements.duration}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 rounded-[14px]">
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-brand-primary mt-1" />
                <div>
                  <h4 className="font-sora font-medium text-text-primary mb-1">Visa Type</h4>
                  <p className="text-text-secondary">E-Visa / Sticker</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-sora text-3xl font-bold mb-6">Required Documents</h2>
              <div className="space-y-4">
                {requirements.documents.map((doc: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg bg-white">
                    <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-text-primary">{doc.name}</span>
                        {doc.required ? (
                          <Badge variant="default" className="ml-3 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20">Required</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-3">Optional</Badge>
                        )}
                      </div>
                      {doc.description && <p className="text-sm text-text-secondary">{doc.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {requirements.eligibility && (
              <div>
                <h2 className="font-sora text-3xl font-bold mb-6">Eligibility</h2>
                <ul className="list-disc pl-5 space-y-2 text-text-secondary">
                  {requirements.eligibility.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="font-sora text-3xl font-bold mb-6">Important Notes</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <ul className="list-disc pl-5 space-y-2 text-orange-800">
                  <li>Visa approval is solely at the discretion of the Embassy/Consulate.</li>
                  <li>Processing times may vary depending on the applicant's profile and embassy workload.</li>
                  <li>Visa fees are non-refundable regardless of the application outcome.</li>
                  <li>Ensure all documents are valid and truthful; false documents will lead to rejection.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-sora text-3xl font-bold mb-6">Application Procedure</h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Submit Documents', desc: 'Send us your documents physically or digitally for verification.' },
                  { step: 2, title: 'Pay Fees', desc: 'Make the payment for visa fees and our service charge.' },
                  { step: 3, title: 'Application Processing', desc: 'We prepare your file and submit it to the embassy or VFS.' },
                  { step: 4, title: 'Receive Visa', desc: 'Collect your passport with the visa from our office.' }
                ].map((s) => (
                  <div key={s.step} className="flex space-x-4">
                    <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-sora font-medium text-lg mb-1">{s.title}</h4>
                      <p className="text-text-secondary">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-[10px] text-lg bg-brand-accent hover:bg-brand-accent-dark">
                Apply for Visa →
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CTA
        title="Need help with your application?" description="" primaryAction={{ label: "Contact Support", href: "/contact" }}
      />
    </PageShell>
  );
}
