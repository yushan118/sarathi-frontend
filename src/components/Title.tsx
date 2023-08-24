import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Title(props: { className?: string }) {
  return (
    <Link
      href="/"
      className={twMerge("text-4xl font-semibold uppercase", props.className)}
    >
      <p>
        Sa<span className="text-[#F31559]">rathi</span>
      </p>
    </Link>
  );
}
