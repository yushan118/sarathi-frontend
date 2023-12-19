import Link from "next/link";

export interface IRequestEntry {
  id: string;
  user: string;
  lat: number;
  lng: number;
}

export default async function RequestEntry({
  entry,
  subHref,
}: {
  entry: IRequestEntry;
  subHref: string;
}) {
  const locationInfo: {
    address: { road: string; suburb: string; town: string; county: string };
  } = await fetch(
    `https://geocode.maps.co/reverse?lat=${entry.lat}&lon=${entry.lng}`,
  ).then(async (res) => {
    const json = await res.json();
    return json;
  });

  return (
    <li className="hover:underline">
      <Link href={`${subHref}/${entry.id}`}>
        {entry.user} requested for ambulance at{" "}
        {locationInfo.address.road ? locationInfo.address.road + ", " : ""}
        {locationInfo.address.suburb ? locationInfo.address.suburb + ", " : ""}
        {locationInfo.address.town ? locationInfo.address.town + ", " : ""}
        {locationInfo.address.county || ""}
      </Link>
    </li>
  );
}
