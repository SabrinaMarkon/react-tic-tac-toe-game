import React, { useContext }  from 'react';
import GameContext from './GameContext';
import Cross from './Cross';
import Nought from './Nought';

const Square = ({squareId}) => {
  const {
      winPatterns,
      playerMoves,
      setPlayerMoves,
      setStatus,
      playerTurn,
      setPlayerTurn,
      squaresClicked,
      setSquaresClicked
  } = useContext(GameContext);
  
  const otherPlayer = playerTurn === 'X' ? 'O' : 'X';
  
  const addMove = (player, squareId) => {
    // Add move to history.
    const newPlayerMoves = playerMoves[player];
    newPlayerMoves.push(squareId);
    setPlayerMoves({...playerMoves, [player]: newPlayerMoves});
    // Make the squareId unclickable and show the X or O.
    setSquaresClicked([...squaresClicked, squareId]);
  }
  
  const checkWinOrTie = player => {
    for (let i = 0; i < winPatterns.length; i++) {
      // If every element of the winPatterns[i] subarray are present for a player, they win.
      let winner = winPatterns[i].every(item => playerMoves[player].includes(item));
      if (winner) {
        setStatus(`Winner: ${player}`);
        // Disable all squares since game is over.
        setSquaresClicked([1,2,3,4,5,6,7,8,9]);
        return true;
      }
      // No winner yet. Check for tie.
      if (playerMoves['X'].length + playerMoves['O'].length === 9) {
        setStatus('Tie');
        setSquaresClicked([1,2,3,4,5,6,7,8,9]);
        return true;
      }
    }
    return false;
  }

  const onClick = () => {
    // Add the move to the current player's move list.
    addMove(playerTurn, squareId);
    // Check if the current player is a winner or there is a tie (need at least 3 moves to win).
    let winOrTie = false;
    if (playerMoves[playerTurn].length >= 3) {
      winOrTie = checkWinOrTie(playerTurn);
    }
    if (!winOrTie) {
      setStatus(`Next player: ${otherPlayer}`);
      setPlayerTurn(otherPlayer);
    }
  }  

    // const crossOrNought = playerMoves['X'].includes(squareId) ? <Cross /> :
    // (playerMoves['O'].includes(squareId) && <Nought />);

  let squareValue = 'X';
  let crossOrNought = '';
  if (playerMoves['X'].includes(squareId)) {
    squareValue = 'X';
    crossOrNought = <Cross />;
  }
  if (playerMoves['O'].includes(squareId)) {
    squareValue = 'O';
    crossOrNought = <Nought />;
  }

  let disabled = '';
  if (squaresClicked.includes(squareId)) {
    disabled = 'disabled';
  }

  return (
    <button className="square" value={squareValue} onClick={onClick} disabled={disabled}>
      {crossOrNought}
    </button>
  );
}

export default Square;