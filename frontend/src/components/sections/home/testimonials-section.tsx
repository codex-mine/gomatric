import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/layout/section-heading';
import { mockTestimonials } from '@/lib/mock-data';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  // Take first 3 for the homepage
  const testimonials = mockTestimonials.slice(0, 3);

  return (
    <Section variant="surface" className="py-20 md:py-32">
      <Container>
        <SectionHeading subtitle="TESTIMONIALS" title="What Travelers Say" className="text-center" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-[14px] border border-border/60 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-6 text-6xl text-brand-primary/5 font-serif leading-none">
                &rdquo;
              </div>
              
              <div className="flex gap-1 mb-6 text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-warning' : 'fill-border text-border'}`} />
                ))}
              </div>
              
              <p className="text-text-secondary italic mb-8 relative z-10 line-clamp-4">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center font-bold text-brand-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-sora font-semibold text-text-primary text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-text-muted mt-0.5">Traveled to {testimonial.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
