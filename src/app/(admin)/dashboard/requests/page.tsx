import RequestEntry, { IRequestEntry } from "./RequestEntry";
import { cookies } from "next/headers";
import Map from "./_components/Map";
import RequestType from "./RequestType";

export default async function AdminRequestsPage() {
  const cookieStore = cookies();
  const requestsListRes = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  });
  const requestsList = await requestsListRes.json();
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

  return (
    <main className="flex flex-col justify-center gap-8">
      <RequestType />
      <RequestEntry entries={requests} subHref="requests" />
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
