"use server";

// Importing the `cookies` object from the `next/headers` module
import { cookies } from "next/headers";

// Async function to add a booking on the server
export async function addBooking(
  contact_number: string,
  lat: number,
  lng: number,
) {

  // Creating a cookie store using the `cookies` object
  const cookieStore = cookies();

  // Making a POST request to the server API endpoint for adding bookings
  const addBookingRes = await fetch(`${process.env.API_URL}/bookings/add`, {
    method: "POST",
    headers: {

      // Setting headers for the request
      // Setting Authorization header with the value of the 'AUTH_TOKEN' cookie, or an empty string if it doesn't exist
      Authorization: cookieStore.get("AUTH_TOKEN")?.value || "", 

      // Setting Content-Type header to indicate that the request body is in JSON format
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      // Converting the parameters into a JSON string and sending it in the request body
      contact_number,
      lat,
      lng,
    }),
  });

  // Checking if the request was not successful
  if (!addBookingRes.ok) {

    // Returning an object with success set to false and an error message
    return { success: false, message: (await addBookingRes.json()).message };
  }

  // Returning an object with success set to true and the id from the response JSON
  return { success: true, id: (await addBookingRes.json())._id };
}
