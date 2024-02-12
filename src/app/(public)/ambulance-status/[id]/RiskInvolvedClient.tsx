"use client";

import { useEffect, useState } from "react";
import { updateCaseSensitivity } from "./server-actions";

export type RiskValue = "Unknown" | "High" | "Medium" | "Low";

export function RiskInvolvedClient({
  id,
  initialCaseSensitivity,
}: {
  id: string;
  initialCaseSensitivity: RiskValue;
}) {
  const [caseSensitivity, setCaseSensitivity] = useState<RiskValue>(
    initialCaseSensitivity,
  );
  useEffect(() => {
    updateCaseSensitivity(id, caseSensitivity);
  }, [caseSensitivity, id]);

  return (
    <div className="mb-4 flex gap-8">
      <div className="flex flex-col gap-1">
        <label>Case sensitivity</label>
        <select
          value={caseSensitivity}
          onChange={(e) => setCaseSensitivity(e.target.value as RiskValue)}
        >
          <option disabled value="Unknown">
            Select one
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
}
