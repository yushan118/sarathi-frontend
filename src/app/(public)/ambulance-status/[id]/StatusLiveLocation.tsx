import Map from "@/app/(admin)/dashboard/requests/_components/Map";
import { cookies } from "next/headers";

export default async function StatusLiveLocation({ id }: { id: string }) {
  const cookieStore = cookies();
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

  return (
    <div>
      <p className="text-center">Location map:</p>
      <Map
        coord={[{ lat: requestDetails.lat, lng: requestDetails.lng }]}
        zoom={13}
      />
    </div>
  );
}
