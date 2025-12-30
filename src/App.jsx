import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import pokemonLogo from "./imgs/International_Pokemon_logo.svg";

function App() {
  const [gameInfo, setGameInfo] = useState({
    selectedCardIds: [],
    score: 0,
    bestScore: 0,
  });

  return (
    <>
      <div className="header">
        <div className="title-logo">
          <img src={pokemonLogo} loading="lazy" />
        </div>
        <div className="score-board">
          <p>Score: {gameInfo.score}</p>
          <p>Best Score: {gameInfo.bestScore}</p>
        </div>
      </div>
      <GameBoard gameInfo={gameInfo} setGameInfo={setGameInfo} />
    </>
  );
}

export default App;
