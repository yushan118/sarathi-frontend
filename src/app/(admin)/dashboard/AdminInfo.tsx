// Importing Image component from Next.js
import Image from "next/image";

// Importing the public avatar image
import PublicAvatar from "@/../public/images/public_avatar.png";

// Importing the function to get the authenticated admin user
import { getAuthenticatedAdminUser } from "@/serverActions/auth";

// Importing the redirect function from Next.js for navigation
import { redirect } from "next/navigation";

// Async function to display admin information
export default async function AdminInfo() {

  // Get the authenticated admin user
  const adminUser = await getAuthenticatedAdminUser();

  // If admin user is not authenticated, redirect to the admin sign-in page
  if (!adminUser) {
    redirect("/signin-admin");
  }

  // Display admin information
  return (
    <div className="flex items-center gap-3">

      {/* Display admin avatar using the Image component */}
      <Image
        src={PublicAvatar}
        width={80}
        className="rounded-full"
        alt="Avatar"
      />

      {/* Display admin name and position */}
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-[#54657E]">{adminUser.name}</p>
        <p>Position: Admin</p>
      </div>
    </div>
  );
}
