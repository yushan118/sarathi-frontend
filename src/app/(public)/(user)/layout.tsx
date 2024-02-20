// Importing necessary modules and functions
import { redirectWithCurrentCallbackUrl } from "@/helper/auth";
import { getAuthenticatedUser } from "@/serverActions/auth";

// Main layout component for ensuring user authentication
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

   // Attempting to get the authenticated user
  const user = await getAuthenticatedUser();

  // If no user is authenticated, redirect to the sign-in page with the current callback URL
  if (!user) {
    return redirectWithCurrentCallbackUrl("/signin");
  }

  // If the user is authenticated, render the children components
  return <>{children}</>;
}
