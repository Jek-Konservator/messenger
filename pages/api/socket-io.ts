import { Server } from "socket.io";

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("First use, starting sockets.io");

    const io = new Server(res.socket.server, { path: "/api/socket-io" });

    io.on("connection", (socket) => {
      socket.on("joinDialog", ({ idDialog }) => {
        console.log(idDialog, 99);
        socket.join(idDialog);
      });

      socket.on("newMessage", ({ idDialog }) => {
        console.log(idDialog, 555);
        socket.emit("newMessages", { idDialog });
        socket.to(idDialog).emit("newMessages", { idDialog });
      });

      /*sockets.on("acceptRoom", ({ idRoom }) => {
        sockets.join(idRoom);
        sockets.emit("userAccepted", {
          idRoom: idRoom,
        });
      });
      sockets.on("disconnect", (reason) => {
        console.log(reason, 123123);
      });
      sockets.on("editRoom", ({idRoom}) => {
        sockets.to(idRoom).emit("editedRoom");
        sockets.emit("editedRoom");
      });
      sockets.on("roomDelete", ({idRoom}) => {
        sockets.to(idRoom).emit("roomDelete");
        sockets.emit("roomDelete");
      });

      sockets.on("exitTheRoom", ({ idRoom, idUser }) => {
        sockets.leave(idRoom);
        axios
          .put(
            `http://localhost:3000/api/rooms/userExitTheRoom?idRoom=${idRoom}&idUser=${idUser}`
          )
          .then(({ data }) => {
            if (data.status === "ok") {
              sockets.to(idRoom).emit("updateUsers");
              sockets.emit("exitedTheRoom")
            } else {
              console.log("err");
            }
          });
      });

      sockets.on("newUserAccepted", ({ idRoom, idUser }) => {
        axios
          .put(
            `http://localhost:3000/api/rooms/userAccept?idRoom=${idRoom}&idUser=${idUser}`
          )
          .then(({ data }) => {
            if (data.status === "ok") {
              sockets.emit("updateUsers");
              sockets.to(idRoom).emit("updateUsers");
            } else {
              console.log("err");
            }
          });
      });*/
    });

    res.socket.server.io = io;
  } else {
    console.log("sockets.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
