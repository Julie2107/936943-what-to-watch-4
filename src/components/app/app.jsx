import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = ({movieName, movieGenre, movieReleaseDate, movies}) => {
  return (
    <Main
      movieName = {movieName}
      movieGenre = {movieGenre}
      movieReleaseDate = {movieReleaseDate}
      onTitleClick = {titleClickHandler}
      movies = {movies}
    />
  );
};

App.propTypes = {
  movieName: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieReleaseDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
