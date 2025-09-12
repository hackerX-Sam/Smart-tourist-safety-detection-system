import React, { useState, useEffect } from 'react';
import { QrCode, MapPin, Phone, Shield, AlertTriangle, Globe, Battery, Wifi, Signal } from 'lucide-react';

interface MobileAppProps {
  onPanicTrigger: () => void;
}

const MobileApp: React.FC<MobileAppProps> = ({ onPanicTrigger }) => {
  const [safetyScore, setSafetyScore] = useState(85);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate dynamic safety score
      setSafetyScore(prev => Math.max(70, Math.min(95, prev + (Math.random() - 0.5) * 2)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getSafetyBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
      {/* Status Bar */}
      <div className="bg-black px-6 py-2 flex justify-between items-center text-white text-sm">
        <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <span>89%</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">SafeTravel ID</h1>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="EN" className="bg-gray-800">EN</option>
              <option value="ES" className="bg-gray-800">ES</option>
              <option value="FR" className="bg-gray-800">FR</option>
            </select>
          </div>
        </div>

        {/* Digital ID Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-sm text-blue-200">Tourist ID: TST-2024-789</p>
              <p className="text-xs text-gray-300">Expires: Dec 31, 2024</p>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <QrCode className="w-12 h-12 text-black" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`w-5 h-5 ${getSafetyColor(safetyScore)}`} />
              <span className="text-sm">Safety Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-12 h-2 ${getSafetyBg(safetyScore)} rounded-full`}></div>
              <span className={`font-bold ${getSafetyColor(safetyScore)}`}>{Math.round(safetyScore)}%</span>
            </div>
          </div>
        </div>

        {/* Current Location & Alert */}
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">Current Zone: Safe Area</span>
          </div>
          <p className="text-xs text-green-200">Times Square, NYC - Low Risk Zone</p>
          <p className="text-xs text-gray-300 mt-1">Last updated: {currentTime.toLocaleTimeString()}</p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Emergency Contacts
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Local Emergency</span>
              <span className="text-red-300">911</span>
            </div>
            <div className="flex justify-between">
              <span>Tourist Helpline</span>
              <span className="text-blue-300">+1-800-NYC-HELP</span>
            </div>
            <div className="flex justify-between">
              <span>Embassy</span>
              <span className="text-yellow-300">+1-555-0123</span>
            </div>
          </div>
        </div>

        {/* Today's Itinerary */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20">
          <h3 className="text-sm font-medium mb-3">Today's Itinerary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>10:00 AM - Statue of Liberty (Completed)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>2:00 PM - Times Square (Current)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>6:00 PM - Brooklyn Bridge</span>
            </div>
          </div>
        </div>

        {/* Panic Button */}
        <button
          onClick={onPanicTrigger}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-600/50"
        >
          <AlertTriangle className="w-6 h-6" />
          EMERGENCY PANIC BUTTON
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          Tap for immediate emergency response
        </p>
      </div>
    </div>
  );
};

export default MobileApp;