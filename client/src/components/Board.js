import { useEffect, useState } from "react";

const Board = ({ setResult, socket, player }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState("Your turn");

  useEffect(() => {
    checkWinner();
    checkIfTie();
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
      setResult("Win");
    }
  };

  const checkIfTie = () => {
    if (!board.includes("")) {
      setResult("Tie");
    }
  };

  const displayChoice = (index, choice) => {
    const arr = [...board];
    switch (index) {
      case "square-one":
        arr[0] = choice;
        setBoard(arr);
        break;
      case "square-two":
        arr[1] = choice;
        setBoard(arr);
        break;
      case "square-three":
        arr[2] = choice;
        setBoard(arr);
        break;
      case "square-four":
        arr[3] = choice;
        setBoard(arr);
        break;
      case "square-five":
        arr[4] = choice;
        setBoard(arr);
        break;
      case "square-six":
        arr[5] = choice;
        setBoard(arr);
        break;
      case "square-seven":
        arr[6] = choice;
        setBoard(arr);
        break;
      case "square-eight":
        arr[7] = choice;
        setBoard(arr);
        break;
      case "square-nine":
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
      setMessage("Waiting for Opponent")
    }
  };

  const eventHandler = (e) => {
    if (player === turn) {
      drawChoice(e.target.className, player);
      socket.emit("move-made", e.target.className, player);
    }
  };

  socket.on("your-turn", (index, choice) => {
    drawChoice(index, choice);
    setMessage("Your turn");
  });

  return (
    <div className="board-wrapper">
      <h2>{message}</h2>
      <div className="board">
        <div className="square-one" onClick={eventHandler}>{board[0]}</div>
        <div className="square-two" onClick={eventHandler}>{board[1]}</div>
        <div className="square-three" onClick={eventHandler}>{board[2]}</div>
        <div className="square-four" onClick={eventHandler}>{board[3]}</div>
        <div className="square-five" onClick={eventHandler}>{board[4]}</div>
        <div className="square-six" onClick={eventHandler}>{board[5]}</div>
        <div className="square-seven" onClick={eventHandler}>{board[6]}</div>
        <div className="square-eight" onClick={eventHandler}>{board[7]}</div>
        <div className="square-nine" onClick={eventHandler}>{board[8]}</div>
      </div>
    </div>
  );
};

export default Board;
