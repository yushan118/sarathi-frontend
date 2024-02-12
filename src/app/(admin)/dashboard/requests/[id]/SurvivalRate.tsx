"use client";

import { RiskValue } from "@/app/(public)/ambulance-status/[id]/RiskInvolvedClient";
import { updateSurvivalRate } from "@/app/(public)/ambulance-status/[id]/server-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurvivalRate({
  id,
  initialSurvivalRate,
}: {
  id: string;
  initialSurvivalRate: string;
}) {
  const router = useRouter()
  const [survivalRate, setSurvivalRate] = useState<RiskValue>(
    initialSurvivalRate as RiskValue,
  );
  useEffect(() => {
    updateSurvivalRate(id, survivalRate);
    router.refresh();
  }, [survivalRate, id]);

  return (
    <div className="flex flex-col items-center justify-center gap-1 w-full">
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
  );
}
