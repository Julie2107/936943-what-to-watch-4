import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space.js";
import history from "../../history";
import {Router} from "react-router-dom";

const mockStore = configureStore([]);

const mockMovie = {id: 1, backgroundImage: ``, backgroundColor: ``, isFavorite: true, title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``};


const mockMovies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, id: 0},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, id: 1},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, id: 2},
  {title: `Midnight Special`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, id: 3},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, id: 4},
];

const mockReviews = [{userId: 0, author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 1,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2},
{userId: 1, author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 2,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2}];

it(`Render movie-page`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      currentGenre: `All genres`,
    },
    [NameSpace.DATA]: {
      movies: mockMovies,
      promoMovie: mockMovie,
      reviews: mockReviews,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`
    }
  });
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePage
              movie={mockMovie}
              movies={mockMovies}
              reviews={mockReviews}
              onTitleClick={()=>{}}
              authorizationStatus={`AUTH`}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
