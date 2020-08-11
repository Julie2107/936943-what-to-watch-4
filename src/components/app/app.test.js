import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const mockMovies = [
  {title: `Mindhunter`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Aviator`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Pulp Fiction`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Midnight Special`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``},
  {title: `No Country for Old Men`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []},
];

const mockMovie = {id: 2, title: `Mindhunter`, backgroundImage: ``, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, isFavorite: true};

const mockGenres = [`All genres`, `Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];


it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      currentGenre: `All genres`,
      shownMoviesNumber: 8,
    },
    [NameSpace.DATA]: {
      movies: mockMovies,
      movie: mockMovie,
      genresList: mockGenres,
      promoMovie: mockMovie,
      isError: false,
      isLoading: false,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      user: {
        email: ``,
        name: ``,
      }
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            movie={mockMovie}
            promoMovie={mockMovie}
            movies = {mockMovies}
            genresList = {mockGenres}
            onFilterChange = {() => {}}
            currentGenre = {`All genres`}
            shownMoviesNumber = {8}
            isLoading={false}
            isError={false}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
