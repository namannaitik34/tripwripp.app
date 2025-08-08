'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We&apos;ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Header */}
            <section className="relative py-20 text-white" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">We&apos;re here to help plan your perfect adventure</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>✉️ Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-800"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-800"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-800"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-800"
                    >
                      <option value="" style={{ color: '#9CA3AF' }}>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="custom">Custom Package</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#0d1d30' }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-none text-gray-800"
                    placeholder="Tell us about your travel plans or ask any questions..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-2xl"
                  style={{ backgroundColor: '#FF8F00' }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message ✈️
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#0d1d30' }}>📞 Get in Touch</h2>
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)' }}>
                      <Phone className="h-6 w-6" style={{ color: '#FF8F00' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#0d1d30' }}>Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)' }}>
                      <Mail className="h-6 w-6" style={{ color: '#FF8F00' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#0d1d30' }}>Email</h3>
                      <p className="text-gray-600">info@tripwripp.com</p>
                      <p className="text-gray-600">support@tripwripp.com</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)' }}>
                      <MapPin className="h-6 w-6" style={{ color: '#FF8F00' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#0d1d30' }}>Address</h3>
                      <p className="text-gray-600">123 Travel Street</p>
                      <p className="text-gray-600">Adventure City, AC 12345</p>
                      <p className="text-gray-600">United States</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)' }}>
                      <Clock className="h-6 w-6" style={{ color: '#FF8F00' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#0d1d30' }}>Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(13, 29, 48, 0.05) 0%, rgba(0, 184, 212, 0.05) 100%)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#0d1d30' }}>🔗 Quick Links</h3>
                <div className="space-y-3">
                  <motion.a 
                    href="/faq" 
                    className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)', color: '#0d1d30' }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    ❓ Frequently Asked Questions
                  </motion.a>
                  <motion.a 
                    href="/packages" 
                    className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)', color: '#0d1d30' }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    📦 Browse Travel Packages
                  </motion.a>
                  <motion.a 
                    href="/destinations" 
                    className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)', color: '#0d1d30' }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    🌍 Explore Destinations
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)', color: '#0d1d30' }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    🛡️ Travel Insurance
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="block p-3 rounded-lg transition-all duration-300 hover:shadow-md"
                    style={{ backgroundColor: 'rgba(255, 143, 0, 0.1)', color: '#0d1d30' }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    📋 Terms & Conditions
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Visit Our Office</h2>
            <p className="text-gray-600">Come meet our team and plan your next adventure in person</p>
          </motion.div>
          
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-600">Interactive Map Placeholder</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
