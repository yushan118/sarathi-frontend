"use client";

// Importing necessary modules and components
import { RiskValue } from "@/app/(public)/ambulance-status/[id]/RiskInvolvedClient";
import { updateSurvivalRate } from "@/app/(public)/ambulance-status/[id]/server-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Main SurvivalRate component
export default function SurvivalRate({
  id,
  initialSurvivalRate,
}: {
  id: string;
  initialSurvivalRate: string;
}) {

  // Using the useRouter hook from Next.js for routing
  const router = useRouter()

  // State to manage the selected survival rate
  const [survivalRate, setSurvivalRate] = useState<RiskValue>(
    initialSurvivalRate as RiskValue,
  );

  // Effect to update the survival rate on the server and refresh the router when it changes
  useEffect(() => {
    updateSurvivalRate(id, survivalRate);     // Updating the survival rate on the server
    router.refresh();     // Refreshing the router to reflect the changes
  }, [survivalRate, id]);


  // Rendering the UI for selecting the survival rate
  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full">
      <label>Survival rate</label>

      {/* Dropdown/select element for choosing the survival rate */}
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
  );
}
