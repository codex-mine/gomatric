import React from 'react';
import { cn } from '@/lib/utils';

export interface CoordinateLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  lat?: number;
  lng?: number;
  coordinates?: { lat: number; lng: number; };
}

export function CoordinateLabel({ lat, lng, coordinates, className, ...props }: CoordinateLabelProps) {
  const formatCoord = (val: number, isLat: boolean) => {
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
    return `${Math.abs(val).toFixed(4)}° ${dir}`;
  };

  const l = coordinates?.lat ?? lat ?? 0;
  const lg = coordinates?.lng ?? lng ?? 0;

  return (
    <span
      className={cn(
        'text-xs text-text-muted font-mono tracking-wider uppercase',
        className
      )}
      {...props}
    >
      {formatCoord(l, true)} · {formatCoord(lg, false)}
    </span>
  );
}
