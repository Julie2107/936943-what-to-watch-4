import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const withFullScreenVideo = (Component) => {
  class WithFullScreenVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoref = createRef();

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0,
      };

      this._handlePlayVideoButton = this._handlePlayVideoButton.bind(this);
      this._handleFullScreenButton = this._handleFullScreenButton.bind(this);
    }

    componentDidMount() {
      const {movie} = this.props;
      const video = this._videoref.current;

      if (video) {
        video.src = movie.src;
        video.poster = movie.poster;
        video.play();
        video.ontimeupdate = () => this.setState({
          progress: Math.floor(video.currentTime),
        });
        video.onloadedmetadata = () => this.setState({
          duration: Math.ceil(video.duration),
        });
      }
    }

    componentWillUnmount() {
      const video = this._videoref.current;

      if (video) {
        video.src = ``;
        video.poster = ``;
        video.onplay = null;
        video.ontimeupdate = null;
        video.onloadedmetadata = null;
      }
    }

    componentDidUpdate() {
      const video = this._videoref.current;

      const videoState = this.state.isPlaying ? video.play() : video.pause();

      return videoState;
    }

    _handlePlayVideoButton() {
      this.setState((prevState) => ({
        isPlaying: !prevState.isPlaying
      }));
    }

    _handleFullScreenButton() {
      const video = this._videoref.current;
      video.requestFullscreen();
    }

    render() {
      const {movie} = this.props;
      const {isPlaying, progress, duration} = this.state;

      return (
        <Component
          {...this.props}
          movie={movie}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayButtonClick={this._handlePlayVideoButton}
          onFullScreenButtonClick={this._handleFullScreenButton}

        >
          <video
            ref={this._videoref}
            src={movie.src}
            poster={movie.poster}
            width="100%"
          />
        </Component>
      );
    }
  }

  WithFullScreenVideo.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  };

  return WithFullScreenVideo;
};


export default withFullScreenVideo;
