// Using the "server" pragma to indicate that this is a server-side module
"use server";

// Importing necessary modules from Next.js
import { revalidatePath } from "next/cache";
import { RiskValue } from "./RiskInvolvedClient";

// Asynchronous function to update the case sensitivity for a booking
export async function updateCaseSensitivity(id: string, value: RiskValue) {

   // Sending a POST request to the server API to update case sensitivity
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",    // Cache setting
    method: "POST",       // HTTP method
    headers: {
      "Content-Type": "Application/JSON",     // Content type header
    },
    body: JSON.stringify({
      id: id,
      case_sensitivity: value,
    }),
  }).then((res) => res.json());     // Parsing the response as JSON
}

// Asynchronous function to update the survival rate for a booking
export async function updateSurvivalRate(id: string, value: RiskValue) {

  // Sending a POST request to the server API to update survival rate
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",    // Cache setting
    method: "POST",       // HTTP method
    headers: {
      "Content-Type": "Application/JSON",     // Content type header
    },
    body: JSON.stringify({
      id: id,
      survival_rate: value,
    }),
  }).then((res) => res.json());     // Parsing the response as JSON
}

// Asynchronous function to revalidate the booking status page for a specific booking ID
export async function revalidateBookingStatusPage(bookingId: string) {

  // Revalidating the path for the booking status page
  revalidatePath(`/ambulance-status/${bookingId}`);
}
