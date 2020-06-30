import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

import {PromoData} from "../../consts.js";

const movies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`},
  {title: `Midnight Special`, poster: `http://placekitten.com/245/175`},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`},
  {title: `No Country for Old Men`, poster: `http://placekitten.com/245/175`},
  {title: `Orlando`, poster: `http://placekitten.com/245/175`},
  {title: `Macbeth`, poster: `http://placekitten.com/245/175`},
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieName = {PromoData.movieName}
      movieGenre = {PromoData.movieGenre}
      movieReleaseDate = {PromoData.movieReleaseDate}
      movies = {movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
