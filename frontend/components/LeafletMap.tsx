import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (mapRef.current && typeof window !== 'undefined') {
      const L = require('leaflet');
      const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const carIcon = L.icon({
        iconUrl: '/icons/icon-car.png',
        iconSize: [35, 61],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      L.marker([51.505, -0.09], { icon: carIcon }).addTo(map);
    }
  }, []);

  return <div ref={mapRef} style={{ height: '82vh' }} />;
};

export default dynamic(() => Promise.resolve(LeafletMap), {
  ssr: false
});