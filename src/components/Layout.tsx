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
                <div className="flex flex-col items-center justify-center mt-2 gap-2">
                  <span className="flex items-center gap-1 text-sm">
                    Developed with <span className="text-red-500">&#10084;&#65039;</span> by namannaitik34
                  </span>
                  <a
                    href="https://github.com/namannaitik34"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Naitik's GitHub"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {/* GitHub SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.525.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 7.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                    </svg>
                    <span className="text-sm">namannaitik34</span>
                  </a>
                </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
