"use server";

import { cookies } from "next/headers";

export async function addBooking(contact_number: string, location: string) {
  const cookieStore = cookies();
  const addBookingRes = await fetch(`${process.env.API_URL}/bookings/add`, {
    method: "POST",
    headers: {
      Authorization: cookieStore.get("AUTH_TOKEN")?.value || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact_number,
      location,
    }),
  });
  if (!addBookingRes.ok) {
    return { success: false, message: (await addBookingRes.json()).message };
  }
  return { success: true, id: (await addBookingRes.json())._id };
}
