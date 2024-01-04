"use client";

import { onTheWayRequest } from "./server-actions";

export default function OnTheWayBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await onTheWayRequest(id);
      }}
    >
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Assign as on the way
      </button>
    </form>
  );
}
