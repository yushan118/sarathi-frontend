"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";

export interface IMenuEntry {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export default function MenuEntry({ entry }: { entry: IMenuEntry }) {
  const segment = useSelectedLayoutSegment();
  const entrySegment = entry.href.split("/");
  const isCurrentSegment = segment == entrySegment[2];

  return (
    <Link href={entry.href}>
      <button
        className={twMerge(
          "flex w-full items-center rounded-2xl px-8 py-3 text-white outline-none",
          isCurrentSegment && "bg-white font-bold text-[#5041BC]",
        )}
      >
        <div className="flex w-[40px] justify-center">{entry.icon}</div>
        {entry.title}
      </button>
    </Link>
  );
}
