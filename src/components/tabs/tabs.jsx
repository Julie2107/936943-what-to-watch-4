import React from "react";
import PropTypes from "prop-types";
import {TabType} from "../../consts";

const Tabs = ({onTabClick, activeTab}) => {
  const tabValues = Object.values(TabType);

  const tabClickHandler = (evt, value) => {
    evt.preventDefault();
    onTabClick(value);
  };


  const renderTab = (value, i) => {
    const tabClassName = `movie-nav__item ${value === activeTab ? `movie-nav__item--active` : ``}`;

    return (
      <li key={value + i} className={tabClassName}>
        <a href="#" className="movie-nav__link" onClick={
          (evt) => {
            tabClickHandler(evt, value);
          }
        }>{value}</a>
      </li>
    );
  };

  const renderTabsList = () => {

    return tabValues.map((value, i) => {

      return renderTab(value, i);
    });
  };

  return (
    <ul className="movie-nav__list">
      {renderTabsList()}
    </ul>
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
