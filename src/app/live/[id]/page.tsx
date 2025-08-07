'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Users, Mountain, Star, 
  Check, X, Phone, Mail, User, ChevronLeft, ChevronRight,
  Camera, Shield, Utensils, Bed
} from 'lucide-react';
import { liveDestinations, LiveDestination } from '@/data/travelData';

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  gender: string;
  ageRange: string;
}

const LiveDestinationPage = () => {
  const params = useParams();
  const [destination, setDestination] = useState<LiveDestination | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
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

  const nextImage = () => {
    if (destination?.gallery) {
      pauseAutoScroll();
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % destination.gallery!.length;
        console.log('Next image:', newIndex, 'Total images:', destination.gallery!.length);
        return newIndex;
      });
    }
  };

  const prevImage = () => {
    if (destination?.gallery) {
      pauseAutoScroll();
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex - 1 + destination.gallery!.length) % destination.gallery!.length;
        console.log('Previous image:', newIndex, 'Total images:', destination.gallery!.length);
        return newIndex;
      });
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData, destination);
    alert('Booking request submitted successfully! We will contact you soon.');
    setShowBookingModal(false);
    setFormData({ name: '', email: '', phone: '', gender: '', ageRange: '' });
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
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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
              <div className="flex items-center mb-4">
                <div className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center mr-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                  LIVE
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-gray-800 flex items-center">
                  <Users className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                  <span className="font-semibold text-sm">
                    {destination.availableSlots}/{destination.totalSlots} slots available
                  </span>
                </div>
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
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'itinerary', label: 'Itinerary' },
                      { id: 'included', label: 'What\'s Included' },
                      { id: 'requirements', label: 'Requirements' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
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
                        {destination.detailedDescription || destination.description}
                      </p>

                      <h4 className="text-xl font-semibold mb-4" style={{ color: '#0d1d30' }}>Highlights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {destination.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <Check className="h-5 w-5 mr-3 text-green-500" />
                            <span className="text-gray-700">{highlight}</span>
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
                            <p className="text-gray-600 mb-4">{day.description}</p>
                            
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
                      ${destination.price}
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
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 ease-out hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#0d1d30' }}
                  disabled={destination.availableSlots === 0}
                >
                  {destination.availableSlots === 0 ? 'Fully Booked' : 'Book Now'}
                </button>

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

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#0d1d30' }}>Book Your Adventure</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F5F5DC' }}>
                <h3 className="font-semibold" style={{ color: '#0d1d30' }}>{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.duration} • ${destination.price} per person</p>
                <p className="text-sm text-gray-600">
                  {new Date(destination.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} - {new Date(destination.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveDestinationPage;
