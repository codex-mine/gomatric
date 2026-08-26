'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';

const NAV_LINKS = [
  { name: 'Explore', href: '/explore' },
  { name: 'Visa', href: '/visa' },
  { name: 'Journeys', href: '/journeys' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Travel Guide', href: '/travel-guide' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border py-4'
            : 'bg-transparent py-6'
        )}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span
              className={cn(
                'font-sora font-bold text-xl transition-colors',
                isScrolled ? 'text-brand-primary' : 'text-white'
              )}
            >
              GoMatric
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-brand-accent',
                    isScrolled
                      ? isActive
                        ? 'text-brand-primary font-semibold'
                        : 'text-text-secondary'
                      : isActive
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/contact"
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-accent',
                isScrolled ? 'text-text-secondary' : 'text-white/80 hover:text-white'
              )}
            >
              Contact
            </Link>
            <Link
              href="/start"
              className="h-11 px-6 rounded-[10px] bg-brand-accent hover:bg-brand-accent-dark text-white font-medium flex items-center justify-center transition-colors"
            >
              Start Your Journey &rarr;
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn(
              'lg:hidden p-2 z-50 relative',
              isScrolled ? 'text-brand-primary' : 'text-white'
            )}
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}
