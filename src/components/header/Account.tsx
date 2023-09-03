"use client";

import Link from "next/link";
import { BiSolidUser } from "react-icons/bi";

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
  return (
    <div className="flex items-center justify-end gap-2">
      <BiSolidUser size={25} />
      <AccountLogin />
    </div>
  );
}
