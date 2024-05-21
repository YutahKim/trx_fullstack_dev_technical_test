import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import Car from '@/types/Car';

interface LeafletProps {
  cars: Car[];
  selectedCar?: Car | null; // Optional selected car
}

const LeafletMap: React.FC<LeafletProps> = ({ cars, selectedCar }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (mapRef.current && typeof window !== 'undefined') {
      const L = require('leaflet');

      if (!mapInstanceRef.current) {
        // Initialize the map
        const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        mapInstanceRef.current = map;
      }

      const carIcon = L.icon({
        iconUrl: '/icons/icon-car.png',
        iconSize: [45, 61],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      // Clear previous markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
      var cont = -0.09
      // Add markers for each car
      cars.forEach(car => {
        //const marker = L.marker([51.505, Math.random() * (-0.09 + 0.05) - 0.05], { icon: carIcon })
        const marker = L.marker([51.505, cont], { icon: carIcon })
          .bindPopup(`${car.BRAND} ${car.MODEL}<br />Plate: ${car.placa}`)
          .addTo(mapInstanceRef.current!);
        markersRef.current[car.placa] = marker;
        cont = cont - 0.01
      });

      // Focus on selected car
      if (selectedCar && markersRef.current[selectedCar.placa]) {
        const marker = markersRef.current[selectedCar.placa];
        mapInstanceRef.current?.panTo(marker.getLatLng());
        marker.openPopup();
      }
    }
  }, [cars, selectedCar]);

  return <div id="map" className="map" ref={mapRef} style={{ height: '82vh' }} />;
};

export default LeafletMap;