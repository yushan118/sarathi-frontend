import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Map from "./Map";

function DetailsEntry({
  details1,
  details2,
}: {
  details1: string;
  details2: string;
}) {
  return (
    <div className="flex min-w-[350px] gap-4 p-3 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="inline-block aspect-square w-[10px] rounded-full bg-[#1152FD]" />
        <div className="inline-block h-[30px] w-[2px] bg-gray-400" />
        <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-500" />
      </div>
      <div className="grid flex-grow grid-cols-1 divide-y">
        <p className="whitespace-nowrap pb-3">{details1}</p>
        <p className="whitespace-nowrap pt-3">{details2}</p>
      </div>
    </div>
  );
}

export default async function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const requestDetails = await fetch(
    `${process.env.API_URL}/bookings/${params.id}`,
    {
      headers: {
        Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
      },
    },
  ).then((res) => res.json());

  if (requestDetails.length == 0) {
    notFound();
  }

  const locationInfo: {
    address: { road: string; suburb: string; town: string; county: string };
  } = await fetch(
    `https://geocode.maps.co/reverse?lat=${requestDetails[0].lat}&lon=${requestDetails[0].lng}`,
  ).then((res) => res.json());

  return (
    <main className="flex flex-col justify-center gap-8">
      <Link href="." className="flex w-max items-center gap-1 hover:underline">
        <IoIosArrowBack />
        Back
      </Link>

      <div className="flex flex-wrap gap-10">
        <DetailsEntry
          details1={`Name: ${requestDetails[0].user.name}`}
          details2={`Contact no: ${requestDetails[0].contact_number}`}
        />
        <DetailsEntry
          details1={`Address: ${locationInfo.address.road}, ${locationInfo.address.suburb}, ${locationInfo.address.town}, ${locationInfo.address.county}`}
          details2={`Created at: ${dayjs(requestDetails[0].createdAt).format(
            "DD/MM/YYYY hh:mm:ss A",
          )}`}
        />
        <DetailsEntry
          details1="Status: Approved"
          details2="Sent to Ambulance Driver"
        />
      </div>

      <div className="self-center">
        <Map lat={requestDetails[0].lat} lng={requestDetails[0].lng} />
      </div>
    </main>
  );
}
