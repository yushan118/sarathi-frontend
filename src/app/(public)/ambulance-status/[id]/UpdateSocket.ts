"use client";

import { socket } from "@/socket";
import { useEffect } from "react";
import { revalidateBookingStatusPage } from "./server-actions";

export default function UpdateSocket(props: { id: string }) {
  useEffect(() => {
    socket.connect();

    function onBookingIsUpdated({ id }: { id: string }) {
      if (props.id == id) {
        revalidateBookingStatusPage(id);
      }
    }
    socket.on("booking-status-updated", onBookingIsUpdated);

    return () => {
      socket.off("booking-status-updated", onBookingIsUpdated);
      socket.disconnect();
    };
  }, []);

  return null;
}
