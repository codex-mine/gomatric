import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { PageHero } from '@/components/layout/hero';
import { Container } from '@/components/layout/container';
import { CTASection as CTA } from '@/components/layout/cta';
import { mockDestinations } from '@/lib/mock-data';
import { ArrowRight, MapPin } from 'lucide-react';
import { CoordinateLabel } from '@/components/visual/coordinate-label';

export const metadata: Metadata = {
  title: 'Destinations | GoMatric',
  description: 'Explore our top travel destinations across the globe.',
};

export default function DestinationsPage() {
  const featured = mockDestinations[0];
  const rest = mockDestinations.slice(1);

  return (
    <PageShell>
      <PageHero
        title="The World Is Yours."
        subtitle="DESTINATIONS"
      />

      <Section>
        <Container>
          {/* Featured Destination */}
          {featured && (
            <Link href={`/destinations/${featured.slug || featured.id}`} className="block mb-16 group">
              <div className="relative h-[500px] md:h-[600px] rounded-md overflow-hidden">
                <Image
                  src={featured.image?.src || '/images/placeholder.jpg'}
                  alt={featured.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:justify-between md:items-end text-white">
                  <div>
                    <div className="mb-4">
                      <CoordinateLabel coordinates={featured.coordinates} className="text-white/80 border-white/20" />
                    </div>
                    <h2 className="font-sora text-5xl md:text-7xl font-bold mb-2">{featured.name}</h2>
                    <p className="text-xl md:text-2xl text-white/90">{featured.country}</p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-accent text-white group-hover:bg-white group-hover:text-brand-accent transition-colors">
                      <ArrowRight className="w-6 h-6" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((dest, i) => (
              <Link key={dest.id} href={`/destinations/${dest.slug || dest.id}`} className="group block">
                <div className={`relative rounded-md overflow-hidden ${i % 4 === 0 || i % 4 === 3 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                  <Image
                    src={dest.image?.src || '/images/placeholder.jpg'}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <div className="bg-black/30 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                      <MapPin className="w-3 h-3 mr-1.5" />
                      {i + 2} Tours
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="font-sora text-3xl font-bold mb-1">{dest.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-white/80">{dest.country}</p>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-accent" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTA
        title="Don't know where to go next?"
        buttonText="Get Inspired"
        buttonHref="/travel-guide"
      />
    </PageShell>
  );
}
