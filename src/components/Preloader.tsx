'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  isVisible: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #0d1d30 0%, #00B8D4 50%, #FF8F00 100%)'
      }}
    >
      <div className="text-center">
        <div className="w-64 h-64 mx-auto mb-4">
          <DotLottieReact
            src="https://lottie.host/489df004-99b0-44d5-865f-ec644e9da7dc/UBEQdVEGox.lottie"
            loop
            autoplay
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome to <span style={{ color: '#FF8F00' }}>TripWripp</span>
          </h2>
          <p className="text-lg opacity-90">Preparing your journey...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
