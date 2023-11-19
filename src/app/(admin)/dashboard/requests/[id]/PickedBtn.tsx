"use client";

import { pickedRequest } from "./server-actions";

export default function PickedBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await pickedRequest(id);
      }}
    >
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Mark as picked
      </button>
    </form>
  );
}
