import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { mockTours } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock } from 'lucide-react';

export function ToursSection() {
  const featuredTours = mockTours.slice(0, 4);

  return (
    <Section variant="default" className="py-20 md:py-32">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <SectionHeading subtitle="JOURNEYS" title="Find Your Next Escape" className="mb-0" />
          <Link href="/tours" className="hidden md:inline-flex text-brand-primary font-medium hover:text-brand-accent transition-colors">
            View All Tours &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden group hover:shadow-lg transition-shadow border-border">
              {/* Image Placeholder */}
              <div className="h-48 relative bg-gradient-to-br from-brand-primary/10 to-brand-primary/30 overflow-hidden">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-primary">
                  {tour.destination}
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-1 text-warning mb-3">
                  <Star className="fill-warning w-4 h-4" />
                  <span className="text-sm font-medium text-text-primary">{tour.rating?.average || 5}</span>
                </div>
                
                <h3 className="text-lg font-sora font-semibold text-text-primary mb-3 line-clamp-2 h-14">
                  {tour.title}
                </h3>
                
                <div className="flex items-center text-text-secondary text-sm mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  {tour.duration} Days
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-text-muted">Starting from</p>
                    <p className="text-lg font-bold text-brand-primary">${tour.price}</p>
                  </div>
                  <Link 
                    href={`/tours/${tour.slug}`}
                    className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark transition-colors"
                  >
                    View Journey &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
