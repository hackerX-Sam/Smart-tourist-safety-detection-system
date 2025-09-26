import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

interface LaunchAnimationProps {
  onComplete: () => void;
}

const LaunchAnimation: React.FC<LaunchAnimationProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timers = [
      // Phase 1: Logo appears
      setTimeout(() => setAnimationPhase(1), 300),
      // Phase 2: Name appears
      setTimeout(() => setAnimationPhase(2), 800),
      // Phase 3: Tagline appears
      setTimeout(() => setAnimationPhase(3), 1300),
      // Phase 4: Fade out and complete
      setTimeout(() => setAnimationPhase(4), 2800),
      setTimeout(() => onComplete(), 3300),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Container */}
        <div className="mb-8">
          <div 
            className={`relative inline-flex items-center justify-center transition-all duration-1000 ease-out ${
              animationPhase >= 1 
                ? 'opacity-100 scale-100 rotate-0' 
                : 'opacity-0 scale-50 rotate-180'
            }`}
          >
            {/* Logo Background Glow */}
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl scale-110 animate-pulse" />
            
            {/* Logo */}
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">
              <Shield 
                className={`w-16 h-16 text-white transition-all duration-700 ${
                  animationPhase >= 1 ? 'animate-bounce' : ''
                }`} 
                style={{ animationIterationCount: '2' }}
              />
            </div>

            {/* Rotating Ring */}
            <div className="absolute inset-0 border-2 border-white/30 rounded-3xl animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 border border-white/20 rounded-2xl animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          </div>
        </div>

        {/* App Name */}
        <div className="mb-4">
          <h1 
            className={`text-5xl md:text-6xl font-bold text-white transition-all duration-1000 ease-out ${
              animationPhase >= 2 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(255,255,255,0.5)',
            }}
          >
            SafeYatri
          </h1>
        </div>

        {/* Tagline */}
        <div className="mb-8">
          <p 
            className={`text-lg md:text-xl text-white/90 font-medium transition-all duration-1000 ease-out ${
              animationPhase >= 3 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            Smart Tourist Safety System
          </p>
          <p 
            className={`text-sm md:text-base text-white/70 mt-2 transition-all duration-1000 ease-out ${
              animationPhase >= 3 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Advanced IoT Integration & AI-Powered Safety Analytics
          </p>
        </div>

        {/* Loading Indicator */}
        <div 
          className={`transition-all duration-500 ${
            animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-white/60 text-sm">Initializing secure connection...</p>
        </div>

        {/* Progress Bar */}
        <div 
          className={`mt-8 w-64 mx-auto transition-all duration-500 ${
            animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full transition-all duration-2000 ease-out"
              style={{ 
                width: animationPhase >= 3 ? '100%' : '0%',
                boxShadow: '0 0 10px rgba(255,255,255,0.5)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Fade Out Overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 transition-opacity duration-500 ${
          animationPhase >= 4 ? 'opacity-0' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default LaunchAnimation;