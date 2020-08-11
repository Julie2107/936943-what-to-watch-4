import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../consts.js";

class MovieSmallCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  _handleTitleClick(evt) {
    const {movie, onTitleClick} = this.props;

    evt.preventDefault();
    onTitleClick(movie);
  }

  render() {
    const {movie, isPlaying, onMouseHover, onMouseHoverOff} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onMouseEnter={onMouseHover}
        onMouseLeave={onMouseHoverOff}
      >
        <div className="small-movie-card__image" onClick={this._handleTitleClick}>

          <VideoPlayer
            className="player__video"
            isPlaying = {isPlaying}
            src={movie.src}
            poster={movie.poster}
            muted={true}
          />
        </div>
        <h3 className="small-movie-card__title" onClick={this._handleTitleClick}>
          <Link className="small-movie-card__link" to={`${AppRoute.MOVIE}/${movie.id}`}>
            {movie.title}
          </Link>
        </h3>
      </article>
    );
  }
}

MovieSmallCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseHover: PropTypes.func.isRequired,
  onMouseHoverOff: PropTypes.func.isRequired
};

export default MovieSmallCard;

