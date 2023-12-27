"use client";

import { useState } from "react";
import { onTheWayRequest } from "./server-actions";

export default function OnTheWayBtn({ id }: { id: string }) {
  type values = "" | "High" | "Medium" | "Low";

  const [caseSensitivity, setCaseSensitivity] = useState<values>("");
  const [survivalRate, setSurvivalRate] = useState<values>("");

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await onTheWayRequest(id, caseSensitivity, survivalRate);
      }}
    >
      <div className="mb-4">
        <div className="flex flex-col gap-1">
          <label>Case sensitivity:</label>
          <select
            value={caseSensitivity}
            onChange={(e) => setCaseSensitivity(e.target.value as values)}
          >
            <option disabled value="">
              Select one
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Survival rate:</label>
          <select
            value={survivalRate}
            onChange={(e) => setSurvivalRate(e.target.value as values)}
          >
            <option disabled value="">
              Select one
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <button
        className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white disabled:bg-green-200"
        disabled={survivalRate == "" || caseSensitivity == ""}
      >
        Assign as on the way
      </button>
    </form>
  );
}
