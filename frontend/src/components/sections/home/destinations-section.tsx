'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { mockDestinations } from '@/lib/mock-data';
import { CoordinateLabel } from '@/components/visual/coordinate-label';

export function DestinationsSection() {
  const featured = mockDestinations.slice(0, 6);

  return (
    <Section variant="surface" className="py-20 md:py-32">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <SectionHeading subtitle="DESTINATIONS" title="Where Will You Go?" className="mb-0" />
          <Link href="/destinations" className="hidden md:inline-flex text-brand-primary font-medium hover:text-brand-accent transition-colors">
            View All Destinations &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {featured.map((dest, index) => {
            const isLarge = index === 0;
            return (
              <Link 
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className={`group relative overflow-hidden rounded-[14px] ${isLarge ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-auto' : 'h-[250px] md:h-auto'}`}
              >
                {/* Placeholder Image background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-dark/80 to-brand-primary/60 group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col justify-end">
                  <div className="mb-1 text-white/70">
                    <CoordinateLabel coordinates={dest.coordinates || "00.0000° N · 00.0000° E"} />
                  </div>
                  <h3 className={`font-sora font-semibold text-white ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                    {dest.name}
                  </h3>
                  <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="inline-flex items-center text-sm font-medium text-white">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/destinations" className="inline-flex text-brand-primary font-medium">
            View All Destinations &rarr;
          </Link>
        </div>
      </Container>
    </Section>
  );
}
