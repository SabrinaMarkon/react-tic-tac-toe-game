import React, { useState } from 'react';
import Board from './Board';
import Status from './Status';
import Reset from './Reset';
import { winPatterns } from './constants';
import GameContext from './GameContext';

const App = () => {
  const [playerMoves, setPlayerMoves] = useState({
    X: [],
    O: []
  });
  const [status, setStatus] = useState('Next player: X');
  const [playerTurn, setPlayerTurn] = useState('X');
  const [squaresClicked, setSquaresClicked] = useState([]);
  return (
    <GameContext.Provider value={{
      winPatterns,
      playerMoves,
      setPlayerMoves,
      status,
      setStatus,
      playerTurn,
      setPlayerTurn,
      squaresClicked,
      setSquaresClicked
    }}>
      <div className="content">
        <h1>Tic-Tac-Toe</h1>
        <Board />
        <Status />
        <Reset />
      </div>
    </GameContext.Provider>
  );
}

export default App;