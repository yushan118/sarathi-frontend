import { cookies } from "next/headers";
import RequestEntry, {
  IRequestEntry,
} from "@/app/(admin)/dashboard/requests/RequestEntry";
import Map from "@/app/(admin)/dashboard/requests/_components/Map";

export default async function AdminRequestsPage() {
  const cookieStore = cookies();

  const bookings = await fetch(
    `${process.env.API_URL}/bookings/all?status=Approved by admin`,
    {
      cache: "no-cache",
      headers: {
        Authorization: cookieStore.get("AUTH_AMBULANCE_TOKEN")?.value || "",
      },
    },
  ).then((res) => res.json());
  const requests: IRequestEntry[] = bookings.map((r: any) => ({
    id: r._id,
    user: r.user.name,
    lat: r.lat,
    lng: r.lng,
  }));

  return (
    <main className="flex flex-col justify-center gap-8">
      <ul className="list-disc">
        {requests.map((request) => (
          <RequestEntry
            key={request.id}
            entry={request}
            subHref="ambulance/request"
          />
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
