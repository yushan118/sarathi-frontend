import { bookingStatuses } from "@/constants/booking";
import { cookies } from "next/headers";

export default async function StatusInfo({ id }: { id: string }) {
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
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-3xl font-bold">
        {bookingStatuses.find((s) => s.value == requestDetails.status)?.info ||
          requestDetails.status}
      </p>
      <p className="text-center">Status: {requestDetails.status}</p>
    </div>
  );
}
