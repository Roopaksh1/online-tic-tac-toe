import Board from "../components/Board";
import Chat from "../components/Chat";

const Game = ({ socket, player, reset, roomId }) => {
  return (
    <>
      <Board
          socket={socket}
          player={player}
          reset={reset}
          roomId={roomId}
        />
        <Chat socket={socket} roomId={roomId}/>
    </>
  );
};

export default Game;