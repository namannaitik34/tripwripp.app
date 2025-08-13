'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Phone, Mail, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  destinationName?: string;
}

interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  adults: number;
  children: number;
  specialRequests: string;
}

interface FormErrors {
  fullName?: string[];
  email?: string[];
  phone?: string[];
  destination?: string[];
  travelDate?: string[];
  adults?: string[];
  children?: string[];
  specialRequests?: string[];
}

const BookingForm = ({ destinationName = '' }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    destination: destinationName,
    travelDate: '',
    adults: 1,
    children: 0,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Convert numeric inputs to numbers
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear field-specific error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFormErrors({});
    setBookingId('');

    try {
      console.log('Submitting booking data:', formData);
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        setSubmitStatus('error');
        setStatusMessage(data.message || 'Something went wrong with your booking. Please try again.');
        
        if (data.errors) {
          setFormErrors(data.errors);
        }
        return;
      }

      // Success
      setSubmitStatus('success');
      setStatusMessage(data.message || 'Booking request submitted successfully!');
      if (data.bookingId) {
        setBookingId(data.bookingId);
      }
      
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        destination: destinationName,
        travelDate: '',
        adults: 1,
        children: 0,
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Adventure</h2>
      
      {submitStatus === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3"
        >
          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="text-green-700">{statusMessage}</p>
            {bookingId && (
              <p className="text-green-600 mt-2 font-medium">Booking ID: {bookingId}</p>
            )}
          </div>
        </motion.div>
      )}
      
      {submitStatus === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3"
        >
          <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
          <span className="text-red-700">{statusMessage}</span>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
              required
            />
            {formErrors.fullName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.fullName[0]}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="email@example.com"
                required
              />
            </div>
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email[0]}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+1 (123) 456-7890"
                required
              />
            </div>
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.phone[0]}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="destination" className="block text-gray-700 font-medium mb-1">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.destination ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Khumai Danda, Nepal"
                required
              />
            </div>
            {formErrors.destination && (
              <p className="mt-1 text-sm text-red-600">{formErrors.destination[0]}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="travelDate" className="block text-gray-700 font-medium mb-1">Travel Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.travelDate ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {formErrors.travelDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.travelDate[0]}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="adults" className="block text-gray-700 font-medium mb-1">Adults</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                id="adults"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                max="10"
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.adults ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>
            {formErrors.adults && (
              <p className="mt-1 text-sm text-red-600">{formErrors.adults[0]}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="children" className="block text-gray-700 font-medium mb-1">Children</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                id="children"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
                max="5"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="specialRequests" className="block text-gray-700 font-medium mb-1">Special Requests (Optional)</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requirements or requests..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></span>
              Processing...
            </>
          ) : (
            'Book Now'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
