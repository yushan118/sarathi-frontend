  "use client";

  // Importing necessary components and functions from specified paths
  import { AdminAuthContext } from "@/components/InitializeAdminAuthStore";
  import { AuthContext } from "@/components/InitializeAuthStore";
  import { logout } from "@/serverActions/auth";
  import { useContext } from "react";
  import { toast } from "react-toastify";

  // Component for rendering a logout button
  export default function LogoutButton() {

    // Accessing authentication contexts for regular users and admin users
    const userContext = useContext(AuthContext);
    const adminUserContext = useContext(AdminAuthContext);

    return (

      // Button triggering the logout process on click  
      <button
        className="rounded-full bg-[#FF5757] px-8 py-2 text-xl font-bold text-white"
        onClick={async () => {

          // Display a toast indicating successful logout
          toast("Logged out successfully", {
            type: "success",
            position: "bottom-right",
          });
          await logout();   // Perform logout operation
          await userContext.update();   // Update the regular user context after logout
          await adminUserContext.update();    // Update the admin user context after logout
        }}
      >
        Log Out
      </button>
    );
  }
