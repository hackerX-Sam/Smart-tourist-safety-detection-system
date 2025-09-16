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
import { useLanguage } from '../contexts/LanguageContext';

const AuthorityDashboard: React.FC = () => {
  const { t } = useLanguage();
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
      type: t.panic,
      tourist: 'Raj Kumar Sharma',
      location: `${t.indiaGate}, ${t.newDelhi}`,
      time: '2 mins ago',
      severity: t.high,
      status: t.active
    },
    {
      id: 'ALERT-002',
      type: t.aiAnomaly,
      tourist: 'Priya Patel',
      location: `${t.redFort}, ${t.delhi}`,
      time: '5 mins ago',
      severity: t.medium,
      status: t.investigating
    },
    {
      id: 'ALERT-003',
      type: t.geoFence,
      tourist: 'Amit Singh',
      location: `${t.connaught}, ${t.delhi}`,
      time: '8 mins ago',
      severity: t.low,
      status: t.resolved
    }
  ];

  const touristClusters = [
    { zone: t.indiaGate, count: 342, risk: t.low, safety: 85 },
    { zone: t.redFort, count: 289, risk: t.medium, safety: 72 },
    { zone: t.connaught, count: 156, risk: t.low, safety: 91 },
    { zone: t.chandniChowk, count: 198, risk: t.high, risk_reason: t.constructionArea, safety: 58 },
    { zone: t.lotusTemple, count: 262, risk: t.low, safety: 88 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case t.high: return 'text-red-500 bg-red-100';
      case t.medium: return 'text-yellow-600 bg-yellow-100';
      case t.low: return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case t.high: return 'bg-red-500';
      case t.medium: return 'bg-yellow-500';
      case t.low: return 'bg-green-500';
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{t.touristSafetyCommandCenter}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">{t.realTimeMonitoringResponse}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.lastUpdated}</p>
                <p className="font-medium text-gray-900 dark:text-white">{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                {t.refresh}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.activeTourists}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{touristCount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{t.fromYesterday}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.activeAlerts}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeAlerts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600">{t.highPriority}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.averageSafetyScore}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">{t.goodOverallSafety}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.responseTimeAvg}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3.2 min</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-yellow-600">{t.last24HoursAverage}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Interactive Map */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.liveTouristClusters}</h2>
              <div className="flex gap-2">
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  {t.filter}
                </button>
                <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-lg text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors">
                  <Eye className="w-4 h-4" />
                  {t.view}
                </button>
              </div>
            </div>
            
            {/* Simulated Map with Clusters */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-48 sm:h-64 relative border dark:border-gray-600 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg opacity-50"></div>
              
              {/* Tourist Clusters */}
              <div className="absolute top-8 left-12">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">342</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">{t.indiaGate}</span>
              </div>
              
              <div className="absolute top-16 right-20">
                <div className="bg-yellow-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold">289</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">{t.redFort}</span>
              </div>
              
              <div className="absolute bottom-16 left-8">
                <div className="bg-green-500 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs">156</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">{t.connaught}</span>
              </div>
              
              <div className="absolute bottom-8 right-16">
                <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">198</div>
                <span className="text-xs bg-white dark:bg-gray-800 dark:text-white px-2 py-1 rounded shadow mt-1 block">{t.chandniChowk}</span>
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
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">({cluster.count} {t.tourists})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{t.safety}: {cluster.safety}%</span>
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.activeAlertsAndIncidents}</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={t.searchAlerts}
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
                        alert.severity === t.high ? 'text-red-500' : 
                        alert.severity === t.medium ? 'text-yellow-500' : 'text-green-500'
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
                        alert.status === t.active ? 'bg-red-100 text-red-700' :
                        alert.status === t.investigating ? 'bg-yellow-100 text-yellow-700' :
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
                          {t.viewDetails}
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors">
                          <Phone className="w-3 h-3" />
                          {t.contact}
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
                <span className="font-medium text-blue-900 dark:text-blue-300">{t.aiAnomalyDetection}</span>
              </div>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• {t.unusualCrowdDensity}</li>
                <li>• {t.weatherWarning}</li>
                <li>• {t.patternAnalysis}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tourist Detail Modal */}
        {selectedTourist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.touristDetails}</h3>
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
                    <span className="font-semibold text-blue-700">R</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{selectedTourist}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t.touristId}: IND-2024-789</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">{t.safetyScore}:</span>
                    <span className="font-medium text-green-600 ml-2">85%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">{t.status}:</span>
                    <span className="font-medium text-red-600 ml-2">{t.emergency}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">{t.location}:</span>
                    <span className="font-medium text-gray-900 dark:text-white ml-2">{t.indiaGate}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">{t.lastContact}:</span>
                    <span className="font-medium text-gray-900 dark:text-white ml-2">2 {t.minutesAgo}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    {t.trackLocation}
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                    {t.contactTourist}
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