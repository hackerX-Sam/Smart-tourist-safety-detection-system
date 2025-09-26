import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TouristCluster {
  id: string;
  position: { lat: number; lng: number };
  count: number;
  risk: string;
  zone: string;
  safety: number;
  riskReason?: string;
}

interface GoogleMapProps {
  clusters: TouristCluster[];
  onClusterClick?: (cluster: TouristCluster) => void;
  selectedCluster?: string | null;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ clusters, onClusterClick, selectedCluster }) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{ [key: string]: google.maps.Marker }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        initializeMap();
      } else {
        setTimeout(checkGoogleMaps, 100);
      }
    };
    checkGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      // Center on New Delhi with better positioning for tourist areas
      const center = { lat: 28.6139, lng: 77.2090 };

      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        styles: [
          // Enhanced satellite view styles for better tourist location visibility
          {
            featureType: 'poi.attraction',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_CENTER,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.TERRAIN
          ]
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
      });

      // Create info window
      infoWindowRef.current = new google.maps.InfoWindow();

      // Add markers for clusters
      addClusterMarkers();
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setMapError('Failed to initialize Google Maps');
    }
  };

  const getRiskColor = (risk: string) => {
    const riskLower = risk.toLowerCase();
    if (riskLower.includes('high') || riskLower.includes('उच्च') || riskLower.includes('alto') || 
        riskLower.includes('élevé') || riskLower.includes('hoch') || riskLower.includes('高')) {
      return '#ef4444';
    }
    if (riskLower.includes('medium') || riskLower.includes('मध्यम') || riskLower.includes('medio') || 
        riskLower.includes('moyen') || riskLower.includes('mittel') || riskLower.includes('中')) {
      return '#f59e0b';
    }
    if (riskLower.includes('low') || riskLower.includes('कम') || riskLower.includes('bajo') || 
        riskLower.includes('faible') || riskLower.includes('niedrig') || riskLower.includes('低')) {
      return '#10b981';
    }
    return '#6b7280';
  };

  const addClusterMarkers = () => {
    if (!mapInstanceRef.current || !infoWindowRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    clusters.forEach(cluster => {
      const riskColor = getRiskColor(cluster.risk);
      const isSelected = selectedCluster === cluster.id;
      
      // Create custom marker with pulsing animation for high risk
      const isHighRisk = cluster.risk.toLowerCase().includes('high') || 
                        cluster.risk.toLowerCase().includes('उच्च');
      
      const marker = new google.maps.Marker({
        position: cluster.position,
        map: mapInstanceRef.current,
        title: `${cluster.zone}: ${cluster.count} ${t.tourists}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? Math.max(15, Math.min(30, cluster.count / 6)) : Math.max(10, Math.min(25, cluster.count / 8)),
          fillColor: riskColor,
          fillOpacity: isHighRisk ? 0.95 : 0.85,
          strokeColor: '#ffffff',
          strokeWeight: isSelected ? 5 : 4,
          strokeOpacity: 1,
        },
        animation: isHighRisk ? google.maps.Animation.BOUNCE : undefined,
        zIndex: isHighRisk ? 1000 : (isSelected ? 999 : 1),
      });

      // Create detailed info window content
      const infoContent = `
        <div class="p-4 min-w-[300px] max-w-[350px]">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg text-gray-900">${cluster.zone}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: ${riskColor}20; color: ${riskColor}">
              ${cluster.risk.toUpperCase()}
            </span>
          </div>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">${t.tourists}:</span>
              <span class="font-semibold text-gray-900">${cluster.count}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">${t.safety}:</span>
              <div class="flex items-center gap-2">
                <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" style="width: ${cluster.safety}%; background-color: ${riskColor}"></div>
                </div>
                <span class="font-semibold" style="color: ${riskColor}">${cluster.safety}%</span>
              </div>
            </div>
            
            ${cluster.riskReason ? `
              <div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="flex items-center gap-2">
                  <span class="text-yellow-600">⚠️</span>
                  <span class="text-xs text-yellow-800 font-medium">${cluster.riskReason}</span>
                </div>
              </div>
            ` : ''}
            
            <div class="mt-3 pt-3 border-t border-gray-200">
              <div class="text-xs text-gray-500 space-y-1">
                <div>📍 ${cluster.position.lat.toFixed(4)}°N, ${cluster.position.lng.toFixed(4)}°E</div>
                <div>🛰️ Satellite tracking active</div>
                <div>📡 Last update: ${new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
          
          <div class="mt-4 flex gap-2">
            <button onclick="window.viewClusterDetails('${cluster.id}')" 
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors">
              ${t.viewDetails || 'View Details'}
            </button>
            <button onclick="window.contactCluster('${cluster.id}')" 
                    class="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors">
              ${t.contact || 'Contact'}
            </button>
          </div>
        </div>
      `;

      marker.addListener('click', () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(infoContent);
          infoWindowRef.current.open(mapInstanceRef.current, marker);
        }
        
        if (onClusterClick) {
          onClusterClick(cluster);
        }
      });

      // Store marker reference
      markersRef.current[cluster.id] = marker;
    });

    // Add global functions for info window buttons
    (window as any).viewClusterDetails = (clusterId: string) => {
      const cluster = clusters.find(c => c.id === clusterId);
      if (cluster && onClusterClick) {
        onClusterClick(cluster);
      }
    };

    (window as any).contactCluster = (clusterId: string) => {
      const cluster = clusters.find(c => c.id === clusterId);
      if (cluster) {
        // Simulate contacting the cluster
        alert(`Contacting patrol unit at ${cluster.zone}...\nDispatching emergency response team.`);
      }
    };
  };

  // Update markers when clusters change
  useEffect(() => {
    if (isLoaded && mapInstanceRef.current) {
      addClusterMarkers();
    }
  }, [clusters, isLoaded, t, selectedCluster]);

  // Handle selected cluster highlighting
  useEffect(() => {
    if (selectedCluster && markersRef.current[selectedCluster] && mapInstanceRef.current) {
      const marker = markersRef.current[selectedCluster];
      const cluster = clusters.find(c => c.id === selectedCluster);
      
      if (cluster) {
        // Pan to selected cluster
        mapInstanceRef.current.panTo(cluster.position);
        mapInstanceRef.current.setZoom(15);
        
        // Trigger click to show info window
        google.maps.event.trigger(marker, 'click');
      }
    }
  }, [selectedCluster, clusters]);

  if (mapError) {
    return (
      <div className="w-full h-80 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center border border-red-200 dark:border-red-800">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-sm text-red-600 dark:text-red-400">{mapError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-80 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Loading Google Satellite Maps...</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Connecting to live tourist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg border dark:border-gray-600 shadow-lg"
        style={{ minHeight: '320px' }}
      />
      
      {/* Enhanced Map Legend */}
      <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-600">
        <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-1">
          🛰️ Tourist Clusters
        </h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{t.high} Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{t.medium} Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">{t.low} Risk</span>
          </div>
          <div className="pt-1 border-t border-gray-200 dark:border-gray-600">
            <div className="text-xs text-gray-500 dark:text-gray-400">📡 Live Tracking</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">🗺️ Satellite View</div>
          </div>
        </div>
      </div>

      {/* Live Data Indicator */}
      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        LIVE SAT
      </div>

      {/* Tourist Count Indicator */}
      <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg">
        <div className="flex items-center gap-2">
          <span>👥</span>
          <span>{clusters.reduce((sum, cluster) => sum + cluster.count, 0)} Active Tourists</span>
        </div>
      </div>

      {/* Map Controls Info */}
      <div className="absolute bottom-3 right-3 bg-gray-800/80 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
        <div className="text-center">
          <div>🗺️ Map Controls</div>
          <div className="text-xs opacity-75">Click markers for details</div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;