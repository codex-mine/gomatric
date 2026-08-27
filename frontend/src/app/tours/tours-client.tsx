'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockTours } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ToursClient() {
  const [filter, setFilter] = useState('All');
  
  const types = ['All', 'Adventure', 'Cultural', 'Relaxation', 'Luxury'];

  const filteredTours = filter === 'All' 
    ? mockTours 
    : mockTours.filter(tour => (tour.travelType && tour.travelType.includes(filter)) || tour.packageType === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        {types.map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'primary' : 'outline'}
            onClick={() => setFilter(type)}
            className={`rounded-full h-10 px-6 ${
              filter === type 
                ? 'bg-brand-primary text-white hover:bg-brand-primary-hover' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden rounded-md border-border group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-primary/20 to-brand-primary/5">
              <Image
                src={tour.image?.src || '/images/placeholder.jpg'}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {tour.badge && (
                <Badge className="absolute top-4 left-4 bg-brand-accent text-white border-none font-medium px-3 py-1">
                  {tour.badge}
                </Badge>
              )}

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center text-sm mb-2 text-white/80">
                      <MapPin className="w-4 h-4 mr-1" />
                      {tour.destination || 'Global'}, {tour.country || ''}
                    </div>
                    <h3 className="font-sora font-semibold text-2xl mb-1">{tour.title}</h3>
                  </div>
                  <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-2 py-1 text-sm font-medium">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                    {tour.rating?.average || 5}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-text-secondary text-sm">
                  <Clock className="w-4 h-4 mr-2 text-brand-primary" />
                  {tour.duration}
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-muted mb-0.5">Starting from</p>
                  <p className="font-sora font-bold text-xl text-brand-primary">৳{tour.price.toLocaleString()}</p>
                </div>
              </div>

              <Link href={`/tours/${tour.slug || tour.id}`} className="block">
                <Button className="w-full rounded-md h-12 group-hover:bg-brand-primary-hover bg-surface text-brand-primary border border-brand-primary/20 hover:text-white transition-colors">
                  View Journey <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
