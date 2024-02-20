"use client";

// Importing necessary modules and components
import { useState } from "react";
import { useRouter } from "next/navigation";     // Assuming this is a correct import for Next.js


// Functional component for the form
function Form() {

  // State for storing the mobile number input
  const [mobileNumber, setMobileNumber] = useState("");

  // Getting the router from Next.js for navigation
  const router = useRouter();

  return (
    <>

    {/* Prompt for entering the phone number */}
      <p className="font-semibold">Enter the phone number:</p>
      <div className="flex items-center justify-center">

        {/* Displaying the country code */}
        <p className="rounded-l-md bg-gray-200 px-5 py-1 pr-3">+977</p>

        {/* Input field for the mobile number */}
        <input
          autoFocus
          className="rounded-r-md py-1 pl-3 outline-none"
          value={mobileNumber}
          onChange={(v) => setMobileNumber(v.target.value)}
        />
      </div>

      {/* Button for navigating to the next page with the entered mobile number */}
      <button
        className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
        onClick={() => router.push(`/ambulance-status/list/${mobileNumber}`)}
        disabled={mobileNumber.length != 10}       // Disable the button if the mobile number length is not equal to 10
      >
        Next
      </button>
    </>
  );
}


// Main component for the others booking page
export default function OthersBookingPage() {
  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">

      {/* Container for the form */}
      <div className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8">

        {/* Rendering the Form component */}
        <Form />
      </div>
    </main>
  );
}
