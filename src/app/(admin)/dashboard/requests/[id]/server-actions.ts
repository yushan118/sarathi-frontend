"use server";

import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";
import { revalidateTag } from "next/cache";

export async function approveRequest(id: string) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Approved by admin",
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}

export async function acceptRequest(
  id: string,
  hospital: string,
  bookingContact: string,
) {
  const ambulanceUser = await getAuthenticatedAmbulanceUser();

  const res = await fetch("https://api.sparrowsms.com/v2/sms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: "jMTnvj4bKtTTA6eeSfRm",
      from: "TheAlert",
      to: "9861292178",
      text: `An ambulance will arrive to ${hospital}!\nAmbulance contact: ${ambulanceUser?.mobileNumber || ""}\nBooking contact: ${bookingContact}`,
    }),
  }).then(res => res.json());
  console.log(res);
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Accepted by ambulance",
      hospital: hospital,
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}

export async function onTheWayRequest(id: string) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Ambulance on the way",
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}

export async function pickedRequest(id: string) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Picked up by ambulance",
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}

export async function arrivedRequest(id: string) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Arrived on hospital",
    }),
  }).then((res) => res.json());
  revalidateTag("request-details");
}
