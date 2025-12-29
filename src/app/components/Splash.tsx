import { useEffect } from 'react';
import { Scissors, ArrowRight } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export function Splash({ onComplete }: SplashProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1630272777562-17735957d8c0?w=1200&q=80"
          alt="Tailoring Workshop"
          className="w-full h-full object-cover"
        />
        {/* Soft Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/85 via-purple-700/80 to-indigo-800/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-6 py-12 text-white">
        {/* Top Spacer */}
        <div className="flex-1"></div>

        {/* Centered Main Content */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* App Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
            <div className="relative bg-white rounded-3xl p-5 shadow-2xl">
              <Scissors className="w-14 h-14 text-purple-600" strokeWidth={2} />
            </div>
          </div>

          {/* App Title */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-wide">
              Tailor Arena
            </h1>
            <p className="text-lg text-white/90 font-light">
              Find trusted tailors near you
            </p>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <span className="text-xs text-white/80">Nearby Tailors</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
              <span className="text-xs text-white/80">Top Rated</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-xl">💳</span>
              </div>
              <span className="text-xs text-white/80">Easy Payment</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full max-w-sm space-y-6 pt-12">
          {/* Get Started Button */}
          <button
            onClick={onComplete}
            className="w-full bg-white text-purple-700 py-4 rounded-full font-semibold text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            Get Started
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-white/70">
            Already have an account?{' '}
            <button
              onClick={onComplete}
              className="text-white font-medium underline underline-offset-2"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}