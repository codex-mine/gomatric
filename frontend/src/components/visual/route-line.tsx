import React from 'react';
import { cn } from '@/lib/utils';

export interface RouteLineProps extends React.SVGProps<SVGSVGElement> {
  direction?: 'horizontal' | 'vertical' | 'curved';
  animated?: boolean;
}

export function RouteLine({ direction = 'horizontal', animated = false, className, ...props }: RouteLineProps) {
  const isHorizontal = direction === 'horizontal';
  const isVertical = direction === 'vertical';
  const isCurved = direction === 'curved';

  return (
    <svg
      className={cn(
        'absolute pointer-events-none stroke-brand-accent',
        isHorizontal && 'w-full h-8 top-1/2 -translate-y-1/2',
        isVertical && 'h-full w-8 left-1/2 -translate-x-1/2',
        isCurved && 'w-full h-full',
        className
      )}
      viewBox={
        isHorizontal ? '0 0 100 20' : isVertical ? '0 0 20 100' : '0 0 100 100'
      }
      preserveAspectRatio="none"
      fill="none"
      strokeWidth={2}
      {...props}
    >
      {isHorizontal && (
        <path
          d="M0 10 Q 25 20, 50 10 T 100 10"
          className={cn(animated && 'animate-dash')}
          strokeDasharray={animated ? '6,6' : 'none'}
        />
      )}
      {isVertical && (
        <path
          d="M10 0 Q 20 25, 10 50 T 10 100"
          className={cn(animated && 'animate-dash')}
          strokeDasharray={animated ? '6,6' : 'none'}
        />
      )}
      {isCurved && (
        <path
          d="M0 0 C 50 0, 50 100, 100 100"
          className={cn(animated && 'animate-dash')}
          strokeDasharray={animated ? '6,6' : 'none'}
        />
      )}
    </svg>
  );
}
