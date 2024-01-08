"use server";

import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { z } from "zod";

export const changePassword = action(
  z.object({
    phone: z.string(),
    password: z.string(),
  }),
  async (input) => {
    await fetchWithAuth("/ambulance/drivers/password", "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: input.phone, password: input.password }),
    });
  },
);
