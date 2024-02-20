// Importing functions and components from specified paths
import { getAuthenticatedAdminUser } from "@/serverActions/auth";
import AdminInfo from "./AdminInfo";
import AdminMenu from "./AdminMenu";
import { redirect } from "next/navigation";

// Layout component for the admin dashboard
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Retrieve the authenticated admin user
  const adminUser = await getAuthenticatedAdminUser();

  // If admin user is not authenticated, redirect to the admin sign-in page
  if (!adminUser) {
    redirect("/signin-admin");
  }

  return (

    // Main container for the admin dashboard layout
    <div className="flex min-h-[100dvh]">

      {/* Admin menu on the left side */}
      <AdminMenu className="sticky top-0 h-full min-h-[100dvh] shrink-0 grow-0 basis-[300px]" />

      {/* Right side containing admin info, status, and children components */}
      <div className="flex flex-grow flex-col gap-10 p-8">

        {/* Admin info and status section */}
        <div className="flex items-center justify-between">

          {/* AdminInfo component displaying admin details */}
          <AdminInfo />

          {/* Displaying admin status with a colored indicator */}
          <p>
            Status: Online{" "}
            <span className="ml-1 inline-block aspect-square h-[12px] rounded-full bg-[#71FF01]" />
          </p>
        </div>
        
        {/* Children components rendered within the dashboard layout */}
        {children}
      </div>
    </div>
  );
}
