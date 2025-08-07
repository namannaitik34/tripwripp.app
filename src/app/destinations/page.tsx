'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, Star, MapPin } from 'lucide-react';
import { destinations } from '@/data/travelData';
import LiveNow from '@/components/LiveNow';
import CTASection from '@/components/CTASection';

const DestinationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredDestinations = destinations.filter((destination) => {
    const typeMatch = filter === 'all' || destination.type === filter;
    const regionMatch = regionFilter === 'all' || destination.region === regionFilter;
    return typeMatch && regionMatch;
  });

  const types = ['all', ...Array.from(new Set(destinations.map(d => d.type)))];
  const regions = ['all', ...Array.from(new Set(destinations.map(d => d.region)))];

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
            <h1 className="text-5xl font-bold mb-4">Destinations</h1>
            <p className="text-xl opacity-90">Discover amazing places around the world</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 ease-out group border border-gray-100"
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
                  <div className="absolute top-4 left-4">
                    <span className="text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 143, 0, 0.9)' }}>
                      {destination.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold" style={{ color: '#0d1d30' }}>{destination.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" style={{ color: '#FF8F00' }} />
                      <span className="text-sm">{destination.country}, {destination.region}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2" style={{ color: '#0d1d30' }}>Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="text-white px-2 py-1 rounded-full text-xs"
                          style={{ backgroundColor: '#F5F5DC', color: '#0d1d30' }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold" style={{ color: '#FF8F00' }}>${destination.price}</span>
                        <span className="text-gray-500 text-sm ml-1"> / {destination.duration}</span>
                      </div>
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
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No destinations found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    
    </div>
  );
};

export default DestinationsPage;
