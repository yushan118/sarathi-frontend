"use server";


// Importing necessary server-side modules and functions
import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";
import { revalidateTag } from "next/cache";


// Async function to approve a booking request
export async function approveRequest(id: string) {

  // Sending a POST request to the API to update the status to "Approved by admin"
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
  }).then((res) => res.json());       // Parsing the response as JSON (not currently used)
  revalidateTag("request-details");      // Triggering revalidation of the "request-details" cache tag
}

// Async function to accept a booking request
export async function acceptRequest(
  id: string,
  hospital: string,
  bookingContact: string,
) {

  // Retrieving authenticated ambulance user information
  const ambulanceUser = await getAuthenticatedAmbulanceUser();


  // Sending an SMS using the SparrowSMS API to notify about ambulance arrival details
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
  }).then(res => res.json());       // Parsing the response as JSON and logging to the console
  console.log(res);

  // Updating the status to "Accepted by ambulance" with the specified hospital
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
  }).then((res) => res.json());        // Parsing the response as JSON (not currently used)
  revalidateTag("request-details");     // Triggering revalidation of the "request-details" cache tag
}


// Async function for updating the status to "Ambulance on the way"
export async function onTheWayRequest(id: string) {

  // Sending a POST request to the API to update the status
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
  }).then((res) => res.json());      // Parsing the response as JSON (not currently used)
  revalidateTag("request-details");    // Triggering revalidation of the "request-details" cache tag
}

// Async function for updating the status to "Picked up by ambulance"
export async function pickedRequest(id: string) {

  // Sending a POST request to the API to update the status
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
  }).then((res) => res.json());      // Parsing the response as JSON (not currently used)
  revalidateTag("request-details");     // Triggering revalidation of the "request-details" cache tag
}

// Async function for updating the status to "Arrived on hospital"
export async function arrivedRequest(id: string) {

  // Sending a POST request to the API to update the status
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
  }).then((res) => res.json());        // Parsing the response as JSON (not currently used)
  revalidateTag("request-details");      // Triggering revalidation of the "request-details" cache tag
}

