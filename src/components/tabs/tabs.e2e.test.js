import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs.jsx";

const reviews = [];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Tab title clicked`, () => {
  const onTabClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const tabs = shallow(
      <Tabs
        onTabClick={onTabClick}
        activeTab={`Overview`}
        reviews={reviews}
      />
  );

  const tabsLinks = tabs.find(`.movie-nav__link`);

  tabsLinks.forEach((link) => link.simulate(`click`, mockEvent));

  expect(onTabClick.mock.calls.length).toBe(tabsLinks.length);
});
