import { useState } from "react";
import "./App.css";

function App() {
  const [gameInfo, setGameInfo] = useState({
    cardIds: [],
    score: 0,
    bestScore: 0,
  });

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Pokemon Game</h1>
        </div>
        <div className="score-board">
          <p>Score: {gameInfo.score}</p>
          <p>Best Score: {gameInfo.bestScore}</p>
        </div>
      </div>
      <div className="game-board"></div>
    </>
  );
}

export default App;
