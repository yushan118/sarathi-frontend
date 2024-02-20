"use server";

// Import necessary dependencies and utilities
import fetchWithAuth from "@/helper/fetch";
import { action } from "@/helper/safe-action";
import { z } from "zod";

// Define the changePassword action
export const changePassword = action(

  // Define the expected input schema using zod
  z.object({
    phone: z.string(),
    password: z.string(),
  }),

  // Define the asynchronous function that will be executed when the action is called
  async (input) => {

     // Make a fetch request to change the password using authentication
    await fetchWithAuth("/ambulance/drivers/password", "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // Send the phone number and new password in the request body
      body: JSON.stringify({ phone: input.phone, password: input.password }),
    });
  },
);
