import GameBoard from "./Components/Gameboard";
import Player from "./Components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName={"Player 1"} symbol={"X"}></Player>
          <Player initialName={"Player 2"} symbol={"O"}></Player>
        </ol>
        <GameBoard></GameBoard>
      </div>
    </main>
  );
}

export default App;
