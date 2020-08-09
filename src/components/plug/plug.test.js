import React from "react";
import renderer from "react-test-renderer";
import Plug from "./plug";

it(`Render plug`, () => {
  const tree = renderer
  .create(
      <Plug
        title={`some title`}
      />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
