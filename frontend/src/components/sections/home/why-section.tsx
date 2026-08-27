import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { Users, FileText, Settings, CreditCard, Headphones, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    title: 'Experienced Travel Experts',
    description: 'Our team brings years of industry knowledge to plan your perfect trip without hassle.',
    icon: Users,
  },
  {
    title: 'Expert Visa Assistance',
    description: 'High success rates and meticulous attention to detail for all visa applications.',
    icon: FileText,
  },
  {
    title: 'Customized Packages',
    description: 'Tailor-made itineraries that suit your budget, preferences, and travel style.',
    icon: Settings,
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees or unexpected charges. You know exactly what you are paying for.',
    icon: CreditCard,
  },
  {
    title: '24/7 Customer Support',
    description: 'We are always here for you, from the planning stage until you return home safely.',
    icon: Headphones,
  },
  {
    title: 'Secure Document Handling',
    description: 'Your sensitive personal data and documents are processed with maximum security.',
    icon: ShieldCheck,
  },
];

export function WhySection() {
  return (
    <Section variant="navy" className="py-20 md:py-32 bg-brand-primary-dark text-white relative overflow-hidden">
      {/* Background Travel Vectors — Compass Dial & Coordinate Grid */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-[0.03] select-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-white">
          <circle cx="150" cy="150" r="140" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="150" cy="150" r="90" strokeWidth="1" />
          <polygon points="150,20 160,140 280,150 160,160 150,280 140,160 20,150 140,140" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute -bottom-16 right-10 w-80 h-80 pointer-events-none opacity-[0.03] select-none">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full stroke-white">
          <ellipse cx="150" cy="150" rx="140" ry="60" strokeWidth="1" strokeDasharray="5 5" />
          <ellipse cx="150" cy="150" rx="60" ry="140" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="150" cy="150" r="140" strokeWidth="1" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-sora mb-4">Why GoMatric?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We deliver exceptional travel experiences backed by trust, expertise, and personalized care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-md bg-white/10 flex items-center justify-center mb-6 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-sora font-semibold mb-3">{reason.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
