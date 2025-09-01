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
  detailedDescription?: string;
  itinerary?: {
    day: number;
    title: string;
    activities: string[];
  }[];
  inclusions?: string[];
  exclusions?: string[];
  difficulty?: string;
  altitude?: string;
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
  type: 'luxury' | 'budget' | 'adventure' | 'family' | 'romantic' | 'nature' | 'cultural';
  requirements?: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  destination: string;
  category: 'landscape' | 'culture' | 'adventure' | 'food' | 'people';
}

export interface LiveDestinationItineraryItem {
  day: number;
  title: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
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
  itinerary?: LiveDestinationItineraryItem[];
  included?: string[];
  excluded?: string[];
  meetingPoint?: string;
  requirements?: string[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Goa',
    country: 'India',
    region: 'Western India',
    type: 'beach',
    description: 'India\'s premier beach destination with pristine coastlines, Portuguese heritage, vibrant nightlife, and laid-back coastal culture.',
    detailedDescription: 'Goa offers the perfect blend of sun, sand, and spirituality. From the bustling beaches of North Goa to the serene shores of South Goa, experience Portuguese colonial architecture, ancient temples, spice plantations, and world-class cuisine. Whether you seek adventure or relaxation, Goa delivers unforgettable experiences.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    price: 12000,
    duration: '5 days',
    highlights: ['Golden beaches', 'Portuguese heritage', 'Water sports', 'Nightlife', 'Spice plantations', 'Seafood cuisine'],
    bestTime: 'November to March',
    difficulty: 'Easy',
    itinerary: [
      {
        day: 1,
        title: 'North Goa Beach Hopping',
        activities: [
          'Arrive and check-in at beach resort',
          'Visit famous Baga Beach',
          'Explore Calangute Beach',
          'Water sports at Candolim Beach',
          'Sunset at Anjuna Beach',
          'Evening at Tito\'s Lane nightlife'
        ]
      },
      {
        day: 2,
        title: 'Heritage & Culture Tour',
        activities: [
          'Visit Basilica of Bom Jesus',
          'Explore Se Cathedral',
          'Tour Old Goa museums',
          'Spice plantation visit with lunch',
          'Traditional Goan cooking class',
          'Feni tasting session'
        ]
      },
      {
        day: 3,
        title: 'Adventure & Nature',
        activities: [
          'Dudhsagar Waterfalls excursion',
          'Jeep safari in Bhagwan Mahavir Sanctuary',
          'River cruise on Mandovi River',
          'Visit Dona Paula viewpoint',
          'Beach volleyball at Miramar',
          'Sunset cruise with dinner'
        ]
      },
      {
        day: 4,
        title: 'South Goa Serenity',
        activities: [
          'Visit peaceful Palolem Beach',
          'Explore Agonda Beach',
          'Cabo de Rama Fort visit',
          'Butterfly Beach by boat',
          'Ayurvedic spa session',
          'Beach shack dinner'
        ]
      },
      {
        day: 5,
        title: 'Markets & Departure',
        activities: [
          'Saturday Night Market (if weekend)',
          'Mapusa Friday Market visit',
          'Souvenir shopping',
          'Last beach relaxation',
          'Airport transfer'
        ]
      }
    ],
    inclusions: [
      'Beach resort accommodation',
      'Daily breakfast',
      'Airport transfers',
      'Sightseeing transportation',
      'Spice plantation tour with lunch',
      'River cruise',
      'Professional guide'
    ],
    exclusions: [
      'Flights to/from Goa',
      'Lunch and dinner (except mentioned)',
      'Water sports activities',
      'Personal expenses',
      'Tips and gratuities'
    ]
  },
  {
    id: '2',
    name: 'Manali',
    country: 'India',
    region: 'Northern India',
    type: 'mountain',
    description: 'Breathtaking hill station in Himachal Pradesh offering snow-capped peaks, adventure sports, apple orchards, and pristine mountain landscapes.',
    detailedDescription: 'Nestled in the Pir Panjal and Dhauladhar ranges, Manali is a paradise for nature lovers and adventure enthusiasts. From ancient temples to modern adventure sports, scenic valleys to snow-covered peaks, Manali offers diverse experiences in the lap of the Himalayas.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    price: 15000,
    duration: '6 days',
    highlights: ['Snow-capped mountains', 'Adventure sports', 'Apple orchards', 'Ancient temples', 'Rohtang Pass', 'Local culture'],
    bestTime: 'March to June, September to November',
    difficulty: 'Moderate',
    altitude: '2,050m (6,726ft)',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Local Sightseeing',
        activities: [
          'Arrival and hotel check-in',
          'Visit Hadimba Devi Temple',
          'Explore Manu Temple',
          'Walk through Old Manali',
          'Visit Tibetan Monastery',
          'Mall Road shopping and dinner'
        ]
      },
      {
        day: 2,
        title: 'Solang Valley Adventure',
        activities: [
          'Early departure to Solang Valley',
          'Paragliding experience',
          'Cable car ride',
          'Zorbing and horse riding',
          'Snow activities (seasonal)',
          'Return to Manali evening'
        ]
      },
      {
        day: 3,
        title: 'Rohtang Pass Excursion',
        activities: [
          'Early morning departure to Rohtang',
          'Snow point activities',
          'Photography at scenic viewpoints',
          'Visit Gulaba and Kothi',
          'Lunch at local dhaba',
          'Return via Nehru Kund'
        ]
      },
      {
        day: 4,
        title: 'Kasol & Manikaran Day Trip',
        activities: [
          'Drive to Kasol (Mini Israel)',
          'Explore hippie cafes',
          'Visit Manikaran Gurudwara',
          'Hot springs experience',
          'Tosh village visit',
          'Return to Manali'
        ]
      },
      {
        day: 5,
        title: 'Nature & Culture',
        activities: [
          'Visit Van Vihar National Park',
          'Explore Club House activities',
          'Apple orchard visit',
          'Local market shopping',
          'Traditional Himachali cultural show',
          'Farewell dinner'
        ]
      },
      {
        day: 6,
        title: 'Departure',
        activities: [
          'Check-out and last-minute shopping',
          'Visit Jogini Falls (if time permits)',
          'Transfer to airport/bus station'
        ]
      }
    ],
    inclusions: [
      'Hotel accommodation',
      'Daily breakfast',
      'Transportation for sightseeing',
      'Rohtang Pass permits',
      'Professional guide',
      'Adventure activity vouchers'
    ],
    exclusions: [
      'Flights/bus to Manali',
      'Lunch and dinner',
      'Adventure sports costs',
      'Personal expenses',
      'Tips for guide and driver'
    ]
  },
  {
    id: '3',
    name: 'Jaipur',
    country: 'India',
    region: 'Western India',
    type: 'cultural',
    description: 'The Pink City of Rajasthan, showcasing magnificent palaces, historic forts, vibrant markets, and rich royal heritage.',
    detailedDescription: 'Jaipur, the capital of Rajasthan, is a living testament to India\'s royal past. With its pink-hued buildings, magnificent forts, opulent palaces, and bustling bazaars, Jaipur offers an immersive experience into Rajasthani culture, architecture, and traditions.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    price: 11000,
    duration: '4 days',
    highlights: ['Pink City architecture', 'Amber Fort', 'City Palace', 'Hawa Mahal', 'Royal heritage', 'Handicraft markets'],
    bestTime: 'October to March',
    difficulty: 'Easy',
    itinerary: [
      {
        day: 1,
        title: 'Pink City Heritage Tour',
        activities: [
          'Arrival and heritage hotel check-in',
          'Visit iconic Hawa Mahal',
          'Explore City Palace complex',
          'Jantar Mantar observatory visit',
          'Walk through Pink City bazaars',
          'Traditional Rajasthani dinner with folk show'
        ]
      },
      {
        day: 2,
        title: 'Amber Fort & Surroundings',
        activities: [
          'Early morning Amber Fort visit',
          'Elephant ride up to fort (optional)',
          'Explore Jaigarh Fort',
          'Visit Nahargarh Fort',
          'Sunset views from fort',
          'Light and sound show at Amber Fort'
        ]
      },
      {
        day: 3,
        title: 'Culture & Crafts',
        activities: [
          'Block printing workshop',
          'Gem and jewelry factory visit',
          'Birla Temple visit',
          'Albert Hall Museum tour',
          'Shopping at Johari Bazaar',
          'Traditional Rajasthani cooking class'
        ]
      },
      {
        day: 4,
        title: 'Outskirts & Departure',
        activities: [
          'Visit Galtaji Temple (Monkey Temple)',
          'Sisodia Rani Garden visit',
          'Last-minute shopping',
          'Departure transfer'
        ]
      }
    ],
    inclusions: [
      'Heritage hotel accommodation',
      'Daily breakfast',
      'All monument entry fees',
      'Transportation for sightseeing',
      'Professional guide',
      'Cultural show tickets'
    ],
    exclusions: [
      'Flights/train to Jaipur',
      'Lunch and dinner (except welcome dinner)',
      'Elephant ride charges',
      'Personal shopping',
      'Tips and gratuities'
    ]
  },
  {
    id: '4',
    name: 'Hampi',
    country: 'India',
    region: 'Southern India',
    type: 'cultural',
    description: 'UNESCO World Heritage site featuring magnificent ruins of the Vijayanagara Empire amidst stunning boulder landscapes.',
    detailedDescription: 'Hampi transports you back to the 14th-century Vijayanagara Empire with its spectacular ruins, ancient temples, and unique boulder-strewn landscape. This archaeological wonder offers insights into India\'s rich historical past and architectural brilliance.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    price: 9500,
    duration: '3 days',
    highlights: ['Vijayanagara ruins', 'Virupaksha Temple', 'Boulder landscapes', 'Ancient architecture', 'UNESCO heritage', 'Tungabhadra River'],
    bestTime: 'October to March',
    difficulty: 'Moderate',
    itinerary: [
      {
        day: 1,
        title: 'Sacred Center Exploration',
        activities: [
          'Arrival and guest house check-in',
          'Visit Virupaksha Temple',
          'Explore Hampi Bazaar',
          'Climb Hemakuta Hill for sunset',
          'Visit Sasivekalu Ganesha',
          'Evening at Tungabhadra River'
        ]
      },
      {
        day: 2,
        title: 'Royal Enclosure & Monuments',
        activities: [
          'Early morning coracle ride',
          'Explore Royal Enclosure',
          'Visit Lotus Mahal',
          'Elephant Stables tour',
          'Queen\'s Bath visit',
          'Hazara Rama Temple',
          'Sunset at Matanga Hill'
        ]
      },
      {
        day: 3,
        title: 'Vittala Temple & Departure',
        activities: [
          'Visit famous Vittala Temple',
          'See the Stone Chariot',
          'Musical pillars demonstration',
          'Anegundi village visit',
          'Local handicrafts shopping',
          'Departure transfer'
        ]
      }
    ],
    inclusions: [
      'Comfortable accommodation',
      'Daily breakfast',
      'All monument entry fees',
      'Local transportation',
      'Professional guide',
      'Coracle ride'
    ],
    exclusions: [
      'Transportation to/from Hampi',
      'Lunch and dinner',
      'Personal expenses',
      'Tips for guide and driver'
    ]
  },
  {
    id: '5',
    name: 'Jim Corbett',
    country: 'India',
    region: 'Northern India',
    type: 'wildlife',
    description: 'India\'s oldest national park, home to majestic Bengal tigers, diverse wildlife, and pristine Himalayan foothills landscape.',
    detailedDescription: 'Jim Corbett National Park offers thrilling wildlife encounters in India\'s first national park. Famous for Bengal tigers, the park also houses elephants, leopards, and over 600 bird species across diverse ecosystems from grasslands to dense forests.',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    price: 18000,
    duration: '4 days',
    highlights: ['Bengal tigers', 'Elephant safari', 'Bird watching', 'Corbett Museum', 'River rafting', 'Nature walks'],
    bestTime: 'November to June',
    difficulty: 'Easy',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Dhikala Zone',
        activities: [
          'Arrival at Corbett and resort check-in',
          'Afternoon Dhikala zone safari',
          'Wildlife spotting and photography',
          'Visit Corbett Museum',
          'Evening nature walk around resort',
          'Campfire and wildlife documentary'
        ]
      },
      {
        day: 2,
        title: 'Bijrani Zone & River Activities',
        activities: [
          'Early morning Bijrani zone safari',
          'Tiger tracking with naturalist',
          'Return for breakfast',
          'River rafting on Kosi River',
          'Afternoon at leisure',
          'Evening Jhirna zone safari'
        ]
      },
      {
        day: 3,
        title: 'Elephant Safari & Bird Watching',
        activities: [
          'Early morning elephant safari',
          'Bird watching session',
          'Visit Garjiya Devi Temple',
          'Corbett Waterfall trek',
          'Afternoon Durga Devi zone safari',
          'Night stay in forest rest house'
        ]
      },
      {
        day: 4,
        title: 'Final Safari & Departure',
        activities: [
          'Last morning safari',
          'Wildlife photography session',
          'Check-out and souvenir shopping',
          'Departure transfer'
        ]
      }
    ],
    inclusions: [
      'Jungle resort accommodation',
      'All meals',
      'Safari permits and fees',
      'Naturalist guide',
      'All safari vehicles',
      'Entry fees'
    ],
    exclusions: [
      'Transportation to/from Corbett',
      'Elephant safari charges',
      'Camera fees',
      'Personal expenses',
      'Tips for guides and drivers'
    ]
  },
  {
    id: '6',
    name: 'Andaman Islands',
    country: 'India',
    region: 'Eastern India',
    type: 'beach',
    description: 'Pristine tropical paradise with crystal-clear waters, coral reefs, white sand beaches, and rich marine biodiversity.',
    detailedDescription: 'The Andaman Islands offer an untouched tropical experience with pristine beaches, vibrant coral reefs, and rich marine life. From historical significance to adventure sports, these islands provide the perfect escape into nature\'s paradise.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    price: 25000,
    duration: '6 days',
    highlights: ['Pristine beaches', 'Coral reefs', 'Water sports', 'Cellular Jail', 'Marine life', 'Island hopping'],
    bestTime: 'October to May',
    difficulty: 'Easy',
    itinerary: [
      {
        day: 1,
        title: 'Port Blair Arrival & City Tour',
        activities: [
          'Airport pickup and hotel check-in',
          'Visit Cellular Jail',
          'Light and Sound show at Cellular Jail',
          'Corbyn\'s Cove Beach visit',
          'Anthropological Museum tour',
          'Local market exploration'
        ]
      },
      {
        day: 2,
        title: 'Havelock Island Adventure',
        activities: [
          'Ferry to Havelock Island',
          'Radhanagar Beach visit',
          'Elephant Beach water sports',
          'Snorkeling experience',
          'Beach resort check-in',
          'Sunset at beach'
        ]
      },
      {
        day: 3,
        title: 'Underwater Exploration',
        activities: [
          'Scuba diving at popular sites',
          'Underwater coral viewing',
          'Sea walking experience',
          'Beach relaxation',
          'Kayaking through mangroves',
          'Beachside dinner'
        ]
      },
      {
        day: 4,
        title: 'Neil Island Day Trip',
        activities: [
          'Ferry to Neil Island',
          'Bharatpur Beach visit',
          'Glass bottom boat ride',
          'Laxmanpur Beach sunset',
          'Natural Bridge exploration',
          'Return to Havelock'
        ]
      },
      {
        day: 5,
        title: 'Ross Island & North Bay',
        activities: [
          'Return to Port Blair',
          'Ross Island historical tour',
          'North Bay Island water sports',
          'Coral viewing',
          'Parasailing and jet skiing',
          'Seafood dinner'
        ]
      },
      {
        day: 6,
        title: 'Departure',
        activities: [
          'Last-minute souvenir shopping',
          'Visit Samudrika Naval Marine Museum',
          'Airport transfer and departure'
        ]
      }
    ],
    inclusions: [
      'Hotel and beach resort stay',
      'Daily breakfast',
      'Inter-island ferry tickets',
      'All sightseeing transfers',
      'Snorkeling equipment',
      'Entry fees to attractions'
    ],
    exclusions: [
      'Flights to/from Port Blair',
      'Lunch and dinner (except mentioned)',
      'Scuba diving and water sports',
      'Personal expenses',
      'Tips and gratuities'
    ]
  }
];

