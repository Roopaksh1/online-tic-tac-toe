import { useEffect, useRef, useState } from "react";

const Board = ({ socket, player, reset }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState("");
  const gameOver = useRef(false);
  const rematchButton = useRef(false);
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
    const allX = [];
    const allY = [];
    board.forEach((d, index) => {
      if (d === "X") {
        allX.push(index);
      } else if (d === "O") {
        allY.push(index);
      }
    });
    if (checkPattern(allX).length || checkPattern(allY).length) {
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

  const displayChoice = (index, choice) => {
    const arr = [...board];
    switch (index) {
      case "square-one ":
        arr[0] = choice;
        setBoard(arr);
        break;
      case "square-two ":
        arr[1] = choice;
        setBoard(arr);
        break;
      case "square-three ":
        arr[2] = choice;
        setBoard(arr);
        break;
      case "square-four ":
        arr[3] = choice;
        setBoard(arr);
        break;
      case "square-five ":
        arr[4] = choice;
        setBoard(arr);
        break;
      case "square-six ":
        arr[5] = choice;
        setBoard(arr);
        break;
      case "square-seven ":
        arr[6] = choice;
        setBoard(arr);
        break;
      case "square-eight ":
        arr[7] = choice;
        setBoard(arr);
        break;
      case "square-nine ":
        arr[8] = choice;
        setBoard(arr);
        break;
      default:
        break;
    }
  };

  const squareEmpty = (target) => {
    if (target.textContent) {
      return false;
    } else {
      return true;
    }
  };

  const drawChoice = (index, choice) => {
    const target = document.querySelector(`.${index}`);
    if (squareEmpty(target)) {
      displayChoice(index, choice);
      turn === "X" ? setTurn("O") : setTurn("X");
    }
  };

  const eventHandler = (e) => {
    if (player === turn) {
      drawChoice(e.target.className, player);
      socket.emit("move-made", e.target.className, player);
    }
  };

  const resetBoard = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    gameOver.current = false;
    rematchButton.current = false;
    setRematchFlag(false);
  }

  socket.on("your-turn", (index, choice) => {
    drawChoice(index, choice);
  });

  socket.on("left-game", () => {
    setMessage("Opponent left the game . . .");
    rematchButton.current = true;
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
  });

  const sendRematchOffer = () => {
    socket.emit("rematch");
    setMessage("Rematch offer sent . . .");
  };

  const rematchAccept = () => {
    socket.emit("rematch-accepting");
    setMessage("Your turn");
    resetBoard();
  };

  const rematchDecline = () => {
    socket.emit("rematch-rejecting");
  };

  return (
    <>
      <div className="board-wrapper">
        <h2>{message}</h2>
        <div className="board">
          <div
            className={"square-one " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[0]}
          </div>
          <div
            className={"square-two " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[1]}
          </div>
          <div
            className={"square-three " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[2]}
          </div>
          <div
            className={"square-four " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[3]}
          </div>
          <div
            className={"square-five " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[4]}
          </div>
          <div
            className={"square-six " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[5]}
          </div>
          <div
            className={"square-seven " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[6]}
          </div>
          <div
            className={"square-eight " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[7]}
          </div>
          <div
            className={"square-nine " + (gameOver.current ? "disabled" : "")}
            onClick={eventHandler}
          >
            {board[8]}
          </div>
        </div>
      </div>
      {gameOver.current && (
        <div className="after-game-btn">
          <button onClick={sendRematchOffer} disabled={rematchButton.current}>Rematch</button>
          <button onClick={reset}>New Game</button>
        </div>
      )}
      {rematchFlag && (
        <div className="rematch-btn">
          <button onClick={rematchAccept} className="accept-btn">Accept</button>
          <button onClick={rematchDecline} className="reject-btn">Reject</button>
        </div>
      )}
    </>
  );
};

export default Board;
