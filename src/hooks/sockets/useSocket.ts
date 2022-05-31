import io from "socket.io-client";
console.log(123)
const socket = io("http://localhost:3000", {
  path: "/api/socket-io",
});

export const useSocket = () => {
  return socket;
};
