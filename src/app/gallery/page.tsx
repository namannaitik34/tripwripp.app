'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryImages, GalleryImage } from '@/data/travelData';
import CTASection from '@/components/CTASection';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredImages = galleryImages.filter((image) => {
    return filter === 'all' || image.category === filter;
  });

  const categories = ['all', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };



  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Header */}
      <section className="text-white py-16" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl opacity-90">Capture the beauty of your next adventure</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  filter === category
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={filter === category ? { backgroundColor: '#FF8F00' } : {}}
              >
                {category === 'all' ? 'All Photos' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => openLightbox(image)}
              >
                <div className="relative overflow-hidden">
                  <div 
                    className="aspect-square bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{
                      backgroundImage: `url('${image.src}')`
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <span className="text-xl">📸</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <h3 className="font-semibold text-lg mb-1">{image.alt}</h3>
                    <div className="flex items-center">
                      <span className="text-sm opacity-90 mr-2">📍</span>
                      <p className="text-sm opacity-90">{image.destination}</p>
                    </div>
                    <div className="mt-2 flex space-x-1">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#FF8F00' }}></div>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#00B8D4' }}></div>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#0d1d30' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <h3 className="text-xl font-semibold">{selectedImage.alt}</h3>
              <p className="text-sm opacity-90">{selectedImage.destination}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Share Your Adventure</h2>
            <p className="text-lg mb-6 opacity-90">
              Tag us @tripwripp on social media to feature your travel photos in our gallery!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="text-white px-6 py-2 rounded-lg transition-colors font-semibold hover:opacity-90" style={{ backgroundColor: '#FF8F00' }}>
                #TripWripp
              </button>
              <button className="text-white px-6 py-2 rounded-lg transition-colors font-semibold hover:opacity-90" style={{ backgroundColor: '#FF8F00' }}>
                #TravelMemories
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default GalleryPage;
