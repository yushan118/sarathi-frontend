"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendOTP, signupUser } from "./server-actions";
import { useAction } from "next-safe-action/hook";
import { toast } from "react-toastify";
import { login } from "@/serverActions/auth";
import { useContext, useState } from "react";
import { AuthContext } from "@/components/InitializeAuthStore";
import { useRouter } from "next/navigation";
import { signupSchema } from "./types";
import Image from "next/image";
import OTPMobileImg from "@/../public/images/otp-mobile.png";
import { twMerge } from "tailwind-merge";

function Form({ randomOTP }: { randomOTP: string }) {
  const userContext = useContext(AuthContext);
  const router = useRouter();

  const { control, watch, handleSubmit, getValues } = useForm<
    z.infer<typeof signupSchema>
  >({
    resolver: zodResolver(signupSchema),
  });

  const { execute, status } = useAction(signupUser, {
    onSuccess: async (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      await login(getValues("mobile_number"), getValues("password"));
      await userContext.update();
      toast.success("Registration successful!");
      router.replace("/");
    },
  });

  const { execute: executeOTP } = useAction(sendOTP);

  const onSubmit: SubmitHandler<z.infer<typeof signupSchema>> = (data) => {
    console.log(">>>> OTP:", randomOTP);
    executeOTP({ otp: randomOTP, mobile_number: data.mobile_number });
    setShowOTPPopup(true);
  };

  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [isIncorrectOTP, setIsIncorrectOTP] = useState(false);

  return (
    <>
      <p className="mb-1 text-xl font-bold">Sign up</p>
      <p className="font-semibold">Enter your name:</p>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <input
              className="rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400"
              {...field}
            />
            {!!fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <p className="font-semibold">Enter your phone number:</p>
      <Controller
        control={control}
        name="mobile_number"
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <p className="rounded-l-md bg-gray-200 px-5 py-1 pr-3">+977</p>
              <input
                className="rounded-r-md py-1 pl-3 outline-none"
                {...field}
              />
            </div>
            {!!fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <p className="font-semibold">Enter your password:</p>
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <input
              type="password"
              className="rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400"
              {...field}
            />
            {!!fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <p className="font-semibold">Confirm password:</p>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <div className="flex flex-col">
            <input
              type="password"
              className="rounded-md rounded-r-md border border-gray-300 py-1 pl-3 outline-none transition-colors focus:border-gray-400"
              {...field}
            />
            {!!fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <button
        className="mt-1 flex items-center justify-center self-end disabled:text-gray-400"
        disabled={
          !watch("mobile_number") ||
          watch("mobile_number").length != 10 ||
          status == "executing"
        }
        onClick={handleSubmit(onSubmit)}
      >
        {status == "executing" && (
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
        Sign up
      </button>

      {/* OTP Popup */}
      {showOTPPopup && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-8 drop-shadow-2xl">
            <p className="text-center text-2xl">
              OTP Sent to{" "}
              <span className="font-bold">
                +977 {getValues("mobile_number")}
              </span>
            </p>
            <Image
              src={OTPMobileImg}
              alt="OTP"
              width={200}
              className="mx-auto"
            />
            <p className="mt-4">
              Please confirm your mobile number by entering the OTP sent to your
              phone:
            </p>
            <div className="flex w-full flex-col items-center justify-center">
              <input
                type="text"
                className={twMerge(
                  "mx-auto mt-2 w-[8ch] border border-gray-400 p-2 text-center font-mono text-2xl outline-none",
                  isIncorrectOTP && "border-2 border-red-500",
                )}
                maxLength={6}
                onChange={(e) => {
                  const currentOTPInput = e.target.value;
                  setIsIncorrectOTP(false);
                  if (currentOTPInput.length == 6) {
                    if (currentOTPInput == randomOTP) {
                      execute(getValues());
                      return;
                    } else {
                      setIsIncorrectOTP(true);
                    }
                  }
                }}
              />
              {isIncorrectOTP && (
                <p className="mt-2 font-bold text-red-500">Invalid OTP!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function SignUp() {
  const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();

  return (
    <main className="container flex flex-grow flex-col items-center justify-center py-8">
      <div className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8">
        <Form randomOTP={randomOTP} />
      </div>
    </main>
  );
}
