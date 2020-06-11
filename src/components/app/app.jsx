import React from "react";

import Main from "../main/main.jsx";

// eslint-disable-next-line react/prop-types
const App = ({movieName, movieGenre, movieReleaseDate}) => {
  return (
    <Main
      movieName = {movieName}
      movieGenre = {movieGenre}
      movieReleaseDate = {movieReleaseDate}
    />
  );
};

export default App;
