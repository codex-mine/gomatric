import { VisaCountry, VisaRequirement } from '@/types';

export const mockVisaCountries: VisaCountry[] = [
  { id: 'dubai-uae', slug: 'dubai-uae', countryCode: 'dubai-uae', popular: true, image: { src: '/placeholder', alt: '' }, country: 'United Arab Emirates (Dubai)', visaTypes: [
    { id: "tourist", name: "Tourist", slug: "tourist", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "business", name: "Business", slug: "business", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "transit", name: "Transit", slug: "transit", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
  { id: 'kuala-lumpur-malaysia', slug: 'kuala-lumpur-malaysia', countryCode: 'kuala-lumpur-malaysia', popular: true, image: { src: '/placeholder', alt: '' }, country: 'Malaysia', visaTypes: [
    { id: "tourist", name: "Tourist", slug: "tourist", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "business", name: "Business", slug: "business", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
  { id: 'bangkok-thailand', slug: 'bangkok-thailand', countryCode: 'bangkok-thailand', popular: true, image: { src: '/placeholder', alt: '' }, country: 'Thailand', visaTypes: [
    { id: "tourist", name: "Tourist", slug: "tourist", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "business", name: "Business", slug: "business", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "transit", name: "Transit", slug: "transit", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
  { id: 'singapore', slug: 'singapore', countryCode: 'singapore', popular: true, image: { src: '/placeholder', alt: '' }, country: 'Singapore', visaTypes: [
    { id: "tourist", name: "Tourist", slug: "tourist", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "business", name: "Business", slug: "business", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
  { id: 'istanbul-turkey', slug: 'istanbul-turkey', countryCode: 'istanbul-turkey', popular: true, image: { src: '/placeholder', alt: '' }, country: 'Turkey', visaTypes: [
    { id: "tourist-e-visa-", name: "Tourist (E-visa)", slug: "tourist-e-visa-", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
  { id: 'riyadh-saudi-arabia', slug: 'riyadh-saudi-arabia', countryCode: 'riyadh-saudi-arabia', popular: true, image: { src: '/placeholder', alt: '' }, country: 'Saudi Arabia', visaTypes: [
    { id: "umrah", name: "Umrah", slug: "umrah", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "tourist", name: "Tourist", slug: "tourist", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" },
    { id: "business", name: "Business", slug: "business", duration: "30 Days", processingTime: "3-5 Days", price: 100, currency: "USD", description: "Standard visa" }
  ] },
] as any;

export const mockVisaRequirements: VisaRequirement[] = [
  {
    country: 'dubai-uae',
    visaType: 'Tourist',
    documents: [
      { name: "Document", description: "Original Passport with at least 6 months validity", required: true },
      { name: "Document", description: "Recent passport-size photograph with white background", required: true },
      { name: "Document", description: "NID or Birth Certificate copy", required: true },
      { name: "Document", description: "Bank statement for the last 6 months (minimum balance requirement applies)", required: true },
      { name: "Document", description: "No Objection Certificate (NOC) from employer or Trade License copy", required: true }
    ],
    
    
  },
  {
    country: 'bangkok-thailand',
    visaType: 'Tourist',
    documents: [
      { name: "Document", description: "Original Passport (6 months validity)", required: true },
      { name: "Document", description: "Two recent photos (3.5 x 4.5 cm, white background, matte paper)", required: true },
      { name: "Document", description: "Bank statement for 6 months with ending balance of ৳60,000 per person", required: true },
      { name: "Document", description: "Bank Solvency Certificate", required: true },
      { name: "Document", description: "Profession proof (NOC/Trade License/Student ID)", required: true }
    ],
    
    
  },
  {
    country: 'singapore',
    visaType: 'Tourist',
    documents: [
      { name: "Document", description: "Original Passport", required: true },
      { name: "Document", description: "Two recent photographs (35x45mm, white background, matte finish)", required: true },
      { name: "Document", description: "Visiting Card", required: true },
      { name: "Document", description: "Letter of Introduction (LOI) from a local contact in Singapore (if any)", required: true },
      { name: "Document", description: "Forward and return flight tickets", required: true }
    ],
    
    
  }
] as any;
