import { useState, useEffect } from "react";
import Card from "./Card";

function GameBoard({ gameInfo, setGameInfo }) {
  const [gameCount, setGameCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    function generateFewUniqueRandoms(count, min, max) {
      const uniqueSet = new Set();
      while (uniqueSet.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueSet.add(randomNumber);
      }
      return Array.from(uniqueSet);
    }

    async function fetchAllPokemon() {
      const idArray = generateFewUniqueRandoms(10, 1, 151);
      try {
        const promises = idArray.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
            res.json(),
          ),
        );
        const results = await Promise.all(promises);
        const formattedPokemon = results.map((data) => ({
          id: data.id,
          name: data.name,
        }));
        setPokemonList(formattedPokemon);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchAllPokemon();
  }, [gameCount]);

  const selectCard = (id) => {
    console.log(id);
    setGameInfo({
      ...gameInfo,
      selectedCardIds: [...gameInfo.selectedCardIds, id],
    });
  };

  return (
    <div className="game-board">
      {pokemonList.map((pokemonInfo) => (
        <Card
          key={pokemonInfo.id}
          pokemonInfo={pokemonInfo}
          selectCard={selectCard}
        />
      ))}
    </div>
  );
}

export default GameBoard;
