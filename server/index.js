require('dotenv').config();
const express = require("express");
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static("../client/build"));
app.use(express.json());
app.use(cors());
app.use("/", require("./routes/user"));

io.on("connection", (socket) => {
  console.log("A user connected.")
  socket.on("disconnect", () => console.log("User disconnected."));
});

const server = httpServer.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("server crash", err);
  } else {
    console.log("server up", server.address().port);
  }
})

module.exports = io;