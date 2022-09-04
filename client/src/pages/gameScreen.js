import { useState } from "react";
import "../assets/styles/gameScreen.css"
import Logout from "../components/Logout";
import Room from "../components/Room";

const GameScreen = ({ setToken, socket }) => {
  const [result, setResult] = useState("");
  const resetBoard = () => {
    setResult("");
  };

  return (
    <div className="game-screen">
      <Logout setToken={setToken}/>
    { result === "" 
      ? <Room setResult={setResult} socket={socket}/>
      : <button className="play-again" onClick={resetBoard}>Play Again</button>
    
    }
    </div>
  );
}

export default GameScreen;