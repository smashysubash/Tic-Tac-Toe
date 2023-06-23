import { useState } from 'react';
import Board from './Board';

export default function Game(){
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove];
    function handlePlay(nextSquares){
        setHistory([...history.slice(0,currentMove+1), nextSquares]);
        setCurrentMove(currentMove+1)
        setXIsNext(!xIsNext)
    }
    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares,move)=>{
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    })
    return(
        <div className='headcomp'>
            <h1>Tic-Tac-Toe</h1>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} square={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}