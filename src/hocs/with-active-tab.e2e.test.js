import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from 'prop-types';

import withActiveTab from "./with-active-tab.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = ({onTabClick}) => {
  return (
    <div>
      <a onClick={onTabClick} className="movie-nav__link">Overview</a>
      <a onClick={onTabClick} className="movie-nav__link">Details</a>
      <a onClick={onTabClick} className="movie-nav__link">Reviews</a>
    </div>
  );
};

MockComponent.propTypes = {
  onTabClick: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`Tablink should be clicked`, () => {
  const onTabClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const tabNav = shallow(
      <MockComponentWrapped
        onTabClick={onTabClick}
      />
  );

  const tabLinks = tabNav.find(`.movie-nav__link`);

  tabLinks.forEach((link) => link.simulate(`click`, mockEvent));

  expect(onTabClick).toHaveBeenCalledTimes(tabLinks.length);

});

it(`onTabClick gets equal state`, () => {
  const onTabClick = jest.fn();

  const tabNav = mount(
      <MockComponentWrapped
        onTabClick={onTabClick}
      />
  );

  const tabLink = tabNav.find(`.movie-nav__link`).at(0);

  tabLink.simulate(`click`);

  expect(tabNav.state().currentTab.target.textContent).toEqual(`Overview`);

});

