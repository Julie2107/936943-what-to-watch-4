import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const mockGenres = [`All genres`, `Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];

it(`GenresList rendered correctly`, () => {
  const tree = renderer
    .create(<GenresList
      genresList = {mockGenres}
      onFilterChange = {() => {}}
      currentGenre = {`All genres`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
