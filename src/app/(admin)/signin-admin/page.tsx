"use client";
// Importing necessary modules and functions
import { AdminAuthContext } from "@/components/InitializeAdminAuthStore";
import { loginAdmin } from "@/serverActions/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

// Component for handling admin sign-in
export default function SignIn() {

  // State to manage loading state during form submission
  const [isLoading, setIsLoading] = useState(false);

  // Next.js router for navigation
  const router = useRouter();

  // Context to manage admin authentication
  const adminUserContext = useContext(AdminAuthContext);

  // Handle form submission
  async function handleFormSubmission(formData: FormData) {

    // Extract email and password from form data
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Set loading state to true
    setIsLoading(true);

    // Call the loginAdmin function for admin authentication
    const loginResponse = await loginAdmin(email, password);

    // Set loading state back to false
    setIsLoading(false);

    // Display a toast message based on the login response
    toast(loginResponse.message, {
      type: loginResponse.success ? "success" : "error",
      position: "bottom-right",
    });

    // If login is successful, update admin user context and navigate to the dashboard
    if (loginResponse.success) {
      await adminUserContext.update();
      router.replace("/dashboard");
    }
  }

  return (

    // Main container for the sign-in form
    <main className="container flex flex-grow flex-col items-center justify-center py-8">

      {/* Sign-in form */}
      <form
        className="flex w-max flex-col gap-2 rounded-md bg-gray-100 p-8"
        action={handleFormSubmission}
      >

        {/* Sign-in form title */}
        <p className="mb-2 text-center text-xl font-semibold">Admin Login</p>

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="border border-gray-400 p-1 outline-none"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="border border-gray-400 p-1 outline-none"
        />

        {/* Loading spinner or sign-in button based on loading state */}
        {isLoading ? (

          // Display a loading spinner while the form is being submitted
          <svg
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>

            {/* Loading spinner SVG content */}
          </svg>
        ) : (

          // Display the sign-in button when not loading
          <button disabled={isLoading}>Sign in</button>
        )}
      </form>
    </main>
  );
}
