import React from "react";
import renderer from "react-test-renderer";
import history from "../../history";
import {Router} from "react-router-dom";
import configureStore from 'redux-mock-store';

import SignIn from "./sign-in.jsx";
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`SignIn page is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
    }
  });
  const tree = renderer.create(
      <Router history={history}>
        <Provider store={store}>
          <SignIn
            onSubmit={() => {}}
            authorizationStatus={false}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
