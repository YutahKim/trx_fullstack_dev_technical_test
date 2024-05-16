import React, { useEffect } from 'react';
import L from 'leaflet';

const LeafletMap: React.FC = () => {
  useEffect(() => {
    // Create a map instance
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker
    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} />
  );
};

export default LeafletMap;
