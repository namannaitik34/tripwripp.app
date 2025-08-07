import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">TripWripp</h3>
              <p className="text-gray-300">
                Your ultimate travel companion for discovering amazing destinations and creating unforgettable memories.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/destinations" className="text-gray-300 hover:text-blue-400 transition-colors">Destinations</Link></li>
                <li><a href="/packages" className="text-gray-300 hover:text-blue-400 transition-colors">Packages</a></li>
                <li><a href="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors">Gallery</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>📧 info@tripwripp.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 123 Travel Street, Adventure City</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 TripWripp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
