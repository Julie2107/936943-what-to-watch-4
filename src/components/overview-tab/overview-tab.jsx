import React from "react";
import PropTypes from "prop-types";

const OverviewTab = ({movie}) => {
  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{movie.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{movie.ratingValue}</span>
          <span className="movie-rating__count">{movie.ratingNumber} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{movie.description}</p>

        <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
      </div>
    </>
  );
};

OverviewTab.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratingNumber: PropTypes.number.isRequired,
      ratingValue: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string.isRequired),
      director: PropTypes.string.isRequired,
    })
  ]),
};

export default OverviewTab;
