import type { Image, Rating } from "./common";

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface TourInclusion {
  icon: string;
  label: string;
}

export interface Tour {
  id: string;
  title: string;
  slug?: string;
  destination?: string;
  country?: string;
  duration: string;
  durationDays?: number;
  durationNights?: number;
  price: number;
  originalPrice?: number;
  currency?: string;
  image: Image;
  gallery?: Image[];
  rating: Rating;
  overview?: string;
  description?: string;
  highlights: string[];
  itinerary: TourItineraryDay[];
  inclusions: TourInclusion[];
  exclusions: string[];
  accommodation?: string;
  accommodationRating?: number;
  groupSize?: string;
  travelType?: string;
  packageType?: string;
  cancellationPolicy?: string;
  paymentPolicy?: string;
  travelRequirements?: string[];
  featured: boolean;
  popular?: boolean;
  badge?: string;
}
