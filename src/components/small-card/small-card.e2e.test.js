import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieSmallCard from "./small-card.jsx";

const movie = {
  title: `Pulp Fiction`,
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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


it(`onTitleClick works`, () => {
  const onTitleClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const smallMovieCard = shallow(
      <MovieSmallCard
        movie = {movie}
        onMouseCardHover={() => {}}
        onMouseCardHoverOff={() => {}}
        onTitleClick={onTitleClick}
      />
  );

  const cardTitle = smallMovieCard.find(`.small-movie-card__title`);

  cardTitle.simulate(`click`, mockEvent);
  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
