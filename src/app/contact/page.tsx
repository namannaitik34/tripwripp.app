"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Instagram, Facebook, Twitter, Linkedin, Youtube, Share2 } from 'lucide-react';
import CTASection from '@/components/CTASection';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setStatus('idle');
    try {
      const payload = {
        access_key: "9b6fc574-383f-41f1-8523-3368b0857eed",
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECEFF1' }}>
      {/* Hero */}
      <section className="text-white py-20" style={{ backgroundColor: '#0d1d30' }}>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-bold mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-xl opacity-90 max-w-3xl mx-auto">Questions about a trek, custom itinerary request, partnership or press? We&apos;re here for you.</motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-12">
          {/* Info */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#0d1d30' }}>Get in Touch</h2>
                <p className="text-gray-700 leading-relaxed">Reach out and a TripWripp specialist will respond within 24 hours (often much sooner). For urgent departure support we offer 24/7 helpline access after booking.</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start bg-white p-5 rounded-xl shadow">
                  <Mail className="h-6 w-6 text-orange-500 mt-1 mr-4" />
                  <div>
                    <p className="font-semibold" style={{ color: '#0d1d30' }}>Email</p>
                    <a href="mailto:tripwripteam@gmail.com" className="text-sm text-gray-600 hover:text-orange-600 transition">tripwripteam@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start bg-white p-5 rounded-xl shadow">
                  <Phone className="h-6 w-6 text-orange-500 mt-1 mr-4" />
                  <div>
                    <p className="font-semibold" style={{ color: '#0d1d30' }}>Phone / WhatsApp</p>
                    <p className="text-sm text-gray-600">+91-7970619555</p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-5 rounded-xl shadow">
                  <MapPin className="h-6 w-6 text-orange-500 mt-1 mr-4" />
                  <div>
                    <p className="font-semibold" style={{ color: '#0d1d30' }}>Office</p>
                    <p className="text-sm text-gray-600">Thamel, Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow space-y-4">
                <p className="text-sm text-gray-600"><strong>Support Window:</strong> 09:00–18:00 NPT (Mon–Sat). Emergency hotline shared post‑booking.</p>
                <div>
                  <h3 className="text-sm font-semibold flex items-center mb-3 text-gray-700"><Share2 className="h-4 w-4 mr-2 text-orange-500" /> Connect With Us</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.instagram.com/tripwripp_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-sm text-gray-600">
                      <Instagram className="h-4 w-4 text-orange-500 group-hover:scale-110 transition" /> <span>Instagram</span>
                    </a>
                    <a href="https://facebook.com/tripwripp" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-sm text-gray-600">
                      <Facebook className="h-4 w-4 text-orange-500 group-hover:scale-110 transition" /> <span>Facebook</span>
                    </a>
                    <a href="https://twitter.com/tripwripp" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-sm text-gray-600">
                      <Twitter className="h-4 w-4 text-orange-500 group-hover:scale-110 transition" /> <span>Twitter/X</span>
                    </a>
                    <a href="https://linkedin.com/company/tripwripp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-sm text-gray-600">
                      <Linkedin className="h-4 w-4 text-orange-500 group-hover:scale-110 transition" /> <span>LinkedIn</span>
                    </a>
                    <a href="https://youtube.com/@tripwripp" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-sm text-gray-600">
                      <Youtube className="h-4 w-4 text-orange-500 group-hover:scale-110 transition" /> <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-300">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="name">Full Name</label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition shadow-sm text-gray-800 placeholder-gray-500" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition shadow-sm text-gray-800 placeholder-gray-500" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" required value={form.subject} onChange={handleChange} className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition shadow-sm text-gray-800 placeholder-gray-500" placeholder="Trip inquiry, custom plan, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} required value={form.message} onChange={handleChange} className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition shadow-sm resize-none text-gray-800 placeholder-gray-500" placeholder="Tell us about your ideal journey, dates, group size..." />
            </div>
            <div className="pt-2 flex items-center gap-4 flex-wrap">
              <button disabled={submitting} type="submit" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300/40">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />} {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {/* Admin link intentionally removed to keep admin area undiscoverable to end users */}
              {status === 'success' && (
                <span className="flex items-center text-green-600 text-sm font-medium"><CheckCircle2 className="h-5 w-5 mr-1" /> Sent! We&apos;ll reply soon.</span>
              )}
              {status === 'error' && (
                <span className="flex items-center text-red-600 text-sm font-medium"><AlertCircle className="h-5 w-5 mr-1" /> Something went wrong. Please try again.</span>
              )}
            </div>
            <p className="text-xs text-gray-500">By submitting you consent to our storing your details for the purpose of responding to your inquiry. We never sell personal data.</p>
          </motion.form>
        </div>
      </section>
      {/* Global CTA Section */}
      <CTASection />
    </div>
  );
}
