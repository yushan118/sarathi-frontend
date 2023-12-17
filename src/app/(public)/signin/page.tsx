"use client";

import { AuthContext } from "@/components/InitializeAuthStore";
import { login } from "@/serverActions/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

function Form() {
  const [currentStep, setCurrentStep] = useState(0);
  function gotoNextStep() {
    setCurrentStep((cur) => cur + 1);
  }

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  function PhoneNumberInput() {
    async function nextHandler() {
      gotoNextStep();
    }

    return (
      <>
        <p className="mb-1 text-xl font-bold">Sign in</p>
        <p className="font-semibold">Enter your phone number:</p>
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
          onClick={nextHandler}
          disabled={mobileNumber.length != 10}
        >
          Next
        </button>
      </>
    );
  }

  function PasswordInput() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const userContext = useContext(AuthContext);

    async function nextHandler() {
      setIsLoading(true);
      const loginResponse = await login(mobileNumber, password);
      setIsLoading(false);

      toast(loginResponse.message, {
        type: loginResponse.success ? "success" : "error",
        position: "bottom-right",
      });

      if (loginResponse.success) {
        await userContext.update();
        router.replace(searchParams.get("redirect") || "/");
      }
    }

    return (
      <>
        <p className="font-semibold">Enter the password:</p>
        <input
          type="password"
          className="rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400"
          value={password}
          onChange={(v) => setPassword(v.target.value)}
          autoFocus
        />
        <button
          className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
          disabled={isLoading || password.length == 0}
          onClick={nextHandler}
        >
          {isLoading && (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-red-400"
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
          Sign in
        </button>
      </>
    );
  }

  switch (currentStep) {
    case 0:
      return <PhoneNumberInput />;
    case 1:
      return <PasswordInput />;
  }
}

export default function SignIn() {
  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">
      <div className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8">
        <Form />
        <Link href="/signup" className="w-max text-sm hover:underline">
          Register here
        </Link>
      </div>
    </main>
  );
}
