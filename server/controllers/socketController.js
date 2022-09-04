const clients = {};
const players = {};
let unmatched;

module.exports = {
  addClient(socket) {
    clients[socket.id] = socket;
  },

  deleteClient(socket) {
    delete clients[socket.id];
    socket.broadcast.emit("client-disconnect");
  },

  joinGame(socket) {
    players[socket.id] = {
      opponent: unmatched,
      mark: "X",
      socket: socket,
    }

    if (unmatched) {
      players[socket.id].mark = "O";
      players[unmatched].opponent = socket.id;
    } else {
      unmatched = socket.id;
    }
  },

  getOpponent(socket) {
    if (!players[socket.id].opponent) {
      return
    } else return players[players[socket.id].opponent].socket;
  },

  getMark(socket) {
    return players[socket.id].mark;
  },

  play(socket) {
    socket.broadcast.emit("Your turn");
  },
};
