import { useState } from "react";
import GameBoard from "./Components/Gameboard";
import Player from "./Components/Player";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];
const PLAYERS = { X: "Player 1", O: "Player 2" };
// helper functions
// helper function to define and change player (evitare ripetizioni)
function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      console.log(winner);
    }
  }
  return winner;
}
function deriveGameboard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  // ciclo for of funziona per gli oggetti
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  // sollevamento dello stato da GameBoard.jsx(lifting state)
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayer) => {
      return { ...prevPlayer, [symbol]: newName };
    });
  }
  let currentPlayer = deriveActivePlayer(gameTurns);
  // prevenire l'immutabilità

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={currentPlayer === "X"}
            initialName={PLAYERS.X}
            symbol={"X"}
            onChangeName={handlePlayerName}
          ></Player>
          <Player
            isActive={currentPlayer === "O"}
            initialName={PLAYERS.O}
            symbol={"O"}
            onChangeName={handlePlayerName}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver onRestart={handleRestart} winner={winner} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
