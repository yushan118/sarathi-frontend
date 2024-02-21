// Importing the BookingsList component from the specified file
import { getAuthenticatedUser } from "@/serverActions/auth";
import BookingsList from "../BookingsList";
import { redirect } from "next/navigation";

// MyBookingsPage component definition
export default async function MyBookingsPage() {
  // Checking if the user is logged in
  const currentUser = await getAuthenticatedUser();
  if (!currentUser) {
    redirect("/signin-admin");
  }

  return (
    // Container with margin, padding, and centered content vertically
    <div className="mx-auto py-8">
      {/* Rendering the BookingsList component */}
      <BookingsList />
    </div>
  );
}
