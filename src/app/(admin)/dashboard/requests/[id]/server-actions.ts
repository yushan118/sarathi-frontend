"use server";

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

export async function acceptRequest(id: string) {
  await fetch(`${process.env.API_URL}/bookings/set-status`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "Application/JSON",
    },
    body: JSON.stringify({
      id: id,
      status: "Accepted by ambulance",
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
