"use server";

// Importing necessary modules and utilities
import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { revalidateTag } from "next/cache";
import { z } from "zod";

// Define an action for creating a driver
export const createDriver = action(

  // Input validation schema using Zod
  z.object({
    name: z.string(),
    phone_number: z.string().length(10),
  }),

  // Async function for handling driver creation
  async (input) => {

     // Sending a POST request to the authentication endpoint with the provided data
    await fetchWithAuth("/auth/ambulance/register", "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input.name,
        mobile_number: input.phone_number,
        password: "test",     // Hardcoded password, consider handling securely
      }),
    });

    // Triggering cache revalidation for the "drivers-list" tag after driver creation
    revalidateTag("drivers-list");
  },
);

// Define an action for editing a driver
export const editDriver = action(

  // Input validation schema using Zod
  z.object({
    id: z.string(),
    name: z.string(),
    phone_number: z.string().length(10),
  }),

  // Async function for handling driver editing
  async (input) => {

    // Sending a PATCH request to the ambulance drivers endpoint with the provided data
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

    // Triggering cache revalidation for the "drivers-list" tag after driver editing
    revalidateTag("drivers-list");
  },
);

// Define an action for deleting a driver
export const deleteDriver = action(

  // Input validation schema using Zod
  z.object({
    id: z.string(),
  }),

  // Async function for handling driver deletion
  async (input) => {

     // Sending a DELETE request to the ambulance drivers endpoint with the provided driver ID
    await fetchWithAuth(`/ambulance/drivers/${input.id}`, "ADMIN_", {
      method: "DELETE",
    });

     // Triggering cache revalidation for the "drivers-list" tag after driver deletion
    revalidateTag("drivers-list");
  },
);
