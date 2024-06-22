import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      <div className="movie-info">
        <div className="title-rating">
          <h3 className="title">{movie.title}</h3>
          <p className="rating">{movie.vote_average}</p>
        </div>
        <div className="movie-description">
          <p className="title">{movie.title}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
