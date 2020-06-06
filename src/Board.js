import React from 'react';
import Square from './Square';

const Board = () => {
  const gameSquares = [];
  for (let i = 1; i <= 9; i++) {
    gameSquares.push(<Square squareId={i} key={i} />);
  }
  return (
    <div className="grid">
      {gameSquares}
    </div>
  );
}

export default Board;