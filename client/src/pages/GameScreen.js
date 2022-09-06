import "../assets/styles/gameScreen.css";
import Logout from "../components/Logout";
import Room from "../components/Room";

const GameScreen = ({ setToken, socket }) => {
  return (
    <div className="game-screen">
      <Logout setToken={setToken} />
      <Room socket={socket} />
    </div>
  );
};

export default GameScreen;
