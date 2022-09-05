let room = "";

const onConnection = (socket, io) => {
  console.log("A user connected.", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
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

  socket.on("leaving-game", () => {
    socket.to(room).emit("left-game");
    socket.leave(room);
  })

  socket.on("rematch", () => {
    socket.to(room).emit("rematch-offer");
  })

  socket.on("rematch-accepting", () => {
    socket.to(room).emit("rematch-accepted");
  })

  socket.on("rematch-rejecting", () => {
    socket.to(room).emit("rematch-rejected");
  })
};

module.exports = onConnection;
