import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

import {PromoData, TITLES} from "../../consts.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movieTitles = {TITLES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
