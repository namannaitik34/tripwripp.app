'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showLiveNowPopup, setShowLiveNowPopup] = useState(false);

  // Show popup when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLiveNowPopup(true);
    }, 1000); // Show popup after 1 second

    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      category: 'Booking & Reservations',
      questions: [
        {
          question: 'How far in advance should I book my trip?',
          answer: 'We recommend booking at least 2-3 months in advance for domestic trips and 3-6 months for international destinations. This ensures better availability and pricing for flights and accommodations.'
        },
        {
          question: 'Can I modify or cancel my booking?',
          answer: 'Yes, you can modify or cancel your booking. Changes made more than 30 days before departure are free, while changes within 30 days may incur fees. Cancellation policies vary by package and will be clearly outlined in your booking confirmation.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. A deposit is typically required at booking, with the balance due 60 days before departure.'
        }
      ]
    },
    {
      category: 'Travel Packages',
      questions: [
        {
          question: 'What\'s included in your travel packages?',
          answer: 'Our packages typically include accommodation, meals as specified, guided tours, transportation during the trip, and entrance fees to attractions. International flights, travel insurance, and personal expenses are usually not included unless specifically mentioned.'
        },
        {
          question: 'Can you create custom itineraries?',
          answer: 'Absolutely! We specialize in creating personalized travel experiences. Our travel experts will work with you to design an itinerary that matches your interests, budget, and timeline.'
        },
        {
          question: 'Do you offer group discounts?',
          answer: 'Yes, we offer discounts for groups of 6 or more people. The discount varies depending on the destination and package. Contact us for a personalized group quote.'
        }
      ]
    },
    {
      category: 'Travel Documents',
      questions: [
        {
          question: 'What documents do I need for international travel?',
          answer: 'You\'ll need a valid passport that doesn\'t expire within 6 months of your travel date. Some destinations also require visas, which we can help you obtain. We\'ll provide a complete document checklist after booking.'
        },
        {
          question: 'Do you help with visa applications?',
          answer: 'Yes, we provide visa assistance services. Our team can guide you through the application process and help ensure you have all required documents. Additional fees may apply for this service.'
        }
      ]
    },
    {
      category: 'Health & Safety',
      questions: [
        {
          question: 'Do I need travel insurance?',
          answer: 'While not mandatory, we strongly recommend travel insurance. It can cover trip cancellations, medical emergencies, lost luggage, and other unforeseen circumstances. We can help you choose the right coverage.'
        },
        {
          question: 'What health precautions should I take?',
          answer: 'Health requirements vary by destination. We recommend consulting with a travel medicine specialist at least 4-6 weeks before departure. Some destinations may require vaccinations or preventive medications.'
        },
        {
          question: 'How do you ensure traveler safety?',
          answer: 'We work only with vetted local partners, provide 24/7 emergency support, conduct regular safety assessments of all destinations, and maintain comprehensive emergency protocols for all our trips.'
        }
      ]
    },
    {
      category: 'During Your Trip',
      questions: [
        {
          question: 'What if I have problems during my trip?',
          answer: 'We provide 24/7 emergency support for all our travelers. You\'ll receive emergency contact numbers and can reach our support team anytime for assistance with any issues that may arise.'
        },
        {
          question: 'Can I extend my trip or make changes while traveling?',
          answer: 'Yes, trip extensions and modifications are possible but subject to availability and additional costs. Contact our support team as early as possible to discuss options.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
            <h1 className="text-5xl font-bold mb-4">❓ Frequently Asked Questions</h1>
            <p className="text-xl opacity-90">Find answers to common questions about our travel services 🌟</p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQ... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-800"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2" style={{ color: '#0d1d30', borderColor: '#FF8F00' }}>
                📋 {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div
                      key={questionIndex}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <motion.button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-orange-50 transition-colors group"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-semibold pr-4 group-hover:text-orange-600 transition-colors" style={{ color: '#0d1d30' }}>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#FF8F00' }} />
                        ) : (
                          <ChevronDown className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: '#FF8F00' }} />
                        )}
                      </motion.button>
                      
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
          
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No FAQs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 opacity-90">
              Our travel experts are here to help you plan the perfect trip. Get in touch with us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-white px-8 py-3 rounded-lg transition-colors font-semibold hover:opacity-90"
                style={{ backgroundColor: '#FF8F00' }}
              >
                Contact Us
              </Link>
              <a
                href="tel:+15551234567"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white transition-colors font-semibold"
                style={{ '--hover-color': '#0d1d30' } as React.CSSProperties}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0d1d30'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
              >
                Call Now: (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* LiveNow Popup Modal */}
      <AnimatePresence>
        {showLiveNowPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLiveNowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowLiveNowPopup(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
              >
                <X 
                  className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-colors duration-200" 
                />
              </button>

              {/* Compact Live Now Content */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#0d1d30' }}>
                    🌟 Live Travel Deal
                  </h2>
                  <p className="text-gray-600">
                    Special live trip available now - Book today!
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-orange-50 rounded-lg p-6 border-l-4" style={{ borderColor: '#FF8F00' }}>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Khumai Danda</h3>
                      <p className="text-sm text-gray-600 mb-3">Trekking Adventure • Nepal</p>
                      <div className="mb-4">
                        <span className="text-2xl font-bold" style={{ color: '#FF8F00' }}>Live Now!</span>
                        <p className="text-xs text-gray-500 mt-1">Limited spots available</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700">
                          🏔️ Beautiful mountain views<br/>
                          🚶‍♂️ Guided trekking experience<br/>
                          🏕️ Adventure camping
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/live/live-1"
                    onClick={() => setShowLiveNowPopup(false)}
                    className="block w-full text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 hover:transform hover:scale-105"
                    style={{ backgroundColor: '#FF8F00' }}
                  >
                    Book Khumai Danda Trip
                  </Link>
                  <Link
                    href="/packages"
                    onClick={() => setShowLiveNowPopup(false)}
                    className="block w-full text-gray-700 py-3 px-6 rounded-lg border-2 border-gray-300 font-semibold transition-all duration-200 hover:border-gray-400"
                  >
                    View All Packages
                  </Link>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  📍 Nepal • 🕒 Limited Time Offer
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQPage;
