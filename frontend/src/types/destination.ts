import type { Image, Coordinates, Rating } from "./common";

export interface Country {
  id: string;
  name: string;
  code: string;
  slug: string;
  image: Image;
  coordinates: Coordinates;
  continent: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  countryCode?: string;
  slug?: string;
  tagline?: string;
  description: string;
  coordinates: Coordinates;
  image: Image;
  gallery?: Image[];
  bestTimeToVisit: string;
  currency: string;
  language: string;
  flightTime: string;
  visaRequired?: boolean;
  visaRequirement?: string;
  visaInfo?: string;
  popularExperiences?: string[];
  popularAttractions?: string[];
  availableServices?: string[];
  startingPrice?: number;
  rating?: Rating;
  featured: boolean;
}
