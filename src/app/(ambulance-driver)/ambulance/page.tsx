// Importing the 'cookies' object from the 'next/headers' module
import { cookies } from "next/headers";

// Importing the 'RequestEntry' component and 'IRequestEntry' interface from specific file paths
import RequestEntry, {
  IRequestEntry,
} from "@/app/(admin)/dashboard/requests/RequestEntry";
import Map from "@/app/(admin)/dashboard/requests/_components/Map";

// Default export for the 'AdminRequestsPage' function
export default async function AdminRequestsPage() {

  // Getting the cookies using 'cookies()' function
  const cookieStore = cookies();

  // Fetching bookings data from the API endpoint
  const bookings = await fetch(
    `${process.env.API_URL}/bookings/all?status=Approved by admin`,
    {
       // Configuring the fetch request with cache control and authorization header
      cache: "no-cache",
      headers: {
        Authorization: cookieStore.get("AUTH_AMBULANCE_TOKEN")?.value || "",
      },
    },
  ).then((res) => res.json());

  // Mapping the fetched bookings data to create an array of IRequestEntry objects
  const requests: IRequestEntry[] = bookings.map((r: any) => ({
    id: r._id,
    user: r.user.name,
    lat: r.lat,
    lng: r.lng,
  }));

    // Returning the main JSX structure
  return (
    <main className="flex flex-col justify-center gap-8">

      {/* Rendering the 'RequestEntry' component with certain props */}
      <RequestEntry
        entries={requests}
        hideCurrentStatus
        subHref="ambulance/request"
      />

      {/* Rendering the 'Map' component with coordinates and zoom level */}
      <div className="relative self-center">
        <Map
          coord={requests.map((r) => ({ lat: r.lat, lng: r.lng }))}
          zoom={11}
        />
      </div>
    </main>
  );
}
