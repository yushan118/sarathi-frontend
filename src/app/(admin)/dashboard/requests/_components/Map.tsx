"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Map({
  coord,
  zoom,
  centerAtCity,
}: {
  coord: { lat: number; lng: number }[];
  zoom: number;
  centerAtCity?: boolean;
}) {
  const marker = L.icon({ iconUrl: MarkerIcon.src });

  return (
    <MapContainer
      center={
        centerAtCity
          ? { lat: 27.7172, lng: 85.324 }
          : { lat: coord[0].lat, lng: coord[0].lng }
      }
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-[300px] w-[600px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coord.map((c) => (
        <Marker
          key={`${c.lat}-${c.lng}`}
          position={{
            lat: c.lat,
            lng: c.lng,
          }}
          icon={marker}
        />
      ))}
    </MapContainer>
  );
}
