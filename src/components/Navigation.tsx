'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#0d1d30' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8" style={{ color: '#FF8F00' }} />
            <span className="text-2xl font-bold text-white">TripWripp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={pathname === item.href ? { backgroundColor: '#FF8F00' } : {}}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ backgroundColor: '#0d1d30', borderColor: '#FF8F00' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={pathname === item.href ? { backgroundColor: '#FF8F00' } : {}}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
