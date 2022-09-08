import "../assets/styles/gameScreen.css";
import Room from "../components/Room";

const RoomScreen = ({ setToken, socket }) => {
  return (
    <div className="game-screen">
      <Room socket={socket} />
    </div>
  );
};

export default RoomScreen;
