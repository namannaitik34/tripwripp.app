'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Star, Calendar, 
  Check, X, Phone, Mail, User, ChevronLeft, ChevronRight, ArrowLeft
} from 'lucide-react';
import { destinations, Destination } from '@/data/travelData';
import Link from 'next/link';

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  gender: string;
  ageRange: string;
}

const DestinationDetailPage = () => {
  const params = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
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

  // Sample images for gallery (you can replace with actual destination images)
  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759844-d150baec3e5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1570121629347-59c9dcbcc0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ];

  useEffect(() => {
    const foundDestination = destinations.find(dest => dest.id === params.id);
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
    pauseAutoScroll();
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % sampleImages.length;
      console.log('Next image:', newIndex, 'Total images:', sampleImages.length);
      return newIndex;
    });
  };

  const prevImage = () => {
    pauseAutoScroll();
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + sampleImages.length) % sampleImages.length;
      console.log('Previous image:', newIndex, 'Total images:', sampleImages.length);
      return newIndex;
    });
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
    if (isAutoScrollPaused) return;
    
    const autoScrollInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % sampleImages.length;
        console.log('Auto-scroll to:', newIndex);
        return newIndex;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(autoScrollInterval);
  }, [sampleImages.length, isAutoScrollPaused]);

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ECEFF1' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Destination not found</h1>
          <p className="text-gray-600 mb-6">The destination you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/destinations"
            className="text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#FF8F00' }}
          >
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/destinations"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Destinations
          </Link>
        </div>
      </div>

      {/* Hero Section with Modern Image Gallery */}
      <section className="relative h-96 md:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative w-full h-full">
          {/* Main Image with Modern Overlay */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={destination.image || sampleImages[currentImageIndex]}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
          </div>
          
          {/* Sleek Navigation Buttons */}
          {sampleImages.length > 1 && (
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
            {sampleImages.map((_, index) => (
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
              {currentImageIndex + 1} / {sampleImages.length}
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
                <div className="bg-orange-500/90 backdrop-blur-sm rounded-lg px-3 py-1 text-white flex items-center mr-4">
                  <span className="font-semibold text-sm">{destination.type.toUpperCase()}</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-gray-800 flex items-center">
                  <Star className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                  <span className="font-semibold text-sm">{destination.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
              <div className="flex items-center text-xl mb-2">
                <MapPin className="h-6 w-6 mr-2" style={{ color: '#FF8F00' }} />
                <span>{destination.country}, {destination.region}</span>
              </div>
              <div className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                <span>Duration: {destination.duration}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Thumbnail Gallery */}
      {sampleImages.length > 1 && (
        <section className="py-6 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Gallery</h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {sampleImages.map((image, index) => (
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
                      { id: 'highlights', label: 'Highlights' },
                      { id: 'best-time', label: 'Best Time to Visit' }
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
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#0d1d30' }}>About {destination.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {destination.description}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        This {destination.type} destination offers an unforgettable experience with stunning landscapes, 
                        rich cultural heritage, and incredible adventure opportunities. Whether you&apos;re seeking relaxation 
                        or adventure, {destination.name} has something special to offer every traveler.
                      </p>
                    </motion.div>
                  )}

                  {/* Highlights Tab */}
                  {activeTab === 'highlights' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>Highlights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {destination.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <Check className="h-6 w-6 mr-3 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Best Time Tab */}
                  {activeTab === 'best-time' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>Best Time to Visit</h3>
                      <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-6 w-6 mr-3" style={{ color: '#FF8F00' }} />
                          <span className="text-lg font-semibold text-gray-800">Recommended Period</span>
                        </div>
                        <p className="text-gray-700 text-lg font-medium mb-2">{destination.bestTime}</p>
                        <p className="text-gray-600">
                          This is the ideal time to visit {destination.name} when weather conditions are most favorable 
                          for outdoor activities and sightseeing. Plan your trip during this period for the best experience.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold" style={{ color: '#FF8F00' }}>
                        ${destination.price}
                      </span>
                      <span className="text-gray-500 text-lg ml-2">per person</span>
                    </div>
                    <span className="text-gray-500 text-sm">Duration: {destination.duration}</span>
                  </div>
                  
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-1"
                    style={{ backgroundColor: '#0d1d30' }}
                  >
                    Book This Trip
                  </button>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4" style={{ color: '#0d1d30' }}>Trip Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3" style={{ color: '#FF8F00' }} />
                      <span className="text-gray-600">{destination.country}, {destination.region}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3" style={{ color: '#FF8F00' }} />
                      <span className="text-gray-600">{destination.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-3" style={{ color: '#FF8F00' }} />
                      <span className="text-gray-600">{destination.rating}/5 Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-3" style={{ color: '#FF8F00' }} />
                      <span className="text-gray-600">{destination.bestTime}</span>
                    </div>
                  </div>
                </div>
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold" style={{ color: '#0d1d30' }}>
                    Book {destination.name}
                  </h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#F5F5DC' }}>
                  <div className="flex items-center justify-between text-sm">
                    <span>Price:</span>
                    <span className="font-semibold" style={{ color: '#FF8F00' }}>
                      ${destination.price} per person
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span>Duration:</span>
                    <span className="font-semibold">{destination.duration}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Age Range *
                    </label>
                    <select
                      name="ageRange"
                      value={formData.ageRange}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Age Range</option>
                      <option value="18-25">18-25 years</option>
                      <option value="26-35">26-35 years</option>
                      <option value="36-45">36-45 years</option>
                      <option value="46-55">46-55 years</option>
                      <option value="55+">55+ years</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 text-white rounded-lg font-semibold transition-all duration-300 hover:opacity-90"
                      style={{ backgroundColor: '#FF8F00' }}
                    >
                      Submit Booking
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DestinationDetailPage;
