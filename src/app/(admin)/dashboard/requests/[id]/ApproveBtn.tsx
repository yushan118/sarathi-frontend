"use client";
// React component for a button to approve a request and forward it to the ambulance
import { approveRequest } from "./server-actions";

export default function ApproveBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();     // Preventing the default form submission behavior
        await approveRequest(id);     // Calling the server action to approve and forward the request to the ambulance
      }}
    >

      {/* Button with specific styling and text */}
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Approve and forward to ambulance
      </button>
    </form>
  );
}
