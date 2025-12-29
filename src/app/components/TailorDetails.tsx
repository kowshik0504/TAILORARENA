import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Clock, IndianRupee, Store, Home, Award, Calendar, MessageCircle } from 'lucide-react';
import { Tailor } from '../App';

interface TailorDetailsProps {
  tailor: Tailor;
  onBack: () => void;
  onBookNow: () => void;
}

export function TailorDetails({ tailor, onBack, onBookNow }: TailorDetailsProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'about' | 'reviews'>('services');

  const reviews = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent work! Very professional and timely delivery.',
      date: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      id: '2',
      name: 'Arjun Reddy',
      rating: 4,
      comment: 'Good quality stitching. Satisfied with the service.',
      date: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      id: '3',
      name: 'Sneha Patel',
      rating: 5,
      comment: 'Best tailor in the area! Highly recommended.',
      date: '2 weeks ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header with Image */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-white transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Tailor Image and Basic Info */}
        <div className="absolute -bottom-16 left-0 right-0 px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex gap-4 items-start">
              <div className="relative">
                <img
                  src={tailor.image}
                  alt={tailor.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md">
                  {tailor.serviceType === 'shop' ? (
                    <Store className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Home className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{tailor.name}</h1>
                <p className="text-gray-600 mb-2">{tailor.specialization}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4 text-green-600 fill-current" />
                    <span className="font-bold text-green-700">{tailor.rating}</span>
                    <span className="text-sm text-gray-600">({tailor.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{tailor.distance} km away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-20 space-y-4">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Experience</span>
            </div>
            <p className="font-bold text-gray-800">{tailor.experience} years</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Starting Price</span>
            </div>
            <p className="font-bold text-gray-800">₹{tailor.price}+</p>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <MapPin className="w-5 h-5 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
              <p className="text-gray-600 text-sm">{tailor.location}</p>
            </div>
          </div>
          
          {/* Simple Map Placeholder */}
          <div className="h-32 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Map View</p>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Tailor</p>
                <p className="font-semibold text-gray-800">{tailor.phone}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200 pb-2">
          {[
            { id: 'services' as const, label: 'Services' },
            { id: 'about' as const, label: 'About' },
            { id: 'reviews' as const, label: 'Reviews' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800">Services & Pricing</h3>
            {tailor.services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{service.name}</p>
                    <p className="text-sm text-gray-500">Professional stitching</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 font-bold text-purple-600">
                    <IndianRupee className="w-4 h-4" />
                    <span>{service.price}</span>
                  </div>
                  <p className="text-xs text-gray-500">per item</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">About {tailor.name}</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                With {tailor.experience} years of experience in tailoring, {tailor.name} specializes in {tailor.specialization.toLowerCase()}. 
                We take pride in delivering high-quality stitching services with attention to detail.
              </p>
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {[tailor.specialization, 'Custom Fitting', 'Alterations', 'Fast Service'].map((spec, idx) => (
                    <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-2">Available Slots</h4>
                <div className="flex flex-wrap gap-2">
                  {tailor.availability.map((slot, idx) => (
                    <span key={idx} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Customer Reviews</h3>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <Star className="w-5 h-5 text-green-600 fill-current" />
                <span className="font-bold text-green-700">{tailor.rating}</span>
                <span className="text-sm text-gray-600">({tailor.reviews} reviews)</span>
              </div>
            </div>

            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-800">{review.name}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-3">
          <button
            onClick={onBookNow}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book Slot
          </button>
          <button className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
