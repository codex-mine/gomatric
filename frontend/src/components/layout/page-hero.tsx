import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
  size?: 'default' | 'large';
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  children,
  size = 'default',
  className,
}: PageHeroProps) {
  const isLarge = size === 'large';
  
  return (
    <section
      className={cn(
        'relative w-full flex items-center justify-center overflow-hidden',
        isLarge ? 'pt-40 pb-28 min-h-[70vh]' : 'pt-32 pb-20 min-h-[50vh]',
        className
      )}
    >
      {/* Background Image & Overlay */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary-dark/80 via-brand-primary-dark/50 to-brand-primary-dark/90 z-0" />
        </>
      ) : (
        <div className="absolute inset-0 bg-brand-primary-dark z-0" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col items-center text-center">
        {subtitle && (
          <span className="text-brand-accent uppercase tracking-[0.2em] text-sm font-semibold mb-6 block">
            {subtitle}
          </span>
        )}
        
        <h1 className="font-sora text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 max-w-4xl">
          {title}
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {description}
          </p>
        )}
        
        {children && (
          <div className="w-full flex justify-center mt-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
