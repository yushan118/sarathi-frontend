"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export interface IRequestEntry {
  id: string;
  user: string;
  userMobile: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  hospital?: string;
}

function formatDateString(inputDateString: string) {
  return dayjs(inputDateString).format("DD/MM/YYYY hh:mm:ss A");
}

function BookingRow({
  entry,
  hideCurrentStatus,
  subHref,
}: {
  entry: IRequestEntry;
  hideCurrentStatus?: boolean;
  subHref: string;
}) {
  return (
    <tr className="border-b-2 font-medium dark:border-[#E7E8EA]">
      <td className="p-4">{entry.id}</td>
      <td className="p-4">
        <Link href={`/user/${entry.userMobile}`} className="hover:underline">
          {entry.user}
        </Link>
      </td>
      <td className="p-4">{formatDateString(entry.createdAt)}</td>
      <td className="p-4">{formatDateString(entry.updatedAt)}</td>
      {!hideCurrentStatus && <td>{entry.status}</td>}
      <td className="p-4">
        <Link href={`${subHref}/${entry.id}`} className="hover:underline">
          View Details
        </Link>
      </td>
    </tr>
  );
}

export default function RequestEntry({
  entries,
  hideCurrentStatus,
  subHref,
}: {
  entries: IRequestEntry[];
  hideCurrentStatus?: boolean;
  subHref: string;
}) {
  const [type] = useQueryState("type");

  const [entriesToShow, setEntriesToShow] = useState<IRequestEntry[]>([]);

  useEffect(() => {
    setEntriesToShow((_cur) => {
      if (!type) return entries;
      return entries.filter((e) => e.status == type);
    });
  }, [type]);

  return (
    <table className="min-w-full border-2 border-[#E7E8EA] text-left text-sm font-light">
      <thead className="border-b-2 font-medium dark:border-[#E7E8EA]">
        <tr>
          <th className="p-4">ID</th>
          <th className="p-4">User</th>
          <th className="p-4">Ordered at</th>
          <th className="p-4">Last updated at</th>
          {!hideCurrentStatus && <th>Current status</th>}
        </tr>
      </thead>
      <tbody>
        {entriesToShow.map((entry) => (
          <BookingRow
            key={entry.id}
            entry={entry}
            hideCurrentStatus={hideCurrentStatus}
            subHref={subHref}
          />
        ))}
      </tbody>
    </table>
  );
}
