import { Tour } from '@/types';

export const mockTours: Tour[] = [
  {
    id: 'dubai-explorer',
    title: 'Dubai Explorer',
    duration: '5D/4N',
    price: 55000,
        inclusions: [{ icon: 'check', label: 'Hotel' }, { icon: 'check', label: 'Transfer' }, { icon: 'check', label: 'City Tour' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Marina Dhow Cruise', description: 'Arrive at Dubai International Airport, transfer to hotel. In the evening, enjoy a Dhow Cruise Dinner at Dubai Marina.', activities: ['Sightseeing'] },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa', description: 'Half-day city tour covering Dubai Museum, Jumeirah Mosque. Evening visit to Burj Khalifa 124th floor.', activities: ['Sightseeing'] },
      { day: 3, title: 'Desert Safari', description: 'Afternoon Desert Safari with BBQ Dinner, Belly Dance, and Dune Bashing.', activities: ['Sightseeing'] },
      { day: 4, title: 'Abu Dhabi City Tour', description: 'Full day Abu Dhabi city tour including Sheikh Zayed Grand Mosque and Ferrari World photo stop.', activities: ['Sightseeing'] },
      { day: 5, title: 'Departure', description: 'Breakfast at hotel, free time for shopping, then transfer to airport.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.8, count: 120 },
    featured: true,
    highlights: ['Burj Khalifa visit', 'Desert Safari with BBQ', 'Dhow Cruise Marina'],
    exclusions: ['Flights', 'Visa', 'Personal expenses', 'Lunch & Dinner (unless specified)'],
    image: { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop', alt: 'Image' }
  },
  {
    id: 'thailand-adventure',
    title: 'Thailand Adventure',
    duration: '7D/6N',
    price: 48000,
        inclusions: [{ icon: 'check', label: 'Bangkok' }, { icon: 'check', label: 'Pattaya' }, { icon: 'check', label: 'Phi Phi' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival in Bangkok', description: 'Transfer to Pattaya and check-in to hotel. Alcazar Show in the evening.', activities: ['Sightseeing'] },
      { day: 2, title: 'Coral Island Tour', description: 'Half-day Coral Island tour with Indian Lunch.', activities: ['Sightseeing'] },
      { day: 3, title: 'Pattaya to Bangkok', description: 'Transfer to Bangkok. Bangkok City and Temple tour.', activities: ['Sightseeing'] },
      { day: 4, title: 'Bangkok to Phuket', description: 'Flight to Phuket. Transfer to hotel and relax.', activities: ['Sightseeing'] },
      { day: 5, title: 'Phi Phi Island', description: 'Full day Phi Phi Island tour by Big Boat with local lunch.', activities: ['Sightseeing'] },
      { day: 6, title: 'Phuket City Tour', description: 'Half-day Phuket city tour covering viewpoints and old town.', activities: ['Sightseeing'] },
      { day: 7, title: 'Departure', description: 'Transfer to airport for departure.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.7, count: 120 },
    featured: false,
    highlights: ['Coral Island', 'Phi Phi Island', 'Bangkok Temples'],
    exclusions: ['International Flights', 'Visa fees', 'National Park fees'],
    image: { src: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop', alt: 'Image' }
  },
  {
    id: 'malaysia-discovery',
    title: 'Malaysia Discovery',
    duration: '6D/5N',
    price: 42000,
        inclusions: [{ icon: 'check', label: 'KL' }, { icon: 'check', label: 'Langkawi' }, { icon: 'check', label: 'Transfers' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival in Kuala Lumpur', description: 'Meet and greet at airport, transfer to hotel.', activities: ['Sightseeing'] },
      { day: 2, title: 'KL City Tour & Batu Caves', description: 'Half-day city tour including Petronas Twin Towers photo stop and Batu Caves.', activities: ['Sightseeing'] },
      { day: 3, title: 'KL to Langkawi', description: 'Flight to Langkawi. Transfer to resort.', activities: ['Sightseeing'] },
      { day: 4, title: 'Langkawi Island Hopping', description: 'Half-day island hopping tour visiting Dayang Bunting and Beras Basah.', activities: ['Sightseeing'] },
      { day: 5, title: 'Langkawi Cable Car', description: 'Visit the famous Langkawi SkyCab and SkyBridge.', activities: ['Sightseeing'] },
      { day: 6, title: 'Departure', description: 'Transfer to Langkawi airport for onward journey.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.6, count: 120 },
    featured: false,
    highlights: ['Petronas Towers', 'Batu Caves', 'Langkawi Cable Car'],
    exclusions: ['Tourism Tax', 'Flights', 'Lunch & Dinner'],
    image: { src: 'https://images.unsplash.com/photo-1596422846543-74c6fc0e241e?w=800&h=600&fit=crop', alt: 'Image' }
  },
  {
    id: 'singapore-delight',
    title: 'Singapore Delight',
    duration: '4D/3N',
    price: 62000,
        inclusions: [{ icon: 'check', label: 'Marina Bay' }, { icon: 'check', label: 'Sentosa' }, { icon: 'check', label: 'Gardens by the Bay' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Arrive in Singapore, transfer to hotel. Evening Night Safari.', activities: ['Sightseeing'] },
      { day: 2, title: 'City Tour & Gardens by the Bay', description: 'Morning city tour. Afternoon visit to Gardens by the Bay (Flower Dome & Cloud Forest).', activities: ['Sightseeing'] },
      { day: 3, title: 'Sentosa Island', description: 'Afternoon Sentosa tour including Cable Car, Madame Tussauds, and Wings of Time.', activities: ['Sightseeing'] },
      { day: 4, title: 'Departure', description: 'Free for shopping until transfer to Changi Airport.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.9, count: 120 },
    featured: true,
    highlights: ['Gardens by the Bay', 'Sentosa Island', 'Night Safari'],
    exclusions: ['Flights', 'Visa', 'Meals other than breakfast'],
    image: { src: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop', alt: 'Image' }
  },
  {
    id: 'turkey-heritage',
    title: 'Turkey Heritage',
    duration: '8D/7N',
    price: 85000,
        inclusions: [{ icon: 'check', label: 'Istanbul' }, { icon: 'check', label: 'Cappadocia' }, { icon: 'check', label: 'Pamukkale' }, { icon: 'check', label: 'Domestic Flights' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival in Istanbul', description: 'Transfer to hotel and relax.', activities: ['Sightseeing'] },
      { day: 2, title: 'Istanbul Old City', description: 'Full day tour: Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar.', activities: ['Sightseeing'] },
      { day: 3, title: 'Bosphorus Cruise & Flight to Cappadocia', description: 'Morning cruise. Evening flight to Cappadocia.', activities: ['Sightseeing'] },
      { day: 4, title: 'Cappadocia Tour', description: 'Optional Hot Air Balloon. North Cappadocia tour including Goreme Open Air Museum.', activities: ['Sightseeing'] },
      { day: 5, title: 'Cappadocia to Pamukkale', description: 'Drive to Pamukkale via Konya.', activities: ['Sightseeing'] },
      { day: 6, title: 'Pamukkale Tour', description: 'Visit Cotton Castle and Hierapolis. Flight back to Istanbul.', activities: ['Sightseeing'] },
      { day: 7, title: 'Free Day in Istanbul', description: 'Leisure day for shopping in Taksim or visiting Galata Tower.', activities: ['Sightseeing'] },
      { day: 8, title: 'Departure', description: 'Transfer to airport.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.8, count: 120 },
    featured: false,
    highlights: ['Hot Air Balloon (Optional)', 'Hagia Sophia', 'Pamukkale Travertines'],
    exclusions: ['International Flights', 'Visa', 'Entrance fees not specified'],
    image: { src: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop', alt: 'Image' }
  },
  {
    id: 'bali-paradise',
    title: 'Bali Paradise',
    duration: '6D/5N',
    price: 52000,
        inclusions: [{ icon: 'check', label: 'Ubud' }, { icon: 'check', label: 'Uluwatu' }, { icon: 'check', label: 'Seminyak' }, { icon: 'check', label: 'Breakfast' }],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Transfer to Seminyak hotel. Relax at the beach.', activities: ['Sightseeing'] },
      { day: 2, title: 'Uluwatu & Kecak Dance', description: 'Visit Uluwatu Temple at sunset and watch the Kecak Fire Dance.', activities: ['Sightseeing'] },
      { day: 3, title: 'Nusa Penida Day Tour', description: 'Full day trip to Nusa Penida West (Kelingking Beach, Broken Beach).', activities: ['Sightseeing'] },
      { day: 4, title: 'Transfer to Ubud & Kintamani', description: 'Mount Batur volcano view, Tegalalang Rice Terrace, Ubud Monkey Forest.', activities: ['Sightseeing'] },
      { day: 5, title: 'Waterfalls & Temples', description: 'Visit Tegenungan Waterfall, Tirta Empul (Holy Spring Water Temple).', activities: ['Sightseeing'] },
      { day: 6, title: 'Departure', description: 'Transfer to Ngurah Rai Airport.', activities: ['Sightseeing'] }
    ],
    rating: { average: 4.7, count: 120 },
    featured: false,
    highlights: ['Nusa Penida', 'Uluwatu Sunset', 'Ubud Rice Terraces'],
    exclusions: ['Flights', 'Visa on arrival fee', 'Lunch & Dinner'],
    image: { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop', alt: 'Image' }
  }
];
