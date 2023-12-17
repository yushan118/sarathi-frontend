import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1),
    mobile_number: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

