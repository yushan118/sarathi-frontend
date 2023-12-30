"use server";

import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const deleteUser = action(
  z.object({
    id: z.string(),
  }),
  async (input) => {
    await fetchWithAuth(`/user/${input.id}`, "ADMIN_", {
      method: "DELETE",
    });
    revalidateTag("users-list");
  },
);
