import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import '../styles/MovieCard.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <div className="rating">Rating: {movie.rating}/5</div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
