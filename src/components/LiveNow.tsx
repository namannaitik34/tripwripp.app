'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Clock, Users, Mountain, Star, Calendar, Phone, Mail, User, Eye, Check } from 'lucide-react';
import { liveDestinations, LiveDestination } from '@/data/travelData';

interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  gender: string;
  ageRange: string;
}

const LiveNow: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentLiveDestinations = liveDestinations.filter(dest => dest.isLive);


  if (currentLiveDestinations.length === 0 || !isClient) {
    return null;
  }

  return (
    <>
      <section className="py-12 relative overflow-hidden" style={{ backgroundColor: '#E8F5E8' }}>
        {/* Floating Particles Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2300B8D4\" fill-opacity=\"0.3\"%3E%3Ccircle cx=\"30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-gray-800 font-semibold text-sm">LIVE NOW</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Limited Time Adventures
            </h2>
            <p className="text-gray-700 text-lg">
              Book now for exclusive departures - Limited slots available!
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            {currentLiveDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-200 ease-out group border border-gray-100 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Modern Image Section with Glassmorphism */}
                  <div className="relative overflow-hidden h-64 lg:h-auto group-hover:before:opacity-100 before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/60 before:via-transparent before:to-transparent before:opacity-0 before:transition-opacity before:duration-200">
                    {/* Background Image with Modern Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500 ease-out filter"
                      style={{ 
                        backgroundImage: `url(${destination.image})`,
                        filter: 'brightness(0.9) contrast(1.1)'
                      }}
                    ></div>
                    {/* Modern Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
                    {/* Glassmorphism Elements */}
                    <div className="absolute inset-0">
                      {/* Floating Glass Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/30 rounded-full backdrop-blur-sm"
                          animate={{
                            y: [-10, -30, -10],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.7,
                            ease: "easeInOut"
                          }}
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                          }}
                        />
                      ))}
                    </div>
                    {/* Live Badge with Modern Design */}
                    <div className="absolute top-4 left-4">
                      {!destination.isCompleted ? (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center bg-red-500/90 backdrop-blur-md border border-red-400/30 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-lg"
                        >
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                          LIVE
                        </motion.div>
                      ) : (
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-md border border-green-400/30 text-white rounded-full px-4 py-2 text-sm font-bold shadow-lg"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          COMPLETED
                        </motion.div>
                      )}
                    </div>
                    {/* Availability with Glassmorphism */}
                    {!destination.isCompleted && (
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 shadow-lg">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-orange-400" />
                          <span className="font-semibold text-white">
                            {destination.availableSlots}/{destination.totalSlots} slots
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Rating with Modern Style */}
                    <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center shadow-lg">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-2 text-sm font-medium text-white">{destination.rating}</span>
                    </div>
                    {/* Modern Image Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {/* Content Section */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0d1d30' }}>
                        {destination.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                        <span>{destination.country}, {destination.region}</span>
                      </div>
                      {destination.altitude && (
                        <div className="flex items-center text-gray-600 mb-3">
                          <Mountain className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                          <span>Altitude: {destination.altitude}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {destination.description}
                    </p>
                    {/* Trip Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                        <span className="text-sm text-gray-600">{destination.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" style={{ color: '#FF8F00' }} />
                        <span className="text-sm text-gray-600">
                          {new Date(destination.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {destination.difficulty && (
                        <div className="flex items-center col-span-2">
                          <div className="w-5 h-5 mr-2 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF8F00' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">Difficulty: {destination.difficulty}</span>
                        </div>
                      )}
                    </div>
                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2" style={{ color: '#0d1d30' }}>Highlights:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {destination.highlights.slice(0, 6).map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#FF8F00' }}></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Price and Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Starting from</span>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-200 ease-out" style={{ color: '#FF8F00' }}>
                            ₹{destination.price}
                          </span>
                          <span className="text-gray-500 text-sm ml-1"> per person</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-4 sm:w-auto">
                        <Link
                          href={`/live/${destination.id}`}
                          className="group relative overflow-hidden text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center w-full sm:w-auto"
                          style={{ backgroundColor: '#FF8F00' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Eye className="w-4 h-4 mr-2 relative z-10" />
                          <span className="relative z-10">Explore</span>
                        </Link>
                        {!destination.isCompleted ? (
                          <Link
                            href={`/live/${destination.id}#book`}
                            className="group relative overflow-hidden text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 ease-out hover:shadow-2xl hover:-translate-y-1 active:scale-95 w-full sm:w-auto text-center"
                            style={{ backgroundColor: '#0d1d30' }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">Book Now</span>
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="text-white px-8 py-3 rounded-xl font-semibold w-full sm:w-auto cursor-not-allowed"
                            style={{ backgroundColor: 'rgba(34, 197, 94, 0.7)' }}
                          >
                            ✓ Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default LiveNow;