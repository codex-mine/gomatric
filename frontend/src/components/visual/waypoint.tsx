import React from 'react';
import { cn } from '@/lib/utils';

export interface WaypointProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function Waypoint({ active = false, size = 'md', label, className, ...props }: WaypointProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('relative flex items-center justify-center', className)} {...props}>
      <div
        className={cn(
          'rounded-full border-2 border-brand-accent transition-colors duration-300',
          sizeClasses[size],
          active ? 'bg-brand-accent' : 'bg-surface'
        )}
      />
      {label && (
        <span className="absolute top-full mt-2 text-xs font-medium text-text-primary whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
