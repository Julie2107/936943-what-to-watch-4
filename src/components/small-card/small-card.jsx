import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player.jsx";

class MovieSmallCard extends PureComponent {
  constructor(props) {
    super(props);

    // this._timeout = null;

    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  _handleTitleClick(evt) {
    const {movie, onTitleClick} = this.props;

    evt.preventDefault();
    onTitleClick(movie);
  }


  /* _handleMouseHoverOff() {
    const {} = this.props;

    clearTimeout(this._timeout);

    onMouseLeave();
  }*/

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
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

MovieSmallCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onMouseCardHover: PropTypes.func.isRequired,
  onMouseCardHoverOff: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseHover: PropTypes.func.isRequired,
  onMouseHoverOff: PropTypes.func.isRequired
};

export default MovieSmallCard;

