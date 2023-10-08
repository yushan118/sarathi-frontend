import RequestEntry, { IRequestEntry } from "./RequestEntry";
import LiveMap from "@/../public/images-temp/live-map/map.png";
import LiveMapIcons from "@/../public/images-temp/live-map/icons.png";
import Image from "next/image";

const requests: IRequestEntry[] = [
  {
    user: "Lilly",
    location: "Location1",
  },
  {
    user: "Billy",
    location: "Location2",
  },
  {
    user: "Foobar",
    location: "Location3",
  },
];

export default function AdminRequestsPage() {
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
