import { useState } from "react";
import Board from "../components/Board";

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
        <button onClick={createRoom}>Create Room</button>
        <div>
          <input
            type="text"
            placeholder="room id"
            onChange={(e) => setRoomInput(e.target.value)}
          ></input>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    );
  }
};

export default Room;
