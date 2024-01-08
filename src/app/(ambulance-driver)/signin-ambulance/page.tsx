"use client";

import { AmbulanceAuthContext } from "@/components/InitializeAmbulanceAuthStore";
import { loginAmbulance } from "@/serverActions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const ambulanceUserContext = useContext(AmbulanceAuthContext);

  async function handleFormSubmission(formData: FormData) {
    const mobile_number = formData.get("mobile_number") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    const loginResponse = await loginAmbulance(mobile_number, password);
    setIsLoading(false);

    toast(loginResponse.message, {
      type: loginResponse.success ? "success" : "error",
      position: "bottom-right",
    });

    if (loginResponse.success) {
      await ambulanceUserContext.update();
      router.replace("/ambulance");
    }
  }

  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">
      <form
        className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8"
        action={handleFormSubmission}
      >
        <p className="mb-2 text-center text-xl font-semibold">
          Ambulance Login
        </p>
        <input
          placeholder="Mobile number"
          name="mobile_number"
          required
          className="border border-gray-400 p-1 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="border border-gray-400 p-1 outline-none"
        />

        <Link
          href="/signin-ambulance/forgot-password"
          className="self-start text-xs"
        >
          Forgot password?
        </Link>

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
