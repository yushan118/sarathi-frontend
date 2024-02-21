"use client";

// Importing server action to perform the 'onTheWayRequest' operation
import { arrivedRequest } from "./server-actions";

// React component for a button to assign a request as "Ambulance on the way"
export default function ArrivedBtn({ id }: { id: string }) {

  // Event handler for the form submission
  return (
    <form
      className="flex justify-center"
      onSubmit={async (e) => {
        e.preventDefault();      // Preventing the default form submission behavior
        await arrivedRequest(id);      // Calling the server action to assign the request as "Ambulance on the way"
      }}
    >

      {/* Button triggering the form submission */}
      <button className="rounded-full bg-green-400 px-8 py-2 text-xl font-bold text-white">
        Mark as arrived to hospital
      </button>
    </form>
  );
}
