import React from "react";
import renderer from "react-test-renderer";
import MovieSmallCard from "./small-card.jsx";

const movie = {
  title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`
};

it(`Render moviesmallcard`, () => {
  const tree = renderer
    .create(<MovieSmallCard
      movie={movie}
      onTitleClick={()=>{}}
      onMouseCardHover={()=>{}}
      onMouseCardHoverOff={()=>{}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
