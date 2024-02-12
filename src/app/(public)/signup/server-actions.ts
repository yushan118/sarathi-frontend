"use server";

import { action } from "@/helper/safe-action";
import { signupSchema } from "./types";
import { z } from "zod";

export const signupUser = action(signupSchema, async (input) => {
  const signupRes = await fetch(process.env.API_URL! + "/auth/register", {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name,
      mobile_number: input.mobile_number,
      password: input.password,
    }),
  });
  if (!signupRes.ok) {
    switch (signupRes.status) {
      case 400:
        return {
          success: false as const,
          message: await signupRes.json().then((res) => res.message as string),
        };
      default:
        return {
          success: false as const,
          message: "Something went wrong",
        };
    }
  }
  return { success: true as const };
});

export const sendOTP = action(
  z.object({ otp: z.string(), mobile_number: z.string() }),
  async (input) => {
    await fetch("https://api.sparrowsms.com/v2/sms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: "jMTnvj4bKtTTA6eeSfRm",
        from: "TheAlert",
        to: input.mobile_number,
        text:
          "Hello from sarathiii.com!\n\nPlease enter the following OTP to register: " +
          input.otp,
      }),
    });
  },
);
