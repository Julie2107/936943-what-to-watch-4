import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieSmallCard from "../small-card/small-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: null,
    };

    this._onMouseCardHover = this._onMouseCardHover.bind(this);
    this._onMouseCardHoverOff = this._onMouseCardHoverOff.bind(this);
  }

  _onMouseCardHover(movie) {
    this.setState({
      currentCard: movie,
    });
  }

  _onMouseCardHoverOff() {
    this.setState({
      currentCard: null,
    });
  }

  _createCardsList(movies) {
    return movies.map((movie, i) => {

      return (
        <MovieSmallCard
          key={`${i}-${movie.title}`}
          movie={movie}
          onMouseCardHover={this._onMouseCardHover}
          onMouseCardHoverOff={this._onMouseCardHoverOff}
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
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default MoviesList;
