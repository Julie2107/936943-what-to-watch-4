import React from "react";
import renderer from "react-test-renderer";

import FullScreenVideo from "./full-screen-video.jsx";

const movie = {
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  title: `Dogma`,
};

it(`FullScreen player rendered correctly`, () => {

  const tree = renderer.create(
      <FullScreenVideo
        movie={movie}
        onDeactivatePlayer={()=>{}}
        onPlayButtonClick={()=>{}}
        isPlaying={false}
        onFullScreenButtonClick={()=>{}}
        progress={0}
        duration={0}
      >
        <video/>
      </FullScreenVideo>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
