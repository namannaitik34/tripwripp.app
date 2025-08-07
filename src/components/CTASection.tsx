'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
      {/* Animated Travel Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Flying Airplane */}
        <motion.div
          className="absolute text-4xl"
          animate={{
            x: [-100, 1200],
            y: [100, 80, 120, 100],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '20%' }}
        >
          ✈️
        </motion.div>
        
        {/* Mountain */}
        <motion.div
          className="absolute text-5xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '15%' }}
        >
          🏔️
        </motion.div>
        
        {/* Trekking Person */}
        <motion.div
          className="absolute text-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '25%', right: '20%' }}
        >
          🥾
        </motion.div>
        
        {/* Hot Air Balloon */}
        <motion.div
          className="absolute text-4xl"
          animate={{
            y: [-20, 20, -20],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '15%', right: '10%' }}
        >
          🎈
        </motion.div>
        
        {/* Compass */}
        <motion.div
          className="absolute text-3xl opacity-40"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '60%', left: '10%' }}
        >
          🧭
        </motion.div>
        
        {/* Camera */}
        <motion.div
          className="absolute text-3xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '20%', left: '25%' }}
        >
          📸
        </motion.div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <motion.span 
              className="inline-block text-6xl mb-4"
              animate={{
                y: [0, -10, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✈️
            </motion.span>
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 text-gray-700 leading-relaxed">
            Join thousands of travelers who trust TripWripp for their perfect vacation experience. 
            Let&apos;s turn your travel dreams into unforgettable memories!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact"
              className="text-white px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:shadow-xl hover:-translate-y-2 hover:scale-105 active:scale-95 font-semibold inline-flex items-center group relative overflow-hidden"
              style={{ backgroundColor: '#FF8F00' }}
            >
              <span className="relative z-10">Start Planning</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link 
              href="/packages"
              className="border-2 px-8 py-4 rounded-xl transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 font-semibold inline-flex items-center group relative overflow-hidden"
              style={{ borderColor: '#0d1d30', color: '#0d1d30' }}
            >
              <span className="relative z-10">Browse Packages</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </div>

          
          <div className="mt-8 flex justify-center items-center space-x-8 text-gray-600">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌍</span>
              <span className="text-sm">150+ Destinations</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">👥</span>
              <span className="text-sm">50K+ Happy Travelers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
