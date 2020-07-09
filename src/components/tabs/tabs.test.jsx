import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";


it(`Render movieslist`, () => {
  const tree = renderer
    .create(<Tabs
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
