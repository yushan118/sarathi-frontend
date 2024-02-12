"use client";

import { useQueryState } from "nuqs";
import { twMerge } from "tailwind-merge";

const availableTypes = [
  "Waiting to be approved by admin",
  "Accepted by ambulance",
  "Picked up by ambulance",
  "Arrived on hospital",
];

export default function RequestType() {
  const [type, setType] = useQueryState("type");

  return (
    <div className="flex gap-6 border-b-2 border-b-[#EFF0F3] pb-2">
      <button
        className={twMerge(
          "relative font-semibold text-gray-500",
          type == null && "font-bold text-black",
        )}
        onClick={() => setType(null)}
      >
        All
        {type == null && (
          <div className="absolute -bottom-3 left-0 w-full border-2 border-[#1E82AD]" />
        )}
      </button>
      {availableTypes.map((t) => (
        <button
          key={t}
          className={twMerge(
            "relative whitespace-nowrap font-semibold text-gray-500",
            type == t && "font-bold text-black",
          )}
          onClick={() => setType(t)}
        >
          {t}
          {type == t && (
            <div className="absolute -bottom-3 left-0 w-full border-2 border-[#1E82AD]" />
          )}
        </button>
      ))}
    </div>
  );
}
