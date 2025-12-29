function Card({ pokemonInfo, selectCard }) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`;
  const fallbackImage =
    "https://www.pngmart.com/files/22/Unown-Pokemon-PNG-Isolated-HD-Pictures.png";

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="game-card" onClick={() => selectCard(pokemonInfo.id)}>
      <div className="image-container">
        <img
          loading="lazy"
          src={image}
          alt={pokemonInfo.name}
          onError={handleImageError}
        />
      </div>
      <p style={{ textTransform: "capitalize" }}>{pokemonInfo.name}</p>
    </div>
  );
}

export default Card;
