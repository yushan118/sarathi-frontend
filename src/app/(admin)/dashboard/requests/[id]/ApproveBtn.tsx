"use client";

import { approveRequest } from "./server-actions";

export default function ApproveBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await approveRequest(id);
      }}
    >
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Approve and forward to ambulance
      </button>
    </form>
  );
}
