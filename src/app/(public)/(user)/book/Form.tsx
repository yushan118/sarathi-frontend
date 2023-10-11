"use client";

import { toast } from "react-toastify";
import { addBooking } from "./serverActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBookingForm({
  defaultContactNumber,
}: {
  defaultContactNumber: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(formData: FormData) {
    const contact_number = formData.get("contact_number") as string;
    const location = formData.get("location") as string;

    setIsLoading(true);
    const addBookingResponse = await addBooking(contact_number, location);
    setIsLoading(false);
    if (!addBookingResponse.success) {
      toast(addBookingResponse.message, { type: "error" });
      return;
    }

    router.push(`/ambulance-status/${addBookingResponse.id}`);
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      action={handleFormSubmit}
    >
      <div className="flex items-center justify-center">
        <p className="rounded-l-xl bg-gray-200 px-5 py-3 pr-3">+977</p>
        <input
          className="remove-arrow rounded-r-xl py-3 pl-3 outline-none"
          placeholder="Your Mobile Number"
          type="number"
          name="contact_number"
          defaultValue={defaultContactNumber}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">Location:</p>
        <input
          placeholder="Enter the location of emergency"
          type="text"
          className="border border-gray-400 p-1 outline-none"
          name="location"
        />
      </div>
      <button
        className="my-4 flex flex-col items-center justify-center gap-1 rounded-3xl bg-[#DB0402] px-10 py-4 font-extrabold text-white disabled:opacity-30"
        disabled={isLoading}
      >
        {isLoading && (
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Book Ambulance
      </button>
    </form>
  );
}
