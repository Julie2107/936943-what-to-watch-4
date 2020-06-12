import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const App = ({movieName, movieGenre, movieReleaseDate, movieTitles}) => {
  return (
    <Main
      movieName = {movieName}
      movieGenre = {movieGenre}
      movieReleaseDate = {movieReleaseDate}
      movieTitles = {movieTitles}
    />
  );
};

App.propTypes = {
  movieName: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieReleaseDate: PropTypes.number.isRequired,
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
