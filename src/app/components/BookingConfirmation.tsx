import { CheckCircle2, Home, MapPin, Phone, Calendar } from 'lucide-react';

interface BookingConfirmationProps {
  bookingData: any;
  onDone: () => void;
}

export function BookingConfirmation({ bookingData, onDone }: BookingConfirmationProps) {
  const nearbyShops = [
    { id: '1', name: 'Fashion Studio', distance: '2.5 km', rating: 4.6, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
    { id: '2', name: 'Perfect Fit Tailors', distance: '3.2 km', rating: 4.5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Success Animation */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce-once">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              🎉 Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your booking was successful
            </p>
            <p className="text-gray-500">
              We've sent the confirmation to your phone
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Booking Details</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Confirmed
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Tailor</p>
                  <p className="font-semibold text-gray-800">{bookingData?.tailor}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Appointment</p>
                  <p className="font-semibold text-gray-800">
                    {bookingData?.date && new Date(bookingData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">{bookingData?.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✂️</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-semibold text-gray-800">{bookingData?.service}</p>
                  <p className="text-sm text-purple-600 font-semibold">₹{bookingData?.amount}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100"></div>

            {/* Important Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Please arrive 5-10 minutes early for your appointment. The tailor will be notified of your booking.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onDone}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>

            <button className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-xl font-semibold hover:bg-purple-50 transition flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Tailor
            </button>
          </div>
        </div>
      </div>

      {/* Nearby Shops Section */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="max-w-md mx-auto">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Explore Nearby Tailors
          </h3>
          
          <div className="space-y-3">
            {nearbyShops.map((shop) => (
              <div
                key={shop.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{shop.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {shop.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      ⭐ {shop.rating}
                    </span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition">
                  View
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={onDone}
            className="w-full mt-4 py-3 text-purple-600 font-semibold hover:bg-purple-50 rounded-xl transition"
          >
            View All Nearby Shops
          </button>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-bounce-once {
          animation: bounce-once 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
