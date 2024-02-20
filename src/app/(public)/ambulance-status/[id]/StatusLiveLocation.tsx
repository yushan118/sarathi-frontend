// Importing the Map component from the specified path
import Map from "@/app/(admin)/dashboard/requests/_components/Map";

// Importing cookies from the "next/headers" module
import { cookies } from "next/headers";


// Defining the StatusLiveLocation function component that takes an 'id' as a prop
export default async function StatusLiveLocation({ id }: { id: string }) {

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


  // Rendering a div containing a paragraph with text and the Map component
  return (
    <div>

       {/* Displaying a text indicating the purpose of the following map */}
      <p className="text-center">Location map:</p>

      {/* Rendering the Map component with coordinates and zoom level */}
      <Map
        coord={[{ lat: requestDetails.lat, lng: requestDetails.lng, hospital: requestDetails.hospital }]}
        zoom={13}
      />
    </div>
  );
}
