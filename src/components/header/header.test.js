import React from "react";
import renderer from "react-test-renderer";
import history from "../../history";
import {Router} from "react-router-dom";

import Header from "./header";

it(`Render header`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
