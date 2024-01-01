import RequestEntry, { IRequestEntry } from "./RequestEntry";
import { cookies } from "next/headers";
import Map from "./_components/Map";

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
    lat: r.lat,
    lng: r.lng,
  }));

  return (
    <main className="flex flex-col justify-center gap-8">
      <ul className="list-disc">
        {requests.map((request) => (
          <RequestEntry key={request.id} entry={request} subHref="requests" />
        ))}
      </ul>
      <div className="relative self-center">
        <Map
          coord={requests.map((r) => ({ lat: r.lat, lng: r.lng }))}
          zoom={11}
        />
      </div>
    </main>
  );
}
