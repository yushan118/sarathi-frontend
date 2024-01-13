import Link from "next/link";
import dayjs from "dayjs";

export interface IRequestEntry {
  id: string;
  user: string;
  userMobile: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

function formatDateString(inputDateString: string) {
  return dayjs(inputDateString).format("DD/MM/YYYY hh:mm:ss A");
}

function BookingRow({ entry }: { entry: IRequestEntry }) {
  return (
    <tr>
      <td>
        <Link
          href={`/user/${entry.userMobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {entry.user}
        </Link>
      </td>
      <td>{formatDateString(entry.createdAt)}</td>
      <td>{formatDateString(entry.updatedAt)}</td>
      <td>{entry.status}</td>
      <td>
        <Link
          href={`/dashboard/requests/${entry.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          View Details
        </Link>
      </td>
    </tr>
  );
}

export default function RequestEntry({
  entries,
}: {
  entries: IRequestEntry[];
}) {
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b font-medium dark:border-neutral-500">
        <tr>
          <th>User</th>
          <th>Ordered at</th>
          <th>Last updated at</th>
          <th>Current status</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <BookingRow key={entry.id} entry={entry} />
        ))}
      </tbody>
    </table>
  );
}
