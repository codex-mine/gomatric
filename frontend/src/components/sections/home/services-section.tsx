import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { Stamp, Map, Plane, Hotel, Shield, Car } from 'lucide-react';

const services = [
  {
    title: 'Visa Services',
    description: 'Expert guidance for tourist, business, and student visas with high success rates.',
    icon: Stamp,
    href: '/services/visa',
  },
  {
    title: 'Tour Packages',
    description: 'Curated international and domestic holiday packages tailored to your preferences.',
    icon: Map,
    href: '/services/tours',
  },
  {
    title: 'Air Ticketing',
    description: 'Get the best routes and fares for your flights globally with dedicated support.',
    icon: Plane,
    href: '/services/flights',
  },
  {
    title: 'Hotel Booking',
    description: 'Comfortable stays at the best rates in premium hotels across the world.',
    icon: Hotel,
    href: '/services/hotels',
  },
  {
    title: 'Travel Insurance',
    description: 'Comprehensive coverage for medical emergencies and trip cancellations.',
    icon: Shield,
    href: '/services/insurance',
  },
  {
    title: 'Airport Transfer',
    description: 'Reliable and comfortable pick-up and drop-off services at your destination.',
    icon: Car,
    href: '/services/transport',
  },
];

export function ServicesSection() {
  return (
    <Section variant="default" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Travel Vectors */}
      <div className="absolute top-10 right-0 w-96 h-96 pointer-events-none opacity-[0.03] select-none">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full stroke-[#061474]">
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
          <ellipse cx="200" cy="200" rx="180" ry="70" strokeWidth="1" strokeDasharray="6 4" />
          <ellipse cx="200" cy="200" rx="70" ry="180" strokeWidth="1" strokeDasharray="6 4" />
          <path d="M 50,300 Q 200,100 350,250" stroke="#ED1B26" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      <Container className="relative z-10">
        <SectionHeading subtitle="SERVICES" title="Choose Your Path" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="relative bg-white border border-border rounded-[14px] p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              >
                {/* Background Card Silhouette Watermark */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 pointer-events-none opacity-[0.03] select-none group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-full h-full text-brand-primary" />
                </div>

                {/* Editorial Number */}
                <span className="absolute top-4 right-6 text-6xl font-sora font-bold text-brand-primary/5 pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <div className="w-12 h-12 bg-brand-primary/5 rounded-full flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                
                <h3 className="text-xl font-sora font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                
                <p className="text-text-secondary mb-6 line-clamp-2">
                  {service.description}
                </p>
                
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-brand-accent font-medium hover:text-brand-accent-dark transition-colors"
                >
                  Learn More &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
