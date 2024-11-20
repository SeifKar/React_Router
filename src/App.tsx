import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Filter from './components/Filter';
import { Movie } from './types/movie';
import './App.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: "1",
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      longDescription: "Dom Cobb (Leonardo DiCaprio) is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he loves. Now Cobb is being offered a chance at redemption.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
      rating: 5
    },
    {
      id: "2",
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      longDescription: "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism. As the citizens of Gotham try to deal with the chaos the Joker has caused, Batman must come face to face with one of the greatest psychological and physical tests of his ability to fight injustice.",
      posterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
      rating: 5
    }
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState<Movie>({
    id: "",
    title: "",
    description: "",
    longDescription: "",
    posterURL: "",
    trailerURL: "",
    rating: 1
  });

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    movie.rating >= ratingFilter
  );

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    const movieWithId = {
      ...newMovie,
      id: (movies.length + 1).toString()
    };
    setMovies([...movies, movieWithId]);
    setNewMovie({
      id: "",
      title: "",
      description: "",
      longDescription: "",
      posterURL: "",
      trailerURL: "",
      rating: 1
    });
    setShowAddForm(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header">
                <h1>Movie Collection</h1>
                <button 
                  className="add-movie-btn"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? 'Cancel' : 'Add New Movie'}
                </button>
              </header>

              {showAddForm && (
                <form onSubmit={handleAddMovie} className="add-movie-form">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Short Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                    required
                  />
                  <textarea
                    placeholder="Long Description"
                    value={newMovie.longDescription}
                    onChange={(e) => setNewMovie({...newMovie, longDescription: e.target.value})}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Poster URL"
                    value={newMovie.posterURL}
                    onChange={(e) => setNewMovie({...newMovie, posterURL: e.target.value})}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Trailer URL (YouTube Embed)"
                    value={newMovie.trailerURL}
                    onChange={(e) => setNewMovie({...newMovie, trailerURL: e.target.value})}
                    required
                  />
                  <select
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({...newMovie, rating: Number(e.target.value)})}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                  <button type="submit">Add Movie</button>
                </form>
              )}

              <Filter
                onTitleChange={setTitleFilter}
                onRatingChange={setRatingFilter}
              />
              <MovieList movies={filteredMovies} />
            </>
          } />
          <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
