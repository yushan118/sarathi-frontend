"use client";

import { AdminAuthContext } from "@/components/InitializeAdminAuthStore";
import { AuthContext } from "@/components/InitializeAuthStore";
import { logout } from "@/serverActions/auth";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const userContext = useContext(AuthContext);
  const adminUserContext = useContext(AdminAuthContext);

  return (
    <button
      className="rounded-full bg-[#FF5757] px-8 py-2 text-xl font-bold text-white"
      onClick={async () => {
        toast("Logged out successfully", {
          type: "success",
          position: "bottom-right",
        });
        await logout();
        await userContext.update();
        await adminUserContext.update();
      }}
    >
      Log Out
    </button>
  );
}
