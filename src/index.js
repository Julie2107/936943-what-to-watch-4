import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";

import {PromoData} from "./consts.js";
import {reducer} from "./reducer/reducer.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        movieName = {PromoData.movieName}
        movieGenre = {PromoData.movieGenre}
        movieReleaseDate = {PromoData.movieReleaseDate}
      />,
    </Provider>,
    document.querySelector(`#root`)
);
