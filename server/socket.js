const rooms = {
  maxRoom: 1000,
  roomSize: 2,
};

const onConnection = (socket, io) => {
  socket.on("create-room", () => {
    let roomId = Math.floor(Math.random() * rooms.maxRoom + 1).toString();
    while (roomId in rooms) {
      roomId = Math.floor(Math.random() * rooms.maxRoom + 1).toString();
    }
    rooms[roomId] = 1;
    socket.join(roomId);
    socket.emit("unique-id", roomId);
  });

  socket.on("join-room", async (roomId) => {
    if (roomId in rooms && rooms[roomId] < 2) {
      socket.join(roomId);
      rooms[roomId] = 2;
      io.to(roomId).emit("start-game");
    } else {
      socket.emit("wrong-room-id");
    }
  });

  socket.on("move-made", (index, choice, roomId) => {
    socket.to(roomId).emit("your-turn", index, choice);
  });

  socket.on("leaving-game", (roomId) => {
    socket.to(roomId).emit("left-game");
    socket.leave(roomId);
  });

  socket.on("rematch", (roomId) => {
    socket.to(roomId).emit("rematch-offer");
  });

  socket.on("rematch-accepting", (roomId) => {
    socket.to(roomId).emit("rematch-accepted");
  });

  socket.on("rematch-rejecting", (roomId) => {
    socket.to(roomId).emit("rematch-rejected");
  });

  socket.on("game-over", (roomId) => {
    delete rooms[roomId];
  });

  socket.on("send-msg", (roomId, message) => {
    socket.to(roomId).emit("msg-sent", message);
  })
};

module.exports = onConnection;
