import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

const movie = {
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  genre: `Horror`,
  poster: `img/snatch.jpg`,
  releaseYear: 2016,
  title: `Snatch`,
};

const movies = [
  {title: `Mindhunter`, poster: `http://placekitten.com/245/175`},
  {title: `Aviator`, poster: `http://placekitten.com/245/175`},
  {title: `Pulp Fiction`, poster: `http://placekitten.com/245/175`},
  {title: `Midnight Special`, poster: `http://placekitten.com/245/175`},
  {title: `Fantastic Beasts: The Crimes of Grindelwald`, poster: `http://placekitten.com/245/175`},
  {title: `No Country for Old Men`, poster: `http://placekitten.com/245/175`},
  {title: `Orlando`, poster: `http://placekitten.com/245/175`},
  {title: `Macbeth`, poster: `http://placekitten.com/245/175`},
];

it(`Render movie-page`, () => {
  const tree = renderer
    .create(<MoviePage
      movie={movie}
      movies={movies}
      onTitleClick={()=>{}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
