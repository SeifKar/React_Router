import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import '../styles/MovieDetail.css';

interface MovieDetailProps {
    movies: Movie[];
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movies }) => {
    const { id } = useParams<{ id: string }>();
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return (
            <div className="movie-detail-error">
                <h2>Movie not found</h2>
                <Link to="/" className="back-button">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="movie-detail">
            <div className="movie-detail-header">
                <Link to="/" className="back-button">← Back to Home</Link>
                <h1>{movie.title}</h1>
            </div>
            
            <div className="movie-detail-content">
                <div className="movie-detail-info">
                    <img src={movie.posterURL} alt={movie.title} className="movie-detail-poster" />
                    <div className="movie-detail-text">
                        <div className="rating">Rating: {movie.rating}/5</div>
                        <p className="long-description">{movie.longDescription}</p>
                    </div>
                </div>
                
                <div className="movie-trailer">
                    <h2>Trailer</h2>
                    <div className="video-container">
                        <iframe
                            src={movie.trailerURL}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
