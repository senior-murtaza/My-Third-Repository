import { useState } from "react";
import "./App.css";

const movieData = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 8.7,
  },
  {
    id: 2,
    title: "Titanic",
    genre: "Romance",
    rating: 7.9,
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    rating: 9.0,
  },
  {
    id: 4,
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
  },
  {
    id: 5,
    title: "The Hangover",
    genre: "Comedy",
    rating: 7.7,
  },
  {
    id: 6,
    title: "The Conjuring",
    genre: "Horror",
    rating: 7.5,
  },
  {
    id: 7,
    title: "Gladiator",
    genre: "Action",
    rating: 8.5,
  },
  {
    id: 8,
    title: "The Pursuit of Happyness",
    genre: "Drama",
    rating: 8.0,
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("default");
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(movie) {
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (alreadyFavorite) {
      setFavorites(
        favorites.filter((favorite) => favorite.id !== movie.id)
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  let filteredMovies = movieData.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  if (sort === "rating-high") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "rating-low") {
    filteredMovies = [...filteredMovies].sort(
      (a, b) => a.rating - b.rating
    );
  }

  if (sort === "title") {
    filteredMovies = [...filteredMovies].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🎬 Movie Finder</h1>
        <div className="favorites-count">
          ❤️ Favorites: {favorites.length}
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="rating-high">Rating: High → Low</option>
          <option value="rating-low">Rating: Low → High</option>
          <option value="title">Title: A → Z</option>
        </select>
      </div>

      <p className="result-count">
        Showing {filteredMovies.length} movies
      </p>

      <div className="movie-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => {
            const isFavorite = favorites.some(
              (favorite) => favorite.id === movie.id
            );

            return (
              <div className="movie-card" key={movie.id}>
                <h2>{movie.title}</h2>

                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>

                <p>
                  <strong>Rating:</strong> ⭐ {movie.rating}
                </p>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className={isFavorite ? "favorite" : ""}
                >
                  {isFavorite
                    ? "❤️ Remove Favorite"
                    : "🤍 Add to Favorites"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="no-results">No movies found.</p>
        )}
      </div>

      {favorites.length > 0 && (
        <section className="favorites-section">
          <h2>Your Favorites</h2>

          <div className="favorite-list">
            {favorites.map((movie) => (
              <span key={movie.id}>
                {movie.title}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;