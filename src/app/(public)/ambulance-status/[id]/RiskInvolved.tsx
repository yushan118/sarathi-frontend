import { cookies } from "next/headers";
import { RiskInvolvedClient } from "./RiskInvolvedClient";

export async function RiskInvolved({ id }: { id: string }) {
  const cookieStore = cookies();
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

  return (
    <RiskInvolvedClient
      id={id}
      initialCaseSensitivity={requestDetails.case_sensitivity}
    />
  );
}
