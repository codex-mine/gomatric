export * from './common';
export * from './tour';
export * from './destination';
export * from './travel-guide';
export * from './visa';
export * from './booking';
export * from './contact';

export interface Testimonial {
  id: string;
  name: string;
  destination: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
