import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoref = createRef();

    this.state = {
      currentView: this.props.poster,
    };
  }

  componentDidMount() {
    const {src, poster} = this.props;
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

    this._video.play();
    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <audio
        ref = {this._videoref}
      />
    );
  }
}
