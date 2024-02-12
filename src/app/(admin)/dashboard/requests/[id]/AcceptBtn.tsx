"use client";

import { useState } from "react";
import { acceptRequest } from "./server-actions";
import { hospitals } from "@/constants/hospitals";

const hospitalsList = Object.keys(hospitals);

export default function AcceptBtn({
  id,
  bookingContact,
}: {
  id: string;
  bookingContact: string;
}) {
  const [hospital, setHospital] = useState("");

  return (
    <form
      className="flex flex-col items-center gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        await acceptRequest(id, hospital, bookingContact);
      }}
    >
      <select
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
        className="p-2 outline-none"
      >
        <option defaultChecked disabled value="">
          Select a hospital
        </option>
        {hospitalsList.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <button
        disabled={hospital == ""}
        className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white disabled:bg-gray-300"
      >
        Accept the request
      </button>
    </form>
  );
}
