"use server";

// Importing the fetchWithAuth function for authenticated API calls
import fetchWithAuth from "@/helper/fetch";

// Importing the action and revalidateTag functions for server-side actions
import { action } from "@/helper/safe-action";
import { revalidateTag } from "next/cache";

// Importing the zod library for schema validation
import { z } from "zod";

// Server-side action for editing user details
export const editUser = action(

  // Input validation using zod schema
  z.object({
    id: z.string(),
    name: z.string(),
    phone_number: z.string().length(10),
  }),

  // Async function to handle the editUser action
  async (input) => {

    // Making a PATCH request to update user details
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

    // Revalidating the "users-list" cache tag to trigger a re-fetch
    revalidateTag("users-list");
  },
);

// Server-side action for suspending/unsuspending a user
export const suspendUser = action(

  // Input validation using zod schema
  z.object({
    id: z.string(),
    action: z.enum(["suspend", "unsuspend"]),
  }),

  // Async function to handle the suspendUser action
  async (input) => {

    // Making a POST request to suspend/unsuspend a user
    await fetchWithAuth(`/user/${input.id}`, "ADMIN_", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: input.action,
      }),
    });

    // Revalidating the "users-list" cache tag to trigger a re-fetch
    revalidateTag("users-list");
  },
);
