import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PanicAlertProps {
  onClose: () => void;
}

const PanicAlert: React.FC<PanicAlertProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();
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
    <div className="w-full max-w-sm mx-auto bg-red-900 dark:bg-red-950 rounded-3xl overflow-hidden shadow-2xl animate-pulse transition-colors duration-300">
      {/* Status Bar */}
      <div className="bg-red-800 dark:bg-red-900 px-6 py-2 flex justify-between items-center text-white text-sm">
        <span className="font-bold">आपातकालीन मोड</span>
        <button onClick={onClose} className="hover:bg-red-700 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-6">
        {step === -1 && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">अलर्ट रद्द</h2>
            <p className="text-sm text-red-200">आपातकालीन सेवाओं को रद्दीकरण की सूचना दे दी गई है।</p>
          </div>
        )}

        {step === 0 && (
          <div className="text-center">
            <AlertTriangle className="w-20 h-20 text-red-300 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-4">आपातकालीन अलर्ट</h2>
            <div className="text-6xl font-bold mb-4 text-red-200">{countdown}</div>
            <p className="text-sm mb-6">आपातकालीन सेवाओं से स्वचालित रूप से संपर्क किया जाएगा</p>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl mb-4 transition-colors"
            >
              आपातकाल रद्द करें
            </button>
            <p className="text-xs text-red-200">यदि यह गलती से ट्रिगर हुआ है तो रद्द करें पर टैप करें</p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">आपातकालीन सेवाओं से संपर्क</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">प्रतिक्रिया समय: {formatTime(responseTime)}</span>
              </div>
            </div>

            {/* Status Updates */}
            <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">आपातकालीन सेवाओं को अलर्ट भेजा गया</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">प्रतिक्रियाकर्ताओं के साथ स्थान साझा किया गया</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">निकटतम गश्ती दल भेजा गया</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full opacity-50"></div>
                <span className="text-sm text-gray-400">आपातकालीन संपर्क को सूचित किया गया</span>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-900/40 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">आपका स्थान</span>
              </div>
              <p className="text-xs text-blue-200">इंडिया गेट, नई दिल्ली</p>
              <p className="text-xs text-gray-300">अक्षांश: 28.6129° N, देशांतर: 77.2295° E</p>
              <p className="text-xs text-green-300 mt-2">📍 स्थान ट्रैकिंग सक्रिय</p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium mb-3">आपातकालीन प्रतिक्रिया टीम</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>यूनिट ID:</span>
                  <span className="text-yellow-300">DCP-457</span>
                </div>
                <div className="flex justify-between">
                  <span>ETA:</span>
                  <span className="text-green-300">3-5 मिनट</span>
                </div>
                <div className="flex justify-between">
                  <span>अधिकारी:</span>
                  <span className="text-blue-300">अमित शर्मा</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-sm font-medium mb-2 text-yellow-300">सुरक्षित रहने के निर्देश</h3>
              <ul className="text-xs space-y-1 text-yellow-200">
                <li>• अपने वर्तमान स्थान पर रहें</li>
                <li>• अपना फोन चार्ज और पहुंच में रखें</li>
                <li>• आपातकालीन वाहनों की तलाश करें</li>
                <li>• असुरक्षित न होने तक क्षेत्र न छोड़ें</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicAlert;