"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix iconos Leaflet en Next
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * 👉 UBICACIÓN REAL DE TU FERRETERÍA
 * (Ajustada para Calle Ignacio Rodríguez, Chihuahua)
 */
const STORE_POSITION: [number, number] = [
  28.704742,
  -106.080918,
];

type Props = {
  onSelect: (lat: number, lng: number) => void;
};

function ClienteMarker({ onSelect }: Props) {
  const [pos, setPos] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPos([lat, lng]);
      onSelect(lat, lng);
    },
  });

  if (!pos) return null;

  return <Marker position={pos} />;
}

export default function MapSelector({ onSelect }: Props) {
  return (
    <MapContainer
      center={STORE_POSITION}
      zoom={15}
      scrollWheelZoom
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* FERRETERÍA */}
      <Marker position={STORE_POSITION} />

      {/* CLIENTE */}
      <ClienteMarker onSelect={onSelect} />
    </MapContainer>
  );
}