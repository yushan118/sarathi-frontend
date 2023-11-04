import RequestEntry, { IRequestEntry } from "./RequestEntry";
import LiveMap from "@/../public/images-temp/live-map/map.png";
import LiveMapIcons from "@/../public/images-temp/live-map/icons.png";
import Image from "next/image";
import { cookies } from "next/headers";

export default async function AdminRequestsPage() {
  const cookieStore = cookies();
  const requestsListRes = await fetch(`${process.env.API_URL}/bookings/all`, {
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  });
  const requestsList = await requestsListRes.json();
  const requests: IRequestEntry[] = requestsList.map((r: any) => ({
    id: r._id,
    user: r.user.name,
    lat: r.lat,
    lng: r.lng,
  }));

  return (
    <main className="flex flex-col justify-center gap-8">
      <ul className="list-disc">
        {requests.map((request) => (
          <RequestEntry key={request.user} entry={request} />
        ))}
      </ul>
      <div className="relative self-center">
        <Image src={LiveMap} alt="Live Map" />
        <Image
          src={LiveMapIcons}
          alt="Live Map Icons"
          className="absolute left-0 top-12"
        />
      </div>
    </main>
  );
}
