import React, { useContext } from "react";
import GameContext from "./GameContext";
import Cross from "./Cross";
import Nought from "./Nought";

const Square = ({ squareId }) => {
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

  const otherPlayer = playerTurn === "X" ? "O" : "X";

  const checkWin = (player, newPlayerMoves) => {
    for (let i = 0; i < winPatterns.length; i++) {
      // If every element of the winPatterns[i] subarray are present for a player, they win.
      if (
        winPatterns[i].every(element =>
          newPlayerMoves[player].includes(element)
        )
      ) {
        setStatus(`Winner: ${player}`);
        // Disable all squares since game is over.
        setSquaresClicked([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        return true;
      }
    }
    return false;
  };

  const addMove = () => {
    // Add move to current player's move list.
    const addPlayerMove = playerMoves[playerTurn];
    addPlayerMove.push(squareId);
    const newPlayerMoves = {
      ...playerMoves,
      [playerTurn]: [...addPlayerMove]
    };
    setPlayerMoves(newPlayerMoves);

    // Make the squareId unclickable and show the X or O.
    const addSquareId = [...squaresClicked, squareId];
    setSquaresClicked(addSquareId);

    // Check if the current player is a winner or there is a tie (need at least 3 moves to win).
    let winOrTie = false;
    if (playerMoves[playerTurn].length >= 3) {
      winOrTie = checkWin(playerTurn, newPlayerMoves);
    }
    if (!winOrTie) {
      if (playerMoves["X"].length + playerMoves["O"].length === 9) {
        setStatus("Tie");
        setSquaresClicked([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      } else {
        setStatus(`Next player: ${otherPlayer}`);
        setPlayerTurn(otherPlayer);
      }
    }
  };

  // const crossOrNought = playerMoves['X'].includes(squareId) ? <Cross /> :
  // (playerMoves['O'].includes(squareId) && <Nought />);

  let squareValue = "X";
  let crossOrNought = "";
  if (playerMoves["X"].includes(squareId)) {
    squareValue = "X";
    crossOrNought = <Cross />;
  }
  if (playerMoves["O"].includes(squareId)) {
    squareValue = "O";
    crossOrNought = <Nought />;
  }

  let disabled = "";
  if (squaresClicked.includes(squareId)) {
    disabled = "disabled";
  }

  return (
    <button
      className="square"
      value={squareValue}
      onClick={addMove}
      disabled={disabled}
    >
      {crossOrNought}
    </button>
  );
};

export default Square;
