import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle, X } from 'lucide-react';

interface PanicAlertProps {
  onClose: () => void;
}

const PanicAlert: React.FC<PanicAlertProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    if (step === 0 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (step === 0 && countdown === 0) {
      setStep(1);
    }
  }, [countdown, step]);

  useEffect(() => {
    if (step === 1) {
      const timer = setInterval(() => {
        setResponseTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleCancel = () => {
    setStep(-1);
    setTimeout(onClose, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-red-900 rounded-3xl overflow-hidden shadow-2xl animate-pulse">
      {/* Status Bar */}
      <div className="bg-red-800 px-6 py-2 flex justify-between items-center text-white text-sm">
        <span className="font-bold">EMERGENCY MODE</span>
        <button onClick={onClose} className="hover:bg-red-700 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-6">
        {step === -1 && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Alert Cancelled</h2>
            <p className="text-sm text-red-200">Emergency services have been notified of cancellation.</p>
          </div>
        )}

        {step === 0 && (
          <div className="text-center">
            <AlertTriangle className="w-20 h-20 text-red-300 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-4">EMERGENCY ALERT</h2>
            <div className="text-6xl font-bold mb-4 text-red-200">{countdown}</div>
            <p className="text-sm mb-6">Emergency services will be contacted automatically</p>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl mb-4"
            >
              CANCEL EMERGENCY
            </button>
            <p className="text-xs text-red-200">Tap cancel if this was triggered by mistake</p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">Emergency Services Contacted</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Response time: {formatTime(responseTime)}</span>
              </div>
            </div>

            {/* Status Updates */}
            <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Alert sent to emergency services</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Location shared with responders</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Nearest patrol unit dispatched</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full opacity-50"></div>
                <span className="text-sm text-gray-400">Emergency contact notified</span>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-900/40 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Your Location</span>
              </div>
              <p className="text-xs text-blue-200">Times Square, NYC</p>
              <p className="text-xs text-gray-300">Lat: 40.7580° N, Long: 73.9855° W</p>
              <p className="text-xs text-green-300 mt-2">📍 Location tracking active</p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium mb-3">Emergency Response Team</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Unit ID:</span>
                  <span className="text-yellow-300">NYPD-457</span>
                </div>
                <div className="flex justify-between">
                  <span>ETA:</span>
                  <span className="text-green-300">3-5 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Officer:</span>
                  <span className="text-blue-300">M. Johnson</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-sm font-medium mb-2 text-yellow-300">Stay Safe Instructions</h3>
              <ul className="text-xs space-y-1 text-yellow-200">
                <li>• Stay in your current location</li>
                <li>• Keep your phone charged and accessible</li>
                <li>• Look for approaching emergency vehicles</li>
                <li>• Do not leave the area unless unsafe</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicAlert;