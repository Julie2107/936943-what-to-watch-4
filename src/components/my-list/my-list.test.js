import React from "react";
import renderer from "react-test-renderer";
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space";
import MyList from "./my-list";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history";

const mockStore = configureStore([]);

const mocks = [
  {id: 0, title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 1, title: `Aviator`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 2, title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 3, title: `Midnight Special`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 4, title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``},
  {id: 5, title: `No Country for Old Men`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 6, title: `Orlando`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
  {id: 7, title: `Macbeth`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``},
];

it(`Render myList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      myListMovies: mocks,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      isAuthError: false
    }
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MyList
              movies={store.movies}
              onTitleClick={() => {}}
              authorizationStatus={`AUTH`}
              isAuthError={false}
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
