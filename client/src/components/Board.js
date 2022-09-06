import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

const Board = ({ socket, player, reset, roomId }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState("");
  const gameOver = useRef(false);
  const rematchDisabled = useRef(false);
  const [rematchFlag, setRematchFlag] = useState(false);

  useEffect(() => {
    if (player === turn) {
      setMessage("Your turn");
    } else {
      setMessage("Waiting for opponent . . .");
    }
  }, [turn]);

  useEffect(() => {
    if (!checkWinner()) {
      checkIfTie();
    }
  }, [board]);

  // Game Logic
  // Winning Patterns
  const checkPattern = (arr) => {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    return patterns.filter((pattern) => {
      return (
        arr.includes(pattern[0]) &&
        arr.includes(pattern[1]) &&
        arr.includes(pattern[2])
      );
    });
  };

  const checkWinner = () => {
    const allXIndex = [];
    const allOIndex = [];
    board.forEach((d, index) => {
      if (d === "X") {
        allXIndex.push(index);
      } else if (d === "O") {
        allOIndex.push(index);
      }
    });
    if (checkPattern(allXIndex).length || checkPattern(allOIndex).length) {
      if (player === turn) {
        setMessage("You Lost");
      } else {
        setMessage("You Won");
      }
      gameOver.current = true;
      return 1;
    }
    return 0;
  };

  const checkIfTie = () => {
    if (!board.includes("")) {
      setMessage("TIE");
      gameOver.current = true;
    }
  };

  const isSquareEmpty = (index) => {
    return board[index] ? false : true;
  };

  const insertOnBoard = (index, choice) => {
    const arr = [...board];
    arr[index] = choice;
    setBoard(arr);
    turn === "X" ? setTurn("O") : setTurn("X");
  };

  const drawChoice = (index, choice) => {
    if (player === turn) {
      if (isSquareEmpty(index)) {
        insertOnBoard(index, choice);
        socket.emit("move-made", index, player, roomId);
      }
    }
  };

  const resetBoard = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    gameOver.current = false;
    rematchDisabled.current = false;
    setRematchFlag(false);
  };

  const sendRematchOffer = () => {
    socket.emit("rematch", roomId);
    setMessage("Rematch offer sent . . .");
  };

  const rematchAccept = () => {
    socket.emit("rematch-accepting", roomId);
    setMessage("Your turn");
    resetBoard();
  };

  const rematchDecline = () => {
    socket.emit("rematch-rejecting", roomId);
    rematchDisabled.current = true;
    setRematchFlag(false);
  };
  // Game logic

  // Socket.io events
  socket.on("your-turn", (index, choice) => {
    insertOnBoard(index, choice);
  });

  socket.on("left-game", () => {
    setMessage("Opponent left the game . . .");
    rematchDisabled.current = true;
  });

  socket.on("rematch-offer", () => {
    setMessage("Rematch offered");
    setRematchFlag(true);
  });

  socket.on("rematch-accepted", () => {
    resetBoard();
    setMessage("Waiting for opponent . . .");
  });

  socket.on("rematch-rejected", () => {
    setMessage("Opponent declined the offer.");
    rematchDisabled.current = true;
  });
  // Socket.io events

  return (
    <>
      <div className="board-wrapper">
        <h2>{message}</h2>
        <div className="board">
          <div
            className={"square-one " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(0, player)}
          >
            {board[0]}
          </div>
          <div
            className={"square-two " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(1, player)}
          >
            {board[1]}
          </div>
          <div
            className={"square-three " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(2, player)}
          >
            {board[2]}
          </div>
          <div
            className={"square-four " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(3, player)}
          >
            {board[3]}
          </div>
          <div
            className={"square-five " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(4, player)}
          >
            {board[4]}
          </div>
          <div
            className={"square-six " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(5, player)}
          >
            {board[5]}
          </div>
          <div
            className={"square-seven " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(6, player)}
          >
            {board[6]}
          </div>
          <div
            className={"square-eight " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(7, player)}
          >
            {board[7]}
          </div>
          <div
            className={"square-nine " + (gameOver.current ? "disabled" : "")}
            onClick={() => drawChoice(8, player)}
          >
            {board[8]}
          </div>
        </div>
      </div>
      {gameOver.current && (
        <div className="after-game-btn">
          <Button
            variant="contained"
            onClick={sendRematchOffer}
            disabled={rematchDisabled.current}
          >
            Rematch
          </Button>
          <Button variant="contained" onClick={reset}>
            New Game
          </Button>
        </div>
      )}
      {rematchFlag && (
        <div className="rematch-btn">
          <Button
            variant="contained"
            color="success"
            onClick={rematchAccept}
            className="accept-btn"
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={rematchDecline}
            className="reject-btn"
          >
            Reject
          </Button>
        </div>
      )}
    </>
  );
};

export default Board;
