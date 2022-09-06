const rooms = [];
const maxRooms = 10;

const onConnection = (socket, io) => {
  console.log("A user connected.", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("create-room", () => {
    let roomId = Math.floor(Math.random() * maxRooms).toString(); 
    while (rooms.includes(roomId)) {
      roomId = Math.floor(Math.random() * maxRooms).toString();
    }
    rooms.push(roomId);
    socket.join(roomId);
    socket.emit("unique-id", roomId);
  });

  socket.on("join-room", (roomId) => {
    if(rooms.includes(roomId)) {
      socket.join(roomId);
      io.to(roomId).emit("start-game");
    } else {
      socket.emit("Wrong-room-id");
    }
  });

  socket.on("move-made", (index, choice, roomId) => {
    socket.to(roomId).emit("your-turn", index, choice);
  });

  socket.on("leaving-game", (roomId) => {
    socket.to(roomId).emit("left-game");
    socket.leave(roomId);
  })

  socket.on("rematch", (roomId) => {
    socket.to(roomId).emit("rematch-offer");
  })

  socket.on("rematch-accepting", (roomId) => {
    socket.to(roomId).emit("rematch-accepted");
  })

  socket.on("rematch-rejecting", (roomId) => {
    socket.to(roomId).emit("rematch-rejected");
  })
};

module.exports = onConnection;
