"use client";

import { arrivedRequest } from "./server-actions";

export default function ArrivedBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();
        await arrivedRequest(id);
      }}
    >
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Mark as arrived to hospital
      </button>
    </form>
  );
}
