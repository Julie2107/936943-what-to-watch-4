import React from "react";
import renderer from "react-test-renderer";
import DetailsTab from "./details-tab.jsx";

const movie = {title: `Mindhunter`, poster: `http://placekitten.com/245/175`, cover: `img/bg-the-grand-budapest-hotel.jpg`, genre: `drama`, releaseYear: 2000, src: ``, rating: 5, ratingNumber: 100, ratingValue: ``, starring: [``, `1`, `3`], director: ``, reviews: []};

it(`Render details tab`, () => {
  const tree = renderer
    .create(<DetailsTab
      movie = {movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
