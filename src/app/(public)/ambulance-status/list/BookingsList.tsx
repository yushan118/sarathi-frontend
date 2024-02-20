// Importing necessary modules and components
import { cookies } from "next/headers";
import Link from "next/link";
import DayJS from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJSTimezone from "dayjs/plugin/timezone";
import DayJSRelativeTime from "dayjs/plugin/relativeTime";

// Extending DayJS with necessary plugins
DayJS.extend(DayJSUtc);
DayJS.extend(DayJSTimezone);
DayJS.extend(DayJSRelativeTime);

// Asynchronous function component for displaying a list of bookings
async function LocationStr({ lat, lng }: { lat: number; lng: number }) {

  // Constructing the fetch URL based on the presence of a phone number
  let locationInfo: {
    address: { road: string; suburb: string; town: string; county: string };
  };

  try {

    // Fetching location information from a reverse geocoding API
    locationInfo = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`,
    ).then(async (res) => {
      const json = await res.json();
      return json;
    });
  } catch {

    // Handling errors and displaying a message for unknown location
    return <span>unknown location</span>;
  }

  // Displaying formatted location information
  return (
    <span>
      {locationInfo.address.road ? locationInfo.address.road + ", " : ""}
      {locationInfo.address.suburb ? locationInfo.address.suburb + ", " : ""}
      {locationInfo.address.town ? locationInfo.address.town + ", " : ""}
      {locationInfo.address.county || ""}
    </span>
  );
}

// Asynchronous function component for displaying a list of bookings
export default async function BookingsList({ phone }: { phone?: string }) {

  // Constructing the fetch URL based on the presence of a phone number
  let fetchUrl = "";
  if (!phone) {
    fetchUrl = "/bookings/list/my";
  } else {
    fetchUrl = `/bookings/list/${phone}`;
  }

  // Getting cookies from next/headers
  const cookieStore = cookies();

   // Fetching bookings list from the API
  const bookingsList = await fetch(`${process.env.API_URL}${fetchUrl}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

  // Displaying a message if there are no bookings available
  if (bookingsList.length == 0) {
    return <p>No bookings available</p>;
  }

  // Rendering a list of bookings
  return (
    <ul>
      {bookingsList.map((b: any) => {

        // Extracting date and calculating the relative time difference
        const date = DayJS(b.createdAt);
        const dateTimeDiff = DayJS().to(date);

        // Rendering each booking as a list item with a link
        return (
          <li key={b._id} className="list-disc">
            <Link
              href={`/ambulance-status/${b._id}`}
              className="hover:underline"
            >

              {/* Displaying date, time, and location information */}
              {date.tz("Asia/Kathmandu").format("YYYY MMM DD, ddd  hh:mm:ss A")}{" "}
              ({dateTimeDiff}) at <LocationStr lat={b.lat} lng={b.lng} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
