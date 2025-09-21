import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TouristCluster {
  id: string;
  position: { lat: number; lng: number };
  count: number;
  risk: string;
  zone: string;
  safety: number;
}

interface GoogleMapProps {
  clusters: TouristCluster[];
  onClusterClick?: (cluster: TouristCluster) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ clusters, onClusterClick }) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

    // Center on New Delhi
    const center = { lat: 28.6139, lng: 77.2090 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    // Add markers for clusters
    addClusterMarkers();
  };

  const addClusterMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    clusters.forEach(cluster => {
      const getRiskColor = (risk: string) => {
        switch (risk.toLowerCase()) {
          case 'high': case 'उच्च': case 'alto': case 'élevé': case 'hoch': case '高': return '#ef4444';
          case 'medium': case 'मध्यम': case 'medio': case 'moyen': case 'mittel': case '中': return '#f59e0b';
          case 'low': case 'कम': case 'bajo': case 'faible': case 'niedrig': case '低': return '#10b981';
          default: return '#6b7280';
        }
      };

      const marker = new google.maps.Marker({
        position: cluster.position,
        map: mapInstanceRef.current,
        title: `${cluster.zone}: ${cluster.count} ${t.tourists}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: Math.max(8, Math.min(20, cluster.count / 10)),
          fillColor: getRiskColor(cluster.risk),
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2">${cluster.zone}</h3>
            <div class="space-y-1 text-sm">
              <p><strong>${t.tourists}:</strong> ${cluster.count}</p>
              <p><strong>${t.safety}:</strong> ${cluster.safety}%</p>
              <p><strong>Risk:</strong> <span class="px-2 py-1 rounded text-xs" style="background-color: ${getRiskColor(cluster.risk)}20; color: ${getRiskColor(cluster.risk)}">${cluster.risk}</span></p>
            </div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        if (onClusterClick) {
          onClusterClick(cluster);
        }
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (isLoaded && mapInstanceRef.current) {
      addClusterMarkers();
    }
  }, [clusters, isLoaded, t]);

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-64 rounded-lg border dark:border-gray-600"
      style={{ minHeight: '256px' }}
    />
  );
};

export default GoogleMap;