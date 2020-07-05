import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoref = createRef();
  }

  componentDidMount() {
    const {src, poster, muted} = this.props;
    const video = this._videoref.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = muted;
    }
  }

  componentWillUnmount() {
    const video = this._videoref.current;

    if (video) {
      video.src = ``;
      video.poster = ``;
      video.muted = null;
    }
  }

  componentDidUpdate() {
    const video = this._videoref.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.load();
    }
  }

  render() {
    const {src, poster, muted} = this.props;

    return (
      <video
        ref={this._videoref}
        src={src}
        poster={poster}
        muted={muted}
      />
    );
  }
}

VideoPlayer.propTypes = {
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
};
