import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/ui/container';

export function CtaFinalSection() {
  return (
    <Section variant="navy" className="py-24 bg-brand-primary-dark text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent rounded-full blur-3xl opacity-10 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold font-sora mb-6 leading-tight">
            Ready to plan your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">next journey?</span>
          </h2>
          
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Talk to a GoMatric travel expert today and let us handle the details while you pack your bags.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-[10px] bg-brand-accent text-white font-semibold text-lg hover:bg-brand-accent-dark transition-colors"
            >
              Start Your Journey &rarr;
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-[10px] border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
