'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { CoordinateLabel } from '@/components/visual/coordinate-label';
import { RouteLine } from '@/components/visual/route-line';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-brand-primary-dark flex items-center pt-20 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/20 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-bold font-sora text-white leading-tight mb-6">
            Go Beyond<br />
            Ordinary.
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-12">
            Visa assistance, tour packages, and complete travel solutions.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Link 
              href="/tours" 
              className="inline-flex items-center justify-center h-12 px-6 rounded-[10px] bg-white text-brand-primary font-medium hover:bg-surface transition-colors"
            >
              Explore Tours
            </Link>
            <Link 
              href="/visa" 
              className="inline-flex items-center justify-center h-12 px-6 rounded-[10px] border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Visa Services
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center h-12 px-6 rounded-[10px] bg-brand-accent text-white font-medium hover:bg-brand-accent-dark transition-colors"
            >
              Plan My Trip &rarr;
            </Link>
          </div>
        </div>
      </Container>
      
      {/* Bottom coordinate label */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <span className="text-xs text-white/40 font-mono">23.8103&deg; N &middot; 90.4125&deg; E</span>
      </div>
      
      {/* Red route line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-full object-cover" preserveAspectRatio="none">
          <path 
            d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60" 
            fill="none" 
            stroke="#ED1B26" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
          />
        </svg>
      </div>
    </section>
  );
}
