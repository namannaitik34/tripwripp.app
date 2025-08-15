'use client';

import { notFound } from 'next/navigation';
import { packages } from '@/data/travelData';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PackageDetailPageProps {
  params: { id: string };
}

// App Router dynamic route receives params as argument
export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const pkg = packages.find(p => p.id === params.id);

  if (!pkg) {
    return notFound();
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
        <Image
          src={pkg.image || '/images/default-destination.jpg'}
          alt={`${pkg.title} - ${pkg.destination} travel package`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{pkg.title}</h1>
          <p className="mt-2 text-lg md:text-xl text-blue-200 font-medium">{pkg.destination}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Details Card */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">Overview</h2>
          <p className="text-gray-700 mb-4">{pkg.description}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Duration: {pkg.duration}</span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">Type: {pkg.type?.charAt(0).toUpperCase() + pkg.type?.slice(1) || 'Adventure'}</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Rating: {pkg.rating || 'N/A'} ⭐</span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{pkg.reviews || 0} reviews</span>
          </div>

          {(pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pkg.inclusions && pkg.inclusions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Inclusions</h3>
                  <ul className="list-disc ml-5 text-gray-700 space-y-1">
                    {pkg.inclusions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions && pkg.exclusions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Exclusions</h3>
                  <ul className="list-disc ml-5 text-gray-700 space-y-1">
                    {pkg.exclusions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4">Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map(day => (
                  <div
                    key={day.day}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm border-l-4 border-blue-400"
                  >
                    <h3 className="font-semibold text-blue-700 mb-1">Day {day.day}: {day.title}</h3>
                    {day.activities && day.activities.length > 0 && (
                      <ul className="list-disc ml-6 text-gray-700">
                        {day.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sticky Booking Card */}
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:col-span-1"
        >
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
            <div>
              <span className="text-gray-500 text-sm">Starting from</span>
              <div className="text-3xl font-bold text-blue-700 mb-2">₹{pkg.price?.toLocaleString() || 'Contact for pricing'}</div>
            </div>
            <Link
              href={`/book?package=${pkg.id}`}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors text-center"
              aria-label={`Book ${pkg.title} travel package`}
            >
              Book This Package
            </Link>
            <div className="mt-2 text-gray-500 text-xs">
              <span>Need help? <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">Contact us</Link></span>
            </div>
          </div>
        </motion.aside>
      </div>
    </motion.main>
  );
}
