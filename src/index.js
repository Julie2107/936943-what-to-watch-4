import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";

import {PromoData} from "./consts.js";
import {smallMovies} from "./mocks/films.js";
import {reducer} from "./reducer.js";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        movieName = {PromoData.movieName}
        movieGenre = {PromoData.movieGenre}
        movieReleaseDate = {PromoData.movieReleaseDate}
        movies = {smallMovies}
      />,
      document.querySelector(`#root`)
    </Provider>
);
