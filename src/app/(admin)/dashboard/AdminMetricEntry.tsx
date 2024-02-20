// Importing Link component from Next.js
import Link from "next/link";

// Importing twMerge function from tailwind-merge library
import { twMerge } from "tailwind-merge";

// Importing icons for displaying arrows
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

// Component for rendering an admin metric entry with a link to view more details
export default function AdminMetricEntry({
  title,
  icon,
  value,
  change,
  href,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
  change: number;
  href: string;
  className?: string;
}) {
  return (

    // Container for the metric entry
    <div
      className={twMerge(
        "flex rounded-2xl border border-gray-400 p-5",
        className,
      )}
    >
       {/* Left side containing metric details */}
      <div className="flex basis-[80%] flex-col">

        {/* Metric title */}
        <p className="text-sm text-gray-500">{title}</p>

        {/* Metric value */}
        <p className="text-2xl font-bold">{value}</p>

        {/* Metric change with arrow icon */}
        <p
          className={twMerge(
            "mt-1 flex items-center gap-1 text-sm",
            change > 0 ? "text-[#6AD2A0]" : "text-red-400",
          )}
        >

          {/* Display arrow icon based on positive or negative change */}
          {change > 0 ? (
            <BsFillArrowUpRightCircleFill className="inline-block" />
          ) : (
            <BsFillArrowDownRightCircleFill className="inline-block" />
          )}

          {/* Display '+' for positive change */}
          {change > 0 && "+"}

          {/* Display percentage change */}
          {change}%
        </p>
      </div>

      {/* Right side containing icon and link to view more */}
      <div className="flex flex-col items-center justify-between">

        {/* Display provided icon */}
        {icon}

        {/* Link to view more with hover effect */}
        <Link
          href={href}
          className="whitespace-nowrap text-sm text-[#5041BC] hover:underline"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
