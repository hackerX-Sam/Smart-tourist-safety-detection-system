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

const AuthorityDashboard: React.FC = () => {
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
      tourist: 'John Doe',
      location: 'Times Square, NYC',
      time: '2 mins ago',
      severity: 'HIGH',
      status: 'ACTIVE'
    },
    {
      id: 'ALERT-002',
      type: 'AI_ANOMALY',
      tourist: 'Maria Garcia',
      location: 'Central Park, NYC',
      time: '5 mins ago',
      severity: 'MEDIUM',
      status: 'INVESTIGATING'
    },
    {
      id: 'ALERT-003',
      type: 'GEO_FENCE',
      tourist: 'Li Wei',
      location: 'Brooklyn Bridge, NYC',
      time: '8 mins ago',
      severity: 'LOW',
      status: 'RESOLVED'
    }
  ];

  const touristClusters = [
    { zone: 'Times Square', count: 342, risk: 'LOW', safety: 85 },
    { zone: 'Central Park', count: 289, risk: 'MEDIUM', safety: 72 },
    { zone: 'Brooklyn Bridge', count: 156, risk: 'LOW', safety: 91 },
    { zone: 'Wall Street', count: 198, risk: 'HIGH', risk_reason: 'Construction', safety: 58 },
    { zone: 'Statue of Liberty', count: 262, risk: 'LOW', safety: 88 }
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tourist Safety Command Center</h1>
              <p className="text-gray-600 mt-1">Real-time monitoring and incident response</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{lastUpdate.toLocaleTimeString()}</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Tourists</p>
                <p className="text-2xl font-bold text-gray-900">{touristCount.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% vs yesterday</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{activeAlerts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-red-600">2 High Priority</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Safety Score</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-green-600">Good overall safety</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">3.2 min</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-yellow-600">Avg last 24h</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Map */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Live Tourist Clusters</h2>
              <div className="flex gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
            
            {/* Simulated Map with Clusters */}
            <div className="bg-gray-50 rounded-lg p-4 h-64 relative border">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg opacity-50"></div>
              
              {/* Tourist Clusters */}
              <div className="absolute top-8 left-12">
                <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">342</div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">Times Square</span>
              </div>
              
              <div className="absolute top-16 right-20">
                <div className="bg-yellow-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold">289</div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">Central Park</span>
              </div>
              
              <div className="absolute bottom-16 left-8">
                <div className="bg-green-500 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs">156</div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">Brooklyn Bridge</span>
              </div>
              
              <div className="absolute bottom-8 right-16">
                <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">198</div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1 block">Wall Street</span>
              </div>
            </div>

            {/* Zone Details */}
            <div className="mt-4 space-y-2">
              {touristClusters.map((cluster, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${getRiskColor(cluster.risk)} rounded-full`}></div>
                    <div>
                      <span className="font-medium text-gray-900">{cluster.zone}</span>
                      <span className="text-sm text-gray-600 ml-2">({cluster.count} tourists)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Safety: {cluster.safety}%</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(cluster.risk).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                      {cluster.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Alerts & Incidents</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search alerts..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              {alertData.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.severity === 'HIGH' ? 'text-red-500' : 
                        alert.severity === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                      <span className="font-medium text-gray-900">{alert.type.replace('_', ' ')}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                  
                  <div className="ml-7">
                    <p className="text-sm font-medium text-gray-900">{alert.tourist}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {alert.location}
                    </div>
                    
                    <div className="flex items-center justify-between">
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
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">AI Anomaly Detection</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Unusual crowd density detected at Wall Street (Construction area)</li>
                <li>• Weather alert: Rain expected in 2 hours - Tourist safety advisory sent</li>
                <li>• Pattern analysis: Higher incident rate near subway stations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tourist Detail Modal */}
        {selectedTourist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Tourist Details</h3>
                <button 
                  onClick={() => setSelectedTourist(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-700">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{selectedTourist}</h4>
                    <p className="text-sm text-gray-600">Tourist ID: TST-2024-789</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Safety Score:</span>
                    <span className="font-medium text-green-600 ml-2">85%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-red-600 ml-2">Emergency</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium ml-2">Times Square</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Contact:</span>
                    <span className="font-medium ml-2">2 mins ago</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
                    Track Location
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm">
                    Contact Tourist
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