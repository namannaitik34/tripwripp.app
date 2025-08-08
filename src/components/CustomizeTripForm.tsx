'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Calendar, Users, DollarSign, Mountain, 
  Waves, Camera, Utensils, Car, Star, ArrowRight, Check
} from 'lucide-react';

interface CustomTripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  interests: string[];
  accommodation: string;
  transportation: string;
  specialRequests: string;
  name: string;
  email: string;
  phone: string;
}

const CustomizeTripForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CustomTripFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '',
    budget: '',
    interests: [],
    accommodation: '',
    transportation: '',
    specialRequests: '',
    name: '',
    email: '',
    phone: ''
  });

  const interestOptions = [
    { id: 'adventure', label: 'Adventure Sports', icon: Mountain },
    { id: 'culture', label: 'Cultural Tours', icon: Camera },
    { id: 'beach', label: 'Beach & Relaxation', icon: Waves },
    { id: 'food', label: 'Food & Cuisine', icon: Utensils },
    { id: 'wildlife', label: 'Wildlife Safari', icon: Star },
    { id: 'photography', label: 'Photography', icon: Camera }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Custom trip request:', formData);
    alert('Your custom trip request has been submitted! We\'ll contact you within 24 hours with a personalized itinerary.');
    setCurrentStep(1);
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: '',
      budget: '',
      interests: [],
      accommodation: '',
      transportation: '',
      specialRequests: '',
      name: '',
      email: '',
      phone: ''
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <section id="customize-trip" className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>
            Customize Your Perfect Trip
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Can&apos;t find exactly what you&apos;re looking for? Let our travel experts create a personalized 
            itinerary tailored to your dreams, preferences, and budget.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: '#0d1d30' }}>Progress</span>
              <span className="text-sm font-medium" style={{ color: '#0d1d30' }}>{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: '#FF8F00' }}
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Trip Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0d1d30' }}>
                  Step 1: Trip Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                      placeholder="Where do you want to go?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      <Users className="inline h-4 w-4 mr-1" />
                      Number of Travelers
                    </label>
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    >
                      <option value="" style={{ color: '#9CA3AF' }}>Select travelers</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-4">3-4 People</option>
                      <option value="5-8">5-8 People</option>
                      <option value="9+">9+ People</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      <Calendar className="inline h-4 w-4 mr-1" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Budget Range (per person)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                  >
                    <option value="" style={{ color: '#9CA3AF' }}>Select budget range</option>
                    <option value="under-500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1,000</option>
                    <option value="1000-2000">₹1,000 - ₹2,000</option>
                    <option value="2000-5000">₹2,000 - ₹5,000</option>
                    <option value="5000+">₹5,000+</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Step 2: Preferences */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0d1d30' }}>
                  Step 2: Your Preferences
                </h3>

                <div>
                  <label className="block text-sm font-medium mb-4" style={{ color: '#0d1d30' }}>
                    What are you interested in? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interestOptions.map((interest) => {
                      const Icon = interest.icon;
                      const isSelected = formData.interests.includes(interest.id);
                      return (
                        <motion.button
                          key={interest.id}
                          type="button"
                          whileHover={{ 
                            scale: 1.03,
                            transition: { duration: 0.15, ease: "easeOut" }
                          }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-4 rounded-lg border-2 transition-colors duration-150 flex flex-col items-center text-center ${
                            isSelected
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-orange-600' : 'text-gray-600'}`} />
                          <span className="text-sm font-medium">{interest.label}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-orange-600 mt-1" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Accommodation Preference
                    </label>
                    <select
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    >
                      <option value="" style={{ color: '#9CA3AF' }}>Select accommodation</option>
                      <option value="budget">Budget Hotels/Hostels</option>
                      <option value="mid-range">Mid-range Hotels</option>
                      <option value="luxury">Luxury Hotels/Resorts</option>
                      <option value="mixed">Mix of accommodation types</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      <Car className="inline h-4 w-4 mr-1" />
                      Transportation Preference
                    </label>
                    <select
                      name="transportation"
                      value={formData.transportation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    >
                      <option value="" style={{ color: '#9CA3AF' }}>Select transportation</option>
                      <option value="flights">Flights</option>
                      <option value="train">Train</option>
                      <option value="bus">Bus</option>
                      <option value="car-rental">Car Rental</option>
                      <option value="mixed">Mix of transport</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                    Special Requests or Additional Information
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    placeholder="Any dietary restrictions, accessibility needs, special occasions, or other requests..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold mb-6" style={{ color: '#0d1d30' }}>
                  Step 3: Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-800"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">What happens next?</h4>
                  <ul className="text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Our travel experts will review your requirements
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      We&apos;ll create a personalized itinerary within 24 hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      You&apos;ll receive a detailed proposal with pricing
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      We&apos;ll refine the plan based on your feedback
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 text-white rounded-lg font-semibold transition-all duration-200 ease-out hover:opacity-90 hover:scale-105 inline-flex items-center"
                  style={{ backgroundColor: '#FF8F00' }}
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 text-white rounded-lg font-semibold transition-all duration-200 ease-out hover:opacity-90 hover:scale-105 inline-flex items-center"
                  style={{ backgroundColor: '#FF8F00' }}
                >
                  Submit Request
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CustomizeTripForm;
