import { cookies } from "next/headers";
import Link from "next/link";
import DayJS from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJSTimezone from "dayjs/plugin/timezone";
import DayJSRelativeTime from "dayjs/plugin/relativeTime";

DayJS.extend(DayJSUtc);
DayJS.extend(DayJSTimezone);
DayJS.extend(DayJSRelativeTime);

async function LocationStr({ lat, lng }: { lat: number; lng: number }) {
  let locationInfo: {
    address: { road: string; suburb: string; town: string; county: string };
  };

  try {
    locationInfo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
    ).then(async (res) => {
      const json = await res.json();
      return json;
    });
  } catch {
    return <span>unknown location</span>;
  }

  return (
    <span>
      {locationInfo.address.road ? locationInfo.address.road + ", " : ""}
      {locationInfo.address.suburb ? locationInfo.address.suburb + ", " : ""}
      {locationInfo.address.town ? locationInfo.address.town + ", " : ""}
      {locationInfo.address.county || ""}
    </span>
  );
}

export default async function BookingsList({ phone }: { phone?: string }) {
  let fetchUrl = "";
  if (!phone) {
    fetchUrl = "/bookings/list/my";
  } else {
    fetchUrl = `/bookings/list/${phone}`;
  }

  const cookieStore = cookies();
  const bookingsList = await fetch(`${process.env.API_URL}${fetchUrl}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

  if (bookingsList.length == 0) {
    return <p>No bookings available</p>;
  }

  return (
    <ul>
      {bookingsList.map((b: any) => {
        const date = DayJS(b.createdAt);
        const dateTimeDiff = DayJS().to(date);

        return (
          <li key={b._id} className="list-disc">
            <Link
              href={`/ambulance-status/${b._id}`}
              className="hover:underline"
            >
              {date.tz("Asia/Kathmandu").format("YYYY MMM DD, ddd  hh:mm:ss A")}{" "}
              ({dateTimeDiff}) at <LocationStr lat={b.lat} lng={b.lng} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
