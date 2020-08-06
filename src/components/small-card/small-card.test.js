import React from "react";
import renderer from "react-test-renderer";
import MovieSmallCard from "./small-card.jsx";
import {Router} from "react-router-dom";
import history from "../../history";

const movie = {
  title: `Pulp Fiction`,
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`Render moviesmallcard`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieSmallCard
            movie={movie}
            onTitleClick={()=>{}}
            onMouseHover={()=>{}}
            onMouseHoverOff={()=>{}}
            isPlaying={false}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
