import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";


it(`Render movieslist`, () => {
  const tree = renderer
    .create(<Tabs
      onTabClick={() => {}}
      activeTab={`Overview`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
