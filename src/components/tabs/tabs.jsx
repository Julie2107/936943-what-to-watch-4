import React from "react";
import PropTypes from "prop-types";
import {TabType} from "../../consts";

import OverviewTab from "../overview-tab/overview-tab.jsx";
import DetailsTab from "../details-tab/details-tab.jsx";
import ReviewsTab from "../reviews-tab/reviews-tab.jsx";


const Tabs = ({onTabClick, activeTab, movie}) => {
  const tabValues = Object.values(TabType);

  const tabClickHandler = (value) => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(value);
    };
  };

  const renderTab = (currentTab) => {

    const TabPages = {
      Overview:
        <OverviewTab
          movie = {movie}
        />,
      Details:
        <DetailsTab
          movie={movie}
        />,
      Reviews:
        <ReviewsTab
          reviews={movie.reviews}
        />
    };

    return TabPages[currentTab];
  };

  const renderTabLink = (value, i) => {
    const tabClassName = `movie-nav__item ${value === activeTab ? `movie-nav__item--active` : ``}`;
    const navKey = value + i;

    return (
      <li key={navKey} className={tabClassName}>
        <a href="#" className="movie-nav__link"
          onClick={tabClickHandler(value)}
        >{value}</a>
      </li>
    );
  };

  const renderTabsList = () => tabValues.map(renderTabLink);

  return (
    <div className="movie-card__desc">

      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {renderTabsList()}
        </ul>
      </nav>
      {renderTab(activeTab)}
    </div>
  );
};

Tabs.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratingNumber: PropTypes.number.isRequired,
      ratingValue: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string.isRequired),
      director: PropTypes.string.isRequired,
    })
  ]),
  onTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default Tabs;
