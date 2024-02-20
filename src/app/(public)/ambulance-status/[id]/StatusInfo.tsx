// Importing bookingStatuses from the "@/constants/booking" module
import { bookingStatuses } from "@/constants/booking";
import { cookies } from "next/headers";   // Importing cookies from the "next/headers" module


// Defining the StatusInfo function component that takes an 'id' as a prop
export default async function StatusInfo({ id }: { id: string }) {

  // Retrieving cookies from the "next/headers" module
  const cookieStore = cookies();

  // Making an asynchronous request to fetch booking details from the API
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {

      // Including the Authorization token from cookies in the request headers
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

   // Rendering a div with flex layout and centering content
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Displaying the booking status with a fallback to the actual status if not found in bookingStatuses */}
      <p className="text-center text-3xl font-bold">
        {bookingStatuses.find((s) => s.value == requestDetails.status)?.info ||
          requestDetails.status}
      </p>

      {/* Displaying the booking status explicitly */}
      <p className="text-center">Status: {requestDetails.status}</p>
    </div>
  );
}
