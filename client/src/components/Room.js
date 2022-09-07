import { useState } from "react";
import Board from "../components/Board";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Room = ({ socket }) => {
  const [roomId, setRoomId] = useState(0);
  const [player, setPlayer] = useState("");
  const [roomCreate, setRoomCreate] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [roomInput, setRoomInput] = useState("");

  const createRoom = () => {
    if (socket.connected) {
      console.log(socket.connected);
      socket.emit("create-room");
      setPlayer("X");
    } else {
      console.log("Network Error");
    }
  };

  const joinRoom = () => {
    setPlayer("O");
    setRoomId(roomInput);
    if (socket.connected) {
      socket.emit("join-room", roomInput);
    } else {
      console.log("Network Error");
    }
  };

  const reset = () => {
    setStartGame(false);
    setRoomCreate(false);
    if (socket.connected) {
      socket.emit("leaving-game", roomId);
    } else {
      console.log("Network Error");
    }
  };

  socket.on("unique-id", (roomId) => {
    setRoomCreate(true);
    setRoomId(roomId);
  });

  socket.on("start-game", () => {
    setStartGame(true);
  });

  if (startGame) {
    return (
      <Board
        socket={socket}
        player={player}
        reset={reset}
        roomId={roomId.toString()}
      />
    );
  } else if (roomCreate) {
    return (
      <p>
        Waiting for player to join{" "}
        <i className="fa-solid fa-spinner fa-spin"></i>
        <br /> Room id: {roomId}
      </p>
    );
  } else {
    return (
      <div className="room">
        <Button
          sx={{ fontSize: "1.5rem" }}
          variant="contained"
          onClick={createRoom}
        >
          Create Room
        </Button>
        <div>
          <input
            type="text"
            placeholder="Room ID"
            autoFocus
            onChange={(e) => setRoomInput(e.target.value)}
          ></input>
          <label></label>
          <Button
            sx={{ fontSize: "1.5rem" }}
            variant="contained"
            endIcon={<SendIcon />}
            onClick={joinRoom}
          >
            Join Room
          </Button>
        </div>
      </div>
    );
  }
};

export default Room;
