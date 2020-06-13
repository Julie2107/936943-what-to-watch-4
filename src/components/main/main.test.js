import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

import {PromoData, TITLES} from "../../consts.js";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movieTitles = {TITLES}
      titleClickHandler = {() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
