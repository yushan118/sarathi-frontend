"use client";

import { toast } from "react-toastify";
import { addBooking } from "./serverActions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useGeolocated } from "react-geolocated";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";

export default function AddBookingForm({
  defaultContactNumber,
}: {
  defaultContactNumber: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  function GeolocationInformation() {
    if (!isGeolocationAvailable)
      return <p>Your browser does not support Geolocation</p>;
    if (!isGeolocationEnabled) return <p>Geolocation is not enabled</p>;
    return null;
  }

  const [markerCoord, setMarkerCoord] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    if (!coords) {
      return;
    }
    setMarkerCoord({ lat: coords?.latitude, lng: coords?.longitude });
  }, [coords]);

  function DraggableMarker() {
    const markerRef = useRef<L.Marker>(null);
    const eventHandlers = {
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coord = marker.getLatLng();
          setMarkerCoord({ lat: coord.lat, lng: coord.lng });
        }
      },
    };

    const marker = L.icon({ iconUrl: MarkerIcon.src });

    return (
      <Marker
        draggable
        eventHandlers={eventHandlers}
        position={markerCoord}
        ref={markerRef}
        icon={marker}
      />
    );
  }

  async function handleFormSubmit(formData: FormData) {
    const contact_number = formData.get("contact_number") as string;

    setIsLoading(true);
    const addBookingResponse = await addBooking(
      contact_number,
      markerCoord.lat,
      markerCoord.lng,
    );
    setIsLoading(false);
    if (!addBookingResponse.success) {
      toast(addBookingResponse.message, { type: "error" });
      return;
    }

    router.push(`/ambulance-status/${addBookingResponse.id}`);
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      action={handleFormSubmit}
    >
      <div className="flex items-center justify-center">
        <p className="rounded-l-xl bg-gray-200 px-5 py-3 pr-3">+977</p>
        <input
          className="remove-arrow rounded-r-xl py-3 pl-3 outline-none"
          placeholder="Your Mobile Number"
          type="number"
          name="contact_number"
          defaultValue={defaultContactNumber}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">Location:</p>
        <GeolocationInformation />
        {coords && (
          <MapContainer
            center={{ lat: coords.latitude, lng: coords.longitude }}
            zoom={13}
            scrollWheelZoom={false}
            className="h-[300px] w-[600px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
          </MapContainer>
        )}
      </div>
      <button
        className="my-4 flex flex-col items-center justify-center gap-1 rounded-3xl bg-[#DB0402] px-10 py-4 font-extrabold text-white disabled:opacity-30"
        disabled={isLoading}
      >
        {isLoading && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Book Ambulance
      </button>
    </form>
  );
}
