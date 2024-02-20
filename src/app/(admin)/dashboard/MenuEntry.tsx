"use client";

// Importing necessary components and functions from specified paths  
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { twMerge } from "tailwind-merge";

// Interface defining the structure of a menu entry
export interface IMenuEntry {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// Component for rendering a menu entry with a link
export default function MenuEntry({ entry }: { entry: IMenuEntry }) {

  // Get the currently selected layout segment using next/navigation
  const segment = useSelectedLayoutSegment();

  // Extract the segment from the entry's href
  const entrySegment = entry.href.split("/");

  // Check if the entry's segment matches the currently selected segment
  const isCurrentSegment = segment == entrySegment[2];

  return (

    // Link component wrapping the menu entry button
    <Link href={entry.href}>

      {/* Button representing the menu entry */}
      <button
        className={twMerge(
          "flex w-full items-center rounded-2xl px-8 py-3 text-white outline-none",
          isCurrentSegment && "bg-white font-bold text-[#5041BC]",                  // Styling for the button
        )}
      >

        {/* Container for the icon */}
        <div className="flex w-[40px] justify-center">{entry.icon}</div>

        {/* Display the title of the menu entry */}
        {entry.title}
      </button>
    </Link>
  );
}
