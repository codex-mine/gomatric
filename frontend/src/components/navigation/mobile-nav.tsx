'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { name: 'Explore', href: '/explore' },
  { name: 'Visa', href: '/visa' },
  { name: 'Journeys', href: '/journeys' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Travel Guide', href: '/travel-guide' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove('nav-open');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] bg-brand-primary-dark transition-transform duration-300 ease-in-out flex flex-col',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex items-center justify-between px-5 md:px-8 py-6">
        <span className="font-sora font-bold text-xl text-white">GoMatric</span>
        <button
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 md:px-8 py-10 flex flex-col gap-6">
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-sora text-3xl font-semibold text-white/90 hover:text-white hover:translate-x-2 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-5 md:p-8 bg-brand-primary border-t border-white/10">
        <Link
          href="/start"
          className="w-full h-14 rounded-[10px] bg-brand-accent hover:bg-brand-accent-dark text-white font-medium flex items-center justify-center transition-colors text-lg"
        >
          Start Your Journey &rarr;
        </Link>
      </div>
    </div>
  );
}
