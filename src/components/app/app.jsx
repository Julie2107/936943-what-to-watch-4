import React from "react";
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieName, movieGenre, movieReleaseDate} = props;
  return (
    <Main
      movieName = {movieName}
      movieGenre = {movieGenre}
      movieReleaseDate = {movieReleaseDate}
    />
  );
};

export default App;
