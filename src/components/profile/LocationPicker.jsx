import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./LocationPicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const allowedCountries = [
  "Philippines", "Japan", "South Korea", "Singapore", "Malaysia", "Thailand",
  "Vietnam", "Indonesia", "United States", "Canada", "Australia",
  "United Kingdom", "United Arab Emirates", "Germany", "France"
];

const tileLayers = {
  "Carto Light": "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  "Stadia Smooth": "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  "Default (OSM)": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};

function LocationPicker({ setAddress, setPosition }) {
  const [position, setLocalPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [tileLayer, setTileLayer] = useState("Carto Light");

  const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = storedUser?.username || "";
  const key = `savedAddress-${username}`;

  useEffect(() => {
    if (username) {
      const stored = localStorage.getItem(key);
      if (stored) setSavedAddress(stored);
    }
  }, [username]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        axios
          .get("https://nominatim.openstreetmap.org/reverse", {
            params: { lat, lon: lng, format: "json" },
          })
          .then((res) => {
            const address = res.data.display_name;
            const country = res.data.address?.country || "";

            if (!allowedCountries.includes(country)) {
              setSelectedAddress("");
              setLocalPosition(null);
              setNotification({
                type: "error",
                message: `Shipping is not available in ${country}.`,
              });

              setAddress && setAddress("");
              setPosition && setPosition(null);
            } else {
              setSelectedAddress(address);
              setLocalPosition([lat, lng]);
              setNotification({ type: "", message: "" });

              setAddress && setAddress(address);
              setPosition && setPosition([lat, lng]);
            }
          })
          .catch(() =>
            setNotification({
              type: "error",
              message: "Failed to fetch address.",
            })
          );
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  const handleSaveAddress = () => {
    if (selectedAddress) {
      localStorage.setItem(key, selectedAddress);
      setSavedAddress(selectedAddress);
      setNotification({
        type: "success",
        message: "Address saved successfully.",
      });
      setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 3000);
    } else {
      setNotification({
        type: "warning",
        message: "Please select a valid location first.",
      });
    }
  };

  const renderNotification = () => {
    if (!notification.message) return null;

    const typeMap = {
      success: { icon: "check-circle-fill", class: "alert-success" },
      error: { icon: "x-circle-fill", class: "alert-danger" },
      warning: { icon: "exclamation-triangle-fill", class: "alert-warning" },
      info: { icon: "info-circle", class: "alert-secondary" },
    };

    const { icon, class: alertClass } = typeMap[notification.type] || typeMap.info;

    return (
      <div className={`alert ${alertClass} mt-3 d-flex align-items-center`} role="alert">
        <i className={`bi bi-${icon} me-2 fs-5`}></i>
        <div>{notification.message}</div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <h5 className="mb-3 text-muted">
        <i className="bi bi-geo-alt-fill text-primary me-2"></i> Select Your Location
      </h5>

      <div className="mb-3">
        <label htmlFor="mapStyle" className="form-label fw-semibold">
          Map Style:
        </label>
        <select
          id="mapStyle"
          className="form-select"
          value={tileLayer}
          onChange={(e) => setTileLayer(e.target.value)}
        >
          {Object.keys(tileLayers).map((styleKey) => (
            <option key={styleKey} value={styleKey}>
              {styleKey}
            </option>
          ))}
        </select>
      </div>

      <div className="map-wrapper mb-3" style={{ height: "400px" }}>
        <MapContainer
          center={[13.41, 122.56]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url={tileLayers[tileLayer]}
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {selectedAddress && (
        <div className="alert alert-secondary mt-3">
          <strong>Selected Address:</strong>
          <br />
          {selectedAddress}
        </div>
      )}

      {savedAddress && (
        <div className="alert alert-info mt-2">
          <strong>Saved Address:</strong>
          <br />
          {savedAddress}
        </div>
      )}

      <button
        onClick={handleSaveAddress}
        className="btn btn-primary mt-3"
        disabled={!selectedAddress}
      >
        Save This Address
      </button>

      {renderNotification()}
    </div>
  );
}

export default LocationPicker;
