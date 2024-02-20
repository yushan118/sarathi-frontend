// Import necessary dependencies and components
"use client";

import { AmbulanceAuthContext } from "@/components/InitializeAmbulanceAuthStore";
import { loginAmbulance } from "@/serverActions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";


// Define the SignIn component
export default function SignIn() {

  // Initialize state for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Get Next.js router and Ambulance authentication context
  const router = useRouter();
  const ambulanceUserContext = useContext(AmbulanceAuthContext);

  // Define the function to handle form submission
  async function handleFormSubmission(formData: FormData) {

    // Extract mobile number and password from form data
    const mobile_number = formData.get("mobile_number") as string;
    const password = formData.get("password") as string;

    // Set loading state to true before making the login request
    setIsLoading(true);

    // Make the login request to the server
    const loginResponse = await loginAmbulance(mobile_number, password);

    // Set loading state back to false after the request is complete
    setIsLoading(false);

    // Show a toast notification based on the login response
    toast(loginResponse.message, {
      type: loginResponse.success ? "success" : "error",
      position: "bottom-right",
    });

    // If login is successful, update the ambulance user context and navigate to the ambulance page
    if (loginResponse.success) {
      await ambulanceUserContext.update();
      router.replace("/ambulance");
    }
  }

   // Render the SignIn component
  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">

      {/* SignIn form */}
      <form
        className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8"
        action={handleFormSubmission}
      >
        <p className="mb-2 text-center text-xl font-semibold">
          Ambulance Login
        </p>

        {/* Input field for mobile number */}
        <input
          placeholder="Mobile number"
          name="mobile_number"
          required
          className="border border-gray-400 p-1 outline-none"
        />

        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="border border-gray-400 p-1 outline-none"
        />
        {/* Forgot password link */}
        <Link
          href="/signin-ambulance/forgot-password"
          className="self-start text-xs"
        >
          Forgot password?
        </Link>
        
        {/* Loading indicator or Sign in button */}
        {isLoading ? (
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
        ) : (
          <button disabled={isLoading}>Sign in</button>
        )}
      </form>
    </main>
  );
}
