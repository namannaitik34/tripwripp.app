'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, Star, MapPin, Clock, Check } from 'lucide-react';
import { packages } from '@/data/travelData';
import LiveNow from '@/components/LiveNow';
import CTASection from '@/components/CTASection';

const PackagesPage = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  const filteredPackages = packages.filter((pkg) => {
    return filter === 'all' || pkg.type === filter;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const types = ['all', ...Array.from(new Set(packages.map(p => p.type)))];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Live Now Section */}
      <LiveNow />

      {/* Header */}
      <section className="text-white py-16" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Travel Packages</h1>
            <p className="text-xl opacity-90">Carefully crafted travel experiences for every adventurer</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filter & Sort:</span>
              </div>
              
              <div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="price">Sort by Price</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="duration">Sort by Duration</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 ease-out group border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <div 
                    className="h-64 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300 ease-out"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="absolute top-4 left-4">
                    <span className="text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 143, 0, 0.9)' }}>
                      {pkg.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({pkg.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold mb-2" style={{ color: '#0d1d30' }}>{pkg.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                      <span className="text-sm mr-4">{pkg.destination}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>
                  
                  {/* Sample Itinerary */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Sample Itinerary:</h4>
                    <div className="space-y-1">
                      {pkg.itinerary.slice(0, 3).map((day) => (
                        <div key={day.day} className="text-sm text-gray-600">
                          <span className="font-medium">Day {day.day}:</span> {day.title}
                        </div>
                      ))}
                      {pkg.itinerary.length > 3 && (
                        <div className="text-sm text-blue-600">+ {pkg.itinerary.length - 3} more days...</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Inclusions */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Includes:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {pkg.inclusions.slice(0, 4).map((inclusion, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <Check className="h-3 w-3 text-green-500 mr-1" />
                          <span>{inclusion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-blue-600">${pkg.price}</span>
                      <span className="text-gray-500 text-sm"> per person</span>
                    </div>
                    <Link 
                      href={`/packages/${pkg.id}`}
                      className="text-white px-6 py-2 rounded-lg transition-all duration-200 ease-out font-semibold hover:opacity-90 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95"
                      style={{ backgroundColor: '#0d1d30' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="text-lg mb-6 opacity-90">
              Let us create a custom package tailored to your preferences and budget.
            </p>
            <Link 
              href="/contact"
              className="text-white px-8 py-3 rounded-lg transition-colors font-semibold hover:opacity-90"
              style={{ backgroundColor: '#FF8F00' }}
            >
              Contact Us for Custom Package
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default PackagesPage;