export const packages: Package[] = [
  {
    id: 'pachmarhi-nature-escape',
    title: 'Pachmarhi Nature Escape',
    destination: 'Pachmarhi, Madhya Pradesh, India',
    duration: '3 Days / 2 Nights',
    price: 5000,
    image: '/images/pachmarhi.jpg',
    description: 'Experience the charm of Pachmarhi with stunning waterfalls, sacred caves, panoramic viewpoints, and a perfect mix of adventure & relaxation.',
    type: 'nature',
    rating: 4.6,
    reviews: 89,
    inclusions: [
      'Accommodation (separate for male & females)',
      'Daily meals',
      'Local transportation',
      'Guided sightseeing',
      'Merchandise & memorable gift'
    ],
    exclusions: [
      'Fuel for rental scooters/bikes',
      'Tickets for optional water sports/activities',
      'Personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Caves and Waterfalls Exploration',
        activities: [
          'Visit Pandav Caves',
          'Explore Apsara Vihar (Fairy Pool)',
          'Experience Bee Falls',
          'Watch sunset at Reechgarh'
        ]
      },
      {
        day: 2,
        title: 'Sacred Sites and Temple Trek',
        activities: [
          'Explore Jata Shankar Caves',
          'Visit Mahadeo Temple',
          'Discover Gupt Mahadev Cave',
          'Trek to Chauragarh Temple'
        ]
      },
      {
        day: 3,
        title: 'Scenic Viewpoints and Departure',
        activities: [
          'Visit Priyadarshini Point',
          'Explore Handi Khoh',
          'Watch sunset at Dhoopgarh',
          'Departure'
        ]
      }
    ]
  },
  {
    id: 'banaras-cultural-spiritual',
    title: 'Banaras Cultural & Spiritual Journey',
    destination: 'Prayagraj • Vindhyachal • Varanasi',
    duration: '4 Days / 3 Nights',
    price: 4500,
    image: '/images/banaras.jpg',
    description: 'Embark on a soulful journey through India\'s cultural heartland, exploring sacred ghats, ancient temples, majestic forts, and vibrant streets filled with history and devotion.',
    type: 'cultural',
    rating: 4.8,
    reviews: 156,
    inclusions: [
      'Accommodation (AC dormitories for boys, AC rooms for girls)',
      'City sightseeing & local transportation',
      'Special entry passes where required',
      'Merchandise & memorable gift',
      'Guided activities (outdoor cooking, music, photography, boating, games)'
    ],
    exclusions: [
      'Travel from hometown to Prayagraj & return from Varanasi',
      'Personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Prayagraj Exploration',
        activities: [
          'Visit Triveni Sangam',
          'Explore Chandrashekhar Azad Park',
          'Tour Allahabad Fort',
          'Visit Khusro Bagh',
          'Explore Anand Bhavan',
          'Visit Alopi Devi Temple',
          'Tour Allahabad Museum'
        ]
      },
      {
        day: 2,
        title: 'Vindhyachal & Mirzapur Adventure',
        activities: [
          'Trikoniya Yatra (Vindhyavasini, Kaali Koh, Ashtabhuja Temple)',
          'Visit Lal Bhairava Temple',
          'Explore Chunar Fort',
          'Tour Vijaygarh Fort',
          'Visit Tanda & Wyndham Waterfalls',
          'Experience Sirsi Fall'
        ]
      },
      {
        day: 3,
        title: 'Varanasi Sacred Sites',
        activities: [
          'Attend Dasashwamedh Ghat Aarti',
          'Visit Jantar Mantar',
          'Explore Nepali Temple',
          'Walk through Godowliya Chowk',
          'Visit Kashi Vishwanath Temple',
          'Experience Assi Ghat',
          'Enjoy Subah-e-Banaras'
        ]
      },
      {
        day: 4,
        title: 'Sarnath & Varanasi Finale',
        activities: [
          'Explore Sarnath',
          'Visit Mulgandha Kuti Vihar',
          'See Buddha Statue',
          'Tour Dhamek Stupa',
          'Visit Tibetan Temple',
          'Explore New Kashi Vishwanath (BHU)',
          'Tour Ramnagar Fort'
        ]
      }
    ]
  },
  {
    id: 'rajasthan-heritage-trail',
    title: 'Rajasthan Heritage Trail',
    destination: 'Jaipur • Jodhpur • Udaipur • Pushkar',
    duration: '7 Days / 6 Nights',
    price: 8500,
    image: '/images/rajasthan.jpg',
    description: 'Immerse yourself in the royal heritage of Rajasthan, exploring majestic palaces, ancient forts, vibrant markets, and experiencing the rich culture of the Land of Kings.',
    type: 'cultural',
    rating: 4.7,
    reviews: 203,
    inclusions: [
      'Heritage hotel accommodation',
      'All meals (breakfast, lunch, dinner)',
      'AC transportation between cities',
      'Professional heritage guide',
      'Entry tickets to all monuments',
      'Traditional Rajasthani cultural evening',
      'Camel safari in Pushkar',
      'Merchandise & memorable gifts'
    ],
    exclusions: [
      'Travel to/from Jaipur',
      'Personal shopping expenses',
      'Tips for guides and drivers',
      'Optional activities (hot air balloon, etc.)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Jaipur - The Pink City Arrival',
        activities: [
          'Arrival and check-in at heritage hotel',
          'Visit City Palace complex',
          'Explore Jantar Mantar observatory',
          'Walk through colorful bazaars of Pink City',
          'Evening welcome dinner with folk dance'
        ]
      },
      {
        day: 2,
        title: 'Jaipur Fort Exploration',
        activities: [
          'Early morning visit to Amber Fort',
          'Elephant ride experience (optional)',
          'Explore Jaigarh Fort & Nahargarh Fort',
          'Visit Hawa Mahal (Palace of Winds)',
          'Traditional Rajasthani cooking class',
          'Shopping at Johari Bazaar'
        ]
      },
      {
        day: 3,
        title: 'Jaipur to Jodhpur - Blue City',
        activities: [
          'Morning departure to Jodhpur (5 hours)',
          'Check-in and lunch',
          'Visit magnificent Mehrangarh Fort',
          'Explore Jaswant Thada marble cenotaph',
          'Walk through blue lanes of old city',
          'Sunset views from fort ramparts'
        ]
      },
      {
        day: 4,
        title: 'Jodhpur to Udaipur via Ranakpur',
        activities: [
          'Early departure to Udaipur',
          'Stop at Ranakpur Jain Temples',
          'Marvel at intricate marble architecture',
          'Continue journey to Udaipur',
          'Evening arrival and check-in',
          'Sunset boat ride on Lake Pichola'
        ]
      },
      {
        day: 5,
        title: 'Udaipur - City of Lakes',
        activities: [
          'Visit magnificent City Palace',
          'Explore Jagdish Temple',
          'Tour Saheliyon Ki Bari gardens',
          'Visit Crystal Gallery',
          'Evening cultural show at Bagore Ki Haveli',
          'Dinner at rooftop restaurant overlooking lake'
        ]
      },
      {
        day: 6,
        title: 'Udaipur to Pushkar - Holy City',
        activities: [
          'Morning drive to Pushkar (4 hours)',
          'Visit sacred Brahma Temple',
          'Explore Pushkar Lake and ghats',
          'Camel safari in Thar Desert',
          'Traditional desert camp experience',
          'Rajasthani folk music and dance evening'
        ]
      },
      {
        day: 7,
        title: 'Pushkar to Jaipur - Departure',
        activities: [
          'Morning at leisure in Pushkar',
          'Visit local handicraft markets',
          'Drive back to Jaipur (3 hours)',
          'Last-minute shopping',
          'Farewell lunch and departure'
        ]
      }
    ]
  },
  {
    id: 'kerala-backwaters-bliss',
    title: 'Kerala Backwaters & Spice Trail',
    destination: 'Kochi • Munnar • Thekkady • Alleppey • Kovalam',
    duration: '6 Days / 5 Nights',
    price: 7200,
    image: '/images/kerala.jpg',
    description: 'Discover God\'s Own Country through serene backwaters, lush spice plantations, exotic wildlife, pristine beaches, and authentic Kerala culture in this comprehensive journey.',
    type: 'nature',
    rating: 4.8,
    reviews: 174,
    inclusions: [
      'Comfortable accommodation (resorts & houseboats)',
      'All meals including traditional Kerala cuisine',
      'AC transportation throughout',
      'Houseboat stay in Alleppey',
      'Spice plantation tour with guide',
      'Ayurvedic massage session',
      'Wildlife sanctuary entry tickets',
      'Traditional Kerala cultural show',
      'Airport transfers'
    ],
    exclusions: [
      'Flight tickets to/from Kochi',
      'Personal expenses and shopping',
      'Tips for staff and guides',
      'Optional activities (parasailing, etc.)'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kochi Arrival & Heritage Tour',
        activities: [
          'Airport pickup and hotel check-in',
          'Visit historic Fort Kochi area',
          'See iconic Chinese fishing nets',
          'Explore St. Francis Church',
          'Walk through Jew Town and Spice Market',
          'Evening Kathakali classical dance performance'
        ]
      },
      {
        day: 2,
        title: 'Kochi to Munnar - Hill Station',
        activities: [
          'Early morning drive to Munnar (4 hours)',
          'En route visit Cheeyappara waterfalls',
          'Check-in at hill resort',
          'Visit Tea Museum and tea plantations',
          'Explore local markets',
          'Evening at leisure enjoying cool mountain air'
        ]
      },
      {
        day: 3,
        title: 'Munnar Exploration & Thekkady',
        activities: [
          'Early morning visit to Echo Point',
          'Explore Mattupetty Dam and lake',
          'Drive to Thekkady (3 hours)',
          'Check-in near Periyar Wildlife Sanctuary',
          'Evening spice plantation tour',
          'Learn about cardamom, pepper, and vanilla cultivation'
        ]
      },
      {
        day: 4,
        title: 'Wildlife Safari & Alleppey Backwaters',
        activities: [
          'Early morning wildlife boat safari in Periyar',
          'Spot elephants, tigers, and exotic birds',
          'Drive to Alleppey (4 hours)',
          'Check-in to traditional houseboat',
          'Cruise through scenic backwater canals',
          'Overnight stay on houseboat with Kerala dinner'
        ]
      },
      {
        day: 5,
        title: 'Backwater Cruise & Kovalam Beach',
        activities: [
          'Morning backwater cruise and breakfast',
          'Visit local village and coir making units',
          'Drive to Kovalam beach (2 hours)',
          'Check-in at beachside resort',
          'Relax at lighthouse beach',
          'Traditional Ayurvedic massage session'
        ]
      },
      {
        day: 6,
        title: 'Trivandrum Sightseeing & Departure',
        activities: [
          'Visit Padmanabhaswamy Temple',
          'Explore Napier Museum',
          'Last-minute beach relaxation',
          'Shopping for Kerala souvenirs',
          'Transfer to Trivandrum airport for departure'
        ]
      }
    ]
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Goa beach sunset',
    destination: 'Goa',
    category: 'landscape'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Manali mountain peaks',
    destination: 'Manali',
    category: 'landscape'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Jaipur Hawa Mahal',
    destination: 'Jaipur',
    category: 'culture'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Hampi ruins',
    destination: 'Hampi',
    category: 'culture'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Jim Corbett tiger',
    destination: 'Jim Corbett',
    category: 'adventure'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Andaman crystal waters',
    destination: 'Andaman Islands',
    category: 'landscape'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Goan seafood',
    destination: 'Goa',
    category: 'food'
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Rajasthani culture',
    destination: 'Jaipur',
    category: 'people'
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Andaman coral reef',
    destination: 'Andaman Islands',
    category: 'adventure'
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1580500161653-d4d5a5ef5de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Manali adventure sports',
    destination: 'Manali',
    category: 'adventure'
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
        title: 'Evening assembly at Raxaul, cross into Nepal and begin the overnight road journey toward Pokhara.',
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
        title: 'Arrive in Pokhara at dawn, transfer toward the trailhead and begin the acclimatising approach toward Saripakha.',
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
        title: 'Gradual ascent through forested sections toward the midway settlement of Chichimle with active recovery and group bonding.',
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
        title: 'Final push to Khumai for sweeping Annapurna Range panoramas and a golden sunset over the high peaks.',
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
        title: 'Dawn summit ambiance, long downhill descent, evening departure toward Birgunj for the overnight transfer.',
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
        title: 'Border return and farewell after a rewarding Khumai Danda immersion.',
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
      'Personal expenses and drinks'
    ],
    meetingPoint: 'coffee shop, Raxual-Nepal Border, b/w 2 PM - 4 PM',
    requirements: [
      'Moderate fitness level required',
      'Comfortable with 4-6 hours of walking daily',
      'Casual/Sports Shoes',
      'Warm clothing for cold mornings'
    ]
  }
];
