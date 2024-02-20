// Importing necessary modules from specified packages
import { cookies } from "next/headers";
import { RiskInvolvedClient } from "./RiskInvolvedClient";

// Asynchronous function to fetch risk details based on ID
export async function RiskInvolved({ id }: { id: string }) {

  // Creating a cookie store to access cookies
  const cookieStore = cookies();

  // Fetching request details for a specific ID from the API
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",    // Cache setting
    next: {
      tags: ["request-details"],    // Next.js tags for optimization
    },
    headers: {

      // Authorization header with token from cookies
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());    // Parsing the response as JSON


  // Returning RiskInvolvedClient component with fetched details
  return (
    <RiskInvolvedClient
      id={id}

      // Passing initial case sensitivity to the client component
      initialCaseSensitivity={requestDetails.case_sensitivity}
    />
  );
}
