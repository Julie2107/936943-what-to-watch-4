import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";

const mockMovie = {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``};

const reviews = [{author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 1,
  userId: 1,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2},
{author: `Amanda Greever`,
  date: `November 18, 2015`,
  id: 2,
  userId: 2,
  message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rating: 2}];

it(`Render tabs`, () => {
  const tree = renderer
    .create(<Tabs
      onTabClick={() => {}}
      activeTab={`Overview`}
      movie={mockMovie}
      reviews={reviews}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
