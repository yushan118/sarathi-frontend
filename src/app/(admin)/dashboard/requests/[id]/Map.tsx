"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  const marker = L.icon({ iconUrl: MarkerIcon.src });

  return (
    <MapContainer
      center={{ lat, lng }}
      zoom={13}
      scrollWheelZoom={false}
      className="h-[300px] w-[600px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={{
          lat,
          lng,
        }}
        icon={marker}
      />
    </MapContainer>
  );
}
