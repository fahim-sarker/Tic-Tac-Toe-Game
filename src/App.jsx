import React, { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button
        className="bg-white border-2 border-gray-400 h-12 w-12 leading-10 text-lg"
        onClick={onSquareClick}
      >
        {value}
      </button>
    </>
  );
};

function Calculatewinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ isNext, squares, onPlay }) => {
  const winner = Calculatewinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player: " + (isNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || Calculatewinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = isNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="my-2">{status}</div>
        <div className="flex gap-2 my-2">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex gap-2 my-2">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex gap-2 my-2">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </section>
  );
};

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNext, setIsNext] = useState(true);
  const [currentmove, SetCurrentmove] = useState (0);

  const currentSquares = history[currentmove];

  function handlePlay(nextSquares) {
    setIsNext(!isNext);
    const nexthistory =  [...history.slice (0, currentmove +1), nextSquares]
    setHistory(nexthistory);
    SetCurrentmove(nexthistory.length - 1)
  }



  function jumpto (move) {
    SetCurrentmove(move)
    setIsNext(move % 2 === 0)
  }


  const moves = history.map((squares,move) => {
    let description;
    if(move > 0){
      description = `Go to the  move ${move}`
    }else{
      description = `Start the game`
    }
    return(
      <li key={move} className="border-2 border-black my-2 px-1">
        <button onClick={() => jumpto(move)}>{description}</button>
      </li>
    )
  })


  return (
    <div className="">
      <div className="container flex justify-center items-center gap-5">
      <div>
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="border-2 border-gray-400 p-3 mt-5">
        <ol className="">{moves}</ol>
      </div>
      </div>
    </div>
  );
}

export default Game;
