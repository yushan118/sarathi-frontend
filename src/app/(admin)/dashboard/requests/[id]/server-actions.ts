"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function approveRequest(id: string) {
  const cookieStore = cookies();
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Approved by admin",
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}
