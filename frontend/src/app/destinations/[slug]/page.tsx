import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { mockDestinations, mockTours } from '@/lib/mock-data';
import { CoordinateLabel } from '@/components/visual/coordinate-label';
import { Sun, Coins, Languages, Plane, FileText, ArrowRight, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CTASection as CTA } from '@/components/layout/cta';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const destination = mockDestinations.find((d) => (d.slug || d.id) === resolvedParams.slug);
  if (!destination) return { title: 'Destination Not Found' };
  return { title: `${destination.name}, ${destination.country} | GoMatric` };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const destination = mockDestinations.find((d) => (d.slug || d.id) === resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  const relatedTours = mockTours.filter(t => 
    (t.destination && t.destination.toLowerCase() === destination.name.toLowerCase()) || 
    (t.country && t.country.toLowerCase() === destination.country.toLowerCase())
  ).slice(0, 3);

  return (
    <PageShell>
      {/* Cinematic Hero */}
      <div className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center">
        <Image
          src={destination.image?.src || '/images/placeholder.jpg'}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative z-10 text-white text-center flex flex-col items-center">
          <CoordinateLabel coordinates={destination.coordinates} className="text-white border-white/30 mb-8 backdrop-blur-sm bg-black/20" />
          <h1 className="font-sora text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4">{destination.name}</h1>
          <p className="font-sora text-2xl md:text-3xl text-white/90 tracking-wide uppercase">{destination.country}</p>
        </Container>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-brand-primary-dark text-white py-8 border-b border-white/10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <Sun className="w-6 h-6 mb-2 text-brand-accent" />
              <span className="text-sm text-white/60 mb-1">Best Time</span>
              <span className="font-medium">{destination.bestTimeToVisit || 'Oct - Mar'}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Coins className="w-6 h-6 mb-2 text-brand-accent" />
              <span className="text-sm text-white/60 mb-1">Currency</span>
              <span className="font-medium">{destination.currency || 'USD'}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Languages className="w-6 h-6 mb-2 text-brand-accent" />
              <span className="text-sm text-white/60 mb-1">Language</span>
              <span className="font-medium">{destination.language || 'English'}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Plane className="w-6 h-6 mb-2 text-brand-accent" />
              <span className="text-sm text-white/60 mb-1">Flight Time</span>
              <span className="font-medium">{destination.flightTime || '~4.5 Hours'}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <FileText className="w-6 h-6 mb-2 text-brand-accent" />
              <span className="text-sm text-white/60 mb-1">Visa</span>
              <span className="font-medium">{destination.visaRequirement || (destination.visaRequired ? 'Required' : 'Visa on Arrival')}</span>
            </div>
          </div>
        </Container>
      </div>

      <Section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-sora text-4xl font-bold mb-6">Discover {destination.name}</h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              {destination.description || `Experience the magic of ${destination.name}. From stunning landscapes to vibrant city life, this destination offers an unforgettable journey tailored just for you. Explore rich culture, exquisite cuisine, and breathtaking views.`}
            </p>
          </div>

          {/* Popular Experiences */}
          <div className="mb-24">
            <h3 className="font-sora text-3xl font-bold mb-10 text-center">Must Do Experiences</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {(destination.popularAttractions || ['City Exploration', 'Cultural Highlights', 'Scenic Adventures']).map((exp, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-6 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-end p-6">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <span className="relative z-10 font-sora text-3xl font-bold text-white/20">0{i + 1}</span>
                  </div>
                  <h4 className="font-sora text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{exp}</h4>
                  <p className="text-text-secondary">A curated travel experience highlighting the finest sights in {destination.name}.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Services */}
          <div className="bg-surface rounded-md p-8 md:p-12 mb-24">
            <h3 className="font-sora text-2xl font-bold mb-8 text-center">Services in {destination.name}</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Link href={`/visa/${destination.slug || destination.id}`}>
                <Card className="p-6 flex items-center justify-between hover:border-brand-primary/50 transition-colors group">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-sora font-semibold text-lg">Visa Processing</h4>
                      <p className="text-sm text-text-secondary">Check requirements & apply</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                </Card>
              </Link>
              <Link href="/tours">
                <Card className="p-6 flex items-center justify-between hover:border-brand-primary/50 transition-colors group">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-sora font-semibold text-lg">Tour Packages</h4>
                      <p className="text-sm text-text-secondary">View available itineraries</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                </Card>
              </Link>
            </div>
          </div>

          {/* Related Tours */}
          {relatedTours.length > 0 && (
            <div>
              <div className="flex justify-between items-end mb-10">
                <h3 className="font-sora text-3xl font-bold">Journeys in {destination.name}</h3>
                <Link href="/tours" className="text-brand-primary font-medium hover:underline hidden md:block">
                  View all tours
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedTours.map((tour) => (
                  <Link key={tour.id} href={`/tours/${tour.slug || tour.id}`}>
                    <Card className="overflow-hidden group hover:shadow-lg transition-all rounded-md">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-primary/20 to-brand-primary/5">
                        <Image src={tour.image?.src || '/images/placeholder.jpg'} alt={tour.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-sora font-bold text-lg mb-2">{tour.title}</h4>
                        <div className="flex justify-between items-center text-sm text-text-secondary">
                          <span>{tour.duration}</span>
                          <span className="font-bold text-brand-primary">৳{tour.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>

      <CTA
        title={`Start planning your ${destination.name} journey`}
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </PageShell>
  );
}
