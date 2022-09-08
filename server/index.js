require("dotenv").config();
const onConnection = require("./socket");
const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.static("../build"));
app.use(express.json());
app.use(cors());
app.use("/", require("./routes/user"));
io.on("connection", (socket) => {
  onConnection(socket, io);
});

const server = httpServer.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("server crash", err);
  } else {
    console.log("server up", server.address().port);
  }
});
