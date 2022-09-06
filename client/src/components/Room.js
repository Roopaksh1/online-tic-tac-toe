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
    socket.emit("create-room");
    setPlayer("X");
  };

  const joinRoom = () => {
    setPlayer("O");
    setRoomId(roomInput);
    socket.emit("join-room", roomInput);
  };

  const reset = () => {
    setStartGame(false);
    setRoomCreate(false);
    socket.emit("leaving-game", roomId);
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
