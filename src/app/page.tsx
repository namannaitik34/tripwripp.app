'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Clock } from 'lucide-react';
import { destinations, packages } from '@/data/travelData';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import LiveNow from '@/components/LiveNow';
import CTASection from '@/components/CTASection';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const featuredDestinations = destinations.slice(0, 3);
  const featuredPackages = packages.slice(0, 2);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show preloader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        <Preloader isVisible={isLoading} />
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white" style={{ background: 'linear-gradient(to right, #0d1d30, #00B8D4)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore the World with <span style={{ color: '#FF8F00' }}>TripWripp</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover breathtaking destinations, create unforgettable memories, and embark on adventures that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/destinations"
              className="text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center hover:opacity-90"
              style={{ backgroundColor: '#FF8F00' }}
            >
              Explore Destinations <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/packages"
              className="text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center hover:opacity-90"
              style={{ backgroundColor: '#0d1d30' }}
            >
              View Packages
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Live Now Section */}
      <LiveNow />

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, #FF8F00 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00B8D4 0%, transparent 50%)'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 ease-out border border-gray-100 group cursor-pointer"
            >
              <div className="text-4xl mb-2">🌍</div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#FF8F00' }}>150+</div>
              <div className="text-gray-600 font-medium">Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-2">😊</div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#FF8F00' }}>50K+</div>
              <div className="text-gray-600 font-medium">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-2">📦</div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#FF8F00' }}>200+</div>
              <div className="text-gray-600 font-medium">Travel Packages</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#FF8F00' }}>4.9/5</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16" style={{ backgroundColor: '#F5F5DC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>Featured Destinations</h2>
            <p className="text-xl text-gray-600">Discover our most popular travel destinations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 ease-out group relative border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300 ease-out"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-800">{destination.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold" style={{ color: '#0d1d30' }}>{destination.name}</h3>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                    <span className="text-sm">{destination.country}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="text-2xl font-bold" style={{ color: '#FF8F00' }}>${destination.price}</div>
                    </div>
                    <Link 
                      href={`/destinations/${destination.id}`}
                      className="text-white px-4 py-2 rounded-lg transition-all duration-200 ease-out hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                      style={{ backgroundColor: '#0d1d30' }}
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/destinations"
              className="text-white px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:shadow-xl hover:-translate-y-2 hover:scale-105 active:scale-95 font-semibold inline-flex items-center group relative overflow-hidden"
              style={{ backgroundColor: '#FF8F00' }}
            >
              <span className="relative z-10">View All Destinations</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>Travel Packages</h2>
            <p className="text-xl text-gray-600">Carefully curated travel experiences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 ease-out group"
              >
                <div className="relative overflow-hidden">
                  <div 
                    className="h-64 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300 ease-out"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 143, 0, 0.9)' }}>
                      {pkg.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center text-sm mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{pkg.destination}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: '#0d1d30' }}>{pkg.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold" style={{ color: '#FF8F00' }}>${pkg.price}</span>
                        <span className="text-gray-500 text-sm ml-1"> per person</span>
                      </div>
                    </div>
                    <Link 
                      href={`/packages/${pkg.id}`}
                      className="text-white px-6 py-3 rounded-lg transition-all duration-200 ease-out hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 font-semibold"
                      style={{ backgroundColor: '#0d1d30' }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/packages"
              className="text-white px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:shadow-xl hover:-translate-y-2 hover:scale-105 active:scale-95 font-semibold inline-flex items-center group relative overflow-hidden"
              style={{ backgroundColor: '#FF8F00' }}
            >
              <span className="relative z-10">View All Packages</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
      </motion.div>
    </>
  );
};

export default HomePage;
