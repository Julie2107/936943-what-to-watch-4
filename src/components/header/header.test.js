import React from "react";
import renderer from "react-test-renderer";
import history from "../../history";
import {Router} from "react-router-dom";
import configureStore from 'redux-mock-store';

import Header from "./header";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Render header`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: false,
    }
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <Header
              authorizationStatus={false}
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
