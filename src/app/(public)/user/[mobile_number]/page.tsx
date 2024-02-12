import { Spinner } from "@/components/Spinner";
import { Suspense } from "react";
import dayjs from "dayjs";
import Link from "next/link";

async function Details({ mobile_number }: { mobile_number: string }) {
  let userDetailsRes = await fetch(
    process.env.API_URL! + "/user/details/" + mobile_number,
    {
      cache: "no-cache",
      next: {
        tags: ["user-details", mobile_number],
      },
    },
  );
  if (!userDetailsRes.ok) {
    return (
      <p className="py-8 text-center">
        User with given mobile number does not exist
      </p>
    );
  }
  const userDetails: {
    _id: string;
    is_suspended: boolean;
    mobile_number: string;
    name: string;
  } = await userDetailsRes.json();

  const bookingsList: {
    _id: string;
    case_sensitivity: string;
    contact_number: string;
    createdAt: string;
    status: string;
    lat: number;
    lng: number;
  }[] = await fetch(process.env.API_URL! + "/bookings/list/" + mobile_number, {
    cache: "no-cache",
    next: {
      tags: ["past-bookings", mobile_number],
    },
  }).then((res) => res.json());

  return (
    <div className="my-2 flex flex-col gap-6">
      <div className="self-center text-center">
        <p className="text-2xl font-semibold">{userDetails.name}</p>
        <p>{userDetails.mobile_number}</p>
      </div>
      <div>
        <p className="text-3xl font-semibold">
          Past bookings ({bookingsList.length})
        </p>
        <ul className="mt-2 list-inside list-disc">
          {bookingsList.map((b) => (
            <li key={b._id} className="hover:underline">
              <Link
                href={`/ambulance-status/${b._id}`}
              >
                Ordered ambulance at{" "}
                {`${dayjs(b.createdAt).format("DD/MM/YYYY hh:mm:ss A")}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function UserProfilePage({
  params,
}: {
  params: { mobile_number: string };
}) {
  return (
    <main className="container flex-1">
      <Suspense
        fallback={
          <div className="mt-16 flex h-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Details mobile_number={params.mobile_number} />
      </Suspense>
    </main>
  );
}
