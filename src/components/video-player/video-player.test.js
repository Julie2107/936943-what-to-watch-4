import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from "./video-player.jsx";

const movie = {
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`VideoPlayer is rendered correctly`, () => {

  const tree = renderer.create(
      <VideoPlayer
        isPlaying={false}
        src={movie.src}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});

