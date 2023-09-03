"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function PhoneNumberInput(props: { gotoNextStep: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  async function nextHandler() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    props.gotoNextStep();
  }

  return (
    <>
      <p className="mb-1 text-xl font-bold">Sign in</p>
      <p className="font-semibold">Enter your phone number:</p>
      <div className="flex items-center justify-center">
        <p className="rounded-l-md bg-gray-200 px-5 py-1 pr-3">+977</p>
        <input className="rounded-r-md py-1 pl-3 outline-none" />
      </div>
      <button
        className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
        disabled={isLoading}
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
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Next
      </button>
    </>
  );
}

function PhoneOTPInput() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function nextHandler() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    router.replace("/");
  }

  return (
    <>
      <p className="font-semibold">Enter the OTP sent to your number:</p>
      <div className="flex items-center justify-center gap-1">
        <input className="w-8 rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400" />
        <input className="w-8 rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400" />
        <input className="w-8 rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400" />
        <input className="w-8 rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400" />
      </div>
      <button
        className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
        disabled={isLoading}
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
              stroke-width="4"
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

export default function SignIn() {
  const [currentStep, setCurrentStep] = useState(0);
  function gotoNextStep() {
    setCurrentStep((cur) => cur + 1);
  }

  function CurrentStepDiv(props: { currentStep: number }) {
    switch (props.currentStep) {
      case 0:
        return <PhoneNumberInput gotoNextStep={gotoNextStep} />;
      case 1:
        return <PhoneOTPInput />;
    }
  }

  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">
      <div className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8">
        <CurrentStepDiv currentStep={currentStep} />
      </div>
    </main>
  );
}
