import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageShell } from '@/components/layout/page-shell';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { mockTours } from '@/lib/mock-data';
import { Star, MapPin, Clock, Calendar, Check, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RouteLine } from '@/components/visual/route-line';
import { Waypoint } from '@/components/visual/waypoint';
import { CTASection as CTA } from '@/components/layout/cta';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const tour = mockTours.find((t) => (t.slug || t.id) === resolvedParams.slug);
  if (!tour) return { title: 'Tour Not Found' };
  return { title: `${tour.title} | GoMatric Tours` };
}

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const tour = mockTours.find((t) => (t.slug || t.id) === resolvedParams.slug);

  if (!tour) {
    notFound();
  }

  return (
    <PageShell>
      {/* Cinematic Hero */}
      <div className="relative h-[70vh] min-h-[500px] w-full flex items-end pb-20 bg-brand-primary-dark">
        <Image
          src={tour.image?.src || '/images/placeholder.jpg'}
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <Container className="relative z-10 text-white w-full">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-4">
              <span className="flex items-center text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 mr-2" />
                {tour.destination || 'Global'}, {tour.country || ''}
              </span>
              <span className="flex items-center text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-2" />
                {tour.duration}
              </span>
            </div>
            <h1 className="font-sora text-4xl md:text-6xl font-bold leading-tight mb-6">{tour.title}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1 fill-yellow-400" />
                <span className="font-medium">{tour.rating?.average || 5}</span>
                <span className="text-white/60 text-sm ml-2">(124 reviews)</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section className="py-12 md:py-20 bg-surface">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12 relative">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Overview */}
              <div>
                <h2 className="font-sora text-3xl font-bold mb-6 text-text-primary">Overview</h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {tour.description || tour.overview || 'Experience the beauty and culture of this amazing destination. Our carefully crafted itinerary ensures you get the most out of your journey, blending iconic landmarks with hidden gems.'}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-sora text-3xl font-bold mb-6 text-text-primary">Highlights</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(tour.highlights || ['Guided city tours', 'Premium accommodation', 'Airport transfers', 'Daily breakfast']).map((highlight, idx) => (
                    <div key={idx} className="flex items-start bg-white p-4 rounded-md border border-border">
                      <Check className="w-5 h-5 text-brand-accent mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-text-secondary font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="font-sora text-3xl font-bold mb-8 text-text-primary">Itinerary</h2>
                <div className="relative pl-8">
                  <RouteLine direction="vertical" className="absolute left-0 top-4 bottom-4 w-px opacity-30" />
                  
                  {(tour.itinerary || [
                    { day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, hotel transfer.' },
                    { day: 2, title: 'City Exploration', description: 'Explore top landmarks and cultural sites.' },
                    { day: 3, title: 'Departure', description: 'Final shopping and airport transfer.' },
                  ]).map((item) => (
                    <div key={item.day} className="relative mb-12 last:mb-0">
                      <Waypoint
                        className="absolute -left-[39px] top-1"
                        active={true}
                      />
                      <div className="bg-white p-6 rounded-md border border-border shadow-sm">
                        <div className="text-brand-accent font-sora font-bold text-sm tracking-wider uppercase mb-2">Day {item.day}</div>
                        <h3 className="font-sora text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-sora text-2xl font-bold mb-6 flex items-center">
                    <Check className="w-6 h-6 text-green-500 mr-2" /> Included
                  </h3>
                  <ul className="space-y-3">
                    {(tour.inclusions?.map(i => i.label) || ['Hotel Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Sightseeing as per itinerary', 'English speaking guide']).map((item, idx) => (
                      <li key={idx} className="flex items-start text-text-secondary">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-sora text-2xl font-bold mb-6 flex items-center">
                    <X className="w-6 h-6 text-brand-accent mr-2" /> Not Included
                  </h3>
                  <ul className="space-y-3">
                    {(tour.exclusions || ['International Flights', 'Visa Fees', 'Personal Expenses', 'Travel Insurance', 'Meals not mentioned']).map((item, idx) => (
                      <li key={idx} className="flex items-start text-text-secondary">
                        <X className="w-5 h-5 text-brand-accent mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-md border border-border shadow-lg p-6 lg:p-8">
                <div className="mb-6">
                  <p className="text-text-muted text-sm mb-1">Starting from</p>
                  <div className="font-sora font-bold text-4xl text-brand-primary">
                    ৳{tour.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">per person</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-text-secondary">
                    <Calendar className="w-5 h-5 mr-3 text-brand-primary" />
                    <span>Multiple dates available</span>
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <ShieldAlert className="w-5 h-5 mr-3 text-brand-primary" />
                    <span>Free cancellation up to 48 hours</span>
                  </div>
                </div>

                <Button className="w-full h-14 rounded-md text-lg bg-brand-accent hover:bg-brand-accent-dark mb-4">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full h-14 rounded-md text-lg border-brand-primary text-brand-primary hover:bg-brand-primary/5">
                  Download Itinerary
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      <CTA
        title="Ready for an unforgettable experience?"
        buttonText="Contact our travel experts"
        buttonHref="/contact"
      />
    </PageShell>
  );
}
