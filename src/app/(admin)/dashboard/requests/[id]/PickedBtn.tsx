"use client";

// Importing server action to perform the 'pickedRequest' operation
import { pickedRequest } from "./server-actions";

// React component for a button to mark a request as picked up by ambulance
export default function PickedBtn({ id }: { id: string }) {
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();      // Preventing the default form submission behavior
        await pickedRequest(id);    // Calling the server action to mark the request as picked up
      }}
    >

      {/* Button triggering the form submission */}
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Mark as picked
      </button>
    </form>
  );
}
