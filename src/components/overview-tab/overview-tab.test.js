import React from "react";
import renderer from "react-test-renderer";
import OverviewTab from "./overview-tab.jsx";

const movie = {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []};

it(`Render Overview tab`, () => {
  const tree = renderer
    .create(<OverviewTab
      movie = {movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
