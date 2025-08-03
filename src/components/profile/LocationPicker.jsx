// components/profile/LocationPicker.jsx


import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import './LocationPicker.css';
import axios from 'axios';

function LocationMarker({ setAddress, setPosition }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
      setPosition([lat, lng]);

      axios
        .get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then((res) => {
          setAddress(res.data.display_name);
        })
        .catch(console.error);
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

export default function LocationPicker({ setAddress, setPosition }) {
  return (
    <div className="mb-4">
      <h6 className="text-muted mb-2">Select Your Location</h6>
      <MapContainer
        center={[14.5995, 120.9842]} // Default: Manila
        zoom={13}
        style={{ height: '300px', borderRadius: '10px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setAddress={setAddress} setPosition={setPosition} />
      </MapContainer>
      <small className="text-muted d-block mt-2">Click anywhere on the map to drop a pin.</small>
    </div>
  );
}
