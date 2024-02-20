// Importing necessary modules and components
import { cookies } from "next/headers";

// Assuming this is a custom component
import TimelineClient from "./TimelineClient";
import DayJS from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJSTimezone from "dayjs/plugin/timezone";
import DayJSRelativeTime from "dayjs/plugin/relativeTime";


// Extending DayJS with necessary plugins
DayJS.extend(DayJSUtc);
DayJS.extend(DayJSTimezone);
DayJS.extend(DayJSRelativeTime);

// Main component for displaying status timeline
export default async function StatusTimeline({ id }: { id: string }) {

  // Getting cookies from next/headers
  const cookieStore = cookies();

  // Fetching booking details from the API
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());


  // Displaying the status and timeline entries
  return (
    <div className="flex flex-col items-center justify-center">

      {/* Displaying the current status */}
      <p className="mb-8 text-center">Status: {requestDetails.status}</p>

    {/* Rendering the TimelineClient component with timeline entries */}
      <TimelineClient
        entries={[

          // Displaying the creation time with timezone conversion
          `Created at ${DayJS(requestDetails.createdAt)
            .tz("Asia/Kathmandu")
            .format("YYYY MMM DD, ddd  hh:mm:ss A")}`,

            // Displaying each timeline entry with status and time
          ...(requestDetails.timeline?.map(
            (t: any) =>
              `${t.status} at ${DayJS(t.at)
                .format("YYYY MMM DD, ddd  hh:mm:ss A")}`,
          ) || []),
        ]}
      />
    </div>
  );
}
