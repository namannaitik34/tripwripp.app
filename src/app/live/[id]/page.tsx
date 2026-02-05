'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Users, Mountain, Star, 
  Check, X, Phone, Mail, User, ChevronLeft, ChevronRight,
  Camera, Shield, Utensils, Bed, Trophy
} from 'lucide-react';
import { liveDestinations, LiveDestination } from '@/data/travelData';

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  gender: string;
  ageRange: string;
}

// Use the provided API key for live trek submissions (same as Khumai)
const LIVE_BOOKING_API_KEY = '484bf319-a4e3-49eb-ae7c-eec4c4865ca2';

const LiveDestinationPage = () => {
  const params = useParams();
  const [destination, setDestination] = useState<LiveDestination | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    gender: '',
    ageRange: ''
  });

  useEffect(() => {
    const foundDestination = liveDestinations.find(dest => dest.id === params.id);
    if (foundDestination) {
      setDestination(foundDestination);
    }
  }, [params.id]);

  // Pause auto-scroll on user interaction
  const pauseAutoScroll = () => {
    setIsAutoScrollPaused(true);
    setTimeout(() => setIsAutoScrollPaused(false), 10000); // Resume after 10 seconds
  };

  const nextImage = useCallback(() => {
    if (destination?.gallery) {
      pauseAutoScroll();
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % destination.gallery!.length;
        console.log('Next image:', newIndex, 'Total images:', destination.gallery!.length);
        return newIndex;
      });
    }
  }, [destination?.gallery]);

  const prevImage = useCallback(() => {
    if (destination?.gallery) {
      pauseAutoScroll();
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + destination.gallery!.length) % destination.gallery!.length;
        console.log('Previous image:', newIndex, 'Total images:', destination.gallery!.length);
        return newIndex;
      });
    }
  }, [destination?.gallery]);

  const goToImage = (index: number) => {
    pauseAutoScroll();
    console.log('Go to image:', index);
    setCurrentImageIndex(index);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoScrollPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextImage, prevImage]); // Add dependencies

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrollPaused || !destination?.gallery) return;
    
    const autoScrollInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % destination.gallery!.length;
        console.log('Auto-scroll to:', newIndex);
        return newIndex;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(autoScrollInterval);
  }, [destination, isAutoScrollPaused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    console.log('Submitting form data:', { destinationId: destination.id, ...formData });
    
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': LIVE_BOOKING_API_KEY,
        },
        body: JSON.stringify({ destinationId: destination.id, ...formData })
      });
      
      const data = await res.json();
      console.log('API response:', data);
      
      if (!res.ok) {
        alert(data.message || 'Failed to submit booking. Please try again.');
        return;
      }
      
      alert('Booking request submitted successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', gender: '', ageRange: '' });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Please check your internet connection and try again.');
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h1>
          <p className="text-gray-600">The live destination you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Hero Section with Modern Image Gallery */}
      <section className="relative h-96 md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative w-full h-full">
          {destination.gallery && destination.gallery.length > 0 ? (
            <>
              {/* Main Image with Modern Overlay */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={destination.gallery[currentImageIndex]}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>

                {/* Completion Overlay */}
                {destination.isCompleted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-500/40 via-emerald-500/30 to-teal-500/40 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30"
                      >
                        <Trophy className="w-12 h-12 text-white drop-shadow-lg" />
                      </motion.div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Trek Completed! 🎉</h2>
                      <p className="text-white/90 text-lg drop-shadow-lg">This incredible journey has been completed successfully</p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
              
              {/* Sleek Navigation Buttons */}
              {destination.gallery.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Previous button clicked, current index:', currentImageIndex);
                      prevImage();
                    }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 shadow-lg cursor-pointer z-20 active:bg-white/30"
                    type="button"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Next button clicked, current index:', currentImageIndex);
                      nextImage();
                    }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 text-white hover:bg-white/20 transition-all duration-300 shadow-lg cursor-pointer z-20 active:bg-white/30"
                    type="button"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Modern Image Progress Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {destination.gallery.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Indicator clicked, setting index to:', index);
                      goToImage(index);
                    }}
                    className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                      index === currentImageIndex 
                        ? 'w-8 h-3 bg-white rounded-full' 
                        : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
                    }`}
                    type="button"
                    aria-label={`Go to image ${index + 1}`}
                  >
                    {index === currentImageIndex && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Image Counter and Auto-scroll Control */}
              <div className="absolute top-6 right-6 flex items-center space-x-3">
                <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium border border-white/20">
                  {currentImageIndex + 1} / {destination.gallery.length}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsAutoScrollPaused(prev => !prev)}
                  className="bg-black/30 backdrop-blur-md rounded-full p-2 text-white border border-white/20 cursor-pointer"
                  type="button"
                  aria-label={isAutoScrollPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                >
                  {isAutoScrollPaused ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 002 0v4a1 1 0 11-2 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </>
          ) : (
            /* Modern Placeholder Design */
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Camera className="w-12 h-12 text-white/70" />
                </div>
                <h3 className="text-2xl font-semibold">Gallery Coming Soon</h3>
                <p className="text-white/70 max-w-md">We&apos;re preparing stunning visuals of this destination for you.</p>
              </div>
            </div>
          )}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="flex items-center mb-4 flex-wrap gap-3">
                {!destination.isCompleted ? (
                  <div className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    LIVE
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-4 py-2 text-sm font-bold flex items-center shadow-lg"
                  >
                    <Check className="w-5 h-5 mr-1" />
                    COMPLETED
                  </motion.div>
                )}
                {!destination.isCompleted && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-gray-800 flex items-center">
                    <Users className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                    <span className="font-semibold text-sm">
                      {destination.availableSlots}/{destination.totalSlots} slots available
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
              <div className="flex items-center text-xl mb-2">
                <MapPin className="h-6 w-6 mr-2" style={{ color: '#FF8F00' }} />
                <span>{destination.country}, {destination.region}</span>
              </div>
              {destination.altitude && (
                <div className="flex items-center text-lg">
                  <Mountain className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                  <span>Altitude: {destination.altitude}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Thumbnail Gallery */}
      {destination.gallery && destination.gallery.length > 1 && (
        <section className="py-6 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Gallery</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {destination.gallery.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Thumbnail clicked, setting index to:', index);
                    goToImage(index);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    index === currentImageIndex 
                      ? 'border-orange-500 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-orange-500/20"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-lg mb-6">
                <div className="border-b border-gray-200">
                  <nav className="grid grid-cols-2 gap-4 px-4 py-4 md:flex md:space-x-6 md:px-8 md:py-6">
                    {[{ id: 'overview', label: 'Overview' },
                      { id: 'itinerary', label: 'Itinerary' },
                      { id: 'included', label: "What's Included" },
                      { id: 'requirements', label: 'Requirements' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-6 rounded-full font-semibold text-base shadow-sm transition-all duration-200 focus:outline-none border-2
                          ${activeTab === tab.id
                            ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                            : 'bg-white text-orange-500 border-orange-200 hover:bg-orange-50 hover:border-orange-400'}
                        `}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#0d1d30' }}>About This Adventure</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {destination?.detailedDescription || destination?.description}
                      </p>
                      <h4 className="text-xl font-semibold mb-4" style={{ color: '#0d1d30' }}>Highlights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {destination?.highlights?.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="w-5 h-5 text-orange-500 mr-2" />
                            <span className="text-gray-700 text-base">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Itinerary Tab */}
                  {activeTab === 'itinerary' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>Day by Day Itinerary</h3>
                      <div className="space-y-6">
                        {destination.itinerary?.map((day, index) => (
                          <div key={index} className="border-l-4 border-orange-500 pl-6 pb-6">
                            <div className="flex items-center mb-3">
                              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-4">
                                {day.day}
                              </div>
                              <h4 className="text-lg font-semibold" style={{ color: '#0d1d30' }}>{day.title}</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">Activities:</h5>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {day.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-center">
                                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                {day.accommodation && (
                                  <div className="mb-3">
                                    <div className="flex items-center mb-1">
                                      <Bed className="h-4 w-4 mr-2 text-gray-500" />
                                      <span className="font-medium text-gray-800">Accommodation:</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{day.accommodation}</span>
                                  </div>
                                )}
                                {day.meals && day.meals.length > 0 && (
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <Utensils className="h-4 w-4 mr-2 text-gray-500" />
                                      <span className="font-medium text-gray-800">Meals:</span>
                                    </div>
                                    <span className="text-sm text-gray-600">{day.meals.join(', ')}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Included Tab */}
                  {activeTab === 'included' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-green-600">What&apos;s Included</h3>
                          <div className="space-y-3">
                            {destination.included?.map((item, index) => (
                              <div key={index} className="flex items-start">
                                <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-red-600">What&apos;s Not Included</h3>
                          <div className="space-y-3">
                            {destination.excluded?.map((item, index) => (
                              <div key={index} className="flex items-start">
                                <X className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Requirements Tab */}
                  {activeTab === 'requirements' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>Requirements & Preparation</h3>
                      <div className="space-y-4 mb-8">
                        {destination.requirements?.map((req, index) => (
                          <div key={index} className="flex items-start">
                            <Shield className="h-5 w-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>

                      {destination.meetingPoint && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Meeting Point</h4>
                          <p className="text-blue-700">{destination.meetingPoint}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                {/* Price and Quick Info */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#FF8F00' }}>
                      ₹{destination.price}
                    </span>
                    <span className="text-gray-500 text-lg ml-2">per person</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                    <span>{destination.rating} rating</span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-medium" style={{ color: '#0d1d30' }}>{destination.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Best Time:</span>
                    <span className="font-medium text-sm" style={{ color: '#0d1d30' }}>{destination.bestTime}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium" style={{ color: '#0d1d30' }}>
                      {new Date(destination.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Available Slots:</span>
                    <span className="font-bold text-green-600">{destination.availableSlots} left</span>
                  </div>
                </div>

                {/* Book Now Button */}
                {!destination.isCompleted ? (
                  <a
                    href="#book"
                    className="w-full inline-flex items-center justify-center text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 ease-out hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: '#0d1d30' }}
                    aria-label="Book now"
                  >
                    {destination.availableSlots === 0 ? 'Fully Booked' : 'Book Now'}
                  </a>
                ) : (
                  <motion.button
                    disabled
                    className="w-full py-4 rounded-xl font-bold text-lg text-white cursor-not-allowed"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.7)' }}
                  >
                    <Check className="w-5 h-5 inline mr-2" />
                    Trek Completed Successfully
                  </motion.button>
                )}

                {destination.availableSlots <= 3 && destination.availableSlots > 0 && (
                  <p className="text-red-500 text-sm text-center mt-2 font-medium">
                    Only {destination.availableSlots} slots remaining!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Introduction Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>
              Meet Your Expert Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Led by experienced local guides who know every trail, every story, and every hidden gem of the region.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Guide Photo */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    <Image
                      src="/images/Guide.png" // You'll need to add this image
                      alt="Expert Trekking Guide"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Experience Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg">
                  3+ Years
                  </div>
                </div>
              </div>

              {/* Guide Information */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0d1d30' }}>
                  Ajit Sharma
                </h3>
                <p className="text-orange-600 font-semibold mb-4 text-lg">
                  Expert in trekking ,especially in Nepal region
                </p>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    With over 3 years of experience guiding trekkers through the magnificent trails of Nepal, 
                    Ajit brings unparalleled expertise and passion to every adventure.                   </p>
                 
                </div>



                {/* Social Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/ajitsharma7087/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @ajitsharma7087
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/share/1HzSBKt4YP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Ajit Sharma
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.youtube.com/@ajitsharma7087-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Ajit Vlogs
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:ajitsingh865190@gmail.com"
                    className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Minimalist Trust Indicators */}
            <div className="border-t border-gray-200 mt-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <div className="text-3xl font-light text-orange-600 mb-2">3+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                  <div className="h-0.5 bg-orange-200 group-hover:bg-orange-400 transition-colors duration-300 mt-2 mx-auto w-8"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <div className="text-3xl font-light text-green-600 mb-2">20+</div>
                  <div className="text-sm text-gray-600 font-medium">Successful Treks</div>
                  <div className="h-0.5 bg-green-200 group-hover:bg-green-400 transition-colors duration-300 mt-2 mx-auto w-8"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <div className="text-3xl font-light text-blue-600 mb-2">4.9★</div>
                  <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                  <div className="h-0.5 bg-blue-200 group-hover:bg-blue-400 transition-colors duration-300 mt-2 mx-auto w-8"></div>
                </motion.div>
              </div>
            </div>

            {/* Direct Contact CTA */}
            <div className="mt-8 text-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white"
              >
                <h4 className="text-xl font-bold mb-2">Have Questions? Connect Directly!</h4>
                <p className="text-orange-100 mb-4">
                  Get insider tips, ask about trail conditions, or customize your adventure
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="tel:+91 86519 07981"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Quick Call
                  </a>
                  <a
                    href="mailto:ajitsingh865190@gmail.com"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <p className="text-sm font-semibold text-orange-600">Secure Your Slot</p>
                <h2 className="text-3xl font-bold" style={{ color: '#0d1d30' }}>Book Your Adventure</h2>
                <p className="text-gray-600 mt-2">Fill the form and we will confirm within 24 hours.</p>
              </div>
              <div className="bg-orange-50 text-orange-700 px-4 py-3 rounded-xl text-sm shadow-sm">
                <div className="font-semibold">{destination.name}</div>
                <div className="text-gray-700">{destination.duration} • ₹{destination.price} per person</div>
                <div className="text-gray-700">
                  {new Date(destination.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {' — '}
                  {new Date(destination.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range *</label>
                  <select
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  >
                    <option value="">Select Age Range</option>
                    <option value="18-25">18-25 years</option>
                    <option value="26-35">26-35 years</option>
                    <option value="36-45">36-45 years</option>
                    <option value="46-55">46-55 years</option>
                    <option value="56-65">56-65 years</option>
                    <option value="65+">65+ years</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 rounded-xl font-bold transition-all duration-200 ease-out hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#FF8F00' }}
              >
                Submit Booking Request
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to our terms and conditions. We&apos;ll contact you within 24 hours to confirm your booking.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LiveDestinationPage;
