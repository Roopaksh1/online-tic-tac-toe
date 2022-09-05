import { useState } from "react";
import Board from "../components/Board";

const Room = ({ setResult, socket }) => {
  const [roomId, setRoomId] = useState(0);
  const [player, setPlayer] = useState("");
  const [roomCreate, setRoomCreate] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [roomInput, setRoomInput] = useState("");

  const createRoom = () => {
    const temp = Math.floor(Math.random() * 1000)
    setRoomId(temp);
    setPlayer("X");
    socket.emit("create-room", temp.toString());
    setRoomCreate(true);
  };

  const joinRoom = () => {
    setPlayer("O")
    socket.emit("join-room", roomInput);
  };

  socket.on("start-game", () => {
    setStartGame(true);
  });

  if (startGame) {
    return <Board setResult={setResult} socket={socket} player={player}/>
  } else if (roomCreate) {
    return <p>Waiting for player to join <i className="fa-solid fa-spinner fa-spin"></i><br/> Room id: {roomId}</p>;
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
