// Using the "client" pragma to indicate that this is a client-side module
"use client";

// Importing necessary modules from React
import { useEffect, useState } from "react";
import { updateCaseSensitivity } from "./server-actions";

// Type definition for risk values
export type RiskValue = "Unknown" | "High" | "Medium" | "Low";

// RiskInvolvedClient component definition
export function RiskInvolvedClient({
  id,    // ID of the risk involved
  initialCaseSensitivity,   // Initial risk value
}: {
  id: string;
  initialCaseSensitivity: RiskValue;
}) {
  // State to manage the current case sensitivity
  const [caseSensitivity, setCaseSensitivity] = useState<RiskValue>(
    initialCaseSensitivity,
  );

  // Effect hook to update case sensitivity on the server when it changes
  useEffect(() => {
    updateCaseSensitivity(id, caseSensitivity);
  }, [caseSensitivity, id]);

   // Rendering the component
  return (
    <div className="mb-4 flex gap-8">
      <div className="flex flex-col gap-1">

        {/* Label for the case sensitivity */}
        <label>Case sensitivity</label>

        {/* Dropdown/select input for choosing case sensitivity */}
        <select
          value={caseSensitivity}
          onChange={(e) => setCaseSensitivity(e.target.value as RiskValue)}
        >
          {/* Placeholder option */}
          <option disabled value="Unknown">
            Select one
          </option>

          {/* Options for different risk values */}
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
}
