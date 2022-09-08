import { useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Game from "../pages/Game";

const Room = ({ socket }) => {
  const [roomId, setRoomId] = useState(0);
  const [player, setPlayer] = useState("");
  const [roomCreate, setRoomCreate] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [roomError, setRoomError] = useState("");

  const createRoom = () => {
    if (socket.connected) {
      socket.emit("create-room");
      setPlayer("X");
    }
  };

  const joinRoom = () => {
    setPlayer("O");
    setRoomId(roomInput);
    if (socket.connected) {
      socket.emit("join-room", roomInput);
    }
  };

  const reset = () => {
    if (socket.connected) {
      setStartGame(false);
      setRoomCreate(false);
      socket.emit("leaving-game", roomId);
    }
  };

  socket.on("unique-id", (roomId) => {
    setRoomCreate(true);
    setRoomId(roomId);
  });

  socket.on("wrong-room-id", () => setRoomError("Invalid Room ID"));

  socket.on("start-game", () => setStartGame(true));

  return (
    <>
      {startGame && (
        <Game
          socket={socket}
          player={player}
          reset={reset}
          roomId={roomId.toString()}
        />
      )}
      {!startGame && roomCreate && (
        <p className="waiting-msg">
          Waiting for player to join &nbsp;
          <i className="fa-solid fa-spinner fa-spin"></i>
          <br /> Room id: {roomId}
        </p>
      )}
      {!startGame && !roomCreate && (
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
          <h2>{roomError}</h2>
        </div>
      )}
    </>
  );
};

export default Room;
