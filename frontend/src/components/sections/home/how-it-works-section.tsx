import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/layout/section-heading';

const steps = [
  {
    title: 'Choose a service',
    description: 'Select from our wide range of travel and visa solutions tailored to your needs.',
  },
  {
    title: 'Submit your requirements',
    description: 'Provide basic details and upload necessary documents through our secure portal.',
  },
  {
    title: 'GoMatric prepares your solution',
    description: 'Our experts handle the heavy lifting, processing your request with precision.',
  },
  {
    title: 'Travel with confidence',
    description: 'Receive your visa or itinerary and embark on your journey worry-free.',
  },
];

export function HowItWorksSection() {
  return (
    <Section variant="default" className="py-20 md:py-32">
      <Container>
        <SectionHeading subtitle="PROCESS" title="How It Works" className="text-center mb-16" />
        
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10">
            <div className="absolute top-0 left-0 h-full bg-brand-accent w-1/3 opacity-50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Number / Waypoint */}
                <div className="w-24 h-24 bg-surface border-4 border-white rounded-full flex items-center justify-center shadow-sm mb-6 relative z-10">
                  <span className="text-3xl font-sora font-bold text-brand-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-xl font-sora font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
