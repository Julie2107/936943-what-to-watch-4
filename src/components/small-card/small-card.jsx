import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player.jsx";

const START_PLAY_TIMEOUT = 1000;

class MovieSmallCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;

    this.state = {
      isPlaying: false,
    };

    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleMouseHover = this._handleMouseHover.bind(this);
    this._handleMouseHoverOff = this._handleMouseHoverOff.bind(this);
  }

  _handleTitleClick(evt) {
    const {movie, onTitleClick} = this.props;

    evt.preventDefault();
    onTitleClick(movie);
  }

  _handleMouseHover() {
    const {movie, onMouseCardHover} = this.props;

    this._timeout = setTimeout(() => {
      this.setState({
        isPlaying: true,
      });
    }, START_PLAY_TIMEOUT);

    onMouseCardHover(movie);
  }

  _handleMouseHoverOff() {
    const {onMouseCardHoverOff} = this.props;

    clearTimeout(this._timeout);

    this.setState({
      isPlaying: false,
    });

    onMouseCardHoverOff();

  }

  render() {
    const {isPlaying} = this.state;
    const {movie} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseHover}
        onMouseLeave={this._handleMouseHoverOff}
      >
        <div className="small-movie-card__image" onClick={this._handleTitleClick}>

          <VideoPlayer
            isPlaying = {isPlaying}
            src={movie.src}
            poster={movie.poster}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title" onClick={this._handleTitleClick}>
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

/*
({movie, onMouseCardHover, onMouseCardHoverOff, onTitleClick}) => {
  const {poster, title} = movie;
  const handleMouseHover = () => onMouseCardHover(movie);
  const handleTitleClick = (evt) => {

  };


};*/

MovieSmallCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onMouseCardHover: PropTypes.func.isRequired,
  onMouseCardHoverOff: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MovieSmallCard;

