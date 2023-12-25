"use server";

import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const createDriver = action(
  z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  }),
  async (input) => {
    await fetchWithAuth("/auth/ambulance/register", "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        mobile_number: input.phone_number,
        password: "test",
      }),
    });
    revalidateTag("drivers-list");
  },
);

export const editDriver = action(
  z.object({
    id: z.string(),
    name: z.string(),
    phone_number: z.string().length(10),
  }),
  async (input) => {
    await fetchWithAuth("/ambulance/drivers", "ADMIN_", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: input.id,
        name: input.name,
        mobile_number: input.phone_number,
      }),
    });
    revalidateTag("drivers-list");
  },
);

export const deleteDriver = action(
  z.object({
    id: z.string(),
  }),
  async (input) => {
    await fetchWithAuth(`/ambulance/drivers/${input.id}`, "ADMIN_", {
      method: "DELETE",
    });
    revalidateTag("drivers-list");
  },
);
