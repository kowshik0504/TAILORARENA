import { useState } from 'react';
import { ArrowRight, User, Phone, MapPin, Navigation } from 'lucide-react';

interface CustomerDetailsProps {
  onComplete: () => void;
  onBack?: () => void;
  onPreferences?: () => void;
}

export function CustomerDetails({ onComplete, onBack, onPreferences }: CustomerDetailsProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
  });

  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.city && formData.area) {
      if (onPreferences) {
        onPreferences();
      } else {
        onComplete();
      }
    }
  };

  const detectLocation = () => {
    setDetectingLocation(true);
    // Simulate location detection
    setTimeout(() => {
      setFormData({
        ...formData,
        city: 'Bangalore',
        area: 'Koramangala',
      });
      setDetectingLocation(false);
    }, 1500);
  };

  const isFormValid = formData.name && formData.phone && formData.city && formData.area;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Complete Your Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Help us personalize your experience</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-sm font-medium text-gray-700">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-sm text-gray-400">Preferences</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
          <h2 className="font-bold text-gray-800 mb-2">Welcome to Tailor Arena! 👋</h2>
          <p className="text-sm text-gray-600">
            Let's get to know you better so we can connect you with the best tailors in your area.
          </p>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-600" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-600" />
            Phone Number
          </label>
          <div className="flex gap-3">
            <div className="w-16 px-3 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-center font-semibold text-gray-700">
              +91
            </div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').substring(0, 10) })}
              placeholder="98765 43210"
              className="flex-1 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
              required
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Your Location
            </label>
            <button
              type="button"
              onClick={detectLocation}
              disabled={detectingLocation}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold hover:bg-purple-100 transition disabled:opacity-50"
            >
              <Navigation className="w-3 h-3" />
              {detectingLocation ? 'Detecting...' : 'Detect Location'}
            </button>
          </div>

          {/* City */}
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
            required
          />

          {/* Area */}
          <input
            type="text"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            placeholder="Area / Locality"
            className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">ℹ️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium mb-1">Why do we need this?</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Your location helps us show you the most relevant tailors nearby. We use this only to improve your experience.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg active:scale-[0.99]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}