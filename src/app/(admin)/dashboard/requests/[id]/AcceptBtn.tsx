"use client";

// Importing necessary React hooks and server action
import { useState } from "react";
import { acceptRequest } from "./server-actions";
import { hospitals } from "@/constants/hospitals";

// Extracting hospital names from the 'hospitals' object
const hospitalsList = Object.keys(hospitals);

// React component for a button to accept a request and choose a hospital
export default function AcceptBtn({
  id,
  bookingContact,
}: {
  id: string;
  bookingContact: string;
}) {

  // State to manage the selected hospital
  const [hospital, setHospital] = useState("");

  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={async (e) => {
        e.preventDefault();       // Preventing the default form submission behavior
        await acceptRequest(id, hospital, bookingContact);   // Calling the server action to accept the request with hospital information
      }}
    >
      {/* Dropdown to select a hospital */}
      <select
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
        className="p-2 outline-none"
      >
        <option defaultChecked disabled value="">
          Select a hospital
        </option>

         {/* Mapping through the hospitalsList to populate the dropdown options */}
        {hospitalsList.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      
       {/* Button to accept the request, disabled if no hospital is selected */}
      <button
        disabled={hospital == ""}
        className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white disabled:bg-gray-300"
      >
        Accept the request
      </button>
    </form>
  );
}
