import Link from "next/link";

export interface IRequestEntry {
  id: string;
  user: string;
  location: string;
}

export default function RequestEntry({ entry }: { entry: IRequestEntry }) {
  return (
    <li className="hover:underline">
      <Link href={`requests/${entry.id}`}>
        {entry.user} requested for ambulance at {entry.location}
      </Link>
    </li>
  );
}
