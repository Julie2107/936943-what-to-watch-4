import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import Main from "./main.jsx";
import {PromoData} from "../../consts.js";

const mockStore = configureStore([]);

const mockMovies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`},
  {title: `Midnight Special`, poster: `http://placekitten.com/245/175`},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`},
  {title: `No Country for Old Men`, poster: `http://placekitten.com/245/175`},
  {title: `Orlando`, poster: `http://placekitten.com/245/175`},
  {title: `Macbeth`, poster: `http://placekitten.com/245/175`},
];

const mockGenres = [`All genres`, `Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Movie card title clicked`, () => {
  const store = mockStore({
    currentGenre: `All genres`,
    movies: mockMovies,
    genresList: mockGenres,
    shownMoviesNumber: 8,
  });
  const onTitleClick = jest.fn();

  const mainPage = shallow(
      <Provider store={store}>
        <Main
          movieName = {PromoData.movieName}
          movieGenre = {PromoData.movieGenre}
          movieReleaseDate = {PromoData.movieReleaseDate}
          movies = {mockMovies}
          onTitleClick = {onTitleClick}
          genresList = {mockGenres}
          onFilterChange = {() => {}}
          currentGenre = {`All genres`}
          onButtonClick = {() => {}}
          shownMoviesNumber = {8}
        />
      </Provider>
  );

  const cardTitles = mainPage.find(`small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(onTitleClick.mock.calls.length).toBe(cardTitles.length);
});
