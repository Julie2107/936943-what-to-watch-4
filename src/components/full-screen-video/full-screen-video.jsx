import React from "react";
import PropTypes from "prop-types";

import history from "../../history.js";


const FullScreenVideo = ({movie, onPlayButtonClick, isPlaying, children, onFullScreenButtonClick, progress, duration}) => {
  const timeLeft = duration - progress;
  const toggler = progress * 100 / duration;

  const renderPause = () => (
    <svg viewBox="0 0 14 21" width="14" height="21">
      <use xlinkHref="#pause"></use>
      <span>Pause</span>
    </svg>
  );

  const renderPlay = () => (
    <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>
  );
  const playingState = isPlaying ? renderPause() : renderPlay();

  return (
    <div className="player">
      {children}
      <button type="button"
        className="player__exit"
        onClick={() => history.goBack()}
      >
          Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max={duration}
            />
            <div className="player__toggler" style={{left: toggler + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={onPlayButtonClick}
          >
            {playingState}
          </button>
          <div className="player__name">{movie.title}</div>

          <button type="button" className="player__full-screen"
            onClick={onFullScreenButtonClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullScreenVideo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onDeactivatePlayer: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default FullScreenVideo;
