import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieSmallCard from "./small-card.jsx";

const movie = {
  title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`MovieCardHover gets info`, () => {
  const onMouseCardHover = jest.fn();

  const smallMovieCard = shallow(
      <MovieSmallCard
        movie = {movie}
        onMouseCardHover={onMouseCardHover}
        onMouseCardHoverOff={() => {}}
        onTitleClick={() => {}}
      />
  );

  smallMovieCard.simulate(`mouseEnter`, movie);
  expect(onMouseCardHover).toHaveBeenCalledTimes(1);
  expect(onMouseCardHover.mock.calls[0][0]).toBe(movie);
});
