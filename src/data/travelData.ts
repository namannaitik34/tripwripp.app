export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  type: 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' | 'wildlife';
  description: string;
  image: string;
  rating: number;
  price: number;
  duration: string;
  highlights: string[];
  bestTime: string;
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
  inclusions: string[];
  exclusions: string[];
  rating: number;
  reviews: number;
  type: 'luxury' | 'budget' | 'adventure' | 'family' | 'romantic';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  destination: string;
  category: 'landscape' | 'culture' | 'adventure' | 'food' | 'people';
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    type: 'beach',
    description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
    image: '/images/bali.jpg',
    rating: 4.8,
    price: 1200,
    duration: '7 days',
    highlights: ['Beautiful beaches', 'Ancient temples', 'Rice terraces', 'Vibrant nightlife'],
    bestTime: 'April to October'
  },
  {
    id: '2',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    type: 'mountain',
    description: 'Breathtaking mountain landscapes perfect for adventure and relaxation.',
    image: '/images/swiss-alps.jpg',
    rating: 4.9,
    price: 2500,
    duration: '10 days',
    highlights: ['Snow-capped peaks', 'Alpine lakes', 'Scenic train rides', 'Luxury resorts'],
    bestTime: 'June to September'
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
    type: 'city',
    description: 'Modern metropolis blending tradition with cutting-edge technology.',
    image: '/images/tokyo.jpg',
    rating: 4.7,
    price: 1800,
    duration: '6 days',
    highlights: ['Modern architecture', 'Traditional temples', 'Amazing food', 'Shopping districts'],
    bestTime: 'March to May, September to November'
  },
  {
    id: '4',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'South America',
    type: 'cultural',
    description: 'Ancient Incan citadel offering mystical experiences and stunning views.',
    image: '/images/machu-picchu.jpg',
    rating: 4.9,
    price: 1600,
    duration: '8 days',
    highlights: ['Ancient ruins', 'Mountain hiking', 'Cultural heritage', 'Sacred Valley'],
    bestTime: 'May to September'
  },
  {
    id: '5',
    name: 'Serengeti',
    country: 'Tanzania',
    region: 'East Africa',
    type: 'wildlife',
    description: 'World-famous safari destination with incredible wildlife migration.',
    image: '/images/serengeti.jpg',
    rating: 4.8,
    price: 3200,
    duration: '9 days',
    highlights: ['Great Migration', 'Big Five', 'Luxury camps', 'Cultural experiences'],
    bestTime: 'June to October'
  },
  {
    id: '6',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    type: 'beach',
    description: 'Iconic Greek island with white-washed buildings and stunning sunsets.',
    image: '/images/santorini.jpg',
    rating: 4.6,
    price: 1400,
    duration: '5 days',
    highlights: ['Sunset views', 'Blue-domed churches', 'Volcanic beaches', 'Wine tasting'],
    bestTime: 'April to October'
  }
];

export const packages: Package[] = [
  {
    id: '1',
    title: 'Bali Beach Paradise',
    destination: 'Bali, Indonesia',
    duration: '7 days / 6 nights',
    price: 1299,
    image: '/images/bali-package.jpg',
    description: 'Experience the magic of Bali with pristine beaches, cultural temples, and luxury accommodations.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar',
        activities: ['Airport pickup', 'Check-in at beachfront resort', 'Welcome dinner', 'Beach walk']
      },
      {
        day: 2,
        title: 'Cultural Temple Tour',
        activities: ['Visit Tanah Lot Temple', 'Traditional lunch', 'Uluwatu Temple sunset', 'Kecak dance performance']
      },
      {
        day: 3,
        title: 'Adventure Day',
        activities: ['White water rafting', 'Rice terrace visit', 'Traditional spa treatment', 'Local market exploration']
      },
      {
        day: 4,
        title: 'Beach Activities',
        activities: ['Snorkeling trip', 'Beach volleyball', 'Sunset cruise', 'Seafood dinner']
      },
      {
        day: 5,
        title: 'Cultural Immersion',
        activities: ['Cooking class', 'Village visit', 'Art market shopping', 'Traditional massage']
      },
      {
        day: 6,
        title: 'Free Day',
        activities: ['Optional activities', 'Beach relaxation', 'Shopping', 'Farewell dinner']
      },
      {
        day: 7,
        title: 'Departure',
        activities: ['Check-out', 'Last-minute shopping', 'Airport transfer', 'Flight departure']
      }
    ],
    inclusions: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Guided tours', 'Entry fees'],
    exclusions: ['International flights', 'Personal expenses', 'Travel insurance', 'Optional activities'],
    rating: 4.8,
    reviews: 234,
    type: 'luxury'
  },
  {
    id: '2',
    title: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    duration: '10 days / 9 nights',
    price: 2899,
    image: '/images/swiss-package.jpg',
    description: 'Breathtaking Alpine adventure with scenic trains, mountain hikes, and luxury stays.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich',
        activities: ['Airport pickup', 'City tour', 'Check-in hotel', 'Welcome dinner']
      },
      {
        day: 2,
        title: 'Jungfraujoch - Top of Europe',
        activities: ['Scenic train journey', 'Ice Palace visit', 'Alpine views', 'Mountain restaurant lunch']
      }
    ],
    inclusions: ['4-star accommodation', 'Swiss Travel Pass', 'Daily breakfast', 'Guided tours', 'Cable car tickets'],
    exclusions: ['International flights', 'Lunch and dinner', 'Personal expenses', 'Travel insurance'],
    rating: 4.9,
    reviews: 156,
    type: 'adventure'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery-1.jpg',
    alt: 'Bali sunset beach',
    destination: 'Bali',
    category: 'landscape'
  },
  {
    id: '2',
    src: '/images/gallery-2.jpg',
    alt: 'Swiss mountain peak',
    destination: 'Swiss Alps',
    category: 'landscape'
  },
  {
    id: '3',
    src: '/images/gallery-3.jpg',
    alt: 'Tokyo street food',
    destination: 'Tokyo',
    category: 'food'
  },
  {
    id: '4',
    src: '/images/gallery-4.jpg',
    alt: 'Machu Picchu ruins',
    destination: 'Machu Picchu',
    category: 'culture'
  },
  {
    id: '5',
    src: '/images/gallery-5.jpg',
    alt: 'Serengeti wildlife',
    destination: 'Serengeti',
    category: 'adventure'
  },
  {
    id: '6',
    src: '/images/gallery-6.jpg',
    alt: 'Santorini architecture',
    destination: 'Santorini',
    category: 'culture'
  }
];
