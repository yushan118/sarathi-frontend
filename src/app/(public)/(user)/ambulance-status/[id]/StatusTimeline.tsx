import { cookies } from "next/headers";
import TimelineClient from "./TimelineClient";
import DayJS from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJSTimezone from "dayjs/plugin/timezone";
import DayJSRelativeTime from "dayjs/plugin/relativeTime";

DayJS.extend(DayJSUtc);
DayJS.extend(DayJSTimezone);
DayJS.extend(DayJSRelativeTime);

export default async function StatusTimeline({ id }: { id: string }) {
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
      <p className="mb-8 text-center">Status: {requestDetails.status}</p>

      <TimelineClient
        entries={[
          `Created at ${DayJS(requestDetails.createdAt)
            .tz("Asia/Kathmandu")
            .format("YYYY MMM DD, ddd  hh:mm:ss A")}`,
          ...(requestDetails.timeline?.map(
            (t: any) =>
              `${t.status} at ${DayJS(t.at)
                .tz("Asia/Kathmandu")
                .format("YYYY MMM DD, ddd  hh:mm:ss A")}`,
          ) || []),
        ]}
      />
    </div>
  );
}
