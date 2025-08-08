'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, DollarSign, Star, ArrowRight
} from 'lucide-react';

const CustomizeTrip: React.FC = () => {
  return (
    <>
      {/* Customize Your Trip Section */}
      <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute text-6xl opacity-10"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ top: '10%', right: '10%' }}
          >
            🗺️
          </motion.div>
          <motion.div
            className="absolute text-4xl opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ bottom: '20%', left: '15%' }}
          >
            ✈️
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>
              Customize Your Perfect Trip
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Can't find exactly what you're looking for? Let our travel experts create a personalized 
              itinerary tailored to your dreams, preferences, and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF8F00' }}>
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#0d1d30' }}>
                  Choose Your Destination
                </h3>
                <p className="text-gray-600">
                  Tell us where you want to go, and we'll craft the perfect itinerary for your chosen destination.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B8D4' }}>
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#0d1d30' }}>
                  Select Your Interests
                </h3>
                <p className="text-gray-600">
                  From adventure sports to cultural experiences, we'll include activities that match your passions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0d1d30' }}>
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#0d1d30' }}>
                  Set Your Budget
                </h3>
                <p className="text-gray-600">
                  We'll create amazing experiences within your budget range, ensuring great value for money.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link href="/packages#customize-trip">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 ease-out hover:opacity-90 hover:shadow-xl inline-flex items-center group relative overflow-hidden"
                style={{ backgroundColor: '#FF8F00' }}
              >
                <span className="relative z-10">Start Customizing</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomizeTrip;
