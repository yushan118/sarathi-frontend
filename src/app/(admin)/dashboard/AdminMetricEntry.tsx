import Link from "next/link";
import { twMerge } from "tailwind-merge";
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

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
    <div
      className={twMerge(
        "flex rounded-2xl border border-gray-400 p-5",
        className,
      )}
    >
      <div className="flex basis-[80%] flex-col">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={twMerge(
            "mt-1 flex items-center gap-1 text-sm",
            change > 0 ? "text-[#6AD2A0]" : "text-red-400",
          )}
        >
          {change > 0 ? (
            <BsFillArrowUpRightCircleFill className="inline-block" />
          ) : (
            <BsFillArrowDownRightCircleFill className="inline-block" />
          )}
          {change > 0 && "+"}
          {change}%
        </p>
      </div>
      <div className="flex flex-col items-center justify-between">
        {icon}
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
