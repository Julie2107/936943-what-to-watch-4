import React from "react";
import renderer from "react-test-renderer";
import history from "../../history";
import {Router} from "react-router-dom";

import SignIn from "./sign-in.jsx";

it(`SignIn page is rendered correctly`, () => {

  const tree = renderer.create(
      <Router history={history}>
        <SignIn
          onSubmit={() => {}}
        />
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
