import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PanicAlertProps {
  onClose: () => void;
}

const PanicAlert: React.FC<PanicAlertProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [responseTime, setResponseTime] = useState(0);
  const [callInitiated, setCallInitiated] = useState(false);

  useEffect(() => {
    if (step === 0 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (step === 0 && countdown === 0) {
      setStep(1);
      // Initiate emergency call
      initiateEmergencyCall();
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

  const initiateEmergencyCall = () => {
    if (!callInitiated) {
      setCallInitiated(true);
      // Create a hidden link to initiate the call
      const phoneNumber = "8822683839";
      const callLink = document.createElement('a');
      callLink.href = `tel:+91${phoneNumber}`;
      callLink.style.display = 'none';
      document.body.appendChild(callLink);
      
      // Trigger the call
      setTimeout(() => {
        callLink.click();
        document.body.removeChild(callLink);
      }, 1000);
    }
  };
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
        <span className="font-bold">{t.emergencyMode}</span>
        <button onClick={onClose} className="hover:bg-red-700 p-1 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white p-6">
        {step === -1 && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">{t.alertCancelled}</h2>
            <p className="text-sm text-red-200">{t.cancellationNotified}</p>
          </div>
        )}

        {step === 0 && (
          <div className="text-center">
            <AlertTriangle className="w-20 h-20 text-red-300 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-4">{t.emergencyAlert}</h2>
            <div className="text-6xl font-bold mb-4 text-red-200">{countdown}</div>
            <p className="text-sm mb-6">Emergency services will be contacted automatically</p>
            <button
              onClick={handleCancel}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl mb-4 transition-colors"
            >
              {t.cancelEmergency}
            </button>
            <p className="text-xs text-red-200">{t.tapToCancelIfAccidental}</p>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-2">{t.contactingEmergencyServices}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{t.responseTime}: {formatTime(responseTime)}</span>
              </div>
            </div>

            {/* Status Updates */}
            <div className="bg-black/30 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{t.alertSentToServices}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">{t.locationSharedWithResponders}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">{t.nearestPatrolDispatched}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full opacity-50"></div>
                <span className="text-sm text-gray-400">{t.emergencyContactNotified}</span>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-900/40 border border-blue-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">{t.yourLocation}</span>
              </div>
              <p className="text-xs text-blue-200">{t.indiaGate}, {t.newDelhi}</p>
              <p className="text-xs text-gray-300">अक्षांश: 28.6129° N, देशांतर: 77.2295° E</p>
              <p className="text-xs text-green-300 mt-2">{t.locationTrackingActive}</p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-medium mb-3">{t.emergencyResponseTeam}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t.unitId}:</span>
                  <span className="text-yellow-300">DCP-457</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.eta}:</span>
                  <span className="text-green-300">3-5 मिनट</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.officer}:</span>
                  <span className="text-blue-300">Amit Sharma</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-sm font-medium mb-2 text-yellow-300">{t.safetyInstructions}</h3>
              <ul className="text-xs space-y-1 text-yellow-200">
                <li>{t.stayAtCurrentLocation}</li>
                <li>{t.keepPhoneChargedAccessible}</li>
                <li>{t.watchForEmergencyVehicles}</li>
                <li>{t.dontLeaveAreaUntilSafe}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicAlert;