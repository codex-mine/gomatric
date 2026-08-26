import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'surface' | 'dark' | 'navy';
  padding?: 'default' | 'compact' | 'none';
  children: ReactNode;
}

export function Section({
  variant = 'default',
  padding = 'default',
  className,
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    default: 'bg-white',
    surface: 'bg-surface',
    dark: 'bg-brand-primary-dark text-white',
    navy: 'bg-brand-primary text-white',
  };

  const paddingStyles = {
    default: 'py-20 md:py-24 lg:py-32',
    compact: 'py-12 md:py-16',
    none: 'py-0',
  };

  return (
    <section
      className={cn(
        'w-full',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      {subtitle && <span className="text-brand-accent font-semibold tracking-wider uppercase text-sm">{subtitle}</span>}
      <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary">{title}</h2>
      {description && <p className="text-text-secondary text-lg max-w-2xl">{description}</p>}
    </div>
  );
}
