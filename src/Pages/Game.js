import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function DisabledSquare({value}) {
  return (
    <button className="disabled-square" type="button" disabled>
      {value}
    </button>
  );
}

function DisplayWinner({xWins, oWins}){
    if(xWins > oWins){
        return(
            <div>
                The Winner is X.
            </div>
        ); 
    }
    else{
        return(
            <div>
                The Winner is O.
            </div>
        );
    }
}

function ResetButton({onResetClick}){
  return (
    <button className="" onClick={onResetClick}>
      Reset
    </button>
  );
}

function Board({ value, onWinnerChange, xIsNext, onPlay, squares, modifySquares, winner, modifyWinner, game, disableBoard }) {

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    onPlay()
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    modifySquares(value, nextSquares);
    const win = calculateWinner(nextSquares);
    if(win && !winner){
      onWinnerChange(win);
      modifyWinner(value);
    }

    disableBoard(i)
    
  }
  if(game){
    return (
      <>
        <table>
          <tr className="topRow">
            <td className="leftColumn"><Square value={squares[0]} onSquareClick={() => handleClick(0)} /></td>
            <td><Square value={squares[1]} onSquareClick={() => handleClick(1)} /></td>
            <td className="rightColumn"><Square value={squares[2]} onSquareClick={() => handleClick(2)} /></td>
          </tr>
          <tr>
            <td className="leftColumn"><Square value={squares[3]} onSquareClick={() => handleClick(3)} /></td>
            <td><Square value={squares[4]} onSquareClick={() => handleClick(4)} /></td>
            <td className="rightColumn"><Square value={squares[5]} onSquareClick={() => handleClick(5)} /></td>
          </tr>
          <tr className="bottomRow">
            <td className="leftColumn"><Square value={squares[6]} onSquareClick={() => handleClick(6)} /></td>
            <td><Square value={squares[7]} onSquareClick={() => handleClick(7)} /></td>
            <td className="rightColumn"><Square value={squares[8]} onSquareClick={() => handleClick(8)} /></td>
          </tr>
        </table>
      </>
    );
  }
  else{
    return (
      <>
        <table>
        <tr>
          <td><DisabledSquare value={squares[0]} /></td>
          <td><DisabledSquare value={squares[1]} /></td>
          <td><DisabledSquare value={squares[2]} /></td>
        </tr>
        <tr>
          <td><DisabledSquare value={squares[3]} /></td>
          <td><DisabledSquare value={squares[4]} /></td>
          <td><DisabledSquare value={squares[5]} /></td>
        </tr>
        <tr>
          <td><DisabledSquare value={squares[6]} /></td>
          <td><DisabledSquare value={squares[7]} /></td>
          <td><DisabledSquare value={squares[8]} /></td>
        </tr>
        </table>
      </>
    );
  }
  
}

export default function Game() {
  let navigate = useNavigate();

  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [squares, setSquares] = useState(Array(81).fill(null));
  const [winner, setWinner] = useState(Array(9).fill(false));
  const [game, setGame] = useState(Array(9).fill(true));
  const [gameOver, setGameOver] = useState(false);

  function handleWinnerChange(newWinner) {
    if (newWinner === 'X') {
      setXWins(xWins + 1);
    } else if (newWinner === 'O') {
      setOWins(oWins + 1);
    }
  }

  function modifySquares(boardValue, modSquares){
    const nextSquares = squares.slice();
    for (let i = 0; i < 9; i++) {
      nextSquares[((boardValue) * 9) + i] = modSquares[i];
    }
    setSquares(nextSquares);
  }

  function modifyWinner(boardValue){
    const nextWinner = winner.splice(0,9);
    nextWinner[boardValue] = true;
    setWinner(nextWinner);
  }

  function handleReset(){
    setSquares(Array(81).fill(null));
    setXWins(0);
    setOWins(0);
    setWinner(Array(9).fill(false));
    setXIsNext(true);
    setGame(Array(9).fill(true));
    setGameOver(false);
  }

  function disableBoard(value){
    const nextGame = Array(9).fill(false)
    nextGame[value] = true;
    setGame(nextGame);
  }

  useEffect(() => {
    if (xWins === 3 || oWins === 3) {
      setGame(Array(9).fill(false));
      setGameOver(true);
    }
  }, [xWins, oWins]);
  

  return (
    <>
      <div>
        <div>
          X Wins: {xWins}
        </div>
        <div>
          O Wins: {oWins}
        </div>
        <ResetButton onResetClick={handleReset}/>
      </div>
      <div style={{ position: 'relative' }}>
        {gameOver && (
            <div style={{ position: 'absolute' }}>
                <DisplayWinner xWins={xWins} oWins={oWins}/>
            </div>
        )}
      </div>
      
      <br></br>

      <table>
        <tr>
          <td><Board value={0} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(0,9)} modifySquares={modifySquares} winner={winner[0]} modifyWinner={modifyWinner} game={game[0]} disableBoard={disableBoard} /></td>
          <td><Board value={1} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(9,18)} modifySquares={modifySquares} winner={winner[1]} modifyWinner={modifyWinner} game={game[1]} disableBoard={disableBoard} /></td>
          <td><Board value={2} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(18,27)} modifySquares={modifySquares} winner={winner[2]} modifyWinner={modifyWinner} game={game[2]} disableBoard={disableBoard} /></td>
        </tr>
        <tr>
          <td><Board value={3} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(27,36)} modifySquares={modifySquares} winner={winner[3]} modifyWinner={modifyWinner} game={game[3]} disableBoard={disableBoard} /></td>
          <td><Board value={4} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(36,45)} modifySquares={modifySquares} winner={winner[4]} modifyWinner={modifyWinner} game={game[4]} disableBoard={disableBoard} /></td>
          <td><Board value={5} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(45,54)} modifySquares={modifySquares} winner={winner[5]} modifyWinner={modifyWinner} game={game[5]} disableBoard={disableBoard} /></td>
        </tr>
        <tr>
          <td><Board value={6} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(54,63)} modifySquares={modifySquares} winner={winner[6]} modifyWinner={modifyWinner} game={game[6]} disableBoard={disableBoard} /></td>
          <td><Board value={7} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(63,72)} modifySquares={modifySquares} winner={winner[7]} modifyWinner={modifyWinner} game={game[7]} disableBoard={disableBoard} /></td>
          <td><Board value={8} onWinnerChange={handleWinnerChange} xIsNext={xIsNext} onPlay={() => setXIsNext(!xIsNext)} squares={squares.slice(72,81)} modifySquares={modifySquares} winner={winner[8]} modifyWinner={modifyWinner} game={game[8]} disableBoard={disableBoard} /></td>
        </tr>
      </table>
        <div>
            <button 
                type="button" 
                onClick={() => {
                    navigate("/");
                }}
            >
                        Back to Home
            </button>
        </div>
    </>
  );
}

function calculateWinner(squares) {
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
