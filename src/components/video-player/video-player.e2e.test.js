import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import VideoPlayer from "./video-player.jsx";

const movie = {
  poster: `http://placekitten.com/245/175`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`VideoPlayer has isPlaying state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={movie.src}
        poster={movie.poster}
        muted={true}
        isPlaying={true}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(true);
});

it(`VideoPlayer isPlaying state is false`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        src={movie.src}
        poster={movie.poster}
        muted={true}
        isPlaying={false}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(false);
});
