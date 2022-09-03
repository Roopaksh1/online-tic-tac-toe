import { useEffect, useState } from "react";

const Board = ({ setResult }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
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

  const displayChoice = (e) => {
    const arr = [...board];
    switch (e.target.className) {
      case "square-one":
        arr[0] = turn;
        setBoard(arr);
        break;
      case "square-two":
        arr[1] = turn;
        setBoard(arr);
        break;
      case "square-three":
        arr[2] = turn;
        setBoard(arr);
        break;
      case "square-four":
        arr[3] = turn;
        setBoard(arr);
        break;
      case "square-five":
        arr[4] = turn;
        setBoard(arr);
        break;
      case "square-six":
        arr[5] = turn;
        setBoard(arr);
        break;
      case "square-seven":
        arr[6] = turn;
        setBoard(arr);
        break;
      case "square-eight":
        arr[7] = turn;
        setBoard(arr);
        break;
      case "square-nine":
        arr[8] = turn;
        setBoard(arr);
        break;
      default:
        break;
    }
    e.target.textContent = turn;
  };

  const squareEmpty = (e) => {
    if (e.target.textContent) {
      return false;
    } else {
      return true;
    }
  };

  const changeTurn = (e) => {
    if (squareEmpty(e)) {
      
      displayChoice(e);
      turn === "X" ? setTurn("O") : setTurn("X");
    }
  };

  return (
    <div className="board">
      <div className="square-one" onClick={changeTurn}></div>
      <div className="square-two" onClick={changeTurn}></div>
      <div className="square-three" onClick={changeTurn}></div>
      <div className="square-four" onClick={changeTurn}></div>
      <div className="square-five" onClick={changeTurn}></div>
      <div className="square-six" onClick={changeTurn}></div>
      <div className="square-seven" onClick={changeTurn}></div>
      <div className="square-eight" onClick={changeTurn}></div>
      <div className="square-nine" onClick={changeTurn}></div>
    </div>
  );
};

export default Board;
