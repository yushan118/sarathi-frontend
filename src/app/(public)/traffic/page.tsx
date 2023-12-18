import { IRequestEntry } from "@/app/(admin)/dashboard/requests/RequestEntry";
import Map from "@/app/(admin)/dashboard/requests/_components/Map";

export default async function TrafficPage() {
  const requestsListRes = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
  });
  const requestsList = await requestsListRes.json();
  const requests: IRequestEntry[] = requestsList.map((r: any) => ({
    id: r._id,
    user: r.user.name,
    lat: r.lat,
    lng: r.lng,
  }));

  return (
    <div className="my-6 flex flex-col items-center">
      <h1 className="mb-2 text-2xl font-semibold">
        Current bookings traffic status:
      </h1>
      <Map
        coord={requests.map((r) => ({ lat: r.lat, lng: r.lng }))}
        zoom={11}
      />
    </div>
  );
}
