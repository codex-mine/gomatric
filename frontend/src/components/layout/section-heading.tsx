import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align = 'left',
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center mx-auto',
        className
      )}
    >
      {subtitle && (
        <span className="text-brand-accent uppercase tracking-wider text-sm font-semibold">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-sora text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          dark ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-lg max-w-2xl mt-2',
            dark ? 'text-white/80' : 'text-text-secondary'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
