import React, { useContext } from 'react';
import GameContext from './GameContext';

const Reset = () => {
  const {
    setPlayerMoves,
    setStatus, 
    setPlayerTurn,
    setSquaresClicked
  } = useContext(GameContext);
  const onClick = () => {
    setPlayerTurn('X');
    setStatus('Next player: X');
    setPlayerMoves({
      X: [],
      O: []
    });
    setSquaresClicked([]);
  }
  return (
    <>
      <button className="reset" data-testid="reset" onClick={onClick}>
        Reset Game
      </button>
    </>
  );
}

export default Reset;