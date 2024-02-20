// Using the "server" pragma to indicate that this is a server-side module
"use client";

// Importing necessary modules and components
import { socket } from "@/socket";    // Assuming this is the socket module
import { useEffect } from "react";
import { revalidateBookingStatusPage } from "./server-actions";

// Functional component for updating socket and handling socket events
export default function UpdateSocket(props: { id: string }) {
  useEffect(() => {
    socket.connect();      // Connecting to the socket when the component mounts

    // Handling the socket event for booking updates
    function onBookingIsUpdated({ id }: { id: string }) {

      // Checking if the updated booking id matches the current component's id
      if (props.id == id) {

        // Revalidating the booking status page upon update
        revalidateBookingStatusPage(id);
      }
    }

    // Adding a listener for the "booking-status-updated" event
    socket.on("booking-status-updated", onBookingIsUpdated);

     // Cleaning up socket connection and event listener when the component unmounts
    return () => {
      socket.off("booking-status-updated", onBookingIsUpdated);
      socket.disconnect();
    };
  }, []);      // Empty dependency array to ensure the effect runs only once when the component mounts

  // Returning null because this component doesn't render any UI elements
  return null;
}
