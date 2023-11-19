"use client";

import { acceptRequest } from "./server-actions";

export default function AcceptBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await acceptRequest(id);
      }}
    >
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Accept the request
      </button>
    </form>
  );
}
