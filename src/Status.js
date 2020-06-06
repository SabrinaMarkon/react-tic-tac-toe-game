import React, { useContext } from 'react';
import GameContext from './GameContext';

const Status = () => {
  const {status} = useContext(GameContext);
  return (
    <div className="status" data-testid="status">
      {status}
    </div>
  );
}

export default Status;