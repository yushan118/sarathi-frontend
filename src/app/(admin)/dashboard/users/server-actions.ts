"use server";

import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const editUser = action(
  z.object({
    id: z.string(),
    name: z.string(),
    phone_number: z.string().length(10),
  }),
  async (input) => {
    await fetchWithAuth("/user/list", "ADMIN_", {
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
    revalidateTag("users-list");
  },
);

export const suspendUser = action(
  z.object({
    id: z.string(),
    action: z.enum(["suspend", "unsuspend"]),
  }),
  async (input) => {
    await fetchWithAuth(`/user/${input.id}`, "ADMIN_", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: input.action,
      }),
    });
    revalidateTag("users-list");
  },
);
