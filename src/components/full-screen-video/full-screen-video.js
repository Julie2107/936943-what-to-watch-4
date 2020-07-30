import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export default class FullScreenVideo extends PureComponent {
  constructor(props) {
    super(props);

    this._videoref = createRef();
  }

  componentDidMount() {
    const {movie} = this.props;
    const video = this._videoref.current;

    if (video) {
      video.src = movie.src;
      video.poster = movie.poster;
    }
  }

  componentWillUnmount() {
    const video = this._videoref.current;

    if (video) {
      video.src = ``;
      video.poster = ``;
    }
  }
  // открыть когда будем делать обработчик на play
  /*  componentDidUpdate() {
    const video = this._videoref.current;

    const videoState = this.props.isPlaying ? video.play() : video.load();

    return videoState;
  }
*/

  render() {
    const {movie} = this.props;

    return (
      <div className="player">
        <video
          className="player__video"
          ref={this._videoref}
          src={movie.src}
          poster={movie.poster}
        />

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100" />
              <div className="player__toggler" style={{left: 30 + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{movie.title}</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FullScreenVideo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
};
