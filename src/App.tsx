import React, { useState } from 'react';
import { Smartphone, Shield, Monitor, Moon, Sun, LogOut, User } from 'lucide-react';
import MobileApp from './components/MobileApp';
import PanicAlert from './components/PanicAlert';
import AuthorityDashboard from './components/AuthorityDashboard';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import LaunchAnimation from './components/LaunchAnimation';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AuthenticatedApp: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const [currentView, setCurrentView] = useState<'mobile' | 'panic' | 'dashboard'>('mobile');
  const [showPanicAlert, setShowPanicAlert] = useState(false);

  // Set initial view based on user type
  React.useEffect(() => {
    if (user?.type === 'authority') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('mobile');
    }
  }, [user]);

  const handlePanicTrigger = () => {
    setShowPanicAlert(true);
    setCurrentView('panic');
  };

  const handleClosePanic = () => {
    setShowPanicAlert(false);
    setCurrentView('mobile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t.appTitle}</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Welcome, {user?.name} ({user?.type === 'tourist' ? 'Tourist' : 'Authority'})
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-lg">{user?.avatar}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {isDarkMode ? t.light : t.dark}
            </button>
            
            {(user?.type === 'tourist' || currentView === 'mobile') && <button
              onClick={() => setCurrentView('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'mobile' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              {t.mobileApp}
            </button>}
            
            {(user?.type === 'tourist' || currentView === 'panic') && <button
              onClick={() => setCurrentView('panic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'panic' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Shield className="w-5 h-5" />
              {t.panicAlert}
            </button>}
            
            {(user?.type === 'authority' || currentView === 'dashboard') && <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'dashboard' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Monitor className="w-5 h-5" />
              {t.authorityDashboard}
            </button>}
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8 px-4">
        {currentView === 'mobile' && user?.type === 'tourist' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.mobileApp}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive safety monitoring with Digital ID, real-time location tracking, 
                emergency response, and AI-powered safety scoring for tourists.
              </p>
            </div>
            
            <div className="flex justify-center">
              <MobileApp onPanicTrigger={handlePanicTrigger} />
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Digital Tourist ID</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">QR code-enabled identification with real-time safety scoring and location tracking.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Emergency Response</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Instant panic button with automatic emergency services coordination and location sharing.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Geo-Fencing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered zone monitoring with proactive safety alerts and risk assessment.</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'panic' && user?.type === 'tourist' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-700 mb-4">{t.panicAlert} Flow</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Automated emergency response system with real-time coordination between tourists, 
                local authorities, and emergency services.
              </p>
            </div>
            
            <div className="flex justify-center">
              {showPanicAlert ? (
                <PanicAlert onClose={handleClosePanic} />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-md transition-colors duration-300">
                  <div className="text-center">
                    <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t.panicAlert} System</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      This demonstrates the emergency response flow when a tourist activates the panic button.
                    </p>
                    <button
                      onClick={handlePanicTrigger}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl"
                    >
                      Simulate {t.emergencyAlert}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(currentView === 'dashboard' || user?.type === 'authority') && (
          <div>
            <AuthorityDashboard />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <p className="mb-2">SafeYatri - Smart Tourist Safety Monitoring & Incident Response System</p>
            <p className="text-sm">Hackathon Demo - Advanced IoT Integration & AI-Powered Safety Analytics</p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <span>🔒 End-to-End Encryption</span>
              <span>🌐 Multi-Language Support</span>
              <span>⚡ Real-Time Monitoring</span>
              <span>🤖 AI Anomaly Detection</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);

  // Show launch animation on first load
  const handleLaunchComplete = () => {
    setShowLaunchAnimation(false);
  };

  if (showLaunchAnimation) {
    return <LaunchAnimation onComplete={handleLaunchComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (showRegistration) {
      return (
        <RegistrationPage 
          onRegistrationComplete={() => setShowRegistration(false)}
          onBackToLogin={() => setShowRegistration(false)}
        />
      );
    }
    return (
      <LoginPage 
        onLogin={login} 
        onShowRegistration={() => setShowRegistration(true)}
      />
    );
  }

  return <AuthenticatedApp />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;