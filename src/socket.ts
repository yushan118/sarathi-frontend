import { io } from "socket.io-client";

export const socket = io("http://sarathiii.com:8080", {
  autoConnect: false,
  secure: false,
});
