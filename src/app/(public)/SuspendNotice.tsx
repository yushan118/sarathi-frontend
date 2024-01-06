"use client";

import { AuthContext } from "@/components/InitializeAuthStore";
import { useContext } from "react";

export default function SuspendNotice() {
  const userContext = useContext(AuthContext);

  if (userContext.user?.isSuspended) {
    return (
      <div className="mb-6 rounded-md bg-red-200 p-6 text-center">
        <p className="text-xl font-bold">
          Notice: Your current account is blocked!
        </p>
        <p>You won{`'`}t be able to perform any action.</p>
      </div>
    );
  }

  return null;
}
