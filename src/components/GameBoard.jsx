import { useState, useEffect } from "react";
import Card from "./Card";

function GameBoard({ gameInfo, setGameInfo }) {
  const [gameCount, setGameCount] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
          type: data.types[0].type.name,
        }));
        setPokemonList(formattedPokemon);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllPokemon();
  }, [gameCount]);

  const shuffleArray = (array) => {
    // Create a shallow copy of the array to avoid mutating the original array
    const newArr = [...array];
    let currentIndex = newArr.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element using array destructuring.
      [newArr[currentIndex], newArr[randomIndex]] = [
        newArr[randomIndex],
        newArr[currentIndex],
      ];
    }

    return newArr;
  };

  const selectCard = (id) => {
    if (gameInfo.selectedCardIds.includes(id)) {
      // Restart tracked ids and scores
      setGameInfo({
        ...gameInfo,
        selectedCardIds: [],
        score: 0,
        bestScore: Math.max(gameInfo.score, gameInfo.bestScore),
      });
      // Restarts pokemon list
      setGameCount(gameCount + 1);
    } else {
      // Update tracked ids and score
      setGameInfo({
        ...gameInfo,
        selectedCardIds: [...gameInfo.selectedCardIds, id],
        score: gameInfo.score + 1,
      });
      // Shuffle array
      setPokemonList(shuffleArray(pokemonList));
    }
  };
  if (loading) return <div>Loading Pokemon...</div>;

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
