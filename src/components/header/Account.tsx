"use client";

import Link from "next/link";
import { useContext } from "react";
import { BiSolidUser } from "react-icons/bi";
import { AuthContext } from "../InitializeAuthStore";
import { logout } from "@/serverActions/auth";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../InitializeAdminAuthStore";

function AccountLogin() {
  return (
    <Link
      href="/signin"
      className="flex cursor-pointer items-center justify-center rounded-full border border-gray-400 px-3 py-1 font-thin transition-colors hover:bg-gray-200"
    >
      <p>Sign in</p>
    </Link>
  );
}

export default function Account() {
  const userContext = useContext(AuthContext);
  const adminUserContext = useContext(AdminAuthContext);

  return (
    <div className="flex items-center justify-end gap-2">
      <BiSolidUser size={25} />
      {userContext.user ? (
        <div className="flex flex-col">
          <p>{userContext.user.name}</p>
          <button
            onClick={async () => {
              toast("Logged out successfully", {
                type: "success",
                position: "bottom-right",
              });
              await logout();
              await userContext.update();
              await adminUserContext.update();
            }}
            className="text-xs"
          >
            Log out
          </button>
        </div>
      ) : (
        <AccountLogin />
      )}
    </div>
  );
}
