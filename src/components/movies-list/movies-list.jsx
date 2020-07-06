import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieSmallCard from "../small-card/small-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: null,
    };

    this._handleCardHover = this._handleCardHover.bind(this);
    this._handleCardHoverOff = this._handleCardHoverOff.bind(this);
  }

  _handleCardHover(movie) {
    this.setState({
      currentCard: movie,
    });
  }

  _handleCardHoverOff() {
    this.setState({
      currentCard: null,
    });
  }

  _getMovie(movie, i, onTitleClick) {
    const keyValue = `${i}-${movie.title}`;

    return (
      <MovieSmallCard
        key={keyValue}
        movie={movie}
        onMouseCardHover={this._handleCardHover}
        onMouseCardHoverOff={this._handleCardHoverOff}
        onTitleClick={onTitleClick}
      />
    );
  }

  _renderMovies(movies, onTitleClick) {

    return movies.map((movie, i) => this._getMovie(movie, i, onTitleClick));
  }

  render() {
    const {movies, onTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {this._renderMovies(movies, onTitleClick)}
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
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
