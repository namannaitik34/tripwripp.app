'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

// Properly typed SafeImage component
interface SafeImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
}

const SafeImage = ({ src, alt, ...props }: SafeImageProps) => {
  const [error, setError] = useState(false);
  const fallbackSrc = "/images/logo-fallback.png";
  
  return (
    <Image 
      src={error ? fallbackSrc : src} 
      alt={alt} 
      onError={() => setError(true)}
      {...props}
    />
  );
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="relative h-40 w-40">
                <SafeImage 
                  src="/images/logo-white.svg" 
                  alt="TripWripp Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <p className="text-gray-300 mt-4">
                Your ultimate travel companion for discovering amazing destinations and creating unforgettable memories.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/destinations" className="text-gray-300 hover:text-blue-400 transition-colors">Destinations</Link></li>
                <li><Link href="/packages" className="text-gray-300 hover:text-blue-400 transition-colors">Packages</Link></li>
                <li><Link href="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors">Gallery</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</Link></li>
                <li><Link href="/help" className="text-gray-300 hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📧 tripwripteam@gmail.com</p>
                <p>📞 +91 79706 19555</p>
                <p>📍 123 Travel Street, Adventure City</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} TripWripp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
