import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import {PromoData} from "./consts.js";
import {generateMovies} from "./mocks/films.js";

const MOVIES_COUNT = 8;

const smallMovies = generateMovies(MOVIES_COUNT);

console.log(smallMovies);

ReactDOM.render(
    <App
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movies = {smallMovies}
    />,
    document.querySelector(`#root`)
);
