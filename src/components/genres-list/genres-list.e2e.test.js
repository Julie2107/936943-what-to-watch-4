import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenresList from "./genres-list.jsx";

const mockGenres = [`All genres`, `Drama`, `Comedy`, `Thriller`, `Fantasy`, `Horror`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Link click gets the right value`, () => {
  const onFilterChange = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const filterMenu = shallow(
      <GenresList
        genresList = {mockGenres}
        onFilterChange = {onFilterChange}
        currentGenre = {`All genres`}
      />
  );

  const menuLinks = filterMenu.find(`.catalog__genres-link`);

  menuLinks.forEach((link) => link.simulate(`click`, mockEvent));

  expect(onFilterChange.mock.calls.length).toBe(menuLinks.length);
});
