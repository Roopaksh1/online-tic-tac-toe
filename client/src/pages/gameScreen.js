import { useState } from "react";
import Board from "../components/Board";
import "../assets/styles/gameScreen.css"
import Logout from "../components/Logout";

const GameScreen = ({ setToken }) => {
  const [result, setResult] = useState("");
  const resetBoard = () => {
    setResult("");
  };

  return (
    <div className="game-screen">
      <Logout setToken={setToken}/>
    { result === "" 
      ? <Board setResult={setResult}></Board>
      : <button className="play-again" onClick={resetBoard}>Play Again</button>
    
    }
    </div>
  );
}

export default GameScreen;