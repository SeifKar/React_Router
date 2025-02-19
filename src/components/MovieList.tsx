import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';
import '../styles/MovieList.css';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
