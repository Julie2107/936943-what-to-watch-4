import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import {PromoData} from "./consts.js";
import {smallMovies} from "./mocks/films.js";


ReactDOM.render(
    <App
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movies = {smallMovies}
    />,
    document.querySelector(`#root`)
);
