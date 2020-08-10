import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieSmallCard from "./small-card.jsx";

const movie = {
  id: 2,
  title: `Pulp Fiction`,
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Card title clicked`, () => {
  const onTitleClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const card = shallow(
      <MovieSmallCard
        movie={movie}
        onTitleClick={onTitleClick}
        onMouseHover={()=>{}}
        onMouseHoverOff={()=>{}}
        isPlaying={false}
      />
  );

  const cardTitle = card.find(`.small-movie-card__title`);

  cardTitle.simulate(`click`, mockEvent);

  expect(onTitleClick).toHaveBeenCalledTimes(1);
});
