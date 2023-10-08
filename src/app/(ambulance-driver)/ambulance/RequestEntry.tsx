import Link from "next/link";

export interface IRequestEntry {
  user: string;
  location: string;
}

export default function RequestEntry({ entry }: { entry: IRequestEntry }) {
  return (
    <li className="hover:underline">
      <Link href="ambulance/1">
        {entry.user} requested for ambulance at {entry.location}
      </Link>
    </li>
  );
}
