"use client";

import { useEffect, useState } from "react";
import { updateCaseSensitivity, updateSurvivalRate } from "./server-actions";

export type RiskValue = "Unknown" | "High" | "Medium" | "Low";

export function RiskInvolvedClient({
  id,
  initialCaseSensitivity,
  initialSurvivalRate,
}: {
  id: string;
  initialCaseSensitivity: RiskValue;
  initialSurvivalRate: RiskValue;
}) {
  const [caseSensitivity, setCaseSensitivity] = useState<RiskValue>(
    initialCaseSensitivity,
  );
  useEffect(() => {
    updateCaseSensitivity(id, caseSensitivity);
  }, [caseSensitivity, id]);

  const [survivalRate, setSurvivalRate] =
    useState<RiskValue>(initialSurvivalRate);
  useEffect(() => {
    updateSurvivalRate(id, survivalRate);
  }, [survivalRate, id]);

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
      <div className="flex flex-col gap-1">
        <label>Survival rate</label>
        <select
          value={survivalRate}
          onChange={(e) => setSurvivalRate(e.target.value as RiskValue)}
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
