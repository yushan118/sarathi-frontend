"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Form() {
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();

  return (
    <>
      <p className="font-semibold">Enter the phone number:</p>
      <div className="flex items-center justify-center">
        <p className="rounded-l-md bg-gray-200 px-5 py-1 pr-3">+977</p>
        <input
          autoFocus
          className="rounded-r-md py-1 pl-3 outline-none"
          value={mobileNumber}
          onChange={(v) => setMobileNumber(v.target.value)}
        />
      </div>
      <button
        className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
        onClick={() => router.push(`/ambulance-status/list/${mobileNumber}`)}
        disabled={mobileNumber.length != 10}
      >
        Next
      </button>
    </>
  );
}

export default function OthersBookingPage() {
  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">
      <div className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8">
        <Form />
      </div>
    </main>
  );
}
