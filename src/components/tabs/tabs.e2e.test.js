import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});


it(`Tablink should be clicked`, () => {
  const onTabClick = jest.fn();

  const mockEvent = {
    preventDefault() {}
  };

  const tabNav = shallow(
      <Tabs
        onTabClick={onTabClick}
        activeTab={``}
      />
  );

  const tabLinks = tabNav.find(`.movie-nav__link`);

  tabLinks.forEach((link) => link.simulate(`click`, mockEvent));

  expect(onTabClick).toHaveBeenCalledTimes(tabLinks.length);

});
