import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { RouteLine } from '@/components/visual/route-line';
import { Waypoint } from '@/components/visual/waypoint';

const steps = [
  { label: 'Consult', description: 'Expert advice on requirements.' },
  { label: 'Documents', description: 'Gather and verify papers.' },
  { label: 'Application', description: 'Submission and fee payment.' },
  { label: 'Processing', description: 'Track your visa status.' },
  { label: 'Decision', description: 'Receive your approved visa.' },
];

export function VisaSection() {
  return (
    <Section variant="surface" className="py-20 md:py-32 overflow-hidden border-t border-border/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold font-sora text-text-primary leading-tight mb-6">
              Less Paperwork.<br />
              <span className="text-brand-primary">More Possibilities.</span>
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-md">
              Navigating visa requirements can be complex. Our expert team simplifies the process, maximizing your chances of approval with personalized guidance.
            </p>
            <Link 
              href="/visa" 
              className="inline-flex items-center justify-center h-12 px-8 rounded-[10px] bg-brand-accent text-white font-medium hover:bg-brand-accent-dark transition-colors"
            >
              Apply for Visa &rarr;
            </Link>
          </div>
          
          <div className="relative py-12 px-4">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/5 rounded-full blur-2xl -z-10" />
            
            <div className="relative border-l-2 border-brand-accent/20 pl-8 space-y-12 ml-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Waypoint dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-2 border-brand-accent rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  </div>
                  
                  <h4 className="text-xl font-sora font-semibold text-text-primary mb-1">
                    {index + 1}. {step.label}
                  </h4>
                  <p className="text-text-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
