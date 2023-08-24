"use client";

import { BiSolidUser } from "react-icons/bi";

function AccountLogin() {
  return (
    <div className="flex items-center justify-center rounded-full border border-gray-400 px-3 py-1 font-thin">
      <p>Sign in</p>
    </div>
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
