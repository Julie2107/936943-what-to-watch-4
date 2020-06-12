import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import {PromoData, TITLES} from "./consts.js";

ReactDOM.render(
    <App
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movieTitles = {TITLES}
    />,
    document.querySelector(`#root`)
);
