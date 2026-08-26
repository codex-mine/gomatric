import Link from 'next/link';
import { Section } from './section';
import { cn } from '@/lib/utils';

interface Action {
  label: string;
  href: string;
}

export interface CtaSectionProps {
  title: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  buttonText?: string;
  buttonHref?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  variant?: 'navy' | 'dark';
}

export function CtaSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  buttonText,
  buttonHref,
  buttonLink,
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'navy',
}: CtaSectionProps) {
  const resolvedPrimary: Action = primaryAction || {
    label: buttonText || 'Get Started',
    href: buttonHref || buttonLink || '/contact',
  };

  const resolvedSecondary: Action | undefined = secondaryAction || (
    secondaryButtonText && secondaryButtonHref
      ? { label: secondaryButtonText, href: secondaryButtonHref }
      : undefined
  );

  return (
    <Section variant={variant} className="relative overflow-hidden">
      {/* Decorative Red Line */}
      <div className="absolute -top-24 -right-24 w-64 h-64 border-[1px] border-brand-accent rounded-full opacity-20" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 border-[1px] border-brand-accent rounded-full opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto py-8">
        <h2 className="font-sora text-4xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            {description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href={resolvedPrimary.href}
            className="w-full sm:w-auto h-12 px-8 rounded-[10px] bg-brand-accent hover:bg-brand-accent-dark text-white font-medium flex items-center justify-center transition-colors shadow-lg shadow-brand-accent/20"
          >
            {resolvedPrimary.label}
          </Link>
          
          {resolvedSecondary && (
            <Link
              href={resolvedSecondary.href}
              className={cn(
                "w-full sm:w-auto h-12 px-8 rounded-[10px] font-medium flex items-center justify-center transition-colors border",
                variant === 'navy' 
                  ? "border-white/20 hover:bg-white/10 text-white" 
                  : "border-white/20 hover:bg-white/10 text-white"
              )}
            >
              {resolvedSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
