import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const mockMovies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Midnight Special`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``},
  {title: `No Country for Old Men`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Orlando`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Macbeth`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
];

const movie = {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: [{author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 1,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2},
{author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 2,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2}]};

const mockGenres = [`All genres`, `Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];

it(`Render Main`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      shownMoviesNumber: 8,
      genresList: mockGenres,
    },
    [NameSpace.DATA]: {
      movies: mockMovies,
      promoMovie: movie,
    }
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            promoMovie={movie}
            movies = {mockMovies}
            onTitleClick = {() => {}}
            genresList = {mockGenres}
            onFilterChange = {() => {}}
            currentGenre = {`All genres`}
            onButtonClick = {() => {}}
            shownMoviesNumber = {8}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
