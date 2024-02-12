"use client";

import { IoMdCall } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import Link from "next/link";
import { AuthContext } from "@/components/InitializeAuthStore";
import { useContext } from "react";
import UserStats from "@/app/(public)/UserStats";

export default function Actions({ bookingsList }: { bookingsList: any }) {
  const userContext = useContext(AuthContext);

  if (userContext.user?.isSuspended) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <UserStats bookingsList={bookingsList} />
      <div className="flex w-max flex-col items-center justify-center">
        <h1 className="text-2xl font-thin">Actions</h1>
        <div className="block h-[6px] w-[90%] bg-[#FF5C00D4] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-8">
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-8 transition-colors hover:border-gray-500 sm:w-[250px]"
        >
          <IoMdCall size={40} color="red" />
          Call an Ambulance
        </Link>
        <Link
          href="/ambulance-status"
          className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-8 text-center transition-colors hover:border-gray-500 sm:w-[250px]"
        >
          <GrStatusInfo size={40} color="blue" />
          Track status of previously called Ambulance
        </Link>
      </div>
    </div>
  );
}
