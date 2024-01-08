"use client";

import { useAction } from "next-safe-action/hook";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "./server-actions";

export default function ForgotPasswordPage() {
  type Step = "phone" | "otp" | "new-password";
  const [currentStep, setCurrentStep] = useState<Step>("phone");

  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { execute, status } = useAction(changePassword, {
    onSuccess: () => {
      toast.success(
        "Password changed successfully! You may login with new credentials now",
      );
      router.push("/signin-ambulance");
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="bg-gray-100 p-8">
        {/* Phone */}
        {currentStep == "phone" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p>Enter your phone number:</p>
              <input
                type="text"
                className="border border-gray-200 p-2 outline-none"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <button
              className="rounded-md border border-gray-200 p-2 outline-none hover:bg-gray-200"
              onClick={() => setCurrentStep("otp")}
            >
              Send OTP
            </button>
          </div>
        )}

        {/* OTP */}
        {currentStep == "otp" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p>Enter the OTP sent to your number:</p>
              <input
                type="text"
                className="border border-gray-200 p-2 outline-none"
              />
            </div>
            <button
              className="rounded-md border border-gray-200 p-2 outline-none hover:bg-gray-200"
              onClick={() => setCurrentStep("new-password")}
            >
              Verify
            </button>
          </div>
        )}

        {/* New Password */}
        {currentStep == "new-password" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p>Enter your new password:</p>
              <input
                type="text"
                className="border border-gray-200 p-2 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="rounded-md border border-gray-200 p-2 outline-none hover:bg-gray-200 disabled:text-gray-200"
              onClick={() => execute({ phone: number, password: password })}
              disabled={status == "executing"}
            >
              {status == "executing" ? "..." : "Change"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
