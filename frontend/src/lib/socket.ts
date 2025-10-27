import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const socket = io(API_URL, {
  autoConnect: true,
  transports: ["websocket"],
});
