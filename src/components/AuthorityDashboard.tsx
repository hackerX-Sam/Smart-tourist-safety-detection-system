import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Shield, 
  Activity, 
  Phone, 
  Eye, 
  TrendingUp,
  Clock,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AuthorityDashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [touristCount, setTouristCount] = useState(1247);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedTourist, setSelectedTourist] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
      setTouristCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const alertData = [
    {
      id: 'ALERT-001',
      type: 'PANIC',
      tourist: 'राज कुमार शर्मा',
      location: 'इंडिया गेट, नई दिल्ली',
      time: '2 mins ago',
      severity: 'HIGH',
      status: 'ACTIVE'
    },
    {
      id: 'ALERT-002',
      type: 'AI_ANOMALY',
      tourist: 'प्रिया पटेल',
      location: 'लाल किला, दिल्ली',
      time: '5 mins ago',
      severity: 'MEDIUM',
      status: 'INVESTIGATING'
    },
    {
      id: 'ALERT-003',
      type: 'GEO_FENCE',
      tourist: 'अमित सिंह',
      location: 'कनॉट प्लेस, दिल्ली',
      time: '8 mins ago',
      severity: 'LOW',
      status: 'RESOLVED'
    }
  ];

  const touristClusters = [
    { zone: 'इंडिया गेट', count: 342, risk: 'LOW', safety: 85 },
    { zone: 'लाल किला', count: 289, risk: 'MEDIUM', safety: 72 },
    { zone: 'कनॉट प्लेस', count: 156, risk: 'LOW', safety: 91 },
    { zone: 'चांदनी चौक', count: 198, risk: 'HIGH', risk_reason: 'Construction', safety: 58 },
    { zone: 'लोटस टेम्पल', count: 262, risk: 'LOW', safety: 88 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-500 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-3 sm:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">पर्यटक सुरक्षा कमांड सेंटर</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">रियल-टाइम निगरानी और घटना प्रतिक्रिया</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">अंतिम अपडेट</p>
                <p className="font-medium text-gray-900 dark:text-white">{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                रिफ्रेश
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">सक्रिय पर्यटक</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{touristCount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">कल से +12%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">सक्रिय अलर्ट</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeAlerts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600">2 उच्च प्राथमिकता</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">औसत सुरक्षा स्कोर</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">अच्छी समग्र सुरक्षा</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">प्रतिक्रिया समय</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2 मिनट</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-yellow-600">पिछले 24 घंटे का औसत</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Interactive Map */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">लाइव पर्यटक समूह</h2>
              <div className="flex gap-2">
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  फिल्टर
                </button>
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                  <Eye className="w-4 h-4" />
                  देखें
                </button>
              </div>
            </div>
            
            {/* Simulated Map with Clusters */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-48 sm:h-64 relative border dark:border-gray-600 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg opacity-50"></div>
              
              {/* Tourist Clusters */}
              <div className="absolute top-8 left-12">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">342</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">इंडिया गेट</span>
              </div>
              
              <div className="absolute top-16 right-20">
                <div className="bg-yellow-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold">289</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">लाल किला</span>
              </div>
              
              <div className="absolute bottom-16 left-8">
                <div className="bg-green-500 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs">156</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">कनॉट प्लेस</span>
              </div>
              
              <div className="absolute bottom-8 right-16">
                <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">198</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">चांदनी चौक</span>
              </div>
            </div>

            {/* Zone Details */}
            <div className="mt-4 space-y-2">
              {touristClusters.map((cluster, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg gap-2 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${getRiskColor(cluster.risk)} rounded-full`}></div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{cluster.zone}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">({cluster.count} पर्यटक)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">सुरक्षा: {cluster.safety}%</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(cluster.risk).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                      {cluster.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">सक्रिय अलर्ट और घटनाएं</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="अलर्ट खोजें..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4">
              {alertData.map((alert) => (
                <div key={alert.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.severity === 'HIGH' ? 'text-red-500' : 
                        alert.severity === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className="font-medium text-gray-900 dark:text-white">{alert.type.replace('_', ' ')}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</span>
                  </div>
                  
                  <div className="ml-7">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.tourist}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.status === 'ACTIVE' ? 'bg-red-100 text-red-700' :
                        alert.status === 'INVESTIGATING' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {alert.status}
                      </span>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedTourist(alert.tourist)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          विवरण देखें
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors">
                          <Phone className="w-3 h-3" />
                          संपर्क
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900 dark:text-blue-300">AI विसंगति का पता लगाना</span>
              </div>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• चांदनी चौक में असामान्य भीड़ घनत्व का पता चला (निर्माण क्षेत्र)</li>
                <li>• मौसम चेतावनी: 2 घंटे में बारिश की संभावना - पर्यटक सुरक्षा सलाह भेजी गई</li>
                <li>• पैटर्न विश्लेषण: मेट्रो स्टेशनों के पास अधिक घटना दर</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tourist Detail Modal */}
        {selectedTourist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">पर्यटक विवरण</h3>
                <button 
                  onClick={() => setSelectedTourist(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-700">रा</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{selectedTourist}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Tourist ID: IND-2024-789</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">सुरक्षा स्कोर:</span>
                    <span className="font-medium text-green-600 ml-2">85%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">स्थिति:</span>
                    <span className="font-medium text-red-600 ml-2">आपातकाल</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">स्थान:</span>
                    <span className="font-medium text-gray-900 dark:text-white ml-2">इंडिया गेट</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">अंतिम संपर्क:</span>
                    <span className="font-medium text-gray-900 dark:text-white ml-2">2 मिनट पहले</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    स्थान ट्रैक करें
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    पर्यटक से संपर्क करें
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;