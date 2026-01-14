"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import CTASection from '@/components/CTASection';
import { Users, Compass, Globe2, HeartHandshake, Target, Star } from 'lucide-react';

const team = [
  { name: 'Abhishek Suman', role: 'Founder & Trek Lead', img: '/images/Abhishek.png' },
  { name: 'Abhishek', role: 'Operations Strategist', img: '/images/Abhi.png' },
  { name: 'Krishna', role: 'Expedition Planner', img: '/images/krishna.jpeg' },
  { name: 'Shristi', role: 'Experience Designer', img: '/images/shristi.png' },
];

const values = [
  { icon: <Compass className="h-6 w-6 text-orange-500" />, title: 'Authentic Adventure', desc: 'We curate routes that balance raw Himalayan wilderness with cultural immersion.' },
  { icon: <HeartHandshake className="h-6 w-6 text-orange-500" />, title: 'Community First', desc: 'Local partners, fair wages, and respectful engagement with host villages.' },
  { icon: <Target className="h-6 w-6 text-orange-500" />, title: 'Purposeful Travel', desc: 'Every journey should leave you transformed and the trail communities better supported.' },
  { icon: <Star className="h-6 w-6 text-orange-500" />, title: 'Safety & Care', desc: 'Structured briefings, risk awareness, and prepared guides on every departure.' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <h1 className="text-5xl font-bold mb-4">About TripWripp</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">Crafting human, responsible and awe‑filled Himalayan travel experiences that go beyond checklists and into genuine discovery.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#0d1d30' }}>Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We started TripWripp to bridge the gap between hurried commercial treks and deeply personal exploration. Our curated departures like <strong>Khumai Danda</strong> focus on mindful pacing, altitude awareness, rich storytelling, and empowering local guides.</p>
            <p className="text-gray-700 leading-relaxed mb-4">Sustainability is baked in: small groups, reduced waste strategies, local sourcing, and reinvestment into trail communities. Your journey funds education, infrastructure micro‑projects, and guide development programs.</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow">
                <Users className="h-5 w-5 mr-2 text-orange-500" /> <span className="text-sm font-medium text-gray-700">Small Groups</span>
              </div>
              <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow">
                <Globe2 className="h-5 w-5 mr-2 text-orange-500" /> <span className="text-sm font-medium text-gray-700">Local Impact</span>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image src="/images/khumai/Khumai_4.svg" alt="Himalayan trekking ridge" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#0d1d30' }}>What We Stand For</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map(v => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="mb-4">{v.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: '#0d1d30' }}>{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#0d1d30' }}>Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-xl p-4 shadow hover:shadow-lg text-center">
                <div className="w-28 h-28 mx-auto mb-4 relative rounded-full overflow-hidden ring-4 ring-orange-100">
                  <Image src={member.img} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="font-semibold" style={{ color: '#0d1d30' }}>{member.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

  {/* Global CTA Section */}
  <CTASection />
    </div>
  );
}
