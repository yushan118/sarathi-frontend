"use client";

// Importing necessary modules and components
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";

// Defining the shape of the menu entry
export interface IMenuEntry {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// Functional component for a menu entry
export default function MenuEntry({ entry }: { entry: IMenuEntry }) {

  // Using Next.js navigation hook to get the currently selected layout segment
  const segment = useSelectedLayoutSegment();

  // Extracting individual segments from the entry's href
  const entrySegment = entry.href.split("/");

  // Checking if the current segment matches the entry's segment
  const isCurrentSegment = segment == entrySegment[2];

  return (

    // Using Next.js Link component for client-side navigation
    <Link href={entry.href}>

      {/* Button component for the menu entry */}
      <button
        className={twMerge(

          // Using Tailwind CSS classes for styling the button
          "flex w-full items-center rounded-2xl px-8 py-3 text-white outline-none",

           // Conditional styling based on whether the entry is the current segment
          isCurrentSegment && "bg-white font-bold text-[#5041BC]",
        )}
      >
        {/* Container for the icon with styling */} 
        <div className="flex w-[40px] justify-center">{entry.icon}</div>

        {/* Displaying the title of the menu entry */}
        {entry.title}
      </button>
    </Link>
  );
}
