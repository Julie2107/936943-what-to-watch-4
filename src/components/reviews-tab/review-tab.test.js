import React from "react";
import renderer from "react-test-renderer";

import ReviewsTab from "./reviews-tab.jsx";

const comments = [
  {author: `Amanda Greever`,
    date: `November 18, 2015`,
    message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    rating: 2},
  {author: `Amanda Greever`,
    date: `November 18, 2015`,
    message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
    rating: 2},
];

it(`Render reviews tab`, () => {
  const tree = renderer
    .create(<ReviewsTab
      reviews = {comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
