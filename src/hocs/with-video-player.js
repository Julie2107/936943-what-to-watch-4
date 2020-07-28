import React, {PureComponent} from "react";

const START_PLAY_TIMEOUT = 1000;

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._timeout = null;

      this.state = {
        isPlaying: false,
      };

      this._handleMouseHover = this._handleMouseHover.bind(this);
      this._handleMouseHoverOff = this._handleMouseHoverOff.bind(this);
    }

    _getStateForMouseHover() {
      this.setState({
        isPlaying: true,
      });
    }

    _handleMouseHover() {
    // const {movie, onMouseCardHover} = this.props;
      this._timeout = setTimeout(() => this._getStateForMouseHover(), START_PLAY_TIMEOUT);
      //  onMouseCardHover(movie);
    }

    _handleMouseHoverOff() {
      clearTimeout(this._timeout);

      this.setState({
        isPlaying: false,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          onMouseHover={this._handleMouseHover}
          onMouseHoverOff={this._handleMouseHoverOff}
        />
      );
    }
  }

  return WithPlayer;
};

export default withPlayer;
