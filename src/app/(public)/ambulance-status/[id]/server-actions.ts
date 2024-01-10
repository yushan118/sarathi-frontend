"use server";

import { RiskValue } from "./RiskInvolvedClient";

export async function updateCaseSensitivity(id: string, value: RiskValue) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      case_sensitivity: value,
    }),
  }).then((res) => res.json());
}

export async function updateSurvivalRate(id: string, value: RiskValue) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      survival_rate: value,
    }),
  }).then((res) => res.json());
}
