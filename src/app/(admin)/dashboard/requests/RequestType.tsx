"use client";

// Importing necessary dependencies from external libraries
import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

// An array representing different types of requests
const availableTypes = [
  "Waiting to be approved by admin",
  "Accepted by ambulance",
  "Picked up by ambulance",
  "Arrived on hospital",
];

// Defining the RequestType component
export default function RequestType() {

  // Using the useQueryState hook to manage the state of the 'type' query parameter
  const [type, setType] = useQueryState("type");

  return (

    // Container for the request type buttons with some styling
    <div className="flex gap-6 border-b-2 border-b-[#EFF0F3] pb-2">

      {/* Button for displaying all request types */}
      <button
        className={twMerge(
          "relative font-semibold text-gray-500",
          type == null && "font-bold text-black",
        )}

        // Setting 'type' to null when 'All' button is clicked
        onClick={() => setType(null)}
      >
        All

        {/* Highlighting line beneath the 'All' button when 'type' is null */}
        {type == null && (
          <div className="absolute -bottom-3 left-0 w-full border-2 border-[#1E82AD]" />
        )}
      </button>

      {/* Mapping through availableTypes to create buttons for each request type */}
      {availableTypes.map((t) => (
        <button
          key={t}
          className={twMerge(
            "relative whitespace-nowrap font-semibold text-gray-500",
            type == t && "font-bold text-black",
          )}

          // Setting 'type' to the clicked request type
          onClick={() => setType(t)}
        >
          {t}

          {/* Highlighting line beneath the selected request type button */}
          {type == t && (
            <div className="absolute -bottom-3 left-0 w-full border-2 border-[#1E82AD]" />
          )}
        </button>
      ))}
    </div>
  );
}
