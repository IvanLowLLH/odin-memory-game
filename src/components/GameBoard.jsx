import { useState, useEffect } from "react";

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
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        }));
        setPokemonList(formattedPokemon);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchAllPokemon();
  }, [gameCount]);

  return (
    <div className="game-board">
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id} className="game-card">
          <img src={pokemon.image} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
