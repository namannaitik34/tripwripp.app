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

export interface LiveDestination {
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
  altitude?: string;
  difficulty?: string;
  bestTime: string;
  availableSlots: number;
  totalSlots: number;
  startDate: string;
  endDate: string;
  isLive: boolean;
  detailedDescription?: string;
  gallery?: string[];
  itinerary?: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation?: string;
    meals?: string[];
  }[];
  included?: string[];
  excluded?: string[];
  meetingPoint?: string;
  requirements?: string[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Southeast Asia',
    type: 'beach',
    description: 'Tropical paradise with stunning beaches, ancient temples, and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
    src: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Bali sunset beach',
    destination: 'Bali',
    category: 'landscape'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Swiss mountain peak',
    destination: 'Swiss Alps',
    category: 'landscape'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Tokyo street food',
    destination: 'Tokyo',
    category: 'food'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Machu Picchu ruins',
    destination: 'Machu Picchu',
    category: 'culture'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Serengeti wildlife',
    destination: 'Serengeti',
    category: 'adventure'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Santorini architecture',
    destination: 'Santorini',
    category: 'culture'
  }
];

export const liveDestinations: LiveDestination[] = [
  {
    id: 'live-1',
    name: 'Khumai Danda',
    country: 'Nepal',
    region: 'South Asia',
    type: 'mountain',
    description: 'Experience breathtaking sunrise views from Khumai Danda, a hidden gem in Nepal offering panoramic views of the Himalayas including Mount Everest, Lhotse, and Makalu.',
    detailedDescription: 'Khumai Danda, situated at an altitude of 3,245 meters, is one of Nepal\'s best-kept secrets for mountain enthusiasts. This spectacular viewpoint offers unobstructed views of eight of the world\'s highest peaks, including Mount Everest, Lhotse, Makalu, and Cho Oyu. The trek combines moderate hiking through pristine rhododendron forests with authentic cultural experiences in traditional Sherpa villages. Unlike the crowded trails to Everest Base Camp, Khumai Danda offers solitude and tranquility while providing equally stunning mountain vistas.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      '/images/khumai/Khumai_1.svg',
      '/images/khumai/Khumai_2.svg',
      '/images/khumai/Khumai_3.svg',
      '/images/khumai/Khumai_4.svg',
      '/images/khumai/Khumai_5.svg',
      '/images/khumai/Khumai_6.svg',
      '/images/khumai/Khumai_7.svg',
      '/images/khumai/Khumai_8.svg'
    ],
    rating: 4.8,
    price: 10500,
  duration: '6 Days 5 Nights',
    highlights: [
      'Sunrise over Himalayas',
      'Mount Everest views',
      'Traditional Sherpa culture',
      'Rhododendron forests',
      'Photography paradise',
      'Less crowded trails'
    ],
    altitude: '3,245m (10,646ft)',
    difficulty: 'Moderate',
    bestTime: 'March-May, September-November',
    availableSlots: 8,
    totalSlots: 15,
  startDate: '2025-10-06',
  endDate: '2025-10-11',
    isLive: true,
    itinerary: [
      {
        day: 1,
        title: '6th October – Journey Begins',
        description: 'Evening assembly at Raxaul, cross into Nepal and begin the overnight road journey toward Pokhara.',
        activities: [
          'Evening meet-up at Raxaul (briefing & introductions)',
          'Cross border & transfer: Raxaul → Birgunj (≈1 hr)',
          'Board private vehicle / bus: Birgunj → Pokhara (≈8 hrs, overnight travel)',
          'Rest stops & light snacks en route'
        ],
        accommodation: 'Overnight Tourist Bus (Reclining Seats)',
        meals: ['Snacks']
      },
      {
        day: 2,
        title: '7th October – Arrival & First Trek',
        description: 'Arrive in Pokhara at dawn, transfer toward the trailhead and begin the acclimatising approach toward Saripakha.',
        activities: [
          'Early arrival in Pokhara (stretch & freshen up)',
          'Half‑hour drive to Harichowk trailhead',
          'Harichowk → Ghachuk Village approach (start ~10:00 AM)',
          'Freshen up & hearty breakfast',
          'Trek permit formalities',
          '1‑hour introductory trek to Saripakha',
          'Evening rest & light acclimatization walk',
          'Night stay in Saripakha'
        ],
        accommodation: 'Local Teahouse – Saripakha',
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 3,
        title: '8th October – Trek to Chichimle',
        description: 'Gradual ascent through forested sections toward the midway settlement of Chichimle with active recovery and group bonding.',
        activities: [
          'Morning warm‑up exercise & breakfast',
          'Begin trek ~9:00 AM – paced ascent',
          'Reach Chichimle (halfway) around 2:00 PM',
          'Check‑in, hot lunch & rest',
          'Evening fun activities / games',
          'Dinner & overnight stay'
        ],
        accommodation: 'Teahouse – Chichimle',
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 4,
        title: '9th October – Himalayan Views',
        description: 'Final push to Khumai for sweeping Annapurna Range panoramas and a golden sunset over the high peaks.',
        activities: [
          'Early morning Annapurna range viewpoint session',
          'Trek Chichimle → Khumai (start 10:00 AM, arrive ~2:00 PM)',
          'Hot lunch & recovery rest',
          'Sunset Himalayan photoshoot (golden hour)',
          'Bonfire & evening social',
          'Night stay in Khumai'
        ],
        accommodation: 'Camp / Teahouse – Khumai',
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      {
        day: 5,
        title: '10th October – Return Journey',
        description: 'Dawn summit ambiance, long downhill descent, evening departure toward Birgunj for the overnight transfer.',
        activities: [
          '5:30 AM prime sunrise & peak panorama (most important view)',
          'Breakfast at Khumai',
          'Downhill trek (start 9:00 AM) → Saripakha (arrive ~3:00 PM)',
          'Rest & gear re‑pack',
          'Saripakha → Pokhara transfer (depart ~7:00 PM)',
          'Board overnight vehicle to Birgunj (drive through night)'
        ],
        accommodation: 'Overnight Bus (Pokhara → Birgunj)',
        meals: ['Breakfast', 'Lunch', 'Snacks']
      },
      {
        day: 6,
        title: '11th October – Trip Ends',
        description: 'Border return and farewell after a rewarding Khumai Danda immersion.',
        activities: [
          'Early arrival Birgunj (~5:00 AM)',
          'Birgunj → Raxaul (depart ~7:00 AM, ≈30 mins)',
          'Border crossing formalities',
          'Farewell & dispersal'
        ],
        accommodation: 'N/A',
        meals: ['Breakfast (self / en route)']
      }
    ],
    included: [
      'Professional mountain guide',
      'All accommodation as per itinerary',
      'All meals during trek',
      'Transportation (Raxaul-Pokhara-Raxaul)',
      'Trekking permits and fees',
      'First aid kit and safety equipment',
      'Group trekking equipment'
    ],
    excluded: [ 
      'Personal trekking equipment',
      'Tips for guides and porters',
      'Personal expenses and drinks',
    ],
    meetingPoint: 'coffee shop, Raxual-Nepal Border, b/w 2 PM - 4 PM',
    requirements: [
      'Moderate fitness level required',
      'Comfortable with 4-6 hours of walking daily',
      'Casual/Sports Shoes',
      'Warm clothing for cold mornings',
    ]
  }
];
