import { useState } from "react";
import Home from "./Home.jsx";
import "./App.css";

function App() {
  const [games, setGames] = useState([
    { id: 1, name: "Minecraft", category: "Adventure", favorite: false },
    { id: 2, name: "GTA V", category: "Action", favorite: false },
    { id: 3, name: "FIFA 25", category: "Sports", favorite: false },
  ]);

  const [search, setSearch] = useState("");

  function toggleFavorite(id) {
    setGames(
      games.map((game) =>
        game.id === id
          ? { ...game, favorite: !game.favorite }
          : game
      )
    );
  }

  function deleteGame(id) {
    setGames(games.filter((game) => game.id !== id));
  }

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const favoriteCount = games.filter((game) => game.favorite).length;

  return (
    <div className="app">
      <nav>
        <h2>🎮 Game Library</h2>

        <div className="nav-buttons">
          <button>Home</button>
          <button>Games ({games.length})</button>
          <button>Favorites ({favoriteCount})</button>
        </div>
      </nav>

      <Home />

      <section className="games-section">
        <h2>My Games</h2>

        <input
          className="search"
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="games">
          {filteredGames.map((game) => (
            <div className="game-card" key={game.id}>
              <h3>{game.name}</h3>

              <p>{game.category}</p>

              <button onClick={() => toggleFavorite(game.id)}>
                {game.favorite ? "❤️ Favorite" : "🤍 Favorite"}
              </button>

              <button
                className="delete-button"
                onClick={() => deleteGame(game.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <p className="no-games">No games found.</p>
        )}
      </section>
    </div>
  );
}

export default App;

