// Importing necessary components and modules
import RequestEntry, { IRequestEntry } from "./RequestEntry";
import { cookies } from "next/headers";
import Map from "./_components/Map";
import RequestType from "./RequestType";

// Async function representing the AdminRequestsPage component
export default async function AdminRequestsPage() {

  // Retrieving cookies from the request headers
  const cookieStore = cookies();

  // Fetching the list of booking requests from the API endpoint
  const requestsListRes = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  });

   // Parsing the response into a JSON array
  const requestsList = await requestsListRes.json();

  // Mapping the API response data to the IRequestEntry structure
  const requests: IRequestEntry[] = requestsList.map((r: any) => ({
    id: r._id,
    user: r.user?.name || "[Deleted User]",
    userMobile: r.user?.mobile_number || "",
    lat: r.lat,
    lng: r.lng,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    status: r.status,
    hospital: r.hospital,
  }));


   // Rendering the main content of the page
  return (
    <main className="flex flex-col justify-center gap-8">

      {/* RequestType component for filtering requests */}
      <RequestType />

      {/* RequestEntry component for displaying the table of requests */}
      <RequestEntry entries={requests} subHref="requests" />

      {/* Map component for displaying a map based on request coordinates */}
      <div className="relative self-center">
        <Map
          coord={requests.map((r) => ({
            lat: r.lat,
            lng: r.lng,
            hospital: r.hospital,
          }))}
          zoom={11}
        />
      </div>
    </main>
  );
}
