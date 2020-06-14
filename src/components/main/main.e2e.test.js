import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";
import {PromoData, TITLES} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card title clicked`, () => {
  const titleClickHandler = jest.fn();

  const mainPage = shallow(
      <Main
        movieName = {PromoData.movieName}
        movieGenre = {PromoData.movieGenre}
        movieReleaseDate = {PromoData.movieReleaseDate}
        movieTitles = {TITLES}
        titleClickHandler = {titleClickHandler}
      />
  );

  const cardTitles = mainPage.find(`small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(titleClickHandler.mock.calls.length).toBe(cardTitles.length);
});
