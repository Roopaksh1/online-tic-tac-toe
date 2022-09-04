const socketController = require("./controllers/socketController");

let room = "";

const onConnection = (socket, io) => {
  console.log("A user connected.", socket.id);
  socketController.addClient(socket);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    socketController.deleteClient(socket);
  });

  socket.on("create-room", (roomid) => {
    socket.join(roomid);
    room = roomid;
  });

  socket.on("join-room", (roomid) => {
    if(room === roomid) {
      socket.join(roomid);
      io.emit("start-game");
    } else {
      socket.emit("Wrong-room-id");
    }
  });

  socket.on("move-made", (index, choice) => {
    socket.to(room).emit("your-turn", index, choice);
  });
};

module.exports = onConnection;
