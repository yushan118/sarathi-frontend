import { io } from "socket.io-client";

export const socket = io(process.env.SOCKET_API_URL!, {
  autoConnect: false,
});
