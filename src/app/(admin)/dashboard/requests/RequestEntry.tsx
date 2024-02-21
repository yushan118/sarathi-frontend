"use client";


// Importing necessary dependencies and components
import Link from "next/link";
import dayjs from "dayjs";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";


// Interface defining the structure of a request entry
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

// Helper function to format a date string using the dayjs library
function formatDateString(inputDateString: string) {
  return dayjs(inputDateString).format("DD/MM/YYYY hh:mm:ss A");
}

// Subcomponent representing a row in the request entry table
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

        {/* Link to the user's profile based on their mobile number */}
        <Link href={`/user/${entry.userMobile}`} className="hover:underline">
          {entry.user}
        </Link>
      </td>
      <td className="p-4">{formatDateString(entry.createdAt)}</td>
      <td className="p-4">{formatDateString(entry.updatedAt)}</td>
      {!hideCurrentStatus && <td>{entry.status}</td>}
      <td className="p-4">

        {/* Link to view details of the specific request entry */}
        <Link href={`${subHref}/${entry.id}`} className="hover:underline">
          View Details
        </Link>
      </td>
    </tr>
  );
}

// Main RequestEntry component
export default function RequestEntry({
  entries,
  hideCurrentStatus,
  subHref,
}: {
  entries: IRequestEntry[];
  hideCurrentStatus?: boolean;
  subHref: string;
}) {

   // Using the useQueryState hook to get the 'type' query parameter from the URL
  const [type] = useQueryState("type");

   // State to store the entries to be displayed based on the selected request type
  const [entriesToShow, setEntriesToShow] = useState<IRequestEntry[]>([]);


  // Effect to update the displayed entries when the 'type' parameter changes
  useEffect(() => {
    setEntriesToShow((_cur) => {
      if (!type) return entries;

      // Filtering entries based on the selected request type
      return entries.filter((e) => e.status == type);
    });
  }, [type]);


  // Rendering the table with headers and rows
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

        {/* Mapping through and rendering each entry row using the BookingRow component */}
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
