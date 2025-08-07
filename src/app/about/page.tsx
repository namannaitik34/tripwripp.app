'use client';

import { motion } from 'framer-motion';
import { Users, Award, Globe, Heart } from 'lucide-react';
import CTASection from '@/components/CTASection';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Abhishek Kumar Suman',
      role: 'Founder & CEO',
      image: 'images/Abhishek.png',
      bio: 'With over 3 years in the travel industry, Abhishek founded TripWripp to make extraordinary travel accessible to everyone.'
    },
    {
      name: 'Shristi Choudhary',
      role: 'Head of Operations',
      image: 'images/shristi.png',
      bio: 'Shrishti ensures every trip runs smoothly with her attention to detail and passion for customer satisfaction.'
    },
    {
      name: 'Krishna Shrivastava',
      role: 'PR & Marketing Manager',
      image: 'images/krishna.jpg',
      bio: 'Krishna crafts unique itineraries that blend adventure, culture, and comfort for unforgettable experiences.'
    }
  ];

  const values = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Perspective',
      description: 'We believe travel breaks down barriers and creates understanding between cultures worldwide.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passionate Service',
      description: 'Every member of our team is a passionate traveler who understands what makes a trip extraordinary.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in every aspect of our service, from planning to execution.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community',
      description: 'We build lasting relationships with our travelers and support local communities worldwide.'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Hero Section */}
      <section className="relative py-20 text-white" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About TripWripp</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Founded in 2020, TripWripp has been dedicated to creating unforgettable travel experiences 
              that connect people with the world&apos;s most amazing destinations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#0d1d30' }}>Our Story</h2>
              <p className="text-gray-600 mb-4">
                TripWripp was born from a simple belief: that travel has the power to transform lives. 
                Our founder, Sarah Johnson, experienced this firsthand during a life-changing backpacking 
                trip through Southeast Asia that opened her eyes to different cultures and ways of life.
              </p>
              <p className="text-gray-600 mb-4">
                After working in the corporate travel industry for over a decade, Sarah saw an opportunity 
                to create something different – a travel company that prioritizes authentic experiences, 
                sustainable tourism, and genuine human connections.
              </p>
              <p className="text-gray-600">
                Today, TripWripp has helped over 50,000 travelers discover amazing destinations while 
                supporting local communities and promoting responsible tourism practices.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Travel landscape"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16" style={{ backgroundColor: '#F5F5DC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 group border border-gray-100"
              >
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300" style={{ color: '#FF8F00' }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3" style={{ color: '#0d1d30' }}>{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                <div className="mt-4 flex justify-center space-x-1">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#FF8F00' }}></div>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#00B8D4' }}></div>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#0d1d30' }}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#0d1d30' }}>Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind TripWripp</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#0d1d30' }}>{member.name}</h3>
                  <p className="font-medium mb-3" style={{ color: '#FF8F00' }}>{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  <div className="mt-4 flex space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF8F00' }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B8D4' }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0d1d30' }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 text-white" style={{ backgroundColor: '#00B8D4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg opacity-90">Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Customer Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-lg opacity-90">Years of Excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default AboutPage;
