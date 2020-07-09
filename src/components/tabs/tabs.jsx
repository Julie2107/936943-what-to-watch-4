import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="movie-nav__list">
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link movie-nav__item--active">Overview</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Details</a>
        </li>
        <li className="movie-nav__item">
          <a href="#" className="movie-nav__link">Reviews</a>
        </li>
      </ul>
    );
  }
}

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
};
