import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import Map from "../_components/Map";
import { bookingStatuses } from "@/constants/booking";
import ApproveBtn from "./ApproveBtn";
import AcceptBtn from "./AcceptBtn";
import OnTheWayBtn from "./OnTheWayBtn";
import PickedBtn from "./PickedBtn";
import ArrivedBtn from "./ArrivedBtn";

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

export default async function RequestPage({
  id,
  viewer,
}: {
  id: string;
  viewer: "Admin" | "Ambulance";
}) {
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

  if (requestDetails.length == 0) {
    notFound();
  }

  let locationInfo:
    | {
        address: { road: string; suburb: string; town: string; county: string };
      }
    | undefined = undefined;

  try {
    locationInfo = await fetch(
      `https://geocode.maps.co/reverse?lat=${requestDetails.lat}&lon=${requestDetails.lng}`,
      {
        cache: "no-cache",
      },
    ).then((res) => res.json());
  } catch {}

  return (
    <main className="flex flex-col justify-center gap-8">
      <Link href="." className="flex w-max items-center gap-1 hover:underline">
        <IoIosArrowBack />
        Back
      </Link>

      <div className="flex flex-wrap gap-10">
        <DetailsEntry
          details1={`Name: ${requestDetails.user.name}`}
          details2={`Contact no: ${requestDetails.contact_number}`}
        />
        <DetailsEntry
          details1={
            locationInfo
              ? `Address: ${
                  locationInfo.address.road
                    ? locationInfo.address.road + ", "
                    : ""
                }${
                  locationInfo.address.suburb
                    ? locationInfo.address.suburb + ", "
                    : ""
                }${
                  locationInfo.address.town
                    ? locationInfo.address.town + ", "
                    : ""
                }${locationInfo.address.county || ""}`
              : ""
          }
          details2={`Created at: ${dayjs(requestDetails.createdAt).format(
            "DD/MM/YYYY hh:mm:ss A",
          )}`}
        />
        <DetailsEntry
          details1={`Status: ${requestDetails.status}`}
          details2={
            bookingStatuses.find((s) => s.value == requestDetails.status)
              ?.info || ""
          }
        />
      </div>

      {viewer == "Admin" &&
        requestDetails.status == bookingStatuses[0].value && (
          <ApproveBtn id={id} />
        )}
      {viewer == "Ambulance" &&
        requestDetails.status == "Approved by admin" && <AcceptBtn id={id} />}
      {viewer == "Ambulance" &&
        requestDetails.status == "Accepted by ambulance" && (
          <OnTheWayBtn id={id} />
        )}
      {viewer == "Ambulance" &&
        requestDetails.status == "Ambulance on the way" && (
          <PickedBtn id={id} />
        )}
      {viewer == "Ambulance" &&
        requestDetails.status == "Picked up by ambulance" && (
          <ArrivedBtn id={id} />
        )}

      <div className="self-center">
        <Map
          coord={[{ lat: requestDetails.lat, lng: requestDetails.lng }]}
          zoom={13}
        />
      </div>
    </main>
  );
}
