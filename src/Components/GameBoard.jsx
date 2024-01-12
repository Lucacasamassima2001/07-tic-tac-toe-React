export default function GameBoard({ onSelectSquare, board }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //   // {funzione prev per creare un clone dello stato iniziale.}
  //   function handleSelectSquare(rowIndex, colIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ];
  //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedBoard;
  //     });
  //     // {sollevamento dello stato}
  //     onSelectSquare();
  //   }

  return (
    <>
      <ol id="game-board">
        {/* solo perchè non c'è una key nei dati ne uso una inventata  */}
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    disabled={playerSymbol !== null}
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
