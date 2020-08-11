import React from "react";
import renderer from "react-test-renderer";
import history from "../../history";
import {Router} from "react-router-dom";
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";
import AddReview from "./add-review.jsx";

const mockStore = configureStore([]);

const mockMovie = {id: 1, backgroundImage: ``, title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``};

it(`Render Add Review`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      sendingReviewStatus: false,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
    }
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              movie={mockMovie}
              onFormSubmit={()=>{}}
              onRatingChange={()=>{}}
              onCommentChange={()=>{}}
              isSending={false}
              isValid={true}
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
