import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <PageShell>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        {/* Dead end route visual */}
        <div className="mb-8 relative w-24 h-24 flex items-center justify-center">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-brand-accent animate-pulse">
            <path 
              d="M 50 10 L 50 80 M 30 60 L 50 80 L 70 60" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <circle cx="50" cy="10" r="6" fill="currentColor" />
            <line x1="20" y1="90" x2="80" y2="90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="font-sora text-6xl md:text-8xl font-bold text-brand-primary-dark mb-4 tracking-tighter">LOST?</h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-md mx-auto">
          Looks like this route doesn&apos;t exist. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/">
            <Button size="lg" className="h-14 px-8 rounded-md bg-brand-primary hover:bg-brand-primary-hover text-lg w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-md border-brand-primary text-brand-primary hover:bg-brand-primary/5 text-lg w-full sm:w-auto">
              Explore Destinations <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
