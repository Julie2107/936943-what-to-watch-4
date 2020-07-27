import React from "react";
import PropTypes from "prop-types";

import MovieSmallCard from "../small-card/small-card.jsx";
// import withPlayer from "../../hocs/with-video-player.js";

// const WrappedSmallCard = withPlayer(MovieSmallCard);

const MoviesList = ({movies, onTitleClick}) => {

  const getMovie = (movie, i) => {
    const keyValue = `${i}-${movie.title}`;

    return (
      <MovieSmallCard
        key={keyValue}
        movie={movie}
        onTitleClick={onTitleClick}
      />
    );
  };

  const renderMovies = () => movies.map((movie, i) => getMovie(movie, i, onTitleClick));

  return (
    <div className="catalog__movies-list">
      {renderMovies(movies, onTitleClick)}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
