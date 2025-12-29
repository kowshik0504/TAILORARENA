import { useState } from 'react';
import { MapPin, Navigation, CheckCircle2, AlertCircle } from 'lucide-react';

interface LocationPermissionProps {
  onAllow: () => void;
  userType: 'customer' | 'tailor';
}

export function LocationPermission({ onAllow, userType }: LocationPermissionProps) {
  const [permissionStatus, setPermissionStatus] = useState<'pending' | 'granted' | 'denied'>('pending');

  const handleEnableLocation = async () => {
    try {
      // Request location permission
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setPermissionStatus('granted');
      setTimeout(() => {
        onAllow();
      }, 1000);
    } catch (error) {
      setPermissionStatus('denied');
    }
  };

  const benefits = userType === 'customer' 
    ? [
        { icon: '🔍', text: 'Find tailors near you' },
        { icon: '📍', text: 'Get accurate distance estimates' },
        { icon: '⚡', text: 'Quick service availability' },
        { icon: '🎯', text: 'Personalized recommendations' },
      ]
    : [
        { icon: '👥', text: 'Appear in nearby searches' },
        { icon: '📊', text: 'Get more local customers' },
        { icon: '🎯', text: 'Better order matching' },
        { icon: '⭐', text: 'Increased visibility' },
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-400 blur-3xl opacity-20"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              {permissionStatus === 'granted' ? (
                <CheckCircle2 className="w-12 h-12 text-white" />
              ) : permissionStatus === 'denied' ? (
                <AlertCircle className="w-12 h-12 text-white" />
              ) : (
                <MapPin className="w-12 h-12 text-white" />
              )}
            </div>
          </div>

          {/* Status Messages */}
          {permissionStatus === 'pending' && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Enable Location
              </h2>
              <p className="text-gray-600 mb-8">
                {userType === 'customer' 
                  ? 'Help us find the best tailors near you'
                  : 'Let customers find your services easily'
                }
              </p>
            </>
          )}

          {permissionStatus === 'granted' && (
            <>
              <h2 className="text-3xl font-bold text-green-600 mb-3">
                Location Enabled!
              </h2>
              <p className="text-gray-600 mb-8">
                You're all set. Redirecting to your dashboard...
              </p>
            </>
          )}

          {permissionStatus === 'denied' && (
            <>
              <h2 className="text-3xl font-bold text-red-600 mb-3">
                Permission Denied
              </h2>
              <p className="text-gray-600 mb-8">
                Location access is required for the app to work properly. Please enable it in your browser settings.
              </p>
            </>
          )}

          {/* Benefits */}
          {permissionStatus === 'pending' && (
            <div className="space-y-3 mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-4">Why we need location:</p>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-sm text-gray-700 text-left">{benefit.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          {permissionStatus === 'pending' && (
            <div className="space-y-3">
              <button
                onClick={handleEnableLocation}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Navigation className="w-5 h-5" />
                Enable Location
              </button>

              <button
                onClick={onAllow}
                className="w-full text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all"
              >
                Skip for now
              </button>
            </div>
          )}

          {permissionStatus === 'granted' && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-6 h-6 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-semibold">Loading...</span>
            </div>
          )}

          {permissionStatus === 'denied' && (
            <div className="space-y-3">
              <button
                onClick={handleEnableLocation}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Try Again
              </button>
              <button
                onClick={onAllow}
                className="w-full text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all"
              >
                Continue without location
              </button>
            </div>
          )}

          {/* Privacy Note */}
          {permissionStatus === 'pending' && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your location is private and secure
              </p>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {permissionStatus === 'pending' && (
          <div className="mt-6 bg-white/70 backdrop-blur rounded-2xl p-4 border border-white/50">
            <p className="text-sm text-gray-600 text-center">
              <strong>Note:</strong> Location access helps match you with {userType === 'customer' ? 'nearby tailors' : 'local customers'} more effectively. You can change this setting anytime from your device settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
