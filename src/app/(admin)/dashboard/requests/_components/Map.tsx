"use client";

// Importing necessary React and Leaflet components, icons, and utilities
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import HospitalMarkerIcon from "@/../public/icons/hospital-marker.png";
import MapMarkerIcon from "@/../public/icons/map-marker.png";
import RouteMarkersIcon from "@/../public/icons/route-markers.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { hospitals } from "@/constants/hospitals";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
require("leaflet-routing-machine");
require("lrm-graphhopper");


// Array of random colors for route lines
const randomColors = [
  "red",
  "yellow",
  "blue",
  "green",
  "cyan",
];

// React component for displaying a map with markers and routes
export default function Map({
  coord,
  zoom,
  centerAtCity,
}: {
  coord: { lat: number; lng: number; hospital?: string }[];
  zoom: number;
  centerAtCity?: boolean;
}) {

  // Leaflet icons for regular and hospital markers
  const marker = L.icon({ iconUrl: MarkerIcon.src });
  const hospitalMarker = L.icon({ iconUrl: HospitalMarkerIcon.src });

  // Refs for map and route controls
  const mapRef = useRef<L.Map>(null);
  const routeControl = useRef<L.Routing.Control[]>([]);

  // State to toggle displaying routes
  const [showRoutes, setShowRoutes] = useState(false);

  // useEffect for handling route control updates
  useEffect(() => {
    if (showRoutes) {
      if (!mapRef.current) return;

      const coordWithHospital = coord.filter((c) => !!c.hospital);

      for (let i = 0; i < coordWithHospital.length; i++) {
        routeControl.current.push(
          L.Routing.control({
            // @ts-ignore
            router: new L.Routing.GraphHopper(
              "3ceae8b3-219c-4063-9493-b7eda9919939",
            ),
            // @ts-ignore
            lineOptions: {
              styles: [
                { color: "black", opacity: 0.15, weight: 9 },
                { color: "white", opacity: 0.8, weight: 6 },
                { color: randomColors[i % randomColors.length], opacity: 1, weight: 2 },
              ],
              addWaypoints: false,
            },
            plan: new L.Routing.Plan(
              [
                L.latLng(coordWithHospital[i].lat, coordWithHospital[i].lng),
                L.latLng(
                  hospitals[coordWithHospital[i].hospital!][0],
                  hospitals[coordWithHospital[i].hospital!][1],
                ),
              ],
              // @ts-ignore
              { createMarker: () => null },
            ),
          }).addTo(mapRef.current),
        );
      }
    } else {
      if (!routeControl.current) return;
      for (const co of routeControl.current) {
        mapRef.current?.removeControl(co);
      }
      routeControl.current = [];
    }
  }, [showRoutes]);

  // Render a message if no coordinates are provided
  if (coord.length == 0) {
    return <p>No requests available</p>;
  }

  // Render the map with markers and routes
  return (
    <>

    {/* Buttons to toggle marker and route visibility */}
      <div className="flex w-[350px]">
        <button
          onClick={() => setShowRoutes(false)}
          className={twMerge(
            "border border-gray-400 p-1",
            showRoutes ? "bg-white" : "bg-black",
          )}
          title="Show markers only"
        >
          <Image
            src={MapMarkerIcon}
            alt="Map Marker"
            height={25}
            className={twMerge(
              "h-[25px] w-[25px] object-contain",
              !showRoutes && "invert",
            )}
          />
        </button>
        <button
          onClick={() => setShowRoutes(true)}
          className={twMerge(
            "border border-gray-400 p-1",
            !showRoutes ? "bg-white" : "bg-black",
          )}
          title="Show markers and routes"
        >
          <Image
            src={RouteMarkersIcon}
            alt="Route Markers"
            height={25}
            className={twMerge(
              "h-[25px] w-[25px] object-contain",
              showRoutes && "invert",
            )}
          />
        </button>
      </div>

      {/* MapContainer component for displaying the map */}
      <MapContainer
        ref={mapRef}
        center={
          centerAtCity
            ? { lat: 27.7172, lng: 85.324 }
            : { lat: coord.at(0)?.lat || 0, lng: coord.at(0)?.lng || 0 }
        }
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[300px] w-[600px]"
      >
        {/* TileLayer for the map */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Rendering markers based on provided coordinates */} 
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

        {/* Rendering hospital markers if showRoutes is true */}  
        {showRoutes &&
          coord
            .filter((c) => !!c.hospital)
            .map((c) => (
              <Marker
                key={`hospital-${c.lat}-${c.lng}`}
                position={{
                  lat: hospitals[c.hospital!][0],
                  lng: hospitals[c.hospital!][1],
                }}
                icon={hospitalMarker}
              />
            ))}
      </MapContainer>
    </>
  );
}
