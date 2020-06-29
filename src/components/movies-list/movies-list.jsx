import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieSmallCard from "../small-card/small-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

  }

  _createCardsList(movies) {
    return movies.map((movie, i) => {

      return (
        <MovieSmallCard
          key={`${i}-${movie.title}`}
          movie={movie}
        //  onMouseHover={onMouseHover}
        />
      );
    });
  }

  render() {
    const {movies} = this.props;
    return (
      <div className="catalog__movies-list">
        {this._createCardsList(movies)}
      </div>
    )
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
 // onMouseHover: PropTypes.func.isRequired,
};

export default MoviesList;
